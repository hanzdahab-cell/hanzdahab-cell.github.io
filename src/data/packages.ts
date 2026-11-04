import { Package } from '../types';

export const packagesData: Package[] = [
  {
    id: "pkg-combo-week",
    slug: "ultimate-dahab-combo-week",
    title: "Freediving Combo Week",
    subtitle: "Learn and train in the same week, with accommodation available.",
    duration: "7–9 days, depending on the program",
    description: "A 7 to 9 day package that combines an SSI course with coached training, with or without accommodation. We organize optional group activities such as a trip to Ras Mohamed, a night freedive, and a BBQ dinner in the desert. Check the calendar for available dates; if none suit you, ask us to arrange your dates for a small extra cost.",
    priceEur: 450,
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
    programs: [
      {
        title: "Beginner Week",
        duration: "7 days · 10-meter course",
        overview: "Three course days followed by coached training. A Blue Hole training day is included when at least three participants join.",
        prices: [
          { label: "Diving only", priceEur: 450 },
          { label: "With 8 nights — low season", priceEur: 595 },
          { label: "With 8 nights — high season", priceEur: 635 },
        ],
        schedule: [
          "Days 1–2: SSI Freediving course — full days",
          "Day 3: SSI Freediving course — morning",
          "Day 4: Training — morning",
          "Day 5: Training or Ras Mohamed trip — full day",
          "Day 6: Training — half day",
          "Day 7: Blue Hole training when at least three participants join",
        ],
      },
      {
        title: "Advanced Week",
        duration: "7 days · 20-meter course",
        overview: "Begin with coached training, then complete the Advanced course. Blue Hole training is included when at least three participants join.",
        prices: [
          { label: "Diving only", priceEur: 490 },
          { label: "With 8 nights — low season", priceEur: 635 },
          { label: "With 8 nights — high season", priceEur: 675 },
        ],
        schedule: [
          "Day 1: Training — full day",
          "Day 2: Training — morning",
          "Day 3: Training or Ras Mohamed trip — full day",
          "Day 4: SSI Advanced Freediving course — half day",
          "Days 5–6: SSI Advanced Freediving course — full days",
          "Day 7: SSI Advanced Freediving course — half day, plus Blue Hole training when at least three participants join",
        ],
      },
      {
        title: "Beginner + Advanced Combo",
        duration: "9 days",
        overview: "The Beginner Week schedule for Days 1–5, followed by the Advanced Week schedule from Day 6 to Day 9.",
        prices: [
          { label: "Diving only", priceEur: 690 },
          { label: "With 10 nights — low season", priceEur: 870 },
          { label: "With 10 nights — high season", priceEur: 920 },
        ],
        schedule: [
          "Days 1–2: SSI Freediving course — full days",
          "Day 3: SSI Freediving course — morning",
          "Day 4: Training — morning",
          "Day 5: Training or Ras Mohamed trip — full day",
          "Day 6: SSI Advanced Freediving course — half day",
          "Days 7–8: SSI Advanced Freediving course — full days",
          "Day 9: SSI Advanced Freediving course and Blue Hole training when at least three participants join",
        ],
      },
    ],
    extraActivities: [
      { title: "Ras Mohamed trip", priceEur: 43 },
      { title: "Additional training session", priceEur: 18 },
      { title: "Night freedive (underwater flashlight included)", priceEur: 38 },
      { title: "Monofin course (group rate)", priceEur: 60 },
      { title: "Desert BBQ", priceEur: 20 },
    ],
    bookingNotes: [
      "Discounted weekly schedules are fixed and sessions cannot be moved to later dates.",
      "Low season is December 1 to March 31. High season is April 1 to November 30.",
      "The discounted schedules are fixed; sessions cannot be moved.",
      "With fewer than three participants, training takes place at Lighthouse. Blue Hole training can be arranged for an extra charge covering training and park entrance.",
      "Accommodation check-in is the day before training starts and check-out is the day after it ends. Ask in advance about extra nights.",
    ],
  },
  {
    id: "pkg-training-week",
    slug: "depth-training-week",
    title: "Freediving Training Week",
    subtitle: "Seven days of coached training with ten freediving sessions",
    duration: "7 days; accommodation option includes 8 nights",
    description: "For certified freedivers who want to refine their skills. Across ten coached freediving sessions over seven days, an instructor gives practical feedback to help you work on your goals.",
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
    programs: [
      {
        title: "Training Week",
        duration: "7 days",
        overview: "A progressive week of coached sessions, with a mix of full and half training days. A Blue Hole day is included in the brochure schedule when the group has at least three participants.",
        prices: [
          { label: "Diving only", priceEur: 300 },
          { label: "Diving + 8 nights — low season", priceEur: 445 },
          { label: "Diving + 8 nights — high season", priceEur: 485 },
        ],
        schedule: [
          "Day 1: Training — full day",
          "Day 2: Training — morning",
          "Day 3: Training or Ras Mohamed trip — full day",
          "Day 4: Training — morning",
          "Day 5: Training at the Blue Hole — full day, with at least three participants",
          "Day 6: Training — morning",
          "Day 7: Training — morning",
        ],
      },
    ],
    extraActivities: [
      { title: "Ras Mohamed trip", priceEur: 43 },
      { title: "Night freedive (underwater flashlight included)", priceEur: 38 },
      { title: "Monofin course (group rate)", priceEur: 60 },
      { title: "Desert BBQ", priceEur: 20 },
      { title: "Additional training session", priceEur: 18 },
    ],
    bookingNotes: [
      "With fewer than three participants, all training takes place at Lighthouse. A Blue Hole visit can be arranged for an extra charge covering training and park entrance.",
      "The discounted schedule is fixed and sessions cannot be moved.",
      "Accommodation check-in is the day before training starts and check-out is the day after it ends. Ask in advance about extra nights.",
    ],
  },
  {
    id: "pkg-master-program",
    slug: "master-freediver-immersion",
    title: "Freediving Master Program",
    subtitle: "Train every day and become a stronger diver, buddy, and coach.",
    duration: "2 to 5 weeks",
    description: "Enjoy up to four weeks of daily training. A master instructor trains with you at least three times a week, checks your progress, and sets guidelines for your next steps. Join other freedivers, learn to prepare different setups, and, if you are preparing for the Instructor Course, assist instructors while they teach. This is a training program, not a course: there are no teaching materials, certification, or fixed schedule. You and your instructor plan each day together.",
    priceEur: 335,
    saveAmountEur: 0,
    badge: "COACHED TRAINING",
    image: {
      url: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=1200&q=80",
      alt: "Master freediver at Blue Hole arch 56m"
    },
    includedList: [
      "Daily training with a master instructor at least three times a week",
      "Progress checks and guidelines tailored to your goals",
      "Practice preparing different training setups",
      "Opportunity to assist instructors while they teach when preparing for the Instructor Course",
      "Optional equipment rental: €100 for 2 weeks, €130 for 3 weeks, or €150 for 4 weeks",
    ],
    bookingNotes: [
      "You need to be an SSI Advanced Freediver or AIDA 3-star diver and have your own complete equipment. Equipment rental is available at the listed rates.",
      "This is a training program, not a certification course. It has no teaching materials, certification, or fixed schedule.",
      "Masters staying for a full month receive 10% off Variable Weight, Monofin, and No Fins courses when at least two people join.",
    ],
    programs: [
      {
        title: "Basic Master",
        duration: "2 to 4 weeks",
        overview: "Join scheduled group training and receive regular coaching and progression guidance from a master instructor.",
        prices: [
          { label: "2 weeks · 6 coaching sessions", priceEur: 335 },
          { label: "3 weeks · 9 coaching sessions", priceEur: 470 },
          { label: "4 weeks · 12 coaching sessions", priceEur: 595 },
        ],
        schedule: [],
      },
      {
        title: "Master + Performance Course (30 meters)",
        duration: "3 to 5 weeks",
        overview: "Combine the Master Program with the SSI Performance Freediving Course (30 meters). The schedule is planned with your instructor around readiness and available course dates.",
        prices: [
          { label: "3 weeks · 6 coaching sessions + Performance Course", priceEur: 745 },
          { label: "4 weeks · 9 coaching sessions + Performance Course", priceEur: 835 },
          { label: "5 weeks · 12 coaching sessions + Performance Course", priceEur: 925 },
        ],
        schedule: [],
      },
    ],
  },
  {
    id: "pkg-instructor-path",
    slug: "instructor-pathway",
    title: "Zero-to-Hero Instructor Pathway",
    subtitle: "Change your life. Become a professional freediving instructor, starting from zero.",
    duration: "Minimum 3 months; may extend to 6 months",
    description: "This program takes you from complete beginner to certified SSI instructor in a minimum of three months. Plan on three to six months; the flexible schedule adapts to your progress. After your Instructor Course, you can stay and keep training with us for free.",
    priceEur: 2945,
    saveAmountEur: 365,
    badge: "CAREER LAUNCH",
    image: {
      url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
      alt: "Instructor candidates at Dahab dive terrace"
    },
    includedList: [
      "SSI Freediving Course (10 meters), SSI Advanced Freediving Course (20 meters), and SSI Performance Freediving Course (30 meters)",
      "Freediving Master Program and Training Techniques specialty",
      "SSI Instructor Course and Instructor Kit",
      "Qualification as a Training Techniques and Free Immersion Specialty Instructor",
      "Supervised teaching practice and continued depth and pool training",
    ],
    bookingNotes: [
      "The package is €2,945 instead of €3,310 when booked separately.",
      "A valid First Aid and Oxygen Provider certification is required for the Instructor Course and is not included. Complete it at our center for €130 with manual and certification, or €70 for Oxygen Provider if you already hold First Aid.",
      "The instructor course is scheduled when you and your Instructor Trainer agree that you are ready.",
    ],
    programs: [
      {
        title: "Instructor pathway timeline",
        duration: "Minimum 3 months; may extend to 6 months",
        overview: "A flexible progression from beginner courses through depth training and supervised teaching practice to the Instructor Course. Plan on three to six months.",
        prices: [],
        schedule: [
          "Month 1: Take the 10- and 20-meter courses in the first one to two weeks, then start the Master Program.",
          "Month 2: Take the 30-meter Performance course when ready; continue the Master Program, focus on depth and pool disciplines, and complete Training Techniques.",
          "Month 3: Assist with 10- and 20-meter courses under supervision while continuing your own training.",
          "Months 3–6: Join the next scheduled Instructor Course when you and your Instructor Trainer agree you are ready, then teach real courses.",
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
