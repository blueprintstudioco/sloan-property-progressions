const BRUSHWORKS_API_URL = 'https://crm.brushworksco.com/api/instant-pricing';
const ALLOWED_SERVICE_KEYS = new Set([
  'forestry_mulching_light',
  'forestry_mulching_medium',
  'forestry_mulching_dense',
  'trail_cutting_light',
  'trail_cutting_medium',
  'trail_cutting_dense',
]);

function filterOptions(data) {
  return {
    ...data,
    services: Array.isArray(data.services)
      ? data.services.filter((service) => ALLOWED_SERVICE_KEYS.has(service.key))
      : [],
    addOns: [],
  };
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://sloanpropertyprogressions.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const upstream = await fetch(BRUSHWORKS_API_URL, { headers: { Accept: 'application/json' } });
      const data = await upstream.json();
      return res.status(upstream.status).json(filterOptions(data));
    }

    if (req.method === 'POST') {
      const body = await readJsonBody(req);

      if (!ALLOWED_SERVICE_KEYS.has(body.serviceKey)) {
        return res.status(400).json({ error: 'This calculator only supports forestry mulching and trail cutting.' });
      }

      const digits = String(body.phone || '').replace(/\D/g, '');
      const normalizedPhone = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;

      const upstream = await fetch(BRUSHWORKS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...body,
          phone: normalizedPhone || body.phone,
          addOns: [],
          source: 'sloanpropertyprogressions.com',
          operatorKey: 'northeast_texas',
          site: 'Sloan Property Progressions',
        }),
      });

      const data = await upstream.json();
      return res.status(upstream.status).json(data);
    }

    res.setHeader('Allow', 'GET, POST, OPTIONS');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('East Texas instant pricing proxy error:', error);
    return res.status(500).json({ error: 'Pricing is temporarily unavailable. Please request a quote.' });
  }
}
