export interface AlarmLevel {
  alarm: string;
  resources: string;
}

export interface ResponseType {
  name: string;
  alarms: AlarmLevel[];
  notes?: string[];
}

export const responseMatrix: ResponseType[] = [
  {
    name: "Structure Fire",
    alarms: [
      { alarm: "1st", resources: "4E, 2TK, 2BC, 1AMB" },
      { alarm: "2nd", resources: "3E, 1TK, 1BC, 1AV, 1FI" },
      { alarm: "3rd", resources: "3E, 1DC, 1SO, 1PIO, Shop2" },
      { alarm: "4th", resources: "3E, 1TK" },
      { alarm: "5th", resources: "3E" },
      { alarm: "6th", resources: "3E, 1TK" },
    ],
  },
  {
    name: "Downtown Lowrise / Batt 2 / Target Hazards",
    alarms: [
      { alarm: "1st", resources: "4E, 2TK, 2BC" },
      { alarm: "2nd", resources: "3E, 1BC, 1AV, 1FI" },
      { alarm: "3rd", resources: "3E, 1SO, 1PIO, Shop2" },
      { alarm: "4th", resources: "2E, 1TK" },
      { alarm: "5th", resources: "2E" },
      { alarm: "6th", resources: "3E, 1TK, 1BC" },
    ],
  },
  {
    name: "Highrise",
    alarms: [
      { alarm: "1st", resources: "6E, 3TK, 2BC, 1AV, 3AMB" },
      { alarm: "2nd*", resources: "4E, 2TK, 1BC, 1FI, 1DC, 1SO" },
      { alarm: "3rd", resources: "4E, 1PIO, Shop2" },
      { alarm: "4th", resources: "4E, 1TK" },
      { alarm: "5th", resources: "4E" },
      { alarm: "6th", resources: "4E, 1TK" },
    ],
    notes: ["*IC Should Request on Confirmed Fire"],
  },
  {
    name: "Grass Fire — Threat Zone (Low)",
    alarms: [
      { alarm: "1st", resources: "3E, 1BC" },
      { alarm: "2nd", resources: "3E, 1BC, 1WT, 1FI, 1AMB" },
      { alarm: "3rd", resources: "3E, 1BC, 1DC, 1SO, Shop2" },
      { alarm: "4th", resources: "3E" },
      { alarm: "5th", resources: "3E" },
      { alarm: "6th", resources: "3E" },
    ],
  },
  {
    name: "Grass Fire — Threat Zone (Medium)",
    alarms: [
      { alarm: "1st", resources: "4E, 2BC" },
      { alarm: "2nd", resources: "3E, 1BC, 1WT, 1FI, 1AMB" },
      { alarm: "3rd", resources: "3E, 1DC, 1SO, Shop2" },
      { alarm: "4th", resources: "3E" },
      { alarm: "5th", resources: "3E" },
      { alarm: "6th", resources: "3E" },
    ],
  },
  {
    name: "Grass Fire — Threat Zone (High) and Red Flag",
    alarms: [
      { alarm: "1st", resources: "6E, 2BC" },
      { alarm: "2nd", resources: "3E, 1BC, 1WT, 1FI, 1SO, 1AMB" },
      { alarm: "3rd", resources: "3E, 1DC, Shop2" },
      { alarm: "4th", resources: "3E" },
      { alarm: "5th", resources: "3E" },
      { alarm: "6th", resources: "3E" },
    ],
  },
];

export const vegetationNotes = [
  "Stations equipped with a Type VI apparatus must respond with their Type VI in addition to their Type I when dispatched from quarters for any reported vegetation fires.",
  "Stations equipped with a Type III apparatus shall respond with their Type III in place of their Type I when responding from quarters for all reported vegetation fires.",
  "Red Flag Days: Upstaffed Type III engines will be assigned to the 1st Alarm.",
];

export const calFireResponse = [
  {
    level: "LOW",
    resources: "1BC, 4 wildland E, 1 dozer",
  },
  {
    level: "MEDIUM",
    resources:
      "1BC, 6 wildland E, 2 hand crews, 2 dozers, 2 tankers, 1 copter, 1 air attack, 1 SO",
  },
  {
    level: "HIGH",
    resources:
      "2BC, 8 wildland E, 2 hand crews, 2 dozers, 2 tankers, 1 copter, 1 air attack, 1 SO",
  },
];

export const resourceAbbreviations: Record<string, string> = {
  E: "Engine",
  TK: "Truck",
  BC: "Battalion Chief",
  DC: "Duty Chief (AC or DC)",
  AMB: "Ambulance",
  AV: "Air Van",
  FI: "Fire Investigator",
  SO: "Safety Officer",
  PIO: "Public Information Officer",
  WT: "Water Tender",
};

export const structureFirePriorities = [
  "Rescue",
  "Exposures",
  "Confinement",
  "Extinguishment",
  "Overhaul",
];

export const sizeUpComponents = [
  "Identification of the responding unit",
  "Identification of the incident location",
  "Description of the incident site",
  "Description of conditions",
  "Naming the incident",
  "Establish or defer command",
];
