import { phonetic } from "@/data/operations";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function PhoneticAlphabetCard() {
  return (
    <div className="rounded-xl bg-bg-card border border-border-light p-5 sm:p-6">
      <h2 className="font-heading font-bold text-lg text-primary mb-1">
        Phonetic Alphabet
      </h2>
      <p className="text-xs text-muted mb-4">NATO/ICAO phonetic alphabet</p>

      <div className="grid grid-cols-2 gap-x-6 gap-y-0.5">
        {phonetic.map((word, i) => (
          <div
            key={word}
            className="flex items-baseline gap-2 py-1 border-b border-border-light/50"
          >
            <span className="font-mono font-bold text-sm text-accent w-4">
              {letters[i]}
            </span>
            <span className="text-sm text-primary">{word}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
