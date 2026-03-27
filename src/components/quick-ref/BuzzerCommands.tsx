import { buzzerCommands, sendingEngine } from "@/data/hose";

export function BuzzerCommandsCard() {
  return (
    <div className="rounded-xl bg-bg-card border border-border-light p-5 sm:p-6">
      <h2 className="font-heading font-bold text-lg text-primary mb-1">
        Buzzer Commands
      </h2>
      <p className="text-xs text-muted mb-4">
        Apparatus communication signals
      </p>

      <div className="space-y-2 mb-5">
        {buzzerCommands.map((cmd) => (
          <div
            key={cmd.beeps}
            className="flex items-center gap-4 py-2 px-3 rounded-lg bg-bg-subtle"
          >
            <div className="flex gap-1">
              {Array.from({ length: cmd.beeps }).map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full bg-accent"
                />
              ))}
            </div>
            <span className="font-heading font-bold text-sm text-primary">
              {cmd.meaning}
            </span>
          </div>
        ))}
      </div>

      <div>
        <div className="text-xs font-medium text-muted uppercase tracking-wider mb-2">
          Sending the Engine
        </div>
        <ol className="space-y-1">
          {sendingEngine.map((step, i) => (
            <li key={i} className="flex gap-2 text-sm text-secondary">
              <span className="font-mono text-xs text-muted shrink-0">
                {i + 1}.
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
