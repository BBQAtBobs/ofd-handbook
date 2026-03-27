export interface Apparatus {
  name: string;
  type: string;
  units?: string;
  capacity?: string;
  notes?: string;
}

export const apparatus: Apparatus[] = [
  {
    name: "Pierce Quantum",
    type: "Type I Fire Engine",
    capacity: "500 Gallons",
    notes: "Standard engine used across most stations.",
  },
  {
    name: "Pierce Enforcer",
    type: "Type I Fire Engine",
    units: "E13, E18, E29",
    capacity: "500 Gallons",
    notes: "Newer engine model at select stations.",
  },
  {
    name: "New Pierce Ladder Truck",
    type: "Ladder Truck",
    units: "T1",
    notes: "Newest ladder truck in the fleet.",
  },
  {
    name: "Pierce Ladder Truck",
    type: "Ladder Truck",
    units: "T2, T3, T6, T7",
  },
  {
    name: "American LaFrance Ladder Truck",
    type: "Ladder Truck",
    units: "T4, T5",
  },
  {
    name: "Pierce Type III Fire Engine",
    type: "Type III Fire Engine (Wildland)",
    units: "317, 324, 328",
    capacity: "500 Gallons, 4x4",
  },
  {
    name: "OES Rosenbauer Type III Model 34",
    type: "Type III Fire Engine (Wildland)",
    units: "8232",
    capacity: "500 Gallons, 4x4",
  },
  {
    name: "Pierce Water Tender",
    type: "Water Tender",
    capacity: "2,000 Gallons, 4x2",
  },
  {
    name: "Type VI",
    type: "Type VI Wildland Engine",
    units: "P-621, 626",
    capacity: "300 Gallons, 4x4",
  },
  {
    name: "ARFF Apparatus",
    type: "Aircraft Rescue and Firefighting",
    notes: "Stationed at Oakland Airport (Station 29).",
  },
  {
    name: "Rescue",
    type: "Rescue",
    notes: "Heavy rescue operations.",
  },
  {
    name: "Boat",
    type: "Water Rescue",
    notes: "Various watercraft at Station 2.",
  },
  {
    name: "Utility Pick-up",
    type: "Utility",
    notes: "Support vehicles at multiple stations.",
  },
  {
    name: "PWSS / HazMat Apparatus",
    type: "Specialty",
    notes: "Portable Water Supply System and hazmat response.",
  },
];

export const apparatusNumbering = {
  historical:
    "OFD apparatus were numbered using a statewide 4-digit system. First 2 digits were the agency code (25 for Oakland). 3rd digit was apparatus type. 4th was unit number. Engines were 40-60s and trucks were 70s.",
  examples: [
    "Engine 1 = 2541",
    "Engine 15 = 2555",
    "Truck 3 = 2573",
  ],
  current:
    "Currently OFD uses the apparatus type and number, e.g., OFD E 29.",
};
