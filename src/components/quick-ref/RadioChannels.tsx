"use client";

import { useState } from "react";
import { radioChannels } from "@/data/radio";

const zones = [
  { key: "zoneA" as const, label: "Zone A" },
  { key: "zoneB" as const, label: "Zone B" },
  { key: "zoneD" as const, label: "Zone D" },
  { key: "zoneUU" as const, label: "Zone UU" },
];

export function RadioChannelsCard() {
  const [activeZone, setActiveZone] = useState<
    "zoneA" | "zoneB" | "zoneD" | "zoneUU"
  >("zoneA");

  return (
    <div className="rounded-xl bg-bg-card border border-border-light p-5 sm:p-6">
      <h2 className="font-heading font-bold text-lg text-primary mb-1">
        Radio Channels
      </h2>
      <p className="text-xs text-muted mb-4">APX7000XE channel assignments by zone</p>

      <div className="flex gap-1.5 mb-4">
        {zones.map((z) => (
          <button
            key={z.key}
            onClick={() => setActiveZone(z.key)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              activeZone === z.key
                ? "bg-blue text-white"
                : "bg-bg-subtle text-secondary hover:bg-bg-warm"
            }`}
          >
            {z.label}
          </button>
        ))}
      </div>

      <div className="space-y-0.5">
        {radioChannels.map((ch) => (
          <div
            key={ch.channel}
            className="flex items-center gap-3 py-1.5 border-b border-border-light/50 last:border-0"
          >
            <span className="font-mono font-semibold text-sm text-blue w-6 text-right shrink-0">
              {ch.channel}
            </span>
            <span className="font-mono text-sm text-primary">
              {ch[activeZone]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
