export interface DispositionCode {
  code: string;
  meaning: string;
}

export const dispositionCodes: DispositionCode[] = [
  { code: "AMA", meaning: "Against Medical Advice" },
  { code: "CC", meaning: "Call Completed" },
  { code: "CAN", meaning: "Cancelled" },
  { code: "CPA", meaning: "Cancelled Prior to Arrival" },
  { code: "CF", meaning: "Confirmed Fire" },
  { code: "DUP", meaning: "Duplicate" },
  { code: "FA", meaning: "False Alarm" },
  { code: "GOA", meaning: "Gone on Arrival" },
  { code: "GI", meaning: "Good Intent" },
  { code: "HM", meaning: "Hazard Mitigated" },
  { code: "NF", meaning: "Nothing Found" },
  { code: "NMN", meaning: "No Medical Needed" },
  { code: "NPCR", meaning: "No Patient Care Report" },
  { code: "OOA", meaning: "Out on Arrival" },
  { code: "PRS", meaning: "Patient Released on Scene" },
  { code: "PTA", meaning: "Patient Transported by Ambulance" },
  { code: "PTP", meaning: "Patient Transported by Private Car" },
  { code: "SM", meaning: "System Malfunction" },
  { code: "SS", meaning: "Smoke Scare" },
  { code: "UTL", meaning: "Unable to Locate" },
];

export const radioTrafficExample = {
  title: "Example of Radio Traffic",
  lines: [
    { speaker: "Dispatch", text: "Engine 29, Oakland Fire" },
    { speaker: "E29", text: "Go ahead Oakland Fire to Engine 29" },
    {
      speaker: "Dispatch",
      text: "Engine 29 we need the engine for a sick person at 7200 San Leandro near the agent's booth.",
    },
    {
      speaker: "E29",
      text: "Copy Oakland Fire. Engine 29 responding to 7200 San Leandro for a sick person.",
    },
    { speaker: "Dispatch", text: "Engine 29 Responding" },
  ],
};
