import { Course, SpecialtyCourse, InstructorCourse, EqualisationClass } from '../types';

export const ssiCourses: Course[] = [
  {
    id: "ssi-basic-freediver",
    slug: "ssi-basic-freediver",
    title: "SSI Basic Freediver",
    subtitle: "Your very first breath-hold experience — one gentle day",
    level: "Beginner",
    tier: 1,
    certification: "SSI Basic Freediver",
    durationDays: 1,
    priceEur: 150,
    maxDepthMeters: 5,
    prerequisites: "Swimming ability (100m), minimum age 10, signed medical questionnaire.",
    overview: "The perfect taste of freediving with zero pressure and full safety. In one relaxed day you will learn the fundamental breathing cycle, duck-dive mechanics, mask equalisation, and static apnea in the pool before trying your first calm dives in the shallow Lighthouse Bay.",
    highlights: [
      "One-day introduction — no certification prerequisites",
      "Pool static apnea and relaxation foundations",
      "First duck dives in the sheltered Lighthouse Bay",
      "Full equipment provided and SSI digital materials"
    ],
    included: [
      "All freediving equipment (wetsuit, mask, snorkel, bi-fins, weights)",
      "SSI Basic Freediver digital recognition card",
      "Breathing and relaxation mini-workshop",
      "Underwater photos of your first dives"
    ],
    scheduleSummary: "1 Day: Morning theory & breathing, pool session, afternoon shallow bay dives and debrief.",
    image: {
      url: "/courses/basic-freediver.jpg",
      alt: "SSI Basic Freediver course — freediver ascending with open hand toward the surface light"
    }
  },
  {
    id: "ssi-level-1",
    slug: "ssi-freediver-level-1",
    title: "SSI Freediver",
    subtitle: "Your first breath-hold, your first dive, and your first step into the Red Sea.",
    level: "Beginner",
    tier: 1,
    certification: "SSI Freediver International License",
    durationDays: 2.5,
    priceEur: 310,
    maxDepthMeters: 10,
    prerequisites: "Comfortable swimming 200m non-stop, minimum age 12, standard medical clearance.",
    overview: "Humans are mammals, and our bodies have a built-in diving reflex. In this course you learn how to trigger it: your heart rate slows, your body relaxes deeply, and your oxygen is used more efficiently. Holding your breath becomes far easier than you expect, and most students are surprised by their very first results.\n\nIn Dahab you do not need a boat. Water 40 to 50 meters deep is only 100 meters from our center, and the bay where we teach is calm and sheltered. By the end of the course you will dive comfortably to 10 meters. All you need for your next freediving holiday is a mask, a snorkel, and a pair of fins.",
    highlights: [
      "One breathing and relaxation session",
      "One static session on comfortable breath-hold technique",
      "Two dynamic sessions in the pool or calm, shallow water",
      "Three open-water line sessions, progressing at your own pace",
      "SSI digital manual in all languages, international digital certification, and all equipment"
    ],
    included: [
      "SSI digital manual in all languages",
      "Digital SSI international certification",
      "All freediving equipment"
    ],
    scheduleSummary: "2.5 days, 9:00 to 16:00. Day 3 ends around noon after the final exam and wrap-up.",
    futurePerformances: {
      staticApnea: "2–3 min",
      depth: "10–20 m"
    },
    disciplines: [
      {
        name: "Breathing & Relaxation",
        tagline: "Understand your response",
        description: "Learn the breathing cycle, relaxation, and how to trigger your body's diving reflex.",
        sessions: "1 session"
      },
      {
        name: "Static Training",
        tagline: "Build a comfortable breath-hold",
        description: "Learn the techniques behind a relaxed breath-hold with close instructor and buddy supervision.",
        sessions: "1 session"
      },
      {
        name: "Dynamic Training",
        tagline: "Move with less effort",
        description: "Practice finning, body position, and basic safety skills in a pool or calm, shallow water.",
        sessions: "2 sessions"
      },
      {
        name: "Open-Water Training",
        tagline: "Follow a guided line",
        description: "Practice on a line with a surface buoy, going a little deeper with every dive.",
        sessions: "3 sessions"
      }
    ],
    schedule: [
      {
        day: "Day 1",
        title: "Breathing & First Water",
        description: "Breathing and relaxation class, dry breath-hold, first confined-water session, lunch, theory, and your first open-water session."
      },
      {
        day: "Day 2",
        title: "Duck Dives & Deeper",
        description: "Theory, a confined-water session to learn the duck dive, lunch, and the second open-water session."
      },
      {
        day: "Day 3",
        title: "Final Exam & Wrap-up",
        description: "Morning training session, followed by the final exam and wrap-up around 12:00."
      }
    ],
    image: {
      url: "/courses/freediving-level-1.jpg",
      alt: "SSI Freediver Level 1 — freediver gliding weightlessly over a vivid Red Sea coral reef"
    }
  },
  {
    id: "ssi-level-2",
    slug: "ssi-advanced-freediver-level-2",
    title: "SSI Advanced Freediver",
    subtitle: "Learn to freefall, equalize efficiently, and dive to 20 meters.",
    level: "Intermediate",
    tier: 2,
    certification: "SSI Advanced Freediver",
    durationDays: 3,
    priceEur: 360,
    maxDepthMeters: 20,
    prerequisites: "SSI Level 1 or equivalent certification (AIDA 2 / PADI Freediver), comfortable at 16-20m.",
    overview: "After your first course and a few training sessions, 10 meters should feel comfortable. As you go deeper, at around 15 to 20 meters, your body loses its buoyancy and you stop swimming and start falling. This is freefall. Divers often describe it as flying underwater, and it is the main skill of this course. It saves oxygen and makes the descent almost effortless.\n\nYou always practice a new skill in controlled shallow water first, then take it to the ocean. With the right technique, 20 meters is not much harder than 10 meters.",
    highlights: [
      "Practice freefall by using extra weight to enter it at a shallower depth",
      "Learn Frenzel equalization with dry and in-water drills",
      "Stretch the rib cage, lungs, and diaphragm for a more comfortable breath-hold",
      "Train static apnea, dynamic apnea, weighting, streamlining, and safety skills",
      "SSI digital manual in all languages, international digital certification, and all equipment"
    ],
    included: [
      "SSI Standard Digital Manual (all languages)",
      "Digital SSI International Certification",
      "All depth equipment + long fins trial",
      "Training at Lighthouse Bay and the iconic Blue Hole"
    ],
    scheduleSummary: "3 days, 9:00 to 16:00, with theory, pool sessions, open-water training, an exam, and debrief.",
    futurePerformances: {
      staticApnea: "3–4 min",
      depth: "25–30 m"
    },
    disciplines: [
      {
        name: "Freefall",
        tagline: "Feel the transition",
        description: "Use extra weight to enter freefall at a shallower depth, then apply the skill to deeper dives.",
        sessions: "Open-water sessions"
      },
      {
        name: "Frenzel Equalisation",
        tagline: "Equalize with less effort",
        description: "Use your tongue as a piston to equalize with less effort and avoid ear pain.",
        sessions: "Dry and in-water drills"
      },
      {
        name: "Static & CO2 Tables",
        tagline: "Train your body and mind",
        description: "Understand CO₂ and contractions, and how to train your body and mind to cope with them.",
        sessions: "Static session"
      },
      {
        name: "Dynamic & Weighting",
        tagline: "Move efficiently",
        description: "Practice weighting, streamlining, speed, warm-up routines, and safety skills.",
        sessions: "Dynamic sessions"
      }
    ],
    schedule: [
      {
        day: "Day 1",
        title: "Breathing & Freefall",
        description: "Breathing and breathe-up techniques, training theory, static session, and the first open-water session on buoyancy and freefall."
      },
      {
        day: "Day 2",
        title: "Dynamic & Frenzel",
        description: "Theory, dynamic CO₂ tables in confined water, and the second open-water session for freefall and Frenzel equalization."
      },
      {
        day: "Day 3",
        title: "Open-Water Sessions & Exam",
        description: "Two open-water sessions, the exam, a debrief, and celebration photos."
      }
    ],
    image: {
      url: "/courses/advanced-freediver-level-2.jpg",
      alt: "SSI Advanced Freediver — diver finning over shallow reef rocks in turquoise water"
    }
  },
  {
    id: "ssi-level-3",
    slug: "ssi-performance-freediver-level-3",
    title: "SSI Performance Freediver",
    subtitle: "Go deeper with more comfort and a safe equalization technique.",
    level: "Advanced",
    tier: 2,
    certification: "SSI Performance Freediver (Master Diver prerequisite)",
    durationDays: 4,
    priceEur: 480,
    maxDepthMeters: 30,
    prerequisites: "SSI Advanced Freediver or equivalent, 30m logged depth, React Right (or valid First Aid/CPR).",
    overview: "At depths around 30 meters, your lungs approach their residual volume and the air you have left for equalization starts to run out. Sooner or later, almost every freediver needs mouthfill equalization. It has a reputation for being difficult, but when it is broken into clear steps and practiced both on land and in the water, it is very learnable.\n\nThe first two days focus on shallow FRC dives with mouthfill, from the surface to around 10 to 20 meters. After that, you move to full-lung dives and extend your depth in the remaining open-water sessions.",
    safetyNote: "FRC diving done incorrectly can increase the risk of barotrauma. Learn and practice it only under the supervision of a trained instructor.",
    highlights: [
      "Learn mouthfill equalization for deep dives",
      "Practice FRC diving under instructor supervision",
      "Develop static coaching and session-planning skills",
      "Explore mental preparation, nutrition, and flexibility",
      "SSI digital manual in all languages, international digital certification, and all equipment"
    ],
    included: [
      "SSI Standard Digital Manual (all languages)",
      "Digital SSI International Certification",
      "All depth line logistics + counterweight system",
      "Mouthfill & FRC dry-training tools",
      "HD video analysis of your deep dives"
    ],
    scheduleSummary: "4 days, 9:00 to 16:00, including shallow FRC and mouthfill sessions followed by full-lung open-water training.",
    futurePerformances: {
      staticApnea: "4–5 min",
      depth: "35–40 m"
    },
    disciplines: [
      {
        name: "Mouthfill Equalisation",
        tagline: "Build the skill in stages",
        description: "Learn mouthfill equalization for deep dives through clear steps, dry practice, and supervised in-water sessions.",
        sessions: "Theory, dry practice, and open water"
      },
      {
        name: "FRC Diving",
        tagline: "Adapt gradually to pressure",
        description: "Practice shallow FRC dives with mouthfill from the surface to around 10 to 20 meters under trained instructor supervision.",
        sessions: "First 2 days"
      },
      {
        name: "Static Coaching",
        tagline: "Coach your training buddy",
        description: "Learn static coaching skills and how to support your buddy safely.",
        sessions: "Static session"
      },
      {
        name: "Session Planning",
        tagline: "Plan a dynamic session",
        description: "Learn to plan and run a dynamic maximum-attempt session with your buddies, including warm-ups, safety dives, and timing.",
        sessions: "Planning session"
      }
    ],
    schedule: [
      {
        day: "Day 1",
        title: "Shallow FRC & Mouthfill",
        description: "Theory and dry mouthfill practice, followed by shallow FRC dives with mouthfill from the surface to around 10–20 meters."
      },
      {
        day: "Day 2",
        title: "FRC Practice",
        description: "Continue supervised FRC training and mouthfill practice in shallow water."
      },
      {
        day: "Day 3",
        title: "Full-Lung Dives",
        description: "Move to full-lung dives and extend your depth through the remaining open-water sessions."
      },
      {
        day: "Day 4",
        title: "Open-Water Training & Exam",
        description: "Complete the remaining open-water sessions, practice session planning with your buddies, and finish with the theory exam and wrap-up."
      }
    ],
    image: {
      url: "/courses/performance-freediver-level-3.jpg",
      alt: "SSI Performance Freediver — monofin diver gliding through a shimmering bait ball in the deep blue"
    }
  }
];

export const specialtyCourses: SpecialtyCourse[] = [
  {
    id: "spec-advanced-pool",
    slug: "advanced-pool-freediver",
    title: "SSI Advanced Pool Freediver",
    shortDesc: "Refine dynamic apnea in the pool: longer DYN, cleaner turns, and efficient DNF technique.",
    durationDays: 2,
    priceEur: 190,
    prerequisites: "SSI Basic Freediver or Level 1 (or equivalent pool experience).",
    keySkills: [
      "Dynamic apnea (DYN) biomechanics over 50m+",
      "Streamlined push-offs and wall turn technique",
      "No-fins dynamics (DNF) coordination",
      "CO2 tolerance and recovery breathing drills"
    ],
    fullDesc: "The pool is the laboratory of freediving. Over two focused sessions in our Olympic pool you will extend your dynamic distance with cleaner hydrodynamics, master the energy-saving wall turn, and develop graceful no-fins dynamics — all under strict buddy-supervision protocols.",
    image: {
      url: "/courses/advanced-pool-freediver.jpg",
      alt: "SSI Advanced Pool Freediver — diver gliding weightlessly through sunlit pool water"
    },
    featured: true
  },
  {
    id: "spec-performance-pool",
    slug: "performance-pool-freediver",
    title: "SSI Performance Pool Freediver",
    shortDesc: "Competition-grade static and dynamic performance training with video analysis.",
    durationDays: 2,
    priceEur: 210,
    prerequisites: "Advanced Pool Freediver or SSI Level 1 with solid pool comfort.",
    keySkills: [
      "Static apnea (STA) progression toward 3:00+",
      "Monofin sprint and long-glide dynamics",
      "Warm-up and peak-performance table architecture",
      "Official-top protocol and white-card discipline"
    ],
    fullDesc: "Built for divers chasing numbers. Personalized performance tables, official-protocol rehearsals, and frame-by-frame video analysis push your static and dynamic limits safely — the exact methodology our athletes use before national competitions.",
    image: {
      url: "/courses/performance-pool-freediver.jpg",
      alt: "SSI Performance Pool Freediver — swimmer streamlined along the lane rope in crystal pool"
    }
  },
  {
    id: "spec-photo",
    slug: "underwater-photography",
    title: "Underwater Photography for Freedivers",
    shortDesc: "Master natural light, breath-hold stability, diver positioning, and camera settings in Dahab's legendary water clarity.",
    durationDays: 2,
    priceEur: 220,
    prerequisites: "SSI Level 1 or equivalent freediving certification.",
    keySkills: [
      "Buoyancy and zero-movement breath-hold framing",
      "Utilizing Dahab's caustic light rays and water refraction",
      "Directing your dive buddy/model underwater",
      "Lightroom color correction for blue-spectrum water"
    ],
    fullDesc: "Freediving photography is an art of supreme relaxation. Learn how to hover motionlessly beside the reef or beneath descending divers, capturing breathtaking natural light rays without bubbles scaring marine life.",
    image: {
      url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
      alt: "Underwater photographer framing sunlight beams through deep clear water"
    },
    featured: true
  },
  {
    id: "spec-monofin",
    slug: "monofin-technique",
    title: "SSI Monofin Course",
    shortDesc: "Transform into pure aquatic propulsion with the fluid dolphin wave originating from your core.",
    durationDays: 2,
    priceEur: 125,
    priceNote: "Pool course: €125 for one student or €110 per student for two or more. Full course with two open-water sessions: €205 for one student or €190 per student for two or more.",
    prerequisites: "SSI Level 1 or equivalent.",
    keySkills: ["Body movement and basic drills", "Efficient monofin technique", "Monofin selection", "Flexibility for monofin swimming"],
    fullDesc: "A monofin makes you faster, more efficient, and more graceful when you know how to use it. Begin with small fins to learn the body movement, then progress to a monofin. The course includes two pool sessions, one theory session on choosing a monofin, and one stretching session for flexibility.\n\nThe pool course includes training fins and monofins, a digital manual, digital SSI Monofin Pool certification, pool fees, and transport. The full two-day course adds two open-water sessions and full Monofin certification.",
    image: {
      url: "/courses/monofin.jpg",
      alt: "SSI Monofin — freediver dolphin-kicking over a school of fish"
    }
  },
  {
    id: "spec-mouthfill",
    slug: "mouthfill-mastery",
    title: "Mouthfill Course",
    shortDesc: "Develop deep equalization through theory, dry practice, and supervised open-water sessions.",
    durationDays: 1,
    priceEur: 120,
    prerequisites: "You can already dive comfortably to 30–40 meters.",
    keySkills: ["Mouthfill theory", "Dry practice", "Mouthfill with exhale and inhale diving", "Gradual, instructor-guided progression"],
    fullDesc: "For divers who are ready for depth but are missing deep equalization. The one-day course includes one theory session, one dry-practice session, and one open-water session that combines mouthfill with exhale and inhale diving. Most teaching happens at shallow depth; deeper dives take place only on the last day, if you have mastered the skills. Bring your own equipment, including bi-fins.",
    image: {
      url: "/courses/mouthfill-workshop.jpg",
      alt: "FDD Mouthfill Workshop in open water"
    },
    featured: true
  },
  {
    id: "fdd-equalization-clinic",
    slug: "equalization-clinic",
    title: "Equalization Class (Online)",
    shortDesc: "One-to-one equalization coaching online, tailored to your experience and next goal.",
    durationDays: 1,
    priceEur: 55,
    prerequisites: "Open to beginners, advanced divers, and deep divers looking to improve mouthfill.",
    keySkills: [
      "Beginner Frenzel anatomy and technique",
      "Advanced Frenzel for dives past 30 meters",
      "Mouthfill charge and control",
      "Personal dry exercises and practice plan"
    ],
    fullDesc: "Equalization problems are usually about technique and awareness, not ability. In this 75-minute one-to-one online session, your instructor identifies what is going wrong and gives you dry exercises to practice until the movement becomes automatic.\n\nBeginner classes cover anatomy and the Frenzel maneuver (about one session). Advanced classes develop Frenzel for dives past 30 meters (about two to four sessions). Deep classes teach mouthfill (about two to three sessions if you know the basics, or three to six if you are starting from zero). Book a few weeks before your trip to leave time to practice.\n\nAll classes are taught by Linda Paganelli, co-owner of Freedive Dahab, a competitive freediver since 2005, vice world champion, and holder of several depth records.",
    image: {
      url: "/courses/equalization-clinic.webp",
      alt: "FDD Equalization Clinic with an instructor in clear Red Sea water"
    }
  },
  {
    id: "spec-variable-weight",
    slug: "variable-weight-sled",
    title: "SSI Variable Weight Course",
    shortDesc: "Experience effortless deep descent via weighted sled and fin back to the surface on your own power.",
    durationDays: 2,
    priceEur: 115,
    priceNote: "€115 for one student or €100 per person for two or more. Includes digital SSI certification and transport to the Blue Hole when deeper than 40 meters.",
    prerequisites: "Suitable for freedivers with the prerequisite skills for variable-weight training; confirm your experience with the instructor.",
    keySkills: ["Two open-water sessions", "Theory on planning and safety", "Stretching for pressure", "Building safe setups for yourself and your buddy"],
    fullDesc: "Variable weight is a fun way to dive and a useful tool for learning deep equalization. The descent takes little effort, and the ascent is easier without a weight belt. The course includes two open-water sessions, one theory session on planning and safety, and one stretching session to prepare your body for pressure. You will also learn to build safe setups for yourself and your buddy.",
    image: {
      url: "/courses/variable-weight.jpg",
      alt: "SSI Variable Weight — freediver descending the deep Blue Hole line"
    }
  },
  {
    id: "spec-no-fins",
    slug: "no-fins-cnf",
    title: "SSI No-Fins Freediving Course",
    shortDesc: "The purest, most challenging discipline: descend and ascend purely with your bare hands and breaststroke kick.",
    durationDays: 2,
    priceEur: 125,
    priceNote: "€125 for one student or €100 per person for two or more. Includes digital SSI certification, transport, and pool entry.",
    prerequisites: "SSI Level 1 or equivalent.",
    keySkills: ["Buoyancy", "Underwater breaststroke", "Starts, push-offs, turns, and surfacing", "Stretching for legs, knees, and shoulders"],
    fullDesc: "Diving without fins is the purest form of freediving. With no fins to rely on, you get instant feedback on your streamlining, gliding, and efficiency. The course includes two pool sessions, one theory session, and one stretching session for your legs, knees, and shoulders.",
    image: {
      url: "/courses/no-fins-freediving.jpg",
      alt: "No-Fins Freediving — diver descending gracefully over the reef beneath a manta ray"
    }
  },
  {
    id: "spec-training-techniques",
    slug: "training-techniques",
    title: "SSI Training Techniques Course",
    shortDesc: "Learn to plan and run static and dynamic training tables for breath-hold and conditioning.",
    durationDays: 2,
    priceEur: 160,
    priceNote: "€160 for one student or €135 per person for two or more. Digital SSI certification included. Mandatory for the Instructor Course and included in the Zero to Hero package.",
    prerequisites: "SSI Level 1 or equivalent.",
    keySkills: ["Static and dynamic tables", "Breath-hold progression", "CO₂ and lactic-acid tolerance", "Designing your own training tables"],
    fullDesc: "Learn to plan and run a training session with static and dynamic tables that build breath-hold time and tolerance to CO₂ and lactic acid. You get two confined-water sessions and one theory session on how tables work and how to design your own. It is a useful tool for anyone who trains mostly in a pool.",
    image: {
      url: "/courses/training-techniques.jpg",
      alt: "SSI Training Techniques — freediver practicing breathwork on a Dahab terrace"
    }
  },
  {
    id: "spec-react-right",
    slug: "react-right-first-aid",
    title: "SSI React Right Course",
    shortDesc: "Learn primary assessment, first aid, CPR, stabilization, and emergency oxygen administration.",
    durationDays: 1,
    priceEur: 130,
    prerequisites: "None (Open to all divers and non-divers).",
    keySkills: ["Primary assessment", "First aid and CPR", "Stabilization", "Oxygen administration in emergencies"],
    fullDesc: "SSI’s one-day emergency training program covers primary assessment, first aid and CPR, stabilization, and oxygen administration in emergencies. It is useful for you and your buddy and is mandatory for the Instructor Course. The digital manual and certification are included.",
    image: {
      url: "/courses/react-right.jpg",
      alt: "SSI React Right — emergency first response training"
    }
  },
  {
    id: "spec-free-immersion",
    slug: "free-immersion",
    title: "SSI Free Immersion (FIM)",
    shortDesc: "Dive the line with pure arm-pulls — no fins. The most meditative discipline and the fastest way to perfect equalization.",
    durationDays: 1,
    priceEur: 190,
    prerequisites: "SSI Level 1 (or equivalent) — comfortable with Frenzel equalization.",
    keySkills: [
      "Rope technique & breaststroke pull",
      "Head-down (inverted) Frenzel equalization",
      "Streamlined body position & hip drive",
      "Line safety & bottom-weight protocol"
    ],
    fullDesc: "Free Immersion (FIM) is the discipline of diving along the guide rope using arm strokes only — slow, silent, and elegant. Because the pace is calm and the line is always in your hand, it is the perfect discipline to perfect your equalization and body position. Most freedivers fall in love with depth here first.",
    image: {
      url: "/courses/free-immersion.jpg",
      alt: "SSI Free Immersion — freediver pulling down the line in deep blue water"
    }
  },
  {
    id: "spec-marine-ecology",
    slug: "marine-ecology",
    title: "SSI Marine Ecology Course",
    shortDesc: "Meet the Red Sea's residents — reef fish, corals, and the ecosystem that keeps them alive. A theory specialty for every ocean lover.",
    durationDays: 1,
    priceEur: 150,
    prerequisites: "None — open to everyone, no diving required.",
    keySkills: [
      "Coral reef ecosystems & food webs",
      "Fish identification — Red Sea endemic species",
      "Symbiosis, predators & defense strategies",
      "Conservation & how freedivers protect the reef"
    ],
    fullDesc: "The Red Sea is one of the most biodiverse seas on the planet — over 20% of its fish exist nowhere else on Earth. This SSI Marine Ecology program is classroom-based: no dives required, just curiosity. Learn how coral reefs work, who eats whom, and why Dahab's reefs deserve protection — taught by instructors who spend every day on this exact reef.",
    image: {
      url: "/courses/marine-ecology.jpg",
      alt: "SSI Marine Ecology — Red Sea hawkfish close-up on coral"
    }
  },
  {
    id: "master-freediver",
    slug: "master-freediver",
    title: "SSI Master Freediver",
    shortDesc: "The apex recreational certification — mouthfill, freefall, and deep rescue toward 30–40m, plus a personal training plan.",
    durationDays: 4,
    priceEur: 475,
    prerequisites: "SSI Level 2 (Advanced Freediver) or equivalent, React Right recommended, minimum age 16.",
    keySkills: [
      "Mouthfill equalization beyond residual volume",
      "Controlled freefall & relaxation past 30m",
      "Advanced rescue & blackout management",
      "CO2/O2 tables & personal training-plan design"
    ],
    fullDesc: "The SSI Master Freediver program is where recreational freediving becomes an art: warm-up tables, mouthfill equalization, controlled freefall, and deep rescue. You leave with a personal training plan and the confidence to keep progressing safely on your own — the gateway to the professional academy.",
    image: {
      url: "/courses/master-freediver.jpg",
      alt: "SSI Master Freediver — monofin freediver ascending between canyon walls in the Blue Hole"
    }
  }
];

export const instructorCourses: InstructorCourse[] = [
  {
    id: "ssi-basic-instructor",
    slug: "ssi-basic-freediving-instructor",
    title: "SSI Basic Freediving Instructor",
    durationWeeksOrDays: "6 Days",
    priceEur: 750,
    prerequisites: "SSI Level 2 (or equivalent), React Right within 24 months, minimum age 18, 40+ logged sessions.",
    description: "Your entry into professional freediving education. This program qualifies you to teach the SSI Basic Freediver and pool programs and to assist on open-water courses — the classic first step for gap-year divers, dive-center staff, and ocean enthusiasts turning pro.",
    modules: [
      "SSI teaching system & academic presentations",
      "Pool session leadership and student supervision",
      "Assisting open-water Level 1 courses with real students",
      "Standards, digital SSI ecosystem & professional ethics",
      "Instructor final evaluation"
    ],
    internshipOption: true,
    image: {
      url: "/courses/basic-freediving-instructor.jpg",
      alt: "SSI Basic Freediving Instructor — freediver reaching toward the surface light in deep blue"
    }
  },
  {
    id: "ssi-itc",
    slug: "ssi-freediving-instructor-itc",
    title: "SSI Freediving Instructor Course",
    durationWeeksOrDays: "Minimum 12 days, depending on the number of participants",
    priceEur: 1245,
    priceNote: "Plus €200 for SSI instructor manuals, fees, and certification.",
    prerequisites: "SSI Level 2 or equivalent, First Aid/CPR and O₂ Provider certificate, Training Techniques specialty, minimum age 18, and a medical certificate signed by a doctor.",
    description: "Turn your passion into a profession. Freedive Dahab has trained instructors since 2006. During the Instructor Training Course, you learn the SSI teaching materials, in-water and classroom teaching skills, how to spot and fix common student mistakes, and the legal, marketing, and business side of running courses.",
    modules: [
      "SSI teaching materials and classroom teaching skills",
      "In-water teaching skills and student supervision",
      "Spotting and correcting common student mistakes",
      "Legal, marketing, and business aspects of running courses",
      "Teach SSI Basic and Freediver courses"
    ],
    internshipOption: true,
    image: {
      url: "/courses/freediving-instructor-itc.jpg",
      alt: "SSI Freediving Instructor Training Course — instructor gliding over a Red Sea wreck"
    }
  },
  {
    id: "ssi-advanced-instructor",
    slug: "ssi-advanced-instructor",
    title: "SSI Advanced Freediving Instructor Course",
    durationWeeksOrDays: "12 to 14 days, depending on the number of participants",
    priceEur: 1245,
    priceNote: "Plus a €200 instructor kit; SSI registration fee and certification included.",
    prerequisites: "Minimum age 18, SSI Level 3 Freediver or equivalent, First Aid/CPR and O₂ Provider certificate, Training Techniques specialty, and a medical certificate.",
    description: "For certified Performance freedivers or equivalent. Qualify to teach SSI Basic, Level 1, and Level 2 courses, plus the Training Table and Free Immersion specialties.",
    modules: [
      "Teach SSI Basic, Level 1, and Level 2 courses",
      "Teach the Training Table specialty",
      "Teach the Free Immersion specialty",
      "Meet SSI professional standards and course prerequisites"
    ],
    internshipOption: false,
    image: {
      url: "/courses/advanced-freediving-instructor.jpg",
      alt: "SSI Advanced Freediving Instructor — diver finning over the shallow reef near the surface"
    }
  },
  {
    id: "ssi-level-3-instructor-update",
    slug: "ssi-level-3-instructor-update",
    title: "SSI Level 3 Instructor Update",
    durationWeeksOrDays: "2 to 3 days",
    priceEur: 120,
    priceNote: "€120 per day for a minimum of 2 to 3 days, plus a €60 certification fee.",
    prerequisites: "SSI Level 2 Instructor, at least 50 Level 1 and 2 certifications, and the SSI Performance Freediver student course completed.",
    description: "A focused update for SSI Level 2 Freediving Instructors. Demonstrate and teach advanced techniques such as mouthfill and exhale diving in the classroom and open water, and show a solid understanding of freediving physiology and psychology.",
    modules: [
      "Demonstrate and teach mouthfill techniques",
      "Demonstrate and teach exhale diving",
      "Teach advanced techniques in the classroom and open water",
      "Demonstrate knowledge of freediving physiology and psychology"
    ],
    internshipOption: false,
    image: {
      url: "/courses/advanced-freediving-instructor.jpg",
      alt: "Freediving instructor coaching a student in Dahab"
    }
  }
];

export const equalisationClass: EqualisationClass = {
  title: "Equalisation Masterclass: Frenzel & Mouthfill Architecture",
  leadCoach: "Master Equalisation Specialists inspired by Linda Paganelli",
  formats: [
    {
      format: "Online Session",
      duration: "3 x 90-min Live 1-on-1 Zoom sessions + Custom Video Analysis",
      priceEur: 140,
      description: "Diagnose your soft palate, tongue locks, and glottis control from anywhere in the world before you travel to Dahab.",
      includes: [
        "Otovent pressure diagnostics kit mailed or digital alternative",
        "HD endoscopic anatomical video breakdown",
        "Personalized daily 15-minute dry-drill routine",
        "Direct WhatsApp video check-ins for 30 days"
      ]
    },
    {
      format: "In-Person Dahab Masterclass",
      duration: "2 Days intensive land & open-water coaching",
      priceEur: 220,
      description: "Hands-on camera diagnostics, pressure gauges, and dedicated ocean dives with instantaneous feedback at Lighthouse Bay.",
      includes: [
        "Land Otovent pressure gauge measurement",
        "2 Depth line sessions with in-water audio/visual feedback",
        "Reverse-packing and residual volume exercises",
        "Overcoming mental blocks and head-down failure points"
      ]
    }
  ],
  overview: "Equalisation is 90% of depth progression. Rather than forcing your ears or guessing why you get stuck at 12m or 25m, we deconstruct the exact mechanics of the glottis, soft palate, tongue piston, and Eustachian tubes.",
  lindaPaganelliLegacy: "Freedive Dahab's coaching methodology draws upon the pioneering equalisation research and pedagogical mastery introduced to Dahab by Italian record holder Linda Paganelli, transforming hundreds of previously 'stuck' divers into relaxed 40m+ freedivers."
};
