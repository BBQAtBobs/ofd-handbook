"use client";

import { useState } from "react";
import {
  responseMatrix,
  resourceAbbreviations,
} from "@/data/response-matrix";

export function ResponseMatrixCard() {
  const [activeType, setActiveType] = useState(0);
  const response = responseMatrix[activeType];

  return (
    <div className="rounded-xl bg-bg-card border border-border-light p-5 sm:p-6">
      <h2 className="font-heading font-bold text-lg text-primary mb-1">
        Response Matrix
      </h2>
      <p className="text-xs text-muted mb-4">
        Resources dispatched by alarm level
      </p>

      {/* Type selector */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {responseMatrix.map((r, i) => (
          <button
            key={r.name}
            onClick={() => setActiveType(i)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              activeType === i
                ? "bg-accent text-white"
                : "bg-bg-subtle text-secondary hover:bg-bg-warm"
            }`}
          >
            {r.name}
          </button>
        ))}
      </div>

      {/* Alarm table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-light">
              <th className="text-left py-2 pr-4 text-xs font-medium text-muted uppercase tracking-wider">
                Alarm
              </th>
              <th className="text-left py-2 text-xs font-medium text-muted uppercase tracking-wider">
                Resources
              </th>
            </tr>
          </thead>
          <tbody>
            {response.alarms.map((alarm) => (
              <tr
                key={alarm.alarm}
                className="border-b border-border-light/50"
              >
                <td className="py-2.5 pr-4 font-mono font-semibold text-accent text-sm">
                  {alarm.alarm}
                </td>
                <td className="py-2.5 font-mono text-sm text-primary">
                  {alarm.resources}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {response.notes && (
        <p className="mt-3 text-xs text-muted italic">
          {response.notes.join(" ")}
        </p>
      )}

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-border-light">
        <div className="text-xs text-muted font-medium mb-1.5">
          Resource Key
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {Object.entries(resourceAbbreviations).map(([abbr, full]) => (
            <span key={abbr} className="text-xs text-secondary">
              <span className="font-mono font-semibold text-primary">
                {abbr}
              </span>{" "}
              = {full}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
