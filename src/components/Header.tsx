import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const services = [
  { name: 'Forestry Mulching', href: '/services/forestry-mulching' },
  { name: 'Brush Clearing', href: '/services/brush-clearing' },
  { name: 'Trail & Access Clearing', href: '/services/trail-clearing' },
  { name: 'Fence Line Clearing', href: '/services/fence-line-clearing' },
  { name: 'Acreage Cleanup', href: '/services/acreage-cleanup' },
  { name: 'Site Prep', href: '/services/site-preparation' },
  { name: 'Erosion Control', href: '/services/erosion-control' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#334D2B]/94 backdrop-blur-md border-b border-white/10 shadow-2xl">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center flex-shrink min-w-0">
            <img src="/assets/spp-logo.png" alt="Sloan Property Progressions" className="h-10 sm:h-12 md:h-14 w-auto max-w-[150px] sm:max-w-[220px] object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]" />
          </a>

          <div className="hidden lg:flex items-center space-x-7">
            <a href="/" className="text-white hover:text-[#F37121] transition font-[Rajdhani] uppercase tracking-wide font-bold text-sm">Home</a>
            <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <button className="flex items-center text-white hover:text-[#F37121] transition font-[Rajdhani] uppercase tracking-wide font-bold text-sm">
                Services <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 pt-2 w-[440px]">
                  <div className="bg-[#334D2B] shadow-2xl py-3 px-2 border border-white/10 grid grid-cols-2 gap-0">
                    {services.map((service) => (
                      <a key={service.href} href={service.href} className="block px-3 py-2 text-gray-300 hover:text-[#F37121] hover:bg-white/5 transition text-sm">{service.name}</a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="relative" onMouseEnter={() => setAboutOpen(true)} onMouseLeave={() => setAboutOpen(false)}>
              <a href="/about" className="flex items-center text-white hover:text-[#F37121] transition font-[Rajdhani] uppercase tracking-wide font-bold text-sm">
                About <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${aboutOpen ? 'rotate-180' : ''}`} />
              </a>
              {aboutOpen && (
                <div className="absolute top-full left-0 pt-2 w-48">
                  <div className="bg-[#334D2B] shadow-2xl py-2 border border-white/10">
                    <a href="/about" className="block px-4 py-2 text-gray-300 hover:text-[#F37121] hover:bg-white/5 transition">Our Story</a>
                    <a href="/reviews" className="block px-4 py-2 text-gray-300 hover:text-[#F37121] hover:bg-white/5 transition">Reviews</a>
                    <a href="/faq" className="block px-4 py-2 text-gray-300 hover:text-[#F37121] hover:bg-white/5 transition">FAQ</a>
                  </div>
                </div>
              )}
            </div>
            <a href="/portfolio" className="text-white hover:text-[#F37121] transition font-[Rajdhani] uppercase tracking-wide font-bold text-sm">Our Work</a>
            <a href="/instant-pricing" className="text-white hover:text-[#F37121] transition font-[Rajdhani] uppercase tracking-wide font-bold text-sm">Pricing</a>
            <a href="/contact" className="text-white hover:text-[#F37121] transition font-[Rajdhani] uppercase tracking-wide font-bold text-sm">Contact</a>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <a href="/instant-pricing" className="border border-white/30 text-white px-5 py-2.5 font-bold hover:border-[#F37121] hover:text-[#F37121] transition font-[Rajdhani] uppercase tracking-wide">Instant Pricing</a>
            <a href="/get-a-quote" className="bg-[#F37121] text-white px-5 py-2.5 font-bold hover:bg-[#ff8436] transition font-[Rajdhani] uppercase tracking-wide">Free Quote</a>
          </div>

          <div className="flex lg:hidden items-center gap-1.5 flex-shrink-0">
            <a href="/get-a-quote" className="bg-[#F37121] text-white px-3 py-2 font-bold text-xs sm:text-sm font-[Rajdhani] uppercase whitespace-nowrap">Quote</a>
            <button className="text-white p-1.5 sm:p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">{mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden pb-6">
            <div className="flex flex-col space-y-4">
              <a href="/" className="text-white hover:text-[#F37121] transition font-medium py-2">Home</a>
              <div>
                <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="flex items-center justify-between w-full text-white hover:text-[#F37121] transition font-medium py-2">Services <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} /></button>
                {mobileServicesOpen && <div className="pl-4 mt-2 space-y-2 border-l-2 border-[#F37121]">{services.map((service) => <a key={service.href} href={service.href} className="block text-gray-300 hover:text-[#F37121] transition py-1">{service.name}</a>)}</div>}
              </div>
              <div>
                <button onClick={() => setMobileAboutOpen(!mobileAboutOpen)} className="flex items-center justify-between w-full text-white hover:text-[#F37121] transition font-medium py-2">About <ChevronDown className={`h-4 w-4 transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`} /></button>
                {mobileAboutOpen && <div className="pl-4 mt-2 space-y-2 border-l-2 border-[#F37121]"><a href="/about" className="block text-gray-300 hover:text-[#F37121] transition py-1">Our Story</a><a href="/reviews" className="block text-gray-300 hover:text-[#F37121] transition py-1">Reviews</a><a href="/faq" className="block text-gray-300 hover:text-[#F37121] transition py-1">FAQ</a></div>}
              </div>
              <a href="/portfolio" className="text-white hover:text-[#F37121] transition font-medium py-2">Our Work</a>
              <a href="/instant-pricing" className="text-white hover:text-[#F37121] transition font-medium py-2">Instant Pricing</a>
              <a href="/contact" className="text-white hover:text-[#F37121] transition font-medium py-2">Contact</a>
              <a href="/get-a-quote" className="block text-center bg-[#F37121] text-white px-5 py-3 font-semibold hover:bg-[#ff8436] transition font-[Rajdhani]">Get a Quote</a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
