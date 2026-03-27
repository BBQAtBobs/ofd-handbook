"use client";

import { useState } from "react";
import { ladderCommands } from "@/data/ladders";

export function LadderCommandsCard() {
  const [expanded, setExpanded] = useState(false);
  const displayed = expanded ? ladderCommands : ladderCommands.slice(0, 12);

  return (
    <div className="rounded-xl bg-bg-card border border-border-light p-5 sm:p-6">
      <h2 className="font-heading font-bold text-lg text-primary mb-1">
        Ladder Commands
      </h2>
      <p className="text-xs text-muted mb-4">
        Standard verbal commands for ladder operations
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
        {displayed.map((cmd, i) => (
          <div
            key={i}
            className="py-1.5 border-b border-border-light/50 text-sm text-primary font-mono leading-relaxed"
          >
            {cmd}
          </div>
        ))}
      </div>

      {ladderCommands.length > 12 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-xs font-medium text-accent hover:underline"
        >
          {expanded
            ? "Show fewer"
            : `Show all ${ladderCommands.length} commands`}
        </button>
      )}
    </div>
  );
}
