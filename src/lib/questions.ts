import { stations, truckCompanies } from "@/data/stations";
import { truckToolColors, truckCrewSizes } from "@/data/ladders";
import { handTools, handToolImages } from "@/data/hand-tools";

// ─── Types ───────────────────────────────────────────────────────────

export type QuestionCategory = "stations" | "trucks" | "tools";
export type StudyMode = "flashcard" | "multiple-choice";

export interface Question {
  id: string;
  category: QuestionCategory;
  subtopic: string;
  question: string;
  answer: string;
  wrongAnswers: string[];
  trackSlug?: string;
  image?: string;
}

export interface SessionResult {
  mode: StudyMode;
  category: QuestionCategory | "mixed";
  totalQuestions: number;
  correct: number;
  missed: Question[];
  timestamp: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickDistractors(pool: string[], correct: string, count = 3): string[] {
  const filtered = pool.filter((v) => v !== correct);
  return shuffle(filtered).slice(0, count);
}

const categoryLabels: Record<string, string> = {
  "forcible-entry": "Forcible Entry",
  cutting: "Cutting",
  striking: "Striking",
  prying: "Prying & Leverage",
  plumbing: "Plumbing & Water",
  gripping: "Gripping",
  wildland: "Wildland",
  specialty: "Specialty",
  hydrant: "Hydrant",
  general: "General",
};

// Normalize truck name: "T1" → "Truck 1" for truckToolColors lookup
function truckToFull(t: string): string {
  return `Truck ${t.replace("T", "")}`;
}

function toTitleCase(s: string): string {
  return s
    .toLowerCase()
    .split(" ")
    .map((w, i) =>
      i > 0 && w === "and" ? w : w.charAt(0).toUpperCase() + w.slice(1)
    )
    .join(" ");
}

// ─── Question Generators ─────────────────────────────────────────────

function generateStationQuestions(): Question[] {
  const questions: Question[] = [];
  const addrPool = stations.map((s) => s.addr);
  const bnPool = ["Battalion 2", "Battalion 3", "Battalion 4"];

  const doubleHouseNums = stations
    .filter((s) => s.type === "Double")
    .map((s) => s.num);
  const doubleHouseStrs = doubleHouseNums.map((n) => `Station ${n}`);

  for (const s of stations) {
    questions.push({
      id: `stations-addr-${s.num}`,
      category: "stations",
      subtopic: "Addresses",
      question: `What is the address of Station ${s.num}?`,
      answer: s.addr,
      wrongAnswers: pickDistractors(addrPool, s.addr),
      trackSlug: "stations-battalions",
    });

    questions.push({
      id: `stations-bn-${s.num}`,
      category: "stations",
      subtopic: "Battalions",
      question: `Station ${s.num} belongs to which battalion?`,
      answer: `Battalion ${s.bn}`,
      wrongAnswers: pickDistractors(bnPool, `Battalion ${s.bn}`),
      trackSlug: "stations-battalions",
    });
  }

  // Double house questions
  for (const s of stations.filter((s) => s.type === "Double")) {
    questions.push({
      id: `stations-double-${s.num}`,
      category: "stations",
      subtopic: "Double Houses",
      question: `Is Station ${s.num} a double house?`,
      answer: "Yes",
      wrongAnswers: ["No"],
      trackSlug: "stations-battalions",
    });
  }

  const singleStations = stations.filter((s) => s.type === "Single");
  for (let i = 0; i < 3 && i < singleStations.length; i++) {
    const correctDouble = doubleHouseNums[i % doubleHouseNums.length];
    questions.push({
      id: `stations-which-double-${i}`,
      category: "stations",
      subtopic: "Double Houses",
      question: "Which of these is a double house?",
      answer: `Station ${correctDouble}`,
      wrongAnswers: pickDistractors(
        singleStations.map((ss) => `Station ${ss.num}`),
        `Station ${correctDouble}`
      ),
      trackSlug: "stations-battalions",
    });
  }

  // Special assignment questions
  const specialStations = stations.filter(
    (s) =>
      s.special.length > 0 &&
      !s.special[0].startsWith("Currently") &&
      !s.special[0].startsWith("Staffed") &&
      !s.special[0].startsWith("Chain saw")
  );
  const stationNumPool = stations.map((s) => `Station ${s.num}`);

  for (const s of specialStations) {
    const mainSpecial = s.special[0];
    if (mainSpecial === "Type III Wildland" && s.num === 7) continue;

    questions.push({
      id: `stations-special-${s.num}`,
      category: "stations",
      subtopic: "Specials",
      question: `Which station houses ${mainSpecial}?`,
      answer: `Station ${s.num}`,
      wrongAnswers: pickDistractors(stationNumPool, `Station ${s.num}`),
      trackSlug: "stations-battalions",
    });
  }

  return questions;
}

function generateTruckQuestions(): Question[] {
  const questions: Question[] = [];
  const stationPool = truckCompanies.map((t) => `Station ${t.station}`);
  const colorPoolNorm = Object.values(truckToolColors).map(toTitleCase);

  for (const tc of truckCompanies) {
    questions.push({
      id: `trucks-crew-${tc.truck.toLowerCase()}`,
      category: "trucks",
      subtopic: "Crew Sizes",
      question: `How many crew members are on ${tc.truck}?`,
      answer: `${tc.crew} members`,
      wrongAnswers: pickDistractors(
        ["3 members", "4 members", "5 members", "6 members"],
        `${tc.crew} members`
      ),
      trackSlug: "ladders",
    });

    questions.push({
      id: `trucks-medical-${tc.truck.toLowerCase()}`,
      category: "trucks",
      subtopic: "ALS / BLS",
      question: `${tc.truck} is ALS or BLS?`,
      answer: tc.medical,
      wrongAnswers: pickDistractors(["ALS", "BLS", "ILS"], tc.medical),
      trackSlug: "ladders",
    });

    const colorRaw = truckToolColors[truckToFull(tc.truck)];
    if (colorRaw) {
      const color = toTitleCase(colorRaw);
      questions.push({
        id: `trucks-color-${tc.truck.toLowerCase()}`,
        category: "trucks",
        subtopic: "Tool Colors",
        question: `What color are ${tc.truck}'s tools?`,
        answer: color,
        wrongAnswers: pickDistractors(colorPoolNorm, color),
        trackSlug: "ladders",
      });
    }

    questions.push({
      id: `trucks-station-${tc.truck.toLowerCase()}`,
      category: "trucks",
      subtopic: "Stations",
      question: `${tc.truck} is housed at which station?`,
      answer: `Station ${tc.station}`,
      wrongAnswers: pickDistractors(stationPool, `Station ${tc.station}`),
      trackSlug: "stations-battalions",
    });
  }

  questions.push({
    id: "trucks-five-member",
    category: "trucks",
    subtopic: "Crew Sizes",
    question: "Which trucks have 5-member crews?",
    answer: truckCrewSizes.fiveMembers.join(", "),
    wrongAnswers: [
      truckCrewSizes.fourMembers.slice(0, 3).join(", "),
      `${truckCrewSizes.fiveMembers[0]}, ${truckCrewSizes.fourMembers[0]}, ${truckCrewSizes.fourMembers[1]}`,
      `${truckCrewSizes.fiveMembers[0]}, ${truckCrewSizes.fiveMembers[1]}, ${truckCrewSizes.fourMembers[0]}`,
    ],
    trackSlug: "ladders",
  });

  const alsTrucks = truckCompanies.filter((t) => t.medical === "ALS");
  const blsTrucks = truckCompanies.filter((t) => t.medical === "BLS");
  questions.push({
    id: "trucks-als-composite",
    category: "trucks",
    subtopic: "ALS / BLS",
    question: "Which trucks are ALS?",
    answer: alsTrucks.map((t) => t.truck).join(", "),
    wrongAnswers: [
      `${alsTrucks[0].truck}, ${blsTrucks[0].truck}`,
      `${blsTrucks[0].truck}, ${blsTrucks[1].truck}`,
      `${alsTrucks[0].truck}, ${blsTrucks[2].truck}`,
    ],
    trackSlug: "ladders",
  });

  return questions;
}

function generateToolQuestions(): Question[] {
  const questions: Question[] = [];
  const toolsWithImages = handTools.filter((t) => handToolImages[t.name]);
  const allToolNames = toolsWithImages.map((t) => t.name);
  const allCategories = [...new Set(handTools.map((t) => t.category))];
  const allCategoryLabels = allCategories.map(
    (c) => categoryLabels[c] || c
  );

  for (const tool of toolsWithImages) {
    questions.push({
      id: `tools-name-${tool.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
      category: "tools",
      subtopic: "Identify",
      question: "Name this tool:",
      answer: tool.name,
      wrongAnswers: pickDistractors(allToolNames, tool.name),
      trackSlug: "hand-tools",
      image: handToolImages[tool.name],
    });

    const catLabel = categoryLabels[tool.category] || tool.category;
    questions.push({
      id: `tools-cat-${tool.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
      category: "tools",
      subtopic: "Categories",
      question: `"${tool.name}" belongs to which category?`,
      answer: catLabel,
      wrongAnswers: pickDistractors(allCategoryLabels, catLabel),
      trackSlug: "hand-tools",
    });
  }

  const toolsWithAka = handTools.filter((t) => t.aka && handToolImages[t.name]);
  const akaPool = toolsWithAka.map((t) => t.aka!);

  for (const tool of toolsWithAka) {
    questions.push({
      id: `tools-aka-${tool.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
      category: "tools",
      subtopic: "Aliases",
      question: `What is another name for "${tool.name}"?`,
      answer: tool.aka!,
      wrongAnswers: pickDistractors(akaPool, tool.aka!),
      trackSlug: "hand-tools",
    });
  }

  return questions;
}

// ─── Main API ────────────────────────────────────────────────────────

const allQuestionGenerators: Record<QuestionCategory, () => Question[]> = {
  stations: generateStationQuestions,
  trucks: generateTruckQuestions,
  tools: generateToolQuestions,
};

export function generateQuestions(opts?: {
  category?: QuestionCategory | "mixed";
  subtopics?: string[];
  trackSlug?: string;
  count?: number;
}): Question[] {
  const category = opts?.category ?? "mixed";

  let pool: Question[];
  if (category === "mixed") {
    pool = [
      ...generateStationQuestions(),
      ...generateTruckQuestions(),
      ...generateToolQuestions(),
    ];
  } else {
    pool = allQuestionGenerators[category]();
  }

  // Filter by subtopics if specified
  if (opts?.subtopics && opts.subtopics.length > 0) {
    pool = pool.filter((q) => opts.subtopics!.includes(q.subtopic));
  }

  // Filter by track if specified
  if (opts?.trackSlug) {
    pool = pool.filter((q) => q.trackSlug === opts.trackSlug);
  }

  // Shuffle
  pool = shuffle(pool);

  // Limit count
  if (opts?.count && opts.count < pool.length) {
    pool = pool.slice(0, opts.count);
  }

  return pool;
}

export function shuffleAnswers(q: Question): string[] {
  return shuffle([q.answer, ...q.wrongAnswers]);
}

export function getSubtopics(
  category: QuestionCategory
): { value: string; count: number }[] {
  const pool = allQuestionGenerators[category]();
  const counts: Record<string, number> = {};
  for (const q of pool) {
    counts[q.subtopic] = (counts[q.subtopic] || 0) + 1;
  }
  return Object.entries(counts).map(([value, count]) => ({ value, count }));
}

export function getAllCategories(): {
  value: QuestionCategory;
  label: string;
  count: number;
}[] {
  return [
    { value: "stations", label: "Stations", count: generateStationQuestions().length },
    { value: "trucks", label: "Trucks", count: generateTruckQuestions().length },
    { value: "tools", label: "Tools", count: generateToolQuestions().length },
  ];
}
