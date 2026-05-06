export interface ServiceData {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  metaDescription: string;
  image: string;
  heroVideo?: string;
  fullDescription: string[];
  situations?: { title: string; description: string; icon: string }[];
  galleryImages?: string[];
  expectations?: { timeline: string; priceRange: string; details: string[] };
  testimonial?: { quote: string; name: string; location: string; project: string };
  included: string[];
  process: { step: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

const media = {
  hero: '/images/netx/forestry-mulching-hero.png',
  action: '/images/netx/mulcher-action-landscape.png',
  takeuchi: '/images/netx/takeuchi-tl12.png',
  before: '/images/netx/clearing-before.png',
  after: '/images/netx/clearing-after.png',
  serviceLandClearing: '/images/netx/homepage/land-clearing.jpg',
  serviceForestryMulching: '/images/netx/services/forestry-mulching.jpg',
  serviceBrushClearing: '/images/netx/homepage/brush-clearing.jpg',
  serviceFenceLine: '/images/netx/services/fence-line-clearing.jpg',
  serviceTrail: '/images/netx/homepage/trail-clearing.jpg',
  serviceAcreage: '/images/netx/homepage/acreage-cleanup.jpg',
  serviceSitePrep: '/images/netx/homepage/site-preparation.jpg',
  serviceErosion: '/images/netx/homepage/erosion-control.jpg',
};

const baseProcess = [
  { step: 'Diagnose the Problem', description: 'We start with the reason the land is unusable: brush density, yaupon or privet pressure, drainage, access, fence lines, keeper trees, and final use.' },
  { step: 'Mark What Stays', description: 'Good clearing in East Texas is selective. We confirm boundaries, trails, gates, desirable trees, screening, and areas that should not be disturbed.' },
  { step: 'Clear for the Outcome', description: 'The machine work is matched to the goal: pasture recovery, hunting access, homesite opening, fence construction, storm cleanup, or long-term maintenance.' },
  { step: 'Leave It Maintainable', description: 'The finish should be cleaner, walkable, easier to mow or manage, and ready for the next step — not a pile of debris and ruts.' },
];

const baseIncluded = [
  'Property and access review',
  'Brush density and terrain assessment',
  'Keeper-tree and boundary discussion',
  'Selective clearing plan',
  'Mulch/debris finish plan',
  'Trail, fence-line, or opening layout',
  'Final pass and walkthrough',
  'Practical maintenance recommendations',
];

const baseFaqs = [
  { question: 'Do you remove everything or clear selectively?', answer: 'Most Northeast Texas landowners want selective clearing: remove the brush, saplings, vines, and problem growth while keeping shade trees, privacy, mast trees, screening, and the character of the property.' },
  { question: 'What does forestry mulching leave behind?', answer: 'Brush and small material are processed into a mulch layer on the ground. That usually means less hauling, less burning, less exposed soil, and a cleaner finish than cut-and-pile clearing.' },
  { question: 'Can you work around trees I want to keep?', answer: 'Yes. Good clearing starts with what should stay: shade trees, healthy timber, privacy screens, mast trees, wildlife cover, trails, gates, fences, and areas that should not be disturbed.' },
  { question: 'What affects the price of a land clearing project?', answer: 'Pricing depends on acreage or footage, brush density, terrain, access, wet areas, keeper trees, debris finish, and what the area needs to become after clearing.' },
];

function makeService(input: Partial<ServiceData> & Pick<ServiceData, 'slug' | 'title' | 'shortTitle' | 'description' | 'image'>): ServiceData {
  return {
    metaDescription: `${input.title} across Northeast Texas. Problem-focused land clearing for yaupon, privet, pine understory, fence rows, trails, hunting land, ranch acreage, and overgrown rural property.`,
    fullDescription: [
      'Northeast Texas clearing is a different problem than suburban lot clearing. Properties here often have thicker understory, larger acreage, sandy or clay soil, old fence rows, pine regeneration, yaupon, privet, cedar, vines, storm debris, and long stretches of land that need access before anything else can happen.',
      'The goal is not to scrape everything bare. The goal is to solve the actual property problem: make the land walkable, open a trail, recover a pasture edge, expose a fence line, prepare a homesite, improve hunting access, or make an inherited or newly purchased tract manageable again.',
      'We approach every job around the outcome first. What needs to become usable? What should stay? What will you need to maintain after we leave? That is how you avoid paying for clearing that looks busy for a day but creates a bigger mess later.'
    ],
    situations: [
      { title: 'Thick Understory', description: 'Yaupon, privet, cedar, vines, saplings, and pine regeneration have made the property hard to walk or see through.', icon: '🌲' },
      { title: 'Ranch & Pasture Edges', description: 'Brush is creeping into usable grazing, fence access, gates, ponds, barns, and working areas.', icon: '🐂' },
      { title: 'Hunting Land Access', description: 'You need shooting lanes, UTV trails, stand access, food plot edges, and clearer movement routes.', icon: '🦌' },
      { title: 'New Owner Cleanup', description: 'You bought land or inherited acreage and need to see what you actually have before making bigger decisions.', icon: '🗺️' },
    ],
    galleryImages: [media.hero, media.action, media.takeuchi, media.before, media.after],
    expectations: {
      timeline: 'Most quote ranges can start from an address, photos/video, acreage or footage, and a clear description of the problem you want solved.',
      priceRange: 'Pricing depends on density, acreage, linear footage, access, slopes, wet areas, finish expectations, and whether the material is mulched, cut, piled, hauled, or prepared for the next trade.',
      details: ['Address or parcel link', 'Photos or video of the worst areas', 'Desired outcome', 'Keeper trees and boundaries', 'Access, gates, wet spots, and utility notes']
    },
    testimonial: {
      quote: 'Good land clearing is not just knocking brush down. It is turning land you avoid into land you can drive, walk, hunt, fence, build on, or maintain.',
      name: 'Sloan Property Progressions',
      location: 'East Texas',
      project: 'Rural acreage reclamation'
    },
    included: baseIncluded,
    process: baseProcess,
    faqs: baseFaqs,
    ...input,
  };
}

export const services: ServiceData[] = [
  makeService({
    slug: 'land-clearing',
    title: 'Rural Land Clearing',
    shortTitle: 'Land Clearing',
    description: 'Turn overgrown Northeast Texas acreage into usable property without stripping the land bare or destroying the trees worth keeping.',
    image: media.serviceLandClearing,
    fullDescription: [
      'The common East Texas problem is simple: the land is yours, but the brush is using it. Yaupon, privet, cedar, vines, pine saplings, storm growth, and neglected understory can make acreage impossible to walk, fence, hunt, mow, inspect, or build on.',
      'Rural land clearing should start with the final use. A hunting tract does not need to look like a house pad. A homesite does not need every tree gone. A pasture edge needs a different finish than a trail corridor or fence row.',
      'We clear for usability: opening the right areas, preserving good trees and shade where possible, reducing brush pressure, and leaving ground that is easier to maintain after the machine leaves.'
    ],
    included: ['Overgrown acreage clearing', 'Selective tree preservation', 'Yaupon, privet, cedar, and sapling reduction', 'Ranch and hunting tract access', 'Homesite and pasture-edge openings', 'Fence-line and trail tie-ins', 'Mulch/debris finish planning', 'Final walkthrough'],
  }),
  makeService({
    slug: 'forestry-mulching',
    title: 'Forestry Mulching',
    shortTitle: 'Mulching',
    description: 'Mulch brush, saplings, yaupon, privet, cedar, and understory into a cleaner ground layer instead of leaving piles to burn or haul.',
    image: media.serviceForestryMulching,
    fullDescription: [
      'Forestry mulching is often the cleanest answer for Northeast Texas brush because it handles the material where it stands. Instead of cutting, dragging, piling, burning, or hauling everything away, the mulcher reduces brush and small trees into a layer of mulch on the ground.',
      'That matters in this market. Large rural properties usually need access and visibility more than a scraped dirt finish. Mulching can open trails, fence rows, pasture edges, hunting lanes, and thick understory while keeping soil covered and reducing cleanup chaos.',
      'It is best for brush and small material. Bigger timber, structural site prep, heavy dirt work, and finish grading may require a different plan, but mulching is usually the fastest path from “you cannot walk through it” to “you can use it again.”'
    ],
    included: ['Forestry mulching attachment work', 'Yaupon, privet, cedar, vine, and sapling reduction', 'Understory thinning', 'Trail and shooting-lane openings', 'Pasture and fence-row cleanup', 'Low-haul debris strategy', 'Keeper-tree protection', 'Finished mulch pass'],
    faqs: [
      { question: 'What is forestry mulching?', answer: 'Forestry mulching uses specialized equipment to grind brush, saplings, vines, yaupon, privet, cedar, and small woody material into mulch where it stands. It is a cleaner alternative to cutting, dragging, piling, burning, and hauling debris.' },
      { question: 'What size trees can be mulched?', answer: 'Forestry mulching is best for brush, understory, saplings, vines, cedar, yaupon, privet, and smaller trees. Larger timber, hazard trees, or trees near structures may need a different removal plan.' },
      { question: 'Does forestry mulching stop regrowth?', answer: 'Mulching knocks growth back hard and makes the property easier to maintain, but East Texas brush can regrow if the area is ignored. We can talk through mowing, follow-up clearing, or maintenance strategy based on your final use.' },
      { question: 'Do you haul the mulch away?', answer: 'Usually no — the point of forestry mulching is to process material in place and leave a natural mulch layer. Haul-off may be considered for specific areas like future pads, driveways, or tight cleanup zones.' },
      { question: 'Can you mulch fence lines, trails, and hunting lanes?', answer: 'Yes. Forestry mulching is a strong fit for fence rows, UTV trails, shooting lanes, stand access, food plot edges, pasture edges, and rural access corridors.' },
      { question: 'How much does forestry mulching cost in Northeast Texas?', answer: 'Cost depends on acreage or linear footage, brush density, access, terrain, wet areas, keeper trees, and finish expectations. The goal is a clear project price based on the scope — not open-ended machine time.' },
    ],
  }),
  makeService({
    slug: 'brush-clearing',
    title: 'Brush & Understory Clearing',
    shortTitle: 'Brush Clearing',
    description: 'Clear the yaupon, privet, vines, briars, cedar, pine saplings, and thickets that make East Texas land feel unusable.',
    image: media.serviceBrushClearing,
    fullDescription: [
      'Brush clearing is the service most Northeast Texas landowners actually need first. The problem is not always large trees — it is the thick mid-layer that blocks sight lines, grabs at equipment, hides fence damage, limits hunting access, and makes a property feel smaller than it is.',
      'We focus on the problem growth: yaupon, privet, vines, briars, cedar, pine regeneration, and small woody material that has taken over the usable parts of the land.',
      'The right finish depends on the goal. Some areas need to be opened enough to mow. Some need wildlife cover preserved. Some just need visibility and access so the owner can make the next decision.'
    ],
    included: ['Dense brush reduction', 'Yaupon and privet clearing', 'Vine and thicket cleanup', 'Small sapling removal', 'Sight-line opening', 'Access lane cleanup', 'Selective cover preservation', 'Maintenance recommendations'],
  }),
  makeService({
    slug: 'fence-line-clearing',
    title: 'Fence Line & Boundary Clearing',
    shortTitle: 'Fence Lines',
    description: 'Open property lines, old fence rows, gates, easements, and boundary corridors so they can be inspected, repaired, or built.',
    image: media.serviceFenceLine,
    fullDescription: [
      'Old East Texas fence rows disappear fast. Brush grows into wire, limbs block access, vines hide damage, and property boundaries become impossible to inspect or maintain.',
      'Fence line clearing creates the room needed to build, repair, replace, or maintain a fence without fighting through brush every few feet. It also helps landowners understand where the boundary actually is before bigger land decisions are made.',
      'The key is controlled width. You usually do not need a huge cleared strip. You need enough room for visibility, equipment, repairs, gates, corners, and future maintenance.'
    ],
    included: ['Boundary corridor clearing', 'Old fence row visibility', 'Gate and corner cleanup', 'Brush and limb reduction', 'Access for fence crews', 'Width confirmation before clearing', 'Keeper-tree discussion', 'Final corridor pass'],
  }),
  makeService({
    slug: 'trail-clearing',
    title: 'Hunting Trail & Access Clearing',
    shortTitle: 'Trail Clearing',
    description: 'Open practical UTV trails, hunting access, stand routes, shooting lanes, and equipment paths through wooded acreage.',
    image: media.serviceTrail,
    fullDescription: [
      'On hunting land and rural acreage, access is everything. If you cannot get a UTV, tractor, side-by-side, or walking path through the property, you cannot use or manage the land well.',
      'Trail clearing is not the same as bulldozing a road. The best trails follow the land, avoid wet problems where possible, preserve useful cover, and open enough room for safe movement without making the place feel over-cleared.',
      'This is especially useful for hunting tracts, food plot access, stand routes, property inspections, fence work, pond access, and connecting different usable areas of a larger parcel.'
    ],
    included: ['UTV and equipment trail layout', 'Hunting stand and food plot access', 'Shooting lane openings where appropriate', 'Low-impact route planning', 'Wet area and obstacle review', 'Selective screening preservation', 'Turnaround or gate access discussion', 'Finished trail pass'],
  }),
  makeService({
    slug: 'acreage-cleanup',
    title: 'Acreage Reclamation & Cleanup',
    shortTitle: 'Acreage Cleanup',
    description: 'Reset neglected acreage, inherited land, storm-damaged areas, pasture edges, and rural property that has gotten away from you.',
    image: media.serviceAcreage,
    fullDescription: [
      'A lot of East Texas land is not ruined — it is just unmanaged. A few years of growth can bury trails, hide debris, close in pasture edges, block gates, and make a good property feel overwhelming.',
      'Acreage reclamation is for landowners who need a reset. We open access, clean up problem areas, reduce brush pressure, expose what is there, and make the next round of decisions easier.',
      'This is often the right first step after buying land, inheriting property, preparing to sell, cleaning up after storms, or finally deciding to get a tract back under control.'
    ],
    included: ['New-owner property reset', 'Storm and neglect cleanup', 'Pasture-edge reclamation', 'Old trail reopening', 'Brush pile and obstacle planning', 'Gate and access cleanup', 'Usability-focused clearing', 'Next-step maintenance plan'],
  }),
  makeService({
    slug: 'site-preparation',
    title: 'Homesite & Rural Site Preparation',
    shortTitle: 'Site Prep',
    description: 'Clear and organize land before cabins, barndominiums, shops, barns, driveways, utilities, pads, and future dirt work.',
    image: media.serviceSitePrep,
    fullDescription: [
      'Site preparation starts before dirt work. If a builder, driveway contractor, utility crew, or pad crew cannot reach the area cleanly, the whole project gets harder and more expensive.',
      'We clear the access and opening needed for rural improvements: cabins, barndominiums, shops, barns, sheds, driveways, parking areas, utility corridors, and future pads.',
      'The goal is a practical handoff. Remove the brush that blocks the project, protect what should remain, think about drainage and staging, and leave the site easier for the next contractor to work.'
    ],
    included: ['Homesite and barn-site openings', 'Driveway and utility corridor clearing', 'Builder access planning', 'Brush and sapling removal', 'Stump/organic material discussion', 'Drainage awareness', 'Staging area cleanup', 'Next-trade handoff notes'],
  }),
  makeService({
    slug: 'erosion-control',
    title: 'Mulch Layer & Erosion Control',
    shortTitle: 'Erosion Control',
    description: 'Understand how forestry mulching leaves a protective mulch layer that helps reduce exposed soil, runoff, rutting, and washout risk after clearing.',
    image: media.serviceErosion,
    fullDescription: [
      'On Northeast Texas land, the finish matters. If clearing leaves bare clay, sandy soil, slopes, trails, and low areas exposed, heavy rain can quickly turn a clean-looking job into ruts, washouts, mud, and maintenance headaches.',
      'Forestry mulching helps because the brush is processed where it stands. Instead of scraping everything to dirt, the leftover mulch layer stays on the ground and acts like a protective blanket over the soil.',
      'That does not make mulching a replacement for engineered drainage, culverts, grading, or serious erosion repair. But for many acreage, trail, fence-row, and understory projects, leaving mulch cover is one of the practical reasons forestry mulching is a smarter finish than bare dirt.'
    ],
    included: ['Mulch cover left in place where useful', 'Bare-soil reduction strategy', 'Trail and slope awareness', 'Wet-area and water-path discussion', 'Selective clearing around keeper trees and root structure', 'Low-disturbance finish planning', 'Post-clearing maintenance guidance', 'Drainage contractor referral when needed'],
    faqs: [
      { question: 'Does forestry mulching help with erosion control?', answer: 'Yes, the mulch layer can help protect soil from direct rain impact, reduce exposed dirt, and slow some surface runoff compared with scraping everything bare. It is one of the biggest advantages of mulching brush in place.' },
      { question: 'Is mulch a replacement for grading or drainage work?', answer: 'No. Mulch helps protect the surface, but serious drainage problems, culverts, ditches, washouts, and pad work may need a grading or drainage contractor.' },
      { question: 'Why not just clear everything down to dirt?', answer: 'Bare dirt is vulnerable in East Texas rain. Leaving mulch and preserving useful roots, keeper trees, and ground cover where possible can make the finished area more stable and easier to maintain.' },
      { question: 'Where does mulch cover matter most?', answer: 'It matters most on trails, slopes, sandy soil, clay, low areas, pasture edges, and freshly opened ground that would otherwise take direct rain before grass or maintenance can catch up.' },
    ],
  }),
];

export const residentialServices: ServiceData[] = [
  ...services,
  makeService({ slug: 'driveways', title: 'Driveway & Access Clearing', shortTitle: 'Driveways', description: 'Open rural driveway corridors, equipment access, hunting lanes, and long property entrances before gravel or build work begins.', image: media.serviceTrail }),
  makeService({ slug: 'lot-prep', title: 'Rural Lot Prep', shortTitle: 'Lot Prep', description: 'Clear and organize rural lots before cabins, barns, homesites, shops, or utility work begin.', image: media.serviceSitePrep }),
  makeService({ slug: 'demolition', title: 'Rural Debris Cleanup', shortTitle: 'Cleanup', description: 'Light rural cleanup for old sheds, brush piles, storm debris, and obstacles that need handled before land work continues.', image: media.serviceAcreage }),
  makeService({ slug: 'grading', title: 'Light Finish Work', shortTitle: 'Finish Work', description: 'Basic shaping and cleanup after clearing so the ground drains better and is easier to use.', image: media.serviceErosion }),
];

export const commercialServices: ServiceData[] = services;

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find(s => s.slug === slug);
}

export function getResidentialServiceBySlug(slug: string): ServiceData | undefined {
  return residentialServices.find(s => s.slug === slug);
}

export function getCommercialServiceBySlug(slug: string): ServiceData | undefined {
  return commercialServices.find(s => s.slug === slug);
}
