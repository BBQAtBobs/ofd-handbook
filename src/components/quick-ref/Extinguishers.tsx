import { extinguishers } from "@/data/hydrants";

export function ExtinguishersCard() {
  return (
    <div className="rounded-xl bg-bg-card border border-border-light p-5 sm:p-6">
      <h2 className="font-heading font-bold text-lg text-primary mb-1">
        Extinguishers
      </h2>
      <p className="text-xs text-muted mb-4">
        Types carried on OFD apparatus
      </p>

      <div className="space-y-3">
        {extinguishers.map((ext) => (
          <div
            key={ext.name}
            className="p-3 rounded-lg bg-bg-subtle"
          >
            <div className="font-heading font-bold text-sm text-primary mb-1">
              {ext.name}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-secondary">
              {ext.rating && <span>Rating: {ext.rating}</span>}
              {ext.pressure && <span>Pressure: {ext.pressure}</span>}
              {ext.capacity && <span>Capacity: {ext.capacity}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
