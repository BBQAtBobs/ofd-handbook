import { stations } from "@/data/stations";
import { handTools } from "@/data/hand-tools";
import { powerTools } from "@/data/power-tools";
import { dispositionCodes } from "@/data/disposition-codes";
import { responseMatrix, resourceAbbreviations } from "@/data/response-matrix";
import { learningTracks } from "@/data/learning-tracks";
import { hoseTerminology } from "@/data/hose";
import { ladderTerminology, ladderCommands } from "@/data/ladders";
import { phonetic, knotTerminology } from "@/data/operations";

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  tags: string;
}

export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  // Stations
  stations.forEach((s) => {
    items.push({
      id: `station-${s.num}`,
      title: `Station ${s.num}`,
      description: `${s.addr}, Oakland CA ${s.zip} — ${[...s.engines, ...s.trucks].join(", ")}${s.special.length ? ` — ${s.special.join(", ")}` : ""}`,
      category: "Station",
      href: `/stations?s=${s.num}`,
      tags: `${s.notes} battalion ${s.bn} ${s.rescue.join(" ")} ${s.special.join(" ")}`,
    });
  });

  // Hand tools
  handTools.forEach((t) => {
    items.push({
      id: `tool-${t.name}`,
      title: t.name,
      description: t.description.slice(0, 120) + (t.description.length > 120 ? "..." : ""),
      category: "Hand Tool",
      href: "/equipment",
      tags: `${t.aka || ""} ${t.category} ${t.description}`,
    });
  });

  // Power tools
  powerTools.forEach((t) => {
    items.push({
      id: `power-${t.name}`,
      title: t.name,
      description: Object.entries(t.specs).slice(0, 3).map(([k, v]) => `${k}: ${v}`).join(" · "),
      category: "Power Tool",
      href: "/equipment",
      tags: `${t.category} ${Object.values(t.specs).join(" ")}`,
    });
  });

  // Disposition codes
  dispositionCodes.forEach((c) => {
    items.push({
      id: `code-${c.code}`,
      title: `${c.code} — ${c.meaning}`,
      description: c.meaning,
      category: "Disposition Code",
      href: "/quick-ref",
      tags: `disposition code ${c.code} ${c.meaning}`,
    });
  });

  // Response types
  responseMatrix.forEach((r) => {
    items.push({
      id: `response-${r.name}`,
      title: r.name,
      description: `1st Alarm: ${r.alarms[0].resources}`,
      category: "Response Matrix",
      href: "/quick-ref",
      tags: `response matrix alarm ${r.alarms.map((a) => a.resources).join(" ")}`,
    });
  });

  // Resource abbreviations
  Object.entries(resourceAbbreviations).forEach(([abbr, full]) => {
    items.push({
      id: `abbr-${abbr}`,
      title: `${abbr} — ${full}`,
      description: `Resource abbreviation used in response matrix`,
      category: "Abbreviation",
      href: "/quick-ref",
      tags: `abbreviation ${abbr} ${full} response`,
    });
  });

  // Learning tracks
  learningTracks.forEach((t) => {
    items.push({
      id: `track-${t.slug}`,
      title: t.title,
      description: t.description,
      category: "Learning Track",
      href: `/learn/${t.slug}`,
      tags: `${t.group} ${t.sections.join(" ")} ${t.description}`,
    });
  });

  // Hose terminology
  Object.entries(hoseTerminology).forEach(([term, def]) => {
    items.push({
      id: `hose-${term}`,
      title: term,
      description: def.slice(0, 120) + (def.length > 120 ? "..." : ""),
      category: "Hose Term",
      href: "/quick-ref",
      tags: `hose terminology ${term} ${def}`,
    });
  });

  // Ladder terminology
  Object.entries(ladderTerminology).forEach(([term, def]) => {
    items.push({
      id: `ladder-term-${term}`,
      title: term,
      description: def.slice(0, 120) + (def.length > 120 ? "..." : ""),
      category: "Ladder Term",
      href: "/quick-ref",
      tags: `ladder terminology ${term} ${def}`,
    });
  });

  // Knot terminology
  Object.entries(knotTerminology).forEach(([term, def]) => {
    items.push({
      id: `knot-${term}`,
      title: term,
      description: def,
      category: "Knots",
      href: "/quick-ref",
      tags: `knot rope ${term} ${def}`,
    });
  });

  // Phonetic alphabet
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  phonetic.forEach((word, i) => {
    items.push({
      id: `phonetic-${word}`,
      title: `${letters[i]} — ${word}`,
      description: "NATO/ICAO Phonetic Alphabet",
      category: "Phonetic",
      href: "/quick-ref",
      tags: `phonetic alphabet ${letters[i]} ${word}`,
    });
  });

  return items;
}
