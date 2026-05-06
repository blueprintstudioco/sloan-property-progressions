import { useEffect, useMemo, useRef, useState } from 'react';

type Service = {
  key: string;
  label: string;
  shortLabel: string;
  description: string;
  rate: number;
  unit: 'acre' | 'linear_feet';
  minimum: { amount: number; upToAcres: number; label: string } | null;
};

type Terrain = {
  key: string;
  label: string;
  description: string;
};

type PricingOptions = {
  services: Service[];
  terrain: Terrain[];
  volumeDiscounts: { minAcres: number; maxAcres: number | null; rate: number; label: string }[];
  mobilizationFee: number;
};

type Estimate = {
  total: number;
  totalFormatted: string;
  subtotal: number;
  subtotalFormatted: string;
  totalAcres: number;
  lineItems: {
    label: string;
    total: number;
    totalFormatted: string;
    kind: string;
    quantity: number | null;
    unitPrice: number | null;
  }[];
};

type CalculatorStep = 'service' | 'amount' | 'density' | 'terrain' | 'contact' | 'result';
type ProjectType = 'forestry_mulching' | 'trail_cutting';
type Density = 'light' | 'medium' | 'dense';

const API_URL = '/api/instant-pricing';
const FORESTRY_KEYS = ['forestry_mulching_light', 'forestry_mulching_medium', 'forestry_mulching_dense'];
const TRAIL_KEYS = ['trail_cutting_light', 'trail_cutting_medium', 'trail_cutting_dense'];
const ALLOWED_KEYS = [...FORESTRY_KEYS, ...TRAIL_KEYS];

const DENSITY_KEY: Record<Density, string> = {
  light: 'light',
  medium: 'medium',
  dense: 'dense',
};

const getServiceKey = (projectType: ProjectType, density: Density) => `${projectType}_${DENSITY_KEY[density]}`;

const formatUnit = (service?: Service, quantity?: number | null) => {
  if (!service) return 'project';
  if (service.unit === 'linear_feet') return `${quantity ?? ''} linear feet`.trim();
  return `${quantity ?? ''} acre${quantity === 1 ? '' : 's'}`.trim();
};

const serviceCards: {
  id: ProjectType;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  badge?: string;
}[] = [
  {
    id: 'forestry_mulching',
    title: 'Forestry Mulching',
    eyebrow: 'Acreage clearing',
    description: 'Open overgrown acreage while preserving the trees, shade, and property character that should stay.',
    image: '/images/netx/services/forestry-mulching.jpg',
    badge: 'Most common',
  },
  {
    id: 'trail_cutting',
    title: 'Trail Cutting',
    eyebrow: 'Access paths',
    description: 'Plan practical access routes for walking, UTVs, hunting, maintenance, and future property improvements.',
    image: '/images/netx/services/trail-clearing.jpg',
  },
];

const densityCards: {
  id: Density;
  title: string;
  description: string;
  image: string;
  badge?: string;
}[] = [
  {
    id: 'light',
    title: 'Light Brush',
    description: 'Easy to walk through with lighter saplings, scattered brush, and minimal invasive growth.',
    image: '/images/instant-pricing/light-brush.webp',
  },
  {
    id: 'medium',
    title: 'Medium Brush',
    description: 'Noticeable regrowth, mixed saplings, and thicker patches that slow the machine down.',
    image: '/images/instant-pricing/medium-brush.webp',
    badge: 'Typical',
  },
  {
    id: 'dense',
    title: 'Dense Brush',
    description: 'Nearly impassable brush, vines, briars, and woody growth that requires slower cutting.',
    image: '/images/instant-pricing/dense-brush.webp',
  },
];

const terrainImages: Record<string, string> = {
  t1: '/images/instant-pricing/flat.webp',
  t2: '/images/instant-pricing/rolling.webp',
  t3: '/images/instant-pricing/steep.webp',
};

const quickAcreOptions = ['1', '2', '3', '5', '10', '15'];
const quickTrailOptions = ['250', '500', '1000', '2000'];

const stepLabels: { id: CalculatorStep; label: string }[] = [
  { id: 'service', label: 'Service' },
  { id: 'amount', label: 'Size' },
  { id: 'density', label: 'Density' },
  { id: 'terrain', label: 'Terrain' },
  { id: 'contact', label: 'Contact' },
  { id: 'result', label: 'Estimate' },
];

function ImageChoiceCard({
  selected,
  title,
  eyebrow,
  description,
  image,
  badge,
  onClick,
}: {
  selected: boolean;
  title: string;
  eyebrow?: string;
  description: string;
  image: string;
  badge?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative overflow-hidden border bg-white text-left shadow-lg transition duration-300 ${selected ? 'border-[#F37121] ring-4 ring-[#F37121]/20' : 'border-[#334D2B]/15 hover:-translate-y-1 hover:border-[#F37121]/70 hover:shadow-2xl'}`}
    >
      <div className="relative h-48 overflow-hidden bg-[#334D2B] p-3">
        <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-3 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        {badge && <span className="absolute left-4 top-4 bg-[#F37121] px-3 py-1 font-heading text-xs font-bold uppercase tracking-[0.16em] text-white">{badge}</span>}
        <span className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border-2 text-lg font-bold ${selected ? 'border-[#F37121] bg-[#F37121] text-white' : 'border-white/60 bg-black/30 text-white'}`}>{selected ? '✓' : ''}</span>
        <div className="absolute bottom-3 left-3 right-3 p-5">
          {eyebrow && <p className="mb-1 font-heading text-xs font-bold uppercase tracking-[0.18em] text-[#f1b273]">{eyebrow}</p>}
          <h3 className="font-heading text-3xl font-semibold leading-none text-white">{title}</h3>
        </div>
      </div>
      <div className="min-h-[124px] bg-white p-5 text-[#334D2B]/75 border-t border-[#334D2B]/10">
        <p>{description}</p>
      </div>
    </button>
  );
}

export default function InstantPricingPage() {
  const [step, setStep] = useState<CalculatorStep>('service');
  const [options, setOptions] = useState<PricingOptions | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [responseMessage, setResponseMessage] = useState('');

  const [projectType, setProjectType] = useState<ProjectType>('forestry_mulching');
  const [density, setDensity] = useState<Density>('medium');
  const [quantity, setQuantity] = useState('1');
  const [terrain, setTerrain] = useState('t1');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const calculatorRef = useRef<HTMLDivElement>(null);

  const serviceKey = getServiceKey(projectType, density);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load pricing options');
        return res.json();
      })
      .then((data) => {
        const services = (data.services || []).filter((service: Service) => ALLOWED_KEYS.includes(service.key));
        setOptions({ ...data, services, addOns: [] });
      })
      .catch((err) => {
        console.error(err);
        setError('Pricing is temporarily unavailable. Please request a quote and we can price it manually.');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (calculatorRef.current) {
      const top = calculatorRef.current.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, [step]);

  const selectedService = useMemo(() => options?.services.find((service) => service.key === serviceKey), [options, serviceKey]);
  const currentStepIndex = stepLabels.findIndex((item) => item.id === step);
  const terrainCards = useMemo(() => {
    return (options?.terrain || []).map((item) => ({
      ...item,
      image: terrainImages[item.key] || terrainImages.t1,
    }));
  }, [options]);

  const goToStep = (nextStep: CalculatorStep) => {
    setError(null);
    setStep(nextStep);
  };

  const validateAmount = () => {
    const parsedQuantity = Number.parseFloat(quantity);
    if (!selectedService || !Number.isFinite(parsedQuantity) || parsedQuantity <= 0) {
      setError(projectType === 'trail_cutting' ? 'Enter a valid trail length.' : 'Enter a valid acreage.');
      return false;
    }
    return true;
  };

  const handleContactSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
      setError('Fill in your name, email, and phone so we can send the estimate.');
      return;
    }
    if (!email.includes('@')) {
      setError('Enter a valid email address.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      setError('Enter a valid phone number.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          serviceKey,
          quantity: Number.parseFloat(quantity),
          terrain,
          addOns: [],
          source: 'sloanpropertyprogressions.com',
          operatorKey: 'northeast_texas',
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to calculate estimate');

      setEstimate(data.estimate);
      setResponseMessage(data.message || 'This is a ballpark estimate based on the details provided. A site review confirms access, density, terrain, and final scope.');
      setStep('result');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const startOver = () => {
    setStep('service');
    setEstimate(null);
    setResponseMessage('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
  };

  if (loading) {
    return (
      <section className="min-h-[55vh] bg-[#334D2B] text-white flex items-center justify-center px-6">
        <div className="text-center">
          <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-2 border-white/20 border-b-[#F37121]" />
          <p className="font-heading tracking-[0.22em] text-[#F37121] font-bold">Loading calculator</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-[#F2EBDF] text-[#334D2B] py-14 md:py-20 overflow-hidden">
      <div className="absolute inset-0 netx-topo opacity-20" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl" ref={calculatorRef}>
        <div className="text-center mb-10">
          <p className="kicker mb-3">Property planning estimate</p>
          <h1 className="font-heading font-semibold text-5xl md:text-7xl leading-none mb-4">Map The Next Step.</h1>
          <p className="mx-auto max-w-2xl text-lg text-[#334D2B]/75">Get a fast ballpark for forestry mulching or trail access, then confirm the final scope around access, keeper trees, finish expectations, and the property’s next use.</p>
        </div>

        <div className="mb-8">
          <div className="mb-2 flex justify-between font-heading text-sm font-semibold tracking-[0.16em] text-zinc-600">
            <span>Step {currentStepIndex + 1} of {stepLabels.length}</span>
            <span>{Math.round(((currentStepIndex + 1) / stepLabels.length) * 100)}% Complete</span>
          </div>
          <div className="h-2 overflow-hidden bg-white shadow-inner border border-[#334D2B]/10">
            <div className="h-full bg-[#F37121] transition-all duration-300" style={{ width: `${((currentStepIndex + 1) / stepLabels.length) * 100}%` }} />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 md:grid-cols-6">
            {stepLabels.map((item, index) => (
              <div key={item.id} className={`border px-2 py-2 text-center font-heading text-xs font-bold uppercase tracking-wide ${index <= currentStepIndex ? 'border-[#334D2B] bg-[#334D2B] text-white' : 'border-black/10 bg-white text-zinc-500'}`}>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {error && <div className="mb-6 border border-red-900/20 bg-red-50 px-5 py-4 text-red-800">{error}</div>}

        {step === 'service' && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="kicker mb-2">Choose a pathway</p>
              <h2 className="font-heading text-4xl font-semibold md:text-5xl">What is the next step?</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {serviceCards.map((card) => (
                <ImageChoiceCard key={card.id} selected={projectType === card.id} {...card} onClick={() => setProjectType(card.id)} />
              ))}
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={() => goToStep('amount')} className="bg-[#F37121] px-8 py-4 font-heading text-xl font-bold uppercase tracking-wide text-white transition hover:bg-[#ff8436]">Continue</button>
            </div>
          </div>
        )}

        {step === 'amount' && selectedService && (
          <div className="mx-auto max-w-3xl bg-white p-6 shadow-xl md:p-8">
            <p className="kicker mb-2">Property measure</p>
            <h2 className="mb-4 font-heading text-4xl font-semibold md:text-5xl">{selectedService.unit === 'linear_feet' ? 'How long is the trail?' : 'How many acres?'}</h2>
            <input className="w-full border border-black/20 bg-[#f8f1e4] px-4 py-5 text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#F37121]" type="number" min={selectedService.unit === 'linear_feet' ? '25' : '0.25'} step={selectedService.unit === 'linear_feet' ? '25' : '0.25'} value={quantity} onChange={(event) => setQuantity(event.target.value)} placeholder={selectedService.unit === 'linear_feet' ? 'Example: 800' : 'Example: 2.5'} />
            <p className="mt-3 text-zinc-600">{selectedService.unit === 'linear_feet' ? 'Enter total linear feet for a typical 10-foot-wide trail.' : 'Enter the approximate acreage. Small jobs may be subject to minimum pricing.'}</p>
            <div className="mt-5">
              <p className="mb-2 font-heading text-sm font-semibold tracking-[0.16em] text-zinc-600">
                {selectedService.unit === 'linear_feet' ? 'Common trail lengths' : 'Common acreage'}
              </p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {(selectedService.unit === 'linear_feet' ? quickTrailOptions : quickAcreOptions).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setQuantity(option)}
                    className={`border px-3 py-3 font-heading text-lg font-bold uppercase transition ${quantity === option ? 'border-[#F37121] bg-[#334D2B] text-white' : 'border-black/10 bg-[#f8f1e4] text-[#334D2B] hover:border-[#F37121]'}`}
                  >
                    {selectedService.unit === 'linear_feet' ? `${Number(option).toLocaleString()} ft` : `${option} ac`}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => goToStep('service')} className="flex-1 border-2 border-[#334D2B] px-8 py-4 font-heading text-lg font-bold uppercase tracking-wide transition hover:bg-[#334D2B] hover:text-white">Back</button>
              <button type="button" onClick={() => validateAmount() && goToStep('density')} className="flex-1 bg-[#F37121] px-8 py-4 font-heading text-lg font-bold uppercase tracking-wide text-white transition hover:bg-[#ff8436]">Continue</button>
            </div>
          </div>
        )}

        {step === 'density' && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="kicker mb-2">Current condition</p>
              <h2 className="font-heading text-4xl font-semibold md:text-5xl">How much resistance is there?</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {densityCards.map((card) => (
                <ImageChoiceCard key={card.id} selected={density === card.id} title={card.title} description={card.description} image={card.image} badge={card.badge} onClick={() => setDensity(card.id)} />
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => goToStep('amount')} className="flex-1 border-2 border-[#334D2B] px-8 py-4 font-heading text-lg font-bold uppercase tracking-wide transition hover:bg-[#334D2B] hover:text-white">Back</button>
              <button type="button" onClick={() => goToStep('terrain')} className="flex-1 bg-[#F37121] px-8 py-4 font-heading text-lg font-bold uppercase tracking-wide text-white transition hover:bg-[#ff8436]">Continue</button>
            </div>
          </div>
        )}

        {step === 'terrain' && terrainCards.length > 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="kicker mb-2">Ground conditions</p>
              <h2 className="font-heading text-4xl font-semibold md:text-5xl">How does the property lay?</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {terrainCards.map((card) => (
                <ImageChoiceCard key={card.key} selected={terrain === card.key} title={card.label} description={card.description} image={card.image} onClick={() => setTerrain(card.key)} />
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => goToStep('density')} className="flex-1 border-2 border-[#334D2B] px-8 py-4 font-heading text-lg font-bold uppercase tracking-wide transition hover:bg-[#334D2B] hover:text-white">Back</button>
              <button type="button" onClick={() => goToStep('contact')} className="flex-1 bg-[#F37121] px-8 py-4 font-heading text-lg font-bold uppercase tracking-wide text-white transition hover:bg-[#ff8436]">Continue To Estimate</button>
            </div>
          </div>
        )}

        {step === 'contact' && (
          <form onSubmit={handleContactSubmit} className="mx-auto max-w-3xl bg-white border border-black/10 shadow-xl p-6 md:p-8 space-y-6">
            <div>
              <p className="kicker mb-2">Save the estimate</p>
              <h2 className="font-heading font-semibold text-4xl mb-2">Where should the plan go?</h2>
              <p className="text-[#334D2B]/75">This gives the operator enough context to confirm the property, access, and final scope.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <input className="border border-black/20 bg-[#f8f1e4] px-4 py-4" value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="First name *" required />
              <input className="border border-black/20 bg-[#f8f1e4] px-4 py-4" value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Last name *" required />
            </div>
            <input className="w-full border border-black/20 bg-[#f8f1e4] px-4 py-4" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email *" required />
            <input className="w-full border border-black/20 bg-[#f8f1e4] px-4 py-4" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Phone *" required />
            <div className="rounded-sm bg-[#334D2B] p-4 text-sm text-zinc-300">
              <span className="font-semibold text-white">Summary:</span> {selectedService?.label} • {formatUnit(selectedService, Number.parseFloat(quantity))} • {terrainCards.find((card) => card.key === terrain)?.label}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button type="button" onClick={() => goToStep('terrain')} className="flex-1 border-2 border-[#334D2B] px-8 py-4 font-heading font-semibold text-lg uppercase tracking-wide hover:bg-[#334D2B] hover:text-white transition">Back</button>
              <button type="submit" disabled={submitting} className="flex-1 bg-[#F37121] text-white px-8 py-4 font-heading font-semibold text-lg uppercase tracking-wide hover:bg-[#ff8436] transition disabled:opacity-60">{submitting ? 'Calculating…' : 'Show My Estimate'}</button>
            </div>
            <p className="text-xs text-zinc-500 text-center">By submitting, you consent to being contacted about this land clearing project. No spam.</p>
          </form>
        )}

        {step === 'result' && estimate && (
          <div className="mx-auto max-w-3xl bg-white border border-black/10 shadow-xl p-6 md:p-8">
            <div className="text-center border-b border-black/10 pb-8 mb-6">
              <p className="kicker mb-3">Your planning estimate</p>
              <div className="font-heading font-semibold text-6xl md:text-8xl text-[#F37121] leading-none">{estimate.totalFormatted}</div>
              <p className="mt-3 text-zinc-600">for {formatUnit(selectedService, selectedService?.unit === 'linear_feet' ? Number.parseFloat(quantity) : estimate.totalAcres)}</p>
            </div>

            <div className="space-y-3 mb-6">
              {estimate.lineItems.map((item, index) => (
                <div key={`${item.label}-${index}`} className="flex justify-between gap-4 border-b border-black/10 pb-3 text-sm">
                  <span className={item.kind === 'volume_discount' ? 'text-green-700' : 'text-zinc-700'}>{item.label}</span>
                  <span className={`font-semibold ${item.kind === 'volume_discount' ? 'text-green-700' : 'text-[#334D2B]'}`}>{item.total < 0 ? '-' : ''}{item.totalFormatted}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#334D2B] text-white p-5 mb-6">
              <p className="text-zinc-300">{responseMessage}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <a href="/get-a-quote" className="text-center bg-[#F37121] text-white px-8 py-4 font-heading font-semibold text-lg uppercase tracking-wide hover:bg-[#ff8436] transition">Request Final Quote</a>
              <button onClick={startOver} className="border-2 border-[#334D2B] px-8 py-4 font-heading font-semibold text-lg uppercase tracking-wide hover:bg-[#334D2B] hover:text-white transition">Price Another Project</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
