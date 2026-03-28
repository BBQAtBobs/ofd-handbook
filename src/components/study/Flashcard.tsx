"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import type { Question, SessionResult } from "@/lib/questions";
import { stations } from "@/data/stations";

interface FlashcardProps {
  questions: Question[];
  category: string;
  onComplete: (result: SessionResult) => void;
}

export default function Flashcard({ questions, category, onComplete }: FlashcardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [known, setKnown] = useState<Question[]>([]);
  const [missed, setMissed] = useState<Question[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const current = questions[currentIndex];
  const total = questions.length;
  const progress = ((currentIndex) / total) * 100;

  const advance = useCallback(
    (knewIt: boolean) => {
      if (isTransitioning) return;
      setIsTransitioning(true);

      if (knewIt) {
        setKnown((prev) => [...prev, current]);
      } else {
        setMissed((prev) => [...prev, current]);
      }

      // Flip back first, then advance
      setIsFlipped(false);
      setTimeout(() => {
        const nextIndex = currentIndex + 1;
        if (nextIndex >= total) {
          const newKnown = knewIt ? [...known, current] : known;
          const newMissed = knewIt ? missed : [...missed, current];
          onComplete({
            mode: "flashcard",
            category: category as SessionResult["category"],
            totalQuestions: total,
            correct: newKnown.length,
            missed: newMissed,
            timestamp: Date.now(),
          });
        } else {
          setCurrentIndex(nextIndex);
        }
        setIsTransitioning(false);
      }, 350);
    },
    [currentIndex, total, current, known, missed, category, onComplete, isTransitioning]
  );

  if (!current) return null;

  return (
    <div>
      {/* Session bar */}
      <div className="sticky top-[3.5rem] z-20 bg-bg/95 backdrop-blur-sm border-b border-border-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-accent">
            {category === "mixed" ? "Mixed" : category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
          <span className="font-mono text-sm font-medium text-secondary">
            {currentIndex + 1} / {total}
          </span>
          <button
            onClick={() =>
              onComplete({
                mode: "flashcard",
                category: category as SessionResult["category"],
                totalQuestions: currentIndex,
                correct: known.length,
                missed,
                timestamp: Date.now(),
              })
            }
            className="text-xs text-muted hover:text-accent transition-colors"
          >
            End
          </button>
        </div>
        <div className="h-0.5 bg-border-light">
          <div
            className="h-full bg-accent rounded-full transition-all duration-400"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card area */}
      <div className="max-w-[28rem] mx-auto mt-8 sm:mt-12 px-4" style={{ perspective: "1200px" }}>
        <div
          className="relative w-full min-h-[300px] cursor-pointer"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
          onClick={() => !isTransitioning && setIsFlipped(!isFlipped)}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-xl bg-bg-card border border-border-light shadow-sm flex flex-col items-center justify-center p-8 text-center"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            <span className="font-heading text-[0.6rem] font-bold uppercase tracking-[0.15em] text-muted mb-5">
              {current.category === "stations"
                ? "Station Knowledge"
                : current.category === "trucks"
                  ? "Truck Knowledge"
                  : "Tool Knowledge"}
            </span>
            {current.image && (
              <div className="relative w-full max-w-[200px] h-[140px] mb-4 rounded-lg bg-bg-subtle overflow-hidden">
                <Image
                  src={current.image}
                  alt="Tool"
                  fill
                  className="object-contain p-2"
                  sizes="200px"
                />
              </div>
            )}
            <div className="font-heading font-bold text-lg sm:text-xl text-primary leading-snug">
              {current.question}
            </div>
            <div className="text-[0.7rem] text-muted mt-6 opacity-60 flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
              </svg>
              Tap to reveal
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-xl bg-bg-card border border-border-light shadow-sm flex flex-col items-center justify-center p-8 text-center"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="font-heading font-bold text-xl sm:text-2xl text-primary leading-snug">
              {current.answer}
            </div>
            {(() => {
              const station = current.id.startsWith("stations-addr-")
                ? stations.find((s) => s.addr === current.answer)
                : null;
              if (!station) return null;
              return (
                <>
                  <div className="w-10 h-0.5 rounded-full bg-border mx-auto mt-4 mb-2" />
                  <div className="text-sm text-secondary font-mono font-medium">
                    Battalion {station.bn} &middot; {station.type} House
                  </div>
                </>
              );
            })()}
            {current.tip && (
              <div className="mt-4 pt-3 border-t border-border-light/50 max-w-[280px]">
                <div className="flex items-start gap-2 text-xs text-muted leading-relaxed">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-px opacity-50">
                    <line x1="9" y1="18" x2="15" y2="18" />
                    <line x1="10" y1="22" x2="14" y2="22" />
                    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
                  </svg>
                  <span>{current.tip}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div
        className={`flex gap-3 max-w-[28rem] mx-auto mt-6 px-4 transition-all duration-300 ${
          isFlipped && !isTransitioning
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2.5 pointer-events-none"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      >
        <button
          onClick={() => advance(false)}
          className="flex-1 py-3.5 rounded-xl border-2 border-accent/20 text-accent font-heading font-bold text-sm hover:bg-accent-soft hover:border-accent/35 hover:shadow-sm active:scale-[0.97] transition-all"
        >
          Study Again
        </button>
        <button
          onClick={() => advance(true)}
          className="flex-1 py-3.5 rounded-xl border-2 border-green/20 text-green font-heading font-bold text-sm hover:bg-green-soft hover:border-green/35 hover:shadow-sm active:scale-[0.97] transition-all"
        >
          Knew It
        </button>
      </div>
    </div>
  );
}

