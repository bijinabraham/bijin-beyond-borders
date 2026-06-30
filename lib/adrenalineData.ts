export interface Activity {
  slug: string;
  name: string;
  tag: string;
  tagWords: string[];
  desc: string;
  longDesc?: string;
  stats: { label: string; value: string }[];
  intensity: number;
  seed: string;
  horizon: boolean;
  photos: string[];
}

export const activities: Activity[] = [
  {
    slug: "mma",
    name: "MMA",
    tag: "Combat · Training",
    tagWords: ["Combat", "Discipline", "Chaos", "Training"],
    desc: "Where discipline meets chaos. Training in BJJ and Muay Thai, building the mind that doesn't quit before the body does.",
    longDesc: "Started in mid-2024 when the gym finally felt like the right place. Six days a week of BJJ and Muay Thai. The discipline of showing up matters more than any single session. The mind quits before the body does, and training is about learning to recognise that moment, then ignore it.",
    stats: [
      { label: "Since",     value: "2024" },
      { label: "Format",    value: "BJJ · Muay Thai" },
      { label: "Frequency", value: "6× per week" },
    ],
    intensity: 5,
    seed: "mma-gym-fighter",
    horizon: false,
    photos: [],
  },
  {
    slug: "ski",
    name: "Ski",
    tag: "Mountain · Snow",
    tagWords: ["Speed", "Snow", "Silence", "Line"],
    desc: "Speed and silence. The mountain doesn't care about your plans. It only rewards commitment to the line you choose.",
    longDesc: "First learned to ski in 2023 in Gulmarg, India. The mountain has its own logic. You can fight it and lose, or you can read it and ride. The line you choose matters less than the commitment to seeing it through once you've chosen.",
    stats: [
      { label: "Since",     value: "2023" },
      { label: "Favourite", value: "Gulmarg, India" },
    ],
    intensity: 4,
    seed: "ski-slope-mountain",
    horizon: false,
    photos: [],
  },
  {
    slug: "surf",
    name: "Surf",
    tag: "Ocean · Waves",
    tagWords: ["Patience", "Timing", "Salt", "Drop"],
    desc: "Nothing teaches patience and timing like the ocean. You don't fight the wave. You become part of it.",
    longDesc: "Started surfing in 2022 on the coast of Karnataka. The ocean is the only teacher who doesn't grade you. Either you read the wave or you don't. Either you commit at the right moment or you don't. The water makes its own judgement, every time.",
    stats: [
      { label: "Since",     value: "2022" },
      { label: "Favourite", value: "Mulki, Karnataka" },
    ],
    intensity: 3,
    seed: "ocean-surf-wave",
    horizon: false,
    photos: [],
  },
  {
    slug: "snorkel",
    name: "Snorkel",
    tag: "Underwater · Reef",
    tagWords: ["Silence", "Reef", "Breath", "Float"],
    desc: "The reef is another world entirely. Beneath the surface, everything slows down and the noise of life disappears.",
    longDesc: "Snorkelling since 2019, across reefs in Hawaii, Sri Lanka, Goa, and the Caribbean. There is no quiet like the quiet beneath the surface. It is the only place where the entire body can rest while the eyes work hardest.",
    stats: [
      { label: "Since",     value: "2019" },
      { label: "Countries", value: "8+" },
    ],
    intensity: 2,
    seed: "snorkel-coral-reef",
    horizon: false,
    photos: [],
  },
  {
    slug: "skydive",
    name: "Skydive",
    tag: "Freefall · Sky",
    tagWords: ["Freefall", "Edge", "Commit", "Sky"],
    desc: "The ultimate act of stepping off the edge. The next frontier, when the timing is right.",
    longDesc: "On the list. When the timing is right.",
    stats: [],
    intensity: 5,
    seed: "sky-freefall-jump",
    horizon: true,
    photos: [],
  },
  {
    slug: "scuba",
    name: "Scuba",
    tag: "Deep · Silence",
    tagWords: ["Deep", "Silence", "Pressure", "Quiet"],
    desc: "Going deeper than snorkelling allows. A full submersion into the quiet world below. On the list.",
    longDesc: "On the list. Snorkelling is the doorway. Scuba is the room.",
    stats: [],
    intensity: 3,
    seed: "scuba-deep-ocean",
    horizon: true,
    photos: [],
  },
];

export const allActivitySlugs = activities.map(a => a.slug);

export function getActivity(slug: string): Activity | undefined {
  return activities.find(a => a.slug === slug);
}
