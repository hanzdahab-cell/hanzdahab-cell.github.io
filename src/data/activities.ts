import { Activity } from '../types';

export const activitiesData: Activity[] = [
  {
    id: "ras-mohamed",
    title: "Ras Mohamed National Park Safari",
    description: "A full-day shore-based freediving trip from Dahab to Ras Mohamed National Park, about 100 km from town. Explore the shallow entry cave at Shark Observatory, reef caves along the coast, and Yolanda Reef, where schools of fish, turtles, rays, moray eels and napoleons may be encountered. Confident freedivers can explore deeper sections while beginners can stay shallow.",
    duration: "Full day; early morning departure",
    priceEur: 78,
    image: { url: "/images/cards/activities/ras-mohamed.webp", alt: "Freedive Dahab Ras Mohammed reef trip poster" },
    includes: [
      "Marine park entrance fees included",
      "At least one Freedive Dahab instructor as freediving guide",
      "Fruit and snacks",
      "Shore-based minivan transfer from Dahab",
      "Lunch break under a beach shade tent",
    ],
    highlights: [
      "Shallow entry cave at Shark Observatory and reef caves along the coast",
      "Freediving at Yolanda Reef among schools of barracuda, trevallies and snappers",
      "Possible encounters with turtles, rays, giant moray eels and napoleon wrasse",
      "Suitable for mixed abilities: beginners can stay shallow while confident divers explore deeper",
    ],
    rateNote: "Brochure rate; the supplied brochure footer is dated 2017. Confirm current prices before booking.",
    bookingNotes: [
      "The supplied brochure lists €78 per person with park entry, fruit and snacks, and a freediving guide. Its footer is dated 2017; confirm current pricing before booking.",
      "Minimum group size is four. The brochure lists €98 per person for a group of three.",
      "The brochure lists €65 for Masters, long-term trainees and Zero to Hero participants.",
    ],
  },
  {
    id: "gabriella-reef",
    title: "Gabriella Reef & Canyon Drift",
    description: "Morning drift freedive along Gabriella's pristine coral garden and the famous Dahab Canyon. Start at the coral garden (5-18m), drift with the gentle current through the Canyon's dramatic fissure (15-30m), exit at the Blue Hole saddle.",
    duration: "Half Day (8:30 - 12:30)",
    priceEur: 55,
    image: { url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80", alt: "Dahab Canyon entrance with light beams" },
    includes: [
      "Professional guide & safety diver",
      "One-way drift - boat pickup at Blue Hole",
      "Marine park fees included",
      "Light Bedouin snacks & fresh spring water",
      "Video highlights of your drift"
    ],
    highlights: [
      "Canyon's dramatic vertical fissure with light beams",
      "Gabriella's pristine hard coral garden",
      "Effortless drift with gentle north current",
      "Perfect for photography & video",
      "Suitable for Level 1+ certified divers"
    ]
  },
  {
    id: "night-freediving",
    title: "Night Freediving Experience",
    description: "Experience the Red Sea's nocturnal transformation. Bioluminescent plankton trails, hunting lionfish, sleeping parrotfish in protective mucus cocoons, and the eerie meditative beauty of the reef at night. Limited to 4 divers per guide.",
    duration: "Evening (19:30 - 21:30)",
    priceEur: 65,
    image: { url: "/images/cards/activities/night-dive.webp", alt: "Freedive Dahab night dive poster with a sea turtle" },
    includes: [
      "Powerful underwater dive torches (primary + backup)",
      "Professional night diving instructor guide",
      "Warm post-dive spiced Bedouin tea & dates on sea terrace",
      "Briefing on night tactile communication",
      "Underwater photos with bioluminescent sparkle"
    ],
    highlights: [
      "Bioluminescent plankton light shows on every fin stroke",
      "Active night predators: lionfish, octopus, cuttlefish",
      "Parrotfish in cocoon membranes",
      "Zero other divers - private reef stillness",
      "Unique low-light photography opportunities"
    ]
  },
  {
    id: "desert-sunset",
    title: "Sinai Desert Sunset & Stargazing",
    description: "4x4 mountain expedition into the Sinai canyons for an authentic Bedouin evening. Sunset over golden granite peaks, camel ride, stargazing under zero light pollution with astronomer guide, and underground slow-roasted Zarb dinner.",
    duration: "Evening (15:00 - 22:00)",
    priceEur: 75,
    image: { url: "/images/cards/activities/desert-bbq.webp", alt: "Freedive Dahab BBQ night in the Sinai desert poster" },
    includes: [
      "4x4 Land Cruiser transport from Dahab",
      "Camel ride at sunset over dunes",
      "Astronomer guide with green laser & telescope",
      "Authentic Bedouin feast (slow-cooked zarb, salads, fresh bread)",
      "Sinai sage tea & shisha lounge under the Milky Way",
      "Return to Dahab center by 22:00"
    ],
    highlights: [
      "Dramatic Sinai mountain landscapes",
      "Zero light pollution - pristine Milky Way galaxy view",
      "Authentic Bedouin hospitality & culture",
      "Perfect rest day activity for freedivers",
      "Great for non-diving companions"
    ]
  },
  {
    id: "ice-bath",
    title: "Ice Bath",
    description: "Cool off, calm your mind and end your day refreshed. A guided cold-water session where you practice slow breathing and relaxation, the same skills you use in a breath-hold.",
    duration: "60 minutes · Wednesdays at 3:00 PM",
    priceEur: 200 / 52,
    priceEgp: 200,
    image: { url: "/images/cards/activities/ice-bath.webp", alt: "Freedive Dahab rooftop ice bath session poster" },
    includes: [
      "Instructor guidance",
      "The School Rooftop",
      "Every Wednesday at 3:00 PM",
    ],
    highlights: [
      "Guided by a Freedive Dahab instructor",
      "Coaching on breathing, entry and timing",
      "Build up gradually at your own pace",
      "Get out whenever you want",
      "A great way to finish a training day",
    ],
    bookingNotes: [
      "This session is not suitable for everyone. If you have a heart condition, high blood pressure or any other medical condition, tell us before booking and ask your doctor first.",
    ],
  }
];
