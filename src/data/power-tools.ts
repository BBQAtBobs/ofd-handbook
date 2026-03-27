export interface PowerTool {
  name: string;
  category: "ventilation" | "cutting" | "hydraulic" | "generator";
  specs: Record<string, string>;
}

export const powerTools: PowerTool[] = [
  {
    name: "Tempest BD 18-H-5.5",
    category: "ventilation",
    specs: {
      Engine: "Honda 5.5HP",
      Fan: '18" blade',
      CFM: "15,023 cfm @ 3,870 rpm",
      Weight: "85 lbs",
      Filter: "2 stage air filter",
      Cycle: "4 stroke, belt driven",
      Fuel: "Straight gas",
    },
  },
  {
    name: "Tempest BD 24-H-6.5",
    category: "ventilation",
    specs: {
      Engine: "Honda 6.5HP",
      Fan: '24" blade',
      CFM: "18,130 cfm @ 3,175 rpm",
      Weight: "92 lbs",
      Filter: "2 stage air filter",
      Cycle: "4 stroke, belt driven",
      Fuel: "Straight gas",
    },
  },
  {
    name: "BATfan 45",
    category: "ventilation",
    specs: {
      Engine: "600W",
      Fan: '16.5" blade',
      CFM: "14,155 cfm",
      Weight: "62 lbs",
      Power: "Battery powered",
      Runtime: "45 min @ full speed",
      Charge: "100% in 10 hours",
    },
  },
  {
    name: "Partner K960 Rescue (Husqvarna)",
    category: "cutting",
    specs: {
      Engine: "6.5 hp",
      Blade: '14" diamond blade',
      Weight: "23.4 lbs",
      Fuel: "50:1 mix",
      Drive: "Belt driven",
      Filter: "2 stage (oiled foam plastic & paper)",
    },
  },
  {
    name: "Partner K650",
    category: "cutting",
    specs: {
      Engine: "71 cc motor",
      Blade: '12" abrasive disc or carbide tip',
      Weight: "19.6 lbs",
      Fuel: "50:1 mix",
      Drive: "Belt driven",
      Filter: "2 stage (oil main / backup paper)",
      Note: "Carbide teeth can't be missing 2 in a row or 3 total",
    },
  },
  {
    name: "Partner K950",
    category: "cutting",
    specs: {
      Engine: "93.6 cc motor",
      Blade: '12" or 14"',
      "Cut Depth": '4" with 12" blade, 5" with 14" blade',
      Weight: "21.8 lbs",
      Fuel: "50:1 mix",
      Drive: "Belt driven",
      Filter: "2 stage (oil main / backup paper)",
      Note: "Carbide teeth can't be missing 2 in a row or 3 total",
    },
  },
  {
    name: "K 970 Ring",
    category: "cutting",
    specs: {
      Engine: "6.5 hp",
      Blade: '14"',
      "Cut Depth": '10.6"',
      Weight: "30.4 lbs",
      Fuel: "50:1 mix",
      Note: "No arbor nut allows for deeper cut. Heavy Rescue specific.",
    },
  },
  {
    name: "STIHL TS 800",
    category: "cutting",
    specs: {
      Engine: "6.7 hp",
      Blade: '16"',
      "Cut Depth": '5.6"',
      Weight: "28 lbs",
      Fuel: "50:1 mix",
      Note: "Heavy Rescue specific.",
    },
  },
  {
    name: "Honda 3000 Generator",
    category: "generator",
    specs: {
      Engine: "196cc, 4 cycle",
      Oil: "30 wt",
      Fuel: "Straight gas",
      "AC Output": "120V, 3000W max (25 amp), 2600W continuous (21.7 amp)",
      Outlets:
        "1x 25A twist lock, 2x three-prong GFCI, 2x 12V DC @ 12 amp / 144W",
      "Load Capacity": "10 Circle D lights / Skill saw and 1 Circle D",
    },
  },
  {
    name: "Hurst Tool Power Unit",
    category: "hydraulic",
    specs: {
      Engine: "4 cycle, 50cc, 2 hp",
      Hose: "Non-conductive nylon or Kevlar twin hoses, kink resistant, quick connect with safety collar",
      Reservoir:
        'Dump valve must be inline with hose to operate. Maintain fluid level 3/4" - 1 1/2" from rim.',
    },
  },
  {
    name: "Hurst Spreaders",
    category: "hydraulic",
    specs: {
      Spread: '32"',
      Tips: "Replaceable heat treated steel",
    },
  },
  {
    name: "Hurst Ram",
    category: "hydraulic",
    specs: {
      "Open Force": "7.5 tons",
      "Pull Force": "3.5 tons",
    },
  },
  {
    name: "Hurst Cutter",
    category: "hydraulic",
    specs: {
      "Cutting Force": "12.5 tons at blade center",
      Opening: '6" wide',
      "Blade Notch Force": "35 tons",
    },
  },
  {
    name: 'Battery Hurst "Combi Tool" (SC357 E2)',
    category: "hydraulic",
    specs: {
      Weight: "41 lbs",
      "Spread Distance": '14.5"',
      "Max Spread Force": "225,483 lbs",
      "Cutter Opening": '10.8"',
      Power: "Battery powered internal hydraulics",
      Note: "Cuts and spreads",
    },
  },
  {
    name: "Stihl Chainsaw (044, 440, 441, MS460, MS 500i)",
    category: "cutting",
    specs: {
      Engine: "2 stroke / single cylinder",
      Power: "5 hp (6.7 HP for 500i)",
      RPM: "2,500 idle (3,000 for 500i), 13,500 max",
      Bar: '20"',
      Teeth: "65 drive teeth, 32 cutting teeth",
      Oiler: "Automatic chain oiler",
      Filter: "3 stage (pre, main, spill)",
      Oil: "30 wt bar oil",
      Fuel: "50:1 mix",
      Safety: "Chain brake",
      Note: "Can't be missing 3 in a row or 5 total",
    },
  },
  {
    name: "Stihl Small Chainsaw (MS200T)",
    category: "cutting",
    specs: {
      Engine: "2 stroke / single cylinder, 35.2cc",
      Weight: "7.9 lbs",
      Bar: '12"',
      Oiler: "Automatic chain oiler",
    },
  },
  {
    name: "Type III Chainsaw (MS261)",
    category: "cutting",
    specs: {
      Engine: "2 stroke / single cylinder, 50.2cc",
      Weight: "10.8 lbs",
      Bar: '20"',
      Features: "Decompression valve, adjustable automatic oiler",
    },
  },
];

export const powerToolCategories = {
  ventilation: "Ventilation Fans",
  cutting: "Saws & Cutting",
  hydraulic: "Hydraulic / Extrication",
  generator: "Generators",
};
