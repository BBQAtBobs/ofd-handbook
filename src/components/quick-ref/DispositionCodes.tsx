"use client";

import { dispositionCodes } from "@/data/disposition-codes";

export function DispositionCodesCard() {
  return (
    <div className="rounded-xl bg-bg-card border border-border-light p-5 sm:p-6">
      <h2 className="font-heading font-bold text-lg text-primary mb-1">
        Disposition Codes
      </h2>
      <p className="text-xs text-muted mb-4">Call outcome abbreviations</p>

      <div className="grid grid-cols-1 gap-0.5">
        {dispositionCodes.map((code) => (
          <div
            key={code.code}
            className="flex items-baseline gap-3 py-1.5 border-b border-border-light/50 last:border-0"
          >
            <span className="font-mono font-semibold text-sm text-accent w-12 shrink-0">
              {code.code}
            </span>
            <span className="text-sm text-primary">{code.meaning}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
