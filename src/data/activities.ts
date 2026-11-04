import { Activity } from '../types';

export const activitiesData: Activity[] = [
  {
    id: "ras-mohamed",
    title: "Freediving at Ras Mohamed",
    description: "A full day of freediving in one of the Red Sea’s most beautiful marine parks.",
    duration: "Full day; early morning departure",
    priceEur: 78,
    image: { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80", alt: "Ras Mohamed coral reef with freedivers" },
    includes: [
      "Park entry fee",
      "At least one Freedive Dahab instructor as your freediving guide",
      "Fruit and snacks",
      "Shore-based minivan transport",
      "Lunch break on the beach under a tent",
    ],
    highlights: [
      "Shallow entry cave at Shark Observatory and reef caves along the coast",
      "Freediving at Yolanda Reef among schools of barracuda, trevallies and snappers",
      "Possible encounters with turtles, rays, giant moray eels and napoleon wrasse",
      "Suitable for mixed abilities: beginners can stay shallow while confident divers explore deeper",
    ],
    bookingNotes: [
      "Minimum group size is four. A trip for three people is available at €98 per person.",
      "Masters, long-term trainees, and Zero to Hero students pay €65 per person.",
      "Training Week and Combo Week guests can add the trip for €43.",
    ],
    longDescription: [
      "Ras Mohamed is a large and stunning marine national park, about 100 km from Dahab. We leave early in the morning and drive by minivan, reaching the park in about one hour.",
      "We launch from the shore at Shark Observatory and freedive the shallow entry cave. Then we move along the coast to explore caves in the reef table. Confident freedivers can dive deeper along the wall, while beginners can stay shallow and still enjoy the colorful marine life.",
      "After a beach lunch under a tent and a rest in the shade, we dive from the famous Yolanda Reef, where schools of barracudas, trevallies, and snappers are common. You may also meet turtles, rays, giant morays, Napoleon wrasses, and more. Freediving lets you get closer to marine life than scuba diving.",
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
    title: "Night Freedive",
    description: "See the reef as you have never seen it before.",
    duration: "Evening (19:30 - 21:30)",
    priceEur: 38,
    image: { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80", alt: "Night freediving with bioluminescence trails" },
    includes: [
      "Waterproof flashlight",
      "Freedive Dahab instructor as your guide"
    ],
    highlights: [
      "Explore the Lighthouse reef after dark",
      "Look for Spanish dancers, turtles, feather stars, and hunting lionfish",
      "Walk back to the center for a hot shower",
    ],
    longDescription: [
      "The reef is a different world at night, with animals and behavior you do not see in daylight. Spanish dancers may swim just below the surface, turtles glide through the darkness, and feather stars reveal themselves after dark. Lionfish also come out of hiding to hunt.",
      "We dive at the Lighthouse reef, so we can walk back to the center, take a hot shower, and go out for dinner together.",
    ],
  },
  {
    id: "desert-sunset",
    title: "Desert BBQ",
    description: "Trade the blue water for the silence of the desert.",
    duration: "Usually in the afternoon, after diving",
    priceEur: 20,
    image: { url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80", alt: "Bedouin camp in Sinai mountains at sunset" },
    includes: [
      "Transportation to and from the desert",
      "Bedouin BBQ dinner",
      "Guided walk in the desert",
    ],
    highlights: [
      "Explore the canyons and mountain scenery of South Sinai",
      "Visit Wadi Gnai, a canyon oasis 10 km south of town",
      "Enjoy a Bedouin dinner around the fireplace",
    ],
    longDescription: [
      "South Sinai has a fascinating desert of mountains, canyons, sand dunes, dry waterfalls, and riverbeds. We drive by jeep to Wadi Gnai, a deep canyon oasis 10 km south of town. Our Bedouin guide prepares a BBQ dinner in one of the smaller canyons while we explore the scenery. In winter, water can seep from cracks in the mountains.",
      "Back at camp, we eat a Bedouin dinner around the fireplace beneath the stars and passing satellites. This is not a freediving activity, but it is a favorite with our guests and a wonderful way to enjoy another side of Egypt with people who know the area.",
    ],
  },
  {
    id: "ice-bath",
    title: "Ice Bath",
    description: "Cool off, calm your mind, and end your day refreshed.",
    duration: "60 minutes · Wednesday at 3:00 PM",
    priceEur: 200,
    priceLabel: "200 EGP",
    image: { url: "/images/desert-experience/sinai-desert-01.webp", alt: "Evening light over the Sinai desert near Dahab" },
    includes: ["Guided breathing, entry, and timing", "A gradual experience at your own pace"],
    highlights: ["School rooftop location", "Wednesday at 3:00 PM", "You can get out whenever you want"],
    longDescription: [
      "Cold exposure and freediving go together well. A guided ice bath helps you stay calm in an uncomfortable situation, breathe slowly, and relax your body while your mind wants to react. These are skills you also use during a long breath-hold, and many divers enjoy the ice bath as a refreshing end to a training day.",
      "Your instructor guides you through breathing, entry, and timing so you can build up gradually at your own pace. You can always get out whenever you want.",
    ],
    bookingNotes: [
      "Ice baths are not suitable for everyone. If you have a heart condition, high blood pressure, or another medical condition, tell us before booking and ask your doctor first.",
    ],
  },
  {
    id: "yoga-for-freedivers",
    title: "Yoga for Freedivers",
    description: "Start your training day with a focused mobility and yoga session before getting in the water.",
    duration: "30 minutes or 75 minutes",
    priceEur: 4,
    priceLabel: "Predive morning session €4 · Sunday sunset Hatha Yoga €8",
    image: { url: "/images/philosophy/training.jpg", alt: "Freediver stretching before a training session" },
    includes: ["All levels welcome, including complete beginners", "Booking and advance payment at the office required"],
    highlights: [
      "Predive morning sessions: Monday, Wednesday, Friday, 8:15–8:45 AM · €4",
      "Sunday sunset Hatha Yoga: 6:30–7:45 PM · €8",
      "Morning sessions must be booked the day before",
    ],
    longDescription: [
      "Flexibility and relaxation are a big part of freediving. In our yoga sessions, stretch your rib cage, diaphragm, shoulders, hips, and back, and practice the slow, calm breathing you can use before a dive. The classes are gentle and suitable for everyone. Join after a day of training to unwind, or the day before a deep dive to loosen up.",
    ],
  }
];
