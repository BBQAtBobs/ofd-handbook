import {
  hydrantBodyColors,
  hydrantTopColors,
  hydrantCapColors,
} from "@/data/hydrants";

const dotColors: Record<string, string> = {
  White: "#ffffff",
  Yellow: "#facc15",
  Green: "#22c55e",
  Red: "#ef4444",
  Purple: "#a855f7",
  Orange: "#f97316",
  Blue: "#3b82f6",
};

function ColorRow({
  color,
  meaning,
}: {
  color: string;
  meaning: string;
}) {
  return (
    <div className="flex items-center gap-3 py-1.5 border-b border-border-light/50 last:border-0">
      <div
        className="w-4 h-4 rounded-full border border-border shrink-0"
        style={{ backgroundColor: dotColors[color] || "#999" }}
      />
      <span className="font-medium text-sm text-primary w-16 shrink-0">
        {color}
      </span>
      <span className="text-sm text-secondary">{meaning}</span>
    </div>
  );
}

export function HydrantColorsCard() {
  return (
    <div className="rounded-xl bg-bg-card border border-border-light p-5 sm:p-6">
      <h2 className="font-heading font-bold text-lg text-primary mb-1">
        Hydrant Color Coding
      </h2>
      <p className="text-xs text-muted mb-4">
        Body = owner, Top = volume, Cap = pressure
      </p>

      <div className="space-y-4">
        <div>
          <div className="text-xs font-medium text-muted uppercase tracking-wider mb-2">
            Body Color (Owner)
          </div>
          {hydrantBodyColors.map((h) => (
            <ColorRow key={h.color} color={h.color} meaning={h.meaning} />
          ))}
        </div>

        <div>
          <div className="text-xs font-medium text-muted uppercase tracking-wider mb-2">
            Top Color (Volume)
          </div>
          {hydrantTopColors.map((h) => (
            <ColorRow key={h.color} color={h.color} meaning={h.meaning} />
          ))}
        </div>

        <div>
          <div className="text-xs font-medium text-muted uppercase tracking-wider mb-2">
            Cap Color (Pressure)
          </div>
          {hydrantCapColors.map((h) => (
            <ColorRow key={h.color} color={h.color} meaning={h.meaning} />
          ))}
        </div>
      </div>
    </div>
  );
}
