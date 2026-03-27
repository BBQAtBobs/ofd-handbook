export const enginePositions = {
  officer: "Rig Supervisor. 360° size-up. Behind nozzle on hose.",
  engineer: "Drives engine and operates pump.",
  firefighterEMT: "Assigned leadoff or nozzle.",
  firefighterPM: "Assigned leadoff or nozzle.",
};

export const engineRoles = {
  leadoff:
    "Secures water supply with 4-way at hydrant, follows hose in with pike pole.",
  nozzle:
    "Deploys hose and gets to seat of fire with nozzle. Supervised by officer directly behind.",
};

export const truckPositions = {
  officer:
    "Lt or Ca, Rig Supervisor. 360° size-up. Often assumes command until BC on scene, then Search.",
  driver:
    "Qualified firefighter that drives to incident. Throws ladder and goes to roof. Cuts hole. Uses Hurst tool.",
  birddog:
    "Forcible Entry and Search & Rescue with Officer.",
  "drivers-birddog":
    "(On T1, T2, T5) FF throws driver side outrigger, collects bottle and saw on turntable for driver, assists tiller with ladder throw. Assists on roof.",
  tiller:
    "Qualified FF that operates rear wheels of truck. Throws passenger outrigger, collects tools, goes to roof, safety for driver, uses tool to push through ceiling, supports driver with ventilation.",
};

export const structureFireRoles = [
  { unit: "1E", role: "On Scene Report, Water Supply, Fire Attack" },
  { unit: "2E", role: "Backup Fire Attack" },
  { unit: "3E", role: "RIC, Utilities" },
  { unit: "4E", role: "Tasks as needed, Exposures" },
  {
    unit: "1T",
    role: "Command until BC, Force Entry, Vent, Search",
  },
  { unit: "2T", role: "2nd Ladder, Search, Help 1T" },
  { unit: "1BC", role: "Command" },
  { unit: "2BC", role: "Ops and/or Safety" },
];

export const scbaInfo = {
  model: "MSA G1",
  name: "Self Contained Breathing Apparatus",
  features: [
    "SCBA to two-way-radio voice communication via Bluetooth",
    "Dual microphones built within the regulator for clear communication while eliminating background noise",
    "Quick-Connect system",
    "Powers all lights, communications and controls from one source",
    "Interchangeable battery types — alkaline C-cell or lithium ion rechargeable",
    "Battery location places weight low and close to the back for optimum balance",
  ],
  airManagement: [
    "Tap either green button (one time) for time remaining — displays minutes until 0 psi.",
    "After 3 minutes of breathing, the G1 calculates cylinder air and breathing rate for time remaining.",
    "After the first 3 minutes, time remaining updates every 30 seconds.",
  ],
  ritPack:
    '36" High Pressure Hose with FML UAC Fittings. Acts as a RIT Pack to deliver air via Quick-Fill.',
};

export const knots = [
  {
    name: "Clove Hitch",
    description:
      "Useful to quickly tie-off the end of a rope so it will not fall out of reach, and still easily adjustable. Known to slip and untie. Not used as a tie-off or in place of an anchor knot, like the Figure 8.",
  },
  {
    name: "Double Becket",
    description:
      "Used for joining two unequal sized diameter material together. Easy to tie, inspect, and untie after weighting with a rescue load.",
  },
];

export const knotTerminology: Record<string, string> = {
  Knot: "A rope intertwined with itself, e.g. bowline and figure 8.",
  Bight: 'A "U" shape in the rope.',
  Loop: "The rope forming a loop and continuing on.",
  "Running End": "The end actively being tied.",
  "Standing End": "The non-moving part.",
};

export const phonetic = [
  "Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot",
  "Golf", "Hotel", "India", "Juliet", "Kilo", "Lima",
  "Mike", "November", "Oscar", "Papa", "Quebec", "Romeo",
  "Sierra", "Tango", "Uniform", "Victor", "Whiskey", "X-ray",
  "Yankee", "Zulu",
];
