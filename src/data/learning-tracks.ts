export interface LearningTrack {
  slug: string;
  title: string;
  group: "Fundamentals" | "Operations" | "Equipment" | "Special Ops";
  description: string;
  sections: string[];
  color: "accent" | "blue" | "amber" | "green";
}

export const learningTracks: LearningTrack[] = [
  // Fundamentals
  {
    slug: "history-culture",
    title: "History & Culture",
    group: "Fundamentals",
    description:
      "OFD history from 1869 to today, mission statements, behavioral guidelines, and the chain of command.",
    sections: [
      "Department History",
      "City & OFD Mission Statements",
      "Behavioral Guidelines",
      "Academy Chain of Command",
      "Fire Insignia & Rank Structure",
    ],
    color: "accent",
  },
  {
    slug: "stations-battalions",
    title: "Stations & Battalions",
    group: "Fundamentals",
    description:
      "All 25 stations, their addresses, apparatus, battalion assignments, and key facilities.",
    sections: [
      "Station Map & Addresses",
      "Battalion Organization",
      "Apparatus at Each Station",
      "Special Assignments",
      "Department Facilities",
      "Phone Numbers",
    ],
    color: "accent",
  },
  {
    slug: "apparatus",
    title: "Types of Apparatus",
    group: "Fundamentals",
    description:
      "Engine types, truck types, wildland apparatus, specialty vehicles, and the numbering system.",
    sections: [
      "Type I Engines (Pierce Quantum & Enforcer)",
      "Ladder Trucks (Pierce, LaFrance)",
      "Type III & Type VI Wildland",
      "Water Tenders & Specialty",
      "ARFF Apparatus",
      "Apparatus Numbering System",
    ],
    color: "accent",
  },
  // Operations
  {
    slug: "response-matrix",
    title: "Response Matrix",
    group: "Operations",
    description:
      "Structure fire, highrise, vegetation, and Cal Fire response assignments by alarm level.",
    sections: [
      "Structure Fire Response",
      "Downtown / Target Hazard Response",
      "Highrise Response",
      "Vegetation Fire (Low/Med/High)",
      "Cal Fire MTZ Response",
      "Resource Abbreviations",
    ],
    color: "blue",
  },
  {
    slug: "roles-positions",
    title: "Roles & Positions",
    group: "Operations",
    description:
      "Engine and truck company positions, seating, and structure fire role assignments.",
    sections: [
      "Engine Positions (Officer, Engineer, FF EMT, FF PM)",
      "Leadoff & Nozzle Roles",
      "Truck Positions (Officer, Driver, Birddog, Tiller)",
      "Structure Fire Role Assignments",
      "Size-Up Components",
      "Fire Priorities (RECEO)",
    ],
    color: "blue",
  },
  {
    slug: "radio-operations",
    title: "Radio Operations",
    group: "Operations",
    description:
      "APX7000XE and Bendix King radio operation, zones, channels, and emergency procedures.",
    sections: [
      "APX7000XE Quick Reference",
      "Zone & Channel Guide",
      "Common Radio Channels",
      "Emergency Button Procedure",
      "Bendix King GPH CMD Operation",
      "Disposition Codes",
    ],
    color: "blue",
  },
  // Equipment
  {
    slug: "hose-operations",
    title: "Hose Operations",
    group: "Equipment",
    description:
      "Hose terminology, complement, preconnects, hose bed layouts, and hydrant operations.",
    sections: [
      "Hose Terminology",
      "Preconnects (Bumper, Cross-lays, Red Line)",
      "Rear Hose Bed Layout",
      "Standpipe Bundles",
      "Hydrant Commands & Buzzer Signals",
      "ELKHART RAM-XD",
    ],
    color: "amber",
  },
  {
    slug: "ladders",
    title: "Ladder Operations",
    group: "Equipment",
    description:
      "Ladder types, terminology, commands, truck company tools, and aerial operations.",
    sections: [
      "5 Types of Ground Ladders",
      "Ladder Sizes (Engine & Truck)",
      "Ladder Terminology A-Z",
      "Ladder Commands",
      "Truck Tool Color Codes",
      "Truck Crew Sizes",
    ],
    color: "amber",
  },
  {
    slug: "hand-tools",
    title: "Hand Tools",
    group: "Equipment",
    description:
      "60+ hand tools with descriptions organized by category — forcible entry, cutting, striking, prying, and more.",
    sections: [
      "Forcible Entry Tools",
      "Cutting Tools",
      "Striking Tools",
      "Prying & Leverage Tools",
      "Hydrant Tools",
      "Wildland Tools",
      "Specialty & General Tools",
    ],
    color: "amber",
  },
  {
    slug: "power-tools",
    title: "Power Tools",
    group: "Equipment",
    description:
      "Ventilation fans, saws, hydraulic extrication tools, generators, and chainsaws with specs.",
    sections: [
      "Ventilation Fans (Tempest, BATfan)",
      "Rescue Saws (Partner, STIHL)",
      "Hydraulic Tools (Hurst Power Unit)",
      "Extrication (Spreaders, Ram, Cutter, Combi)",
      "Chainsaws (Stihl 044-500i, MS200T, MS261)",
      "Honda 3000 Generator",
    ],
    color: "amber",
  },
  {
    slug: "ppe-scba",
    title: "PPE & SCBA",
    group: "Equipment",
    description:
      "MSA G1 SCBA operation, air management, buddy lights, RIT pack, and extinguisher types.",
    sections: [
      "MSA G1 SCBA Features",
      "Air Management (Time Remaining)",
      "Buddy Lights",
      "RIT Pack / Quick-Fill",
      "Extinguisher Types (Can, CO2, Purple K)",
    ],
    color: "amber",
  },
  // Special Ops
  {
    slug: "hydrants-water",
    title: "Hydrants & Water Supply",
    group: "Special Ops",
    description:
      "Hydrant color coding (body, top, cap), gate pot covers, water distribution zones, and the Humat 4-way.",
    sections: [
      "Hydrant Body Colors (EBMUD, Military, Airport, Private)",
      "Top Colors (Volume GPM)",
      "Cap Colors (Pressure PSI)",
      "Gate Pot Covers",
      "Oakland Water Distribution (33 Zones)",
      "Humat 4-Way Valve",
    ],
    color: "green",
  },
  {
    slug: "knots-rescue",
    title: "Knots & Rescue",
    group: "Equipment",
    description:
      "Rope terminology, knot types, and foundational rescue concepts.",
    sections: [
      "Rope Terminology",
      "Clove Hitch",
      "Double Becket",
    ],
    color: "green",
  },
];

export const trackGroups = [
  { name: "Fundamentals", color: "accent" },
  { name: "Operations", color: "blue" },
  { name: "Equipment", color: "amber" },
  { name: "Special Ops", color: "green" },
] as const;
