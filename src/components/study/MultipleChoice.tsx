"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import type { Question, SessionResult } from "@/lib/questions";
import { shuffleAnswers } from "@/lib/questions";

interface MultipleChoiceProps {
  questions: Question[];
  category: string;
  onComplete: (result: SessionResult) => void;
}

const LETTERS = ["A", "B", "C", "D"];

export default function MultipleChoice({
  questions,
  category,
  onComplete,
}: MultipleChoiceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState<Question[]>([]);
  const [isSliding, setIsSliding] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const current = questions[currentIndex];
  const total = questions.length;
  const progress = (currentIndex / total) * 100;
  const isAnswered = selected !== null;

  // Generate shuffled options when question changes
  useEffect(() => {
    if (current) {
      setOptions(shuffleAnswers(current));
      setSelected(null);
      setIsSliding(true);
      // Small delay to trigger slide-in animation
      requestAnimationFrame(() => setIsSliding(false));
    }
  }, [currentIndex, current]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSelect = useCallback(
    (index: number) => {
      if (isAnswered || !current) return;
      setSelected(index);

      const isCorrect = options[index] === current.answer;
      const newScore = isCorrect ? score + 1 : score;
      const newMissed = isCorrect ? missed : [...missed, current];

      setScore(newScore);
      if (!isCorrect) setMissed(newMissed);

      // Auto-advance after delay
      timerRef.current = setTimeout(() => {
        const nextIndex = currentIndex + 1;
        if (nextIndex >= total) {
          onComplete({
            mode: "multiple-choice",
            category: category as SessionResult["category"],
            totalQuestions: total,
            correct: newScore,
            missed: newMissed,
            timestamp: Date.now(),
          });
        } else {
          setCurrentIndex(nextIndex);
        }
      }, 1200);
    },
    [isAnswered, current, options, score, missed, currentIndex, total, category, onComplete]
  );

  if (!current) return null;

  const answeredCount = currentIndex + (isAnswered ? 1 : 0);

  return (
    <div>
      {/* Session bar */}
      <div className="sticky top-[3.5rem] z-20 bg-bg/95 backdrop-blur-sm border-b border-border-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <span
            className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.1em]"
            style={{
              color:
                category === "trucks"
                  ? "var(--color-blue)"
                  : category === "tools"
                    ? "var(--color-amber)"
                    : "var(--color-accent)",
            }}
          >
            {category === "mixed" ? "Mixed" : category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
          <span className="font-mono text-sm font-medium text-secondary">
            {currentIndex + 1} / {total}
          </span>
          <button
            onClick={() =>
              onComplete({
                mode: "multiple-choice",
                category: category as SessionResult["category"],
                totalQuestions: answeredCount,
                correct: score,
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
            className="h-full rounded-full transition-all duration-400"
            style={{
              width: `${progress}%`,
              backgroundColor:
                category === "trucks"
                  ? "var(--color-blue)"
                  : category === "tools"
                    ? "var(--color-amber)"
                    : "var(--color-accent)",
            }}
          />
        </div>
      </div>

      {/* Question area */}
      <div className={`max-w-[28rem] mx-auto mt-8 sm:mt-12 px-4 ${isSliding ? "" : "animate-slide-in"}`}>
        {/* Question card */}
        <div className="rounded-xl bg-bg-card border border-border-light p-6 sm:p-8 text-center relative shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-bg-white border-[1.5px] border-border-light shadow-md flex items-center justify-center font-mono font-bold text-[0.75rem] text-primary">
            {score}/{answeredCount}
          </div>
          {current.image && (
            <div className="relative w-full max-w-[200px] h-[140px] mx-auto mb-4 rounded-lg bg-bg-subtle overflow-hidden">
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
        </div>

        {/* Options */}
        <div className="grid gap-2.5 mt-4">
          {options.map((option, i) => {
            const isCorrectOption = option === current.answer;
            const isSelectedOption = selected === i;
            const isWrong = isSelectedOption && !isCorrectOption;

            let stateClass = "";
            if (isAnswered) {
              if (isCorrectOption) {
                stateClass =
                  "border-green bg-green-soft shadow-[0_0_0_1px_rgba(46,139,87,0.15)]";
              } else if (isWrong) {
                stateClass = "border-accent bg-accent-soft animate-wrong-shake";
              } else {
                stateClass = "opacity-35 pointer-events-none";
              }
            }

            return (
              <button
                key={`${currentIndex}-${i}`}
                onClick={() => handleSelect(i)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-xl border-2 bg-bg-card text-sm font-medium text-primary flex items-center min-h-[3.25rem] transition-all duration-150 select-none ${
                  isAnswered
                    ? stateClass
                    : "border-border-light hover:border-border hover:bg-bg-white hover:shadow-sm hover:-translate-y-px active:translate-y-0 active:scale-[0.98]"
                }`}
                style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)" }}
              >
                <span
                  className={`font-mono font-bold text-[0.75rem] mr-3 w-6 h-6 flex items-center justify-center rounded-[5px] shrink-0 transition-all ${
                    isAnswered && isCorrectOption
                      ? "bg-green text-white"
                      : isAnswered && isWrong
                        ? "bg-accent text-white"
                        : "bg-bg-subtle text-muted"
                  }`}
                >
                  {LETTERS[i]}
                </span>
                <span className="flex-1">{option}</span>
                {isAnswered && isCorrectOption && (
                  <span className="ml-auto text-green font-bold text-sm">&#10003;</span>
                )}
                {isAnswered && isWrong && (
                  <span className="ml-auto text-accent font-bold text-sm">&#10007;</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes wrongShake {
          0%,
          100% {
            transform: translateX(0);
          }
          20% {
            transform: translateX(-4px);
          }
          40% {
            transform: translateX(4px);
          }
          60% {
            transform: translateX(-3px);
          }
          80% {
            transform: translateX(2px);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        .animate-wrong-shake {
          animation: wrongShake 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
      `}</style>
    </div>
  );
}
