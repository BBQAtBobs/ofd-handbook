export const hydrantBodyColors = [
  { color: "White", meaning: "EBMUD (East Bay Municipal Utility District)" },
  { color: "Yellow", meaning: "Military" },
  {
    color: "Green",
    meaning: "Airport (Salt Water) and Regional Parks",
  },
  {
    color: "Red",
    meaning:
      "Private and EBMUD suction hydrants (approx. 16 in the city)",
  },
  { color: "Purple", meaning: "Non-potable water (used for irrigation)" },
];

export const hydrantTopColors = [
  { color: "Red", meaning: "0 - 500 gpm" },
  { color: "Orange", meaning: "501 - 999 gpm" },
  { color: "Green", meaning: "1,000 - 1,499 gpm" },
  { color: "Blue", meaning: "1,500+ gpm" },
];

export const hydrantCapColors = [
  { color: "Red", meaning: "0 - 50 psi" },
  { color: "White", meaning: "51 - 119 psi" },
  { color: "Green", meaning: "120+ psi" },
];

export const hydrantFacts = [
  'Most common hydrants and all white or unmarked hydrants are "green top, white cap" hydrants.',
  "There are approximately 6,500 hydrants in the city of Oakland.",
  "Water distribution is divided into 25 pressure zones and 8 regulator zones (33 total).",
  "4 zones are supplied by gravity supplemented by storage.",
  "8 zones are supplied by regulator valves alone.",
  "21 zones are supplied by pumps with equalizing storage.",
];

export const gatePotCovers = [
  { color: "Red", meaning: "Closed Zone Valve" },
  { color: "Blue", meaning: "Open Valve" },
  { color: "White", meaning: "Hydrant Gate Valve" },
];

export const gatePotNote =
  "Most gate valves in the system open in a clockwise direction.";

export const extinguishers = [
  {
    name: "The Can (Stored Pressure)",
    rating: "2A",
    pressure: "100 psi",
    capacity: "2.5 gallons water",
  },
  {
    name: "CO2",
    pressure: "195 psi",
  },
  {
    name: "Purple K (Dry Chem)",
    capacity: "30-45 lbs full",
  },
];
