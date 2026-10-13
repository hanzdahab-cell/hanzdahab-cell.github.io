import { Package } from '../types';

export const packagesData: Package[] = [
  {
    id: "pkg-combo-week",
    slug: "ultimate-dahab-combo-week",
    title: "Freediving Combo Week",
    subtitle: "Beginner, advanced, or combined freediving courses and coached training",
    duration: "7–9 days, depending on the program",
    description: "Build your week around your current experience: choose a beginner course, an advanced course, or combine both with coached training. Each option follows a set day-by-day plan led by a Freedive Dahab instructor. Optional social activities, including a desert dinner and night freedive, can make the week a shared group experience.",
    priceEur: 690,
    saveAmountEur: 0,
    badge: "BEST VALUE",
    image: {
      url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
      alt: "Freediver at Lighthouse Bay with Sea Lodge in background"
    },
    includedList: [
      "Freediving instructor and training coach",
      "Buoys, ropes and weights",
      "Freediving equipment needed for training",
      "Digital student manual and SSI certification for course programs",
      "Optional accommodation and social activities",
    ],
    rateNote: "These are the rates in the supplied brochure, whose footer is dated 2017. Contact us to confirm current prices, season dates and availability.",
    programs: [
      {
        title: "Beginner Week",
        duration: "7 days",
        overview: "A structured introduction for new freedivers. The first three days are devoted to the Beginner Freediver course; the remaining days add coached practice so students can apply their skills in the water.",
        prices: [
          { label: "Diving only", priceEur: 450 },
          { label: "With 8 nights — low season", priceEur: 594 },
          { label: "With 8 nights — high season", priceEur: 634 },
        ],
        schedule: [
          "Day 1: Beginner Freediver course — full day",
          "Day 2: Beginner Freediver course — full day",
          "Day 3: Beginner Freediver course — half day (morning)",
          "Day 4: Training — half day (morning)",
          "Day 5: Training or Ras Mohamed trip — full day",
          "Day 6: Training — half day",
          "Day 7: Training — full day at the Blue Hole when at least three participants join",
        ],
      },
      {
        title: "Advanced Week",
        duration: "7 days",
        overview: "A blended week for progressing freedivers: coached practice comes first, followed by the Advanced Freediver course. The published final day includes an advanced course session and a training session.",
        prices: [
          { label: "Diving only", priceEur: 490 },
          { label: "With 8 nights — low season", priceEur: 634 },
          { label: "With 8 nights — high season", priceEur: 674 },
        ],
        schedule: [
          "Day 1: Training — full day",
          "Day 2: Training — half day (morning)",
          "Day 3: Training or Ras Mohamed trip — full day",
          "Day 4: Advanced Freediver course — half day",
          "Day 5: Advanced Freediver course — full day",
          "Day 6: Advanced Freediver course — full day",
          "Day 7: Advanced Freediver course — half day, plus training at the Blue Hole when at least three participants join",
        ],
      },
      {
        title: "Beginner + Advanced Combo",
        duration: "7 days in the price table; the brochure schedule runs 9 days",
        overview: "A longer progression that combines the beginner course, guided practice, and the advanced course. The supplied brochure's price table and day-by-day itinerary do not agree on the total duration, so confirm the final schedule before arranging travel.",
        prices: [
          { label: "Diving only", priceEur: 690 },
          { label: "With 10 nights — low season", priceEur: 870 },
          { label: "With 10 nights — high season", priceEur: 920 },
        ],
        schedule: [
          "Day 1: Beginner Freediver course — full day",
          "Day 2: Beginner Freediver course — full day",
          "Day 3: Beginner Freediver course — half day (morning)",
          "Day 4: Training — half day (morning)",
          "Day 5: Training or Ras Mohamed trip — full day",
          "Day 6: Advanced Freediver course — half day",
          "Day 7: Advanced Freediver course — full day",
          "Day 8: Advanced Freediver course — full day",
          "Day 9: Advanced Freediver course and training at the Blue Hole when at least three participants join",
        ],
      },
    ],
    extraActivities: [
      { title: "Ras Mohamed trip", priceEur: 43 },
      { title: "Additional training session", priceEur: 18 },
      { title: "Night freedive (underwater flashlight included)", priceEur: 38 },
      { title: "Monofin course (brochure group rate)", priceEur: 60 },
      { title: "Desert BBQ", priceEur: 20 },
    ],
    bookingNotes: [
      "Discounted weekly schedules are fixed and sessions cannot be moved to later dates.",
      "The combined option’s brochure lists a 7-day duration in its price table but provides a 9-day schedule; confirm the actual dates before booking.",
      "The Blue Hole training day is included only when at least three participants join; otherwise ask about transport, park entry and training costs.",
      "For an accommodation booking, the brochure recommends check-in the day before training and check-out the day after. Extra nights can be arranged in advance.",
    ],
  },
  {
    id: "pkg-training-week",
    slug: "depth-training-week",
    title: "Freediving Training Week",
    subtitle: "Seven days of coached training with ten freediving sessions",
    duration: "7 days; accommodation option includes 8 nights",
    description: "For freedivers who have completed a course or already have experience and want focused time to refine their technique. Across ten sessions in seven days, an instructor coaches your training and gives practical feedback to help you work on your individual goals.",
    priceEur: 300,
    saveAmountEur: 0,
    badge: "POPULAR",
    image: {
      url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80",
      alt: "Training lines at Blue Hole with freedivers descending"
    },
    includedList: [
      "Ten freediving training sessions over seven days",
      "Buoys, ropes and weights",
      "One of our instructors as training coach",
      "Freediving equipment at no extra charge when needed",
      "Blue Hole training day when at least three participants join",
    ],
    rateNote: "These are the rates in the supplied brochure, whose footer is dated 2017. Contact us to confirm current prices, season dates and availability.",
    programs: [
      {
        title: "Training Week",
        duration: "7 days",
        overview: "A progressive week of coached sessions, with a mix of full and half training days. A Blue Hole day is included in the brochure schedule when the group has at least three participants.",
        prices: [
          { label: "Diving only", priceEur: 300 },
          { label: "Diving + 8 nights — low season", priceEur: 444 },
          { label: "Diving + 8 nights — high season", priceEur: 484 },
        ],
        schedule: [
          "Day 1: Training — full day",
          "Day 2: Training — half day (morning)",
          "Day 3: Training or Ras Mohamed trip — full day",
          "Day 4: Training — half day (morning)",
          "Day 5: Training — full day at the Blue Hole when at least three participants join",
          "Day 6: Training — half day (morning)",
          "Day 7: Training — half day (morning)",
        ],
      },
    ],
    extraActivities: [
      { title: "Ras Mohamed trip", priceEur: 43 },
      { title: "Night freedive (underwater flashlight included)", priceEur: 38 },
      { title: "Monofin course (brochure group rate)", priceEur: 60 },
      { title: "Desert BBQ", priceEur: 20 },
      { title: "Additional training session", priceEur: 18 },
    ],
    bookingNotes: [
      "The published schedule is fixed. The brochure says dates can be arranged on request for a small additional cost.",
      "When fewer than three participants join, training takes place at Lighthouse. Ask us about any Blue Hole session, park entry and transport charges.",
      "For accommodation, the brochure recommends check-in the day before training and check-out the day after; request extra nights in advance.",
    ],
  },
  {
    id: "pkg-master-program",
    slug: "master-freediver-immersion",
    title: "1-Month Master Freediver Immersion",
    subtitle: "Elite Residency: Level 3 + Mouthfill + VWT + 20+ Coached Sessions",
    duration: "30 Days / 29 Nights",
    priceEur: 1480,
    saveAmountEur: 420,
    badge: "ELITE RESIDENCY",
    image: {
      url: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=1200&q=80",
      alt: "Master freediver at Blue Hole arch 56m"
    },
    includedList: [
      "SSI Performance Freediver Level 3 Certification",
      "Mouthfill Equalisation Masterclass (2 days)",
      "Variable Weight Sled Training (2 days)",
      "20+ coached depth sessions (Lighthouse & Blue Hole)",
      "29 nights Sea Lodge private room (full board)",
      "Thoracic mobility & breathing workshops (3x/week)",
      "Dual counterweight system access at Blue Hole",
      "Unlimited training line access during stay",
      "Airport transfers & marine park fees",
      "Weekly video analysis & progression tracking"
    ]
  },
  {
    id: "pkg-instructor-path",
    slug: "instructor-pathway",
    title: "Zero-to-Hero Instructor Pathway",
    subtitle: "Beginner to SSI Instructor: All Levels + ITC + Internship",
    duration: "Minimum 3 months; may extend to 6 months",
    description: "A staged route from beginner-level training toward professional SSI Freediving Instructor preparation. The brochure describes a minimum three-month program, with the exact pace and instructor-course start based on the trainee's development and agreement with the instructor trainer.",
    priceEur: 2945,
    saveAmountEur: 365,
    badge: "CAREER LAUNCH",
    image: {
      url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
      alt: "Instructor candidates at Dahab dive terrace"
    },
    includedList: [
      "SSI Freediver, Advanced Freediver, Performance Freediver and Master courses",
      "Training Techniques specialty",
      "SSI Freediving Instructor Training Course (ITC) and instructor kit",
      "Supervised assistance on real beginner and advanced courses",
      "Continued depth and pool training while preparing for instructor assessments",
      "Training Techniques and Free Immersion specialty instructor qualifications noted in the brochure",
    ],
    rateNote: "The supplied brochure lists €2,945 discounted from €3,310; its footer is dated 2017. Confirm current pricing and entry requirements with the instructor team.",
    bookingNotes: [
      "The brochure recommends at least three months; training may extend to six months depending on readiness and course dates.",
      "A valid First Aid and Oxygen Provider certification is required for the instructor course and is not included.",
      "The brochure lists React Right at €130, or Oxygen Provider alone at €70 for eligible divers. Confirm current prices and certification equivalency before booking.",
      "Level 3 and instructor-course timing depend on the trainee’s readiness and the instructor trainer’s assessment.",
    ],
    programs: [
      {
        title: "Instructor pathway timeline",
        duration: "Minimum 3 months; may extend to 6 months",
        overview: "The pathway moves from foundational certifications into depth and pool development, supervised teaching practice, and preparation for the instructor course. Progression is individual; completing each stage and meeting prerequisites comes before moving on.",
        prices: [],
        schedule: [
          "Month 1: Complete Levels 1 and 2 in the first one or two weeks, then begin the Master course.",
          "Month 2: Continue the Master course and depth/pool development; complete Level 3 when ready and the Training Techniques specialty.",
          "Month 3: Assist with Level 1 and 2 courses under instructor supervision while preparing for instructor-course assessments.",
          "Months 3–6: Join the next scheduled instructor course when both trainee and instructor trainer agree the trainee is ready; supervised teaching may follow.",
        ],
      },
    ],
  },
  {
    id: "pkg-photo-week",
    slug: "underwater-photo-week",
    title: "Underwater Photography Week",
    subtitle: "Freediving + Photography Masterclass with Pro Photographer",
    duration: "7 Days / 6 Nights",
    priceEur: 580,
    saveAmountEur: 120,
    image: {
      url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
      alt: "Underwater photographer capturing freediver in light rays"
    },
    includedList: [
      "Underwater Photography Specialty (2 days)",
      "4 guided photo dives at Lighthouse, Canyon, Coral Garden",
      "Lightroom workflow & blue-water editing masterclass",
      "6 nights Sea Lodge private room (breakfast included)",
      "Camera housing & strobe rental available",
      "Private photo guide & safety diver",
      "Airport transfer & marine park fees"
    ]
  },
  {
    id: "pkg-equalisation-intensive",
    slug: "equalisation-intensive",
    title: "Equalisation Intensive",
    subtitle: "Frenzel & Mouthfill Diagnostics + 4 Depth Coaching Sessions",
    duration: "4 Days / 3 Nights",
    priceEur: 380,
    saveAmountEur: 60,
    image: {
      url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80",
      alt: "Coach and student practicing equalisation drills on land"
    },
    includedList: [
      "Equalisation Masterclass: Online or In-Person (2 days)",
      "Otovent pressure diagnostics & personalized drills",
      "4 coached depth sessions with real-time feedback",
      "3 nights Sea Lodge shared room (breakfast included)",
      "Mouthfill charge technique & reverse packing",
      "30-day WhatsApp follow-up support",
      "Airport transfer & Blue Hole access"
    ]
  }
];
