import { stations, battalionInfo, departmentLeadership } from "./stations";
import { history, missionStatements, behavioralGuidelines, chainOfCommand, insignia, phoneNumbers, transportation, facilities } from "./department";
import { apparatus, apparatusNumbering } from "./apparatus";
import { responseMatrix, vegetationNotes, calFireResponse, resourceAbbreviations, structureFirePriorities, sizeUpComponents } from "./response-matrix";
import { enginePositions, engineRoles, truckPositions, structureFireRoles, scbaInfo, knots, knotTerminology, phonetic } from "./operations";
import { radioChannels, apx7000Instructions, bendixKingInstructions } from "./radio";
import { dispositionCodes, radioTrafficExample } from "./disposition-codes";
import { preconnects, rearHoseBed, standpipeBundles, hoseTerminology, hydrantCommands, buzzerCommands, sendingEngine, elkhartRamXD } from "./hose";
import { ladderTypes, ladderSizes, ladderFacts, truckToolColors, truckCrewSizes, ladderTerminology, ladderCommands } from "./ladders";
import { handTools, handToolImages, toolCategories, hydrantBucket, highriseBag, sprinklerBox, wildlandFittingBag, tags } from "./hand-tools";
import { powerTools, powerToolImages, powerToolCategories } from "./power-tools";
import { hydrantBodyColors, hydrantTopColors, hydrantCapColors, hydrantFacts, gatePotCovers, extinguishers } from "./hydrants";

export interface ToolCardItem {
  name: string;
  aka?: string;
  description: string;
  image?: string;
  category?: string;
}

export interface ContentBlock {
  type: "text" | "list" | "definition" | "table" | "callout" | "tool-cards";
  content?: string;
  items?: string[];
  definitions?: [string, string][];
  headers?: string[];
  rows?: string[][];
  tools?: ToolCardItem[];
}

export interface ContentSection {
  id: string;
  title: string;
  blocks: ContentBlock[];
}

const trackContentMap: Record<string, () => ContentSection[]> = {
  "history-culture": () => [
    {
      id: "history",
      title: "Department History",
      blocks: [
        { type: "text", content: `The Oakland Fire Department was officially formed on ${history.founded}, with its first house, the ${history.firstHouse}.` },
        { type: "text", content: "As Oakland grew, OFD absorbed neighboring volunteer departments and evolved into the diverse, skilled, courageous, and highly trained Department that protects Oakland today." },
        { type: "table", headers: ["Year", "Milestone"], rows: history.milestones.map(m => [String(m.year), m.event]) },
        { type: "text", content: `Source: ${history.source}` },
      ],
    },
    {
      id: "mission",
      title: "Mission Statements",
      blocks: [
        { type: "callout", content: "City of Oakland Mission Statement" },
        { type: "text", content: missionStatements.city },
        { type: "callout", content: "OFD Mission Statement" },
        { type: "text", content: missionStatements.department },
      ],
    },
    {
      id: "behavioral",
      title: "Behavioral Guidelines",
      blocks: [
        { type: "list", items: behavioralGuidelines },
      ],
    },
    {
      id: "chain-of-command",
      title: "Academy Chain of Command",
      blocks: [
        { type: "list", items: chainOfCommand },
        { type: "callout", content: "* Stop, Come to Attention, and Acknowledge Chief Officers *" },
      ],
    },
    {
      id: "insignia",
      title: "Fire Insignia & Rank Structure",
      blocks: [
        { type: "text", content: insignia.description },
        { type: "table", headers: ["Rank", "Bugles"], rows: insignia.ranks.map(r => [r.rank, String(r.bugles)]) },
      ],
    },
  ],

  "stations-battalions": () => [
    {
      id: "map",
      title: "Station Map & Addresses",
      blocks: [
        { type: "callout", content: "For the interactive station map, visit the Stations page." },
        { type: "table", headers: ["Station", "Address", "ZIP", "Battalion", "Type"], rows: stations.map(s => [`Station ${s.num}`, s.addr, s.zip, `Bn ${s.bn}`, s.type]) },
      ],
    },
    {
      id: "battalions",
      title: "Battalion Organization",
      blocks: [
        ...([2, 3, 4] as const).map(bn => ({
          type: "definition" as const,
          definitions: [
            [battalionInfo[bn].name, `A Shift: ${battalionInfo[bn].bcA} · B Shift: ${battalionInfo[bn].bcB || "TBD"} · C Shift: ${battalionInfo[bn].bcC}`],
          ] as [string, string][],
        })),
      ],
    },
    {
      id: "apparatus",
      title: "Apparatus at Each Station",
      blocks: [
        { type: "table", headers: ["Station", "Engines", "Trucks", "Rescue/Special"], rows: stations.map(s => [`Stn ${s.num}`, s.engines.join(", "), s.trucks.join(", ") || "—", [...s.rescue, ...s.special].join(", ") || "—"]) },
      ],
    },
    {
      id: "special",
      title: "Special Assignments",
      blocks: [
        { type: "table", headers: ["Station", "Assignment"], rows: stations.filter(s => s.special.length > 0).map(s => [`Station ${s.num}`, s.special.join(", ")]) },
      ],
    },
    {
      id: "facilities",
      title: "Department Facilities",
      blocks: [
        { type: "definition", definitions: facilities.map(f => [f.name, f.addr] as [string, string]) },
      ],
    },
    {
      id: "phones",
      title: "Phone Numbers",
      blocks: [
        { type: "text", content: "Department Numbers:" },
        { type: "definition", definitions: phoneNumbers.department.map(p => [p.name, p.number] as [string, string]) },
        { type: "text", content: "Alameda County Numbers:" },
        { type: "definition", definitions: phoneNumbers.alamedaCounty.map(p => [p.name, p.number] as [string, string]) },
      ],
    },
  ],

  "apparatus": () => [
    ...apparatus.map(a => ({
      id: a.name.toLowerCase().replace(/\s+/g, "-"),
      title: a.name,
      blocks: [
        { type: "text" as const, content: `Type: ${a.type}${a.capacity ? ` · Capacity: ${a.capacity}` : ""}${a.units ? ` · Units: ${a.units}` : ""}` },
        ...(a.notes ? [{ type: "text" as const, content: a.notes }] : []),
      ],
    })),
    {
      id: "numbering",
      title: "Apparatus Numbering System",
      blocks: [
        { type: "text", content: apparatusNumbering.historical },
        { type: "list", items: apparatusNumbering.examples },
        { type: "text", content: apparatusNumbering.current },
      ],
    },
  ],

  "response-matrix": () => [
    ...responseMatrix.map(r => ({
      id: r.name.toLowerCase().replace(/[\s\/]+/g, "-"),
      title: r.name,
      blocks: [
        { type: "table" as const, headers: ["Alarm", "Resources"], rows: r.alarms.map(a => [a.alarm, a.resources]) },
        ...(r.notes ? [{ type: "callout" as const, content: r.notes.join(" ") }] : []),
      ],
    })),
    {
      id: "vegetation-notes",
      title: "Vegetation Response Notes",
      blocks: [{ type: "list", items: vegetationNotes }],
    },
    {
      id: "cal-fire",
      title: "Cal Fire Response in MTZ",
      blocks: [
        { type: "table", headers: ["Level", "Resources"], rows: calFireResponse.map(c => [c.level, c.resources]) },
      ],
    },
    {
      id: "abbreviations",
      title: "Resource Abbreviations",
      blocks: [
        { type: "definition", definitions: Object.entries(resourceAbbreviations) as [string, string][] },
      ],
    },
  ],

  "roles-positions": () => [
    {
      id: "engine",
      title: "Engine Positions",
      blocks: [
        { type: "definition", definitions: Object.entries(enginePositions) as [string, string][] },
      ],
    },
    {
      id: "engine-roles",
      title: "Leadoff & Nozzle Roles",
      blocks: [
        { type: "definition", definitions: Object.entries(engineRoles) as [string, string][] },
      ],
    },
    {
      id: "truck",
      title: "Truck Positions",
      blocks: [
        { type: "definition", definitions: Object.entries(truckPositions) as [string, string][] },
      ],
    },
    {
      id: "structure-fire",
      title: "Structure Fire Role Assignments",
      blocks: [
        { type: "table", headers: ["Unit", "Role"], rows: structureFireRoles.map(r => [r.unit, r.role]) },
      ],
    },
    {
      id: "size-up",
      title: "Size-Up Components",
      blocks: [{ type: "list", items: sizeUpComponents }],
    },
    {
      id: "priorities",
      title: "Fire Priorities (RECEO)",
      blocks: [{ type: "list", items: structureFirePriorities }],
    },
  ],

  "radio-operations": () => [
    {
      id: "apx7000",
      title: "APX7000XE Quick Reference",
      blocks: [
        { type: "text", content: "Turn On/Off:" },
        { type: "list", items: apx7000Instructions.turnOnOff },
        { type: "text", content: "Select a Channel:" },
        { type: "list", items: apx7000Instructions.selectChannel },
        { type: "text", content: "Select a Zone:" },
        { type: "list", items: apx7000Instructions.selectZone },
      ],
    },
    {
      id: "channels",
      title: "Radio Channel Guide",
      blocks: [
        { type: "callout", content: "See the Quick Ref page for the full interactive channel table with zone filtering." },
        { type: "table", headers: ["Ch", "Zone A", "Zone B"], rows: radioChannels.slice(0, 10).map(c => [String(c.channel), c.zoneA, c.zoneB]) },
      ],
    },
    {
      id: "emergency",
      title: "Emergency Button Procedure",
      blocks: [
        { type: "list", items: apx7000Instructions.emergency },
        { type: "callout", content: apx7000Instructions.emergencyReset[0] },
        { type: "text", content: apx7000Instructions.emergencyReset[1] },
      ],
    },
    {
      id: "bendix",
      title: "Bendix King GPH CMD Operation",
      blocks: [
        { type: "text", content: `${bendixKingInstructions.model} — ${bendixKingInstructions.specs}` },
        { type: "text", content: `Power: ${bendixKingInstructions.power}` },
        { type: "text", content: "Changing Banks:" },
        { type: "list", items: bendixKingInstructions.changingBanks },
        { type: "text", content: "Command Group:" },
        { type: "list", items: bendixKingInstructions.commandGroup },
        { type: "text", content: `Lock Keypad: ${bendixKingInstructions.lockKeypad}` },
      ],
    },
    {
      id: "disposition",
      title: "Disposition Codes",
      blocks: [
        { type: "table", headers: ["Code", "Meaning"], rows: dispositionCodes.map(c => [c.code, c.meaning]) },
        { type: "text", content: "Example Radio Traffic:" },
        { type: "list", items: radioTrafficExample.lines.map(l => `${l.speaker}: ${l.text}`) },
      ],
    },
  ],

  "hose-operations": () => [
    {
      id: "terminology",
      title: "Hose Terminology",
      blocks: [
        { type: "definition", definitions: Object.entries(hoseTerminology).slice(0, 20) as [string, string][] },
      ],
    },
    {
      id: "preconnects",
      title: "Preconnects",
      blocks: [
        { type: "table", headers: ["Name", "Length", "Nozzle"], rows: preconnects.map(p => [p.name, p.length, p.nozzle]) },
      ],
    },
    {
      id: "hose-bed",
      title: "Rear Hose Bed Layout",
      blocks: [
        { type: "text", content: "Attack Side:" },
        ...rearHoseBed.attackSide.map(h => ({ type: "text" as const, content: `${h.name}: ${h.description}` })),
        { type: "text", content: "Supply Side:" },
        ...rearHoseBed.supplySide.map(h => ({ type: "text" as const, content: `${h.name}: ${h.description}` })),
      ],
    },
    {
      id: "standpipe",
      title: "Standpipe Bundles",
      blocks: [{ type: "list", items: standpipeBundles }],
    },
    {
      id: "commands",
      title: "Hydrant Commands & Buzzer Signals",
      blocks: [
        { type: "list", items: hydrantCommands },
        { type: "text", content: "Apparatus Buzzer Commands:" },
        { type: "table", headers: ["Beeps", "Meaning"], rows: buzzerCommands.map(b => [String(b.beeps), b.meaning]) },
        { type: "text", content: "Sending the Engine:" },
        { type: "list", items: sendingEngine },
      ],
    },
    {
      id: "ram-xd",
      title: "ELKHART RAM-XD",
      blocks: [
        { type: "text", content: elkhartRamXD.description },
        { type: "definition", definitions: Object.entries(elkhartRamXD.specs) as [string, string][] },
        { type: "list", items: elkhartRamXD.notes },
      ],
    },
  ],

  "ladders": () => [
    {
      id: "types",
      title: "5 Types of Ground Ladders",
      blocks: [{ type: "list", items: ladderTypes }],
    },
    {
      id: "sizes",
      title: "Ladder Sizes",
      blocks: [
        { type: "table", headers: ["Size", "Location"], rows: ladderSizes.map(l => [l.size, l.location]) },
        { type: "text", content: "* Fiberglass ladders only on select engines" },
      ],
    },
    {
      id: "facts",
      title: "Ladder Facts",
      blocks: [{ type: "list", items: ladderFacts }],
    },
    {
      id: "terminology",
      title: "Ladder Terminology A-Z",
      blocks: [
        { type: "definition", definitions: Object.entries(ladderTerminology).slice(0, 15) as [string, string][] },
      ],
    },
    {
      id: "commands",
      title: "Ladder Commands",
      blocks: [{ type: "list", items: ladderCommands }],
    },
    {
      id: "truck-colors",
      title: "Truck Tool Color Codes",
      blocks: [
        { type: "definition", definitions: Object.entries(truckToolColors) as [string, string][] },
      ],
    },
    {
      id: "crew-sizes",
      title: "Truck Crew Sizes",
      blocks: [
        { type: "text", content: `5-member trucks: ${truckCrewSizes.fiveMembers.join(", ")}` },
        { type: "text", content: `4-member trucks: ${truckCrewSizes.fourMembers.join(", ")}` },
      ],
    },
  ],

  "hand-tools": () => {
    const categories = Object.entries(toolCategories);
    return categories.map(([key, label]) => {
      const tools = handTools.filter(t => t.category === key);
      if (tools.length === 0) return null;
      return {
        id: key,
        title: label,
        blocks: [
          {
            type: "tool-cards" as const,
            tools: tools.map(t => ({
              name: t.name,
              aka: t.aka,
              description: t.description,
              image: handToolImages[t.name],
              category: label,
            })),
          },
        ],
      };
    }).filter(Boolean) as ContentSection[];
  },

  "power-tools": () => {
    const categories = Object.entries(powerToolCategories);
    return categories.map(([key, label]) => {
      const tools = powerTools.filter(t => t.category === key);
      if (tools.length === 0) return null;
      return {
        id: key,
        title: label,
        blocks: [
          {
            type: "tool-cards" as const,
            tools: tools.map(t => ({
              name: t.name,
              aka: undefined,
              description: Object.entries(t.specs).map(([k, v]) => `${k}: ${v}`).join(" · "),
              image: powerToolImages[t.name],
              category: label,
            })),
          },
        ],
      };
    }).filter(Boolean) as ContentSection[];
  },

  "ppe-scba": () => [
    {
      id: "g1",
      title: "MSA G1 SCBA Features",
      blocks: [
        { type: "text", content: `${scbaInfo.model} — ${scbaInfo.name}` },
        { type: "list", items: scbaInfo.features },
      ],
    },
    {
      id: "air",
      title: "Air Management",
      blocks: [{ type: "list", items: scbaInfo.airManagement }],
    },
    {
      id: "rit",
      title: "RIT Pack / Quick-Fill",
      blocks: [{ type: "text", content: scbaInfo.ritPack }],
    },
    {
      id: "extinguishers",
      title: "Extinguisher Types",
      blocks: [
        { type: "table", headers: ["Type", "Details"], rows: extinguishers.map(e => [e.name, [e.rating, e.pressure, e.capacity].filter(Boolean).join(" · ")]) },
      ],
    },
  ],

  "hydrants-water": () => [
    {
      id: "body",
      title: "Hydrant Body Colors (Owner)",
      blocks: [
        { type: "definition", definitions: hydrantBodyColors.map(h => [h.color, h.meaning] as [string, string]) },
      ],
    },
    {
      id: "top",
      title: "Top Colors (Volume GPM)",
      blocks: [
        { type: "definition", definitions: hydrantTopColors.map(h => [h.color, h.meaning] as [string, string]) },
      ],
    },
    {
      id: "cap",
      title: "Cap Colors (Pressure PSI)",
      blocks: [
        { type: "definition", definitions: hydrantCapColors.map(h => [h.color, h.meaning] as [string, string]) },
      ],
    },
    {
      id: "gate",
      title: "Gate Pot Covers",
      blocks: [
        { type: "definition", definitions: gatePotCovers.map(g => [g.color, g.meaning] as [string, string]) },
        { type: "callout", content: "Most gate valves in the system open in a clockwise direction." },
      ],
    },
    {
      id: "facts",
      title: "Oakland Water Distribution",
      blocks: [{ type: "list", items: hydrantFacts }],
    },
    {
      id: "bucket",
      title: "Hydrant Bucket Contents",
      blocks: [{ type: "list", items: hydrantBucket }],
    },
  ],

  "knots-rescue": () => [
    {
      id: "terminology",
      title: "Rope Terminology",
      blocks: [
        { type: "definition", definitions: Object.entries(knotTerminology) as [string, string][] },
      ],
    },
    ...knots.map(k => ({
      id: k.name.toLowerCase().replace(/\s+/g, "-"),
      title: k.name,
      blocks: [{ type: "text" as const, content: k.description }],
    })),
  ],
};

export function getTrackContent(slug: string): ContentSection[] {
  const generator = trackContentMap[slug];
  if (!generator) {
    return [{
      id: "coming-soon",
      title: "Content Coming Soon",
      blocks: [{ type: "text", content: "This learning track is being built. Check back soon for the full content." }],
    }];
  }
  return generator();
}
