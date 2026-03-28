"use client";

import { useEffect, useState } from "react";
import type { SessionResult } from "@/lib/questions";
import { saveSessionResult } from "@/lib/study-progress";

interface SessionResultsProps {
  results: SessionResult;
  onRetry: () => void;
  onNewSession: () => void;
}

export default function SessionResults({
  results,
  onRetry,
  onNewSession,
}: SessionResultsProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const [hasSaved, setHasSaved] = useState(false);

  const pct =
    results.totalQuestions > 0
      ? Math.round((results.correct / results.totalQuestions) * 100)
      : 0;

  const scoreColor =
    pct >= 80
      ? "text-green"
      : pct >= 60
        ? "text-amber"
        : "text-accent";

  // Count-up animation
  useEffect(() => {
    const target = results.correct;
    if (target === 0) return;
    const duration = 600;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [results.correct]);

  // Save to localStorage once
  useEffect(() => {
    if (!hasSaved && results.totalQuestions > 0) {
      saveSessionResult(results);
      setHasSaved(true);
    }
  }, [results, hasSaved]);

  const categoryLabel =
    results.category === "mixed"
      ? "Mixed"
      : results.category.charAt(0).toUpperCase() + results.category.slice(1);
  const modeLabel =
    results.mode === "flashcard" ? "Flashcard" : "Multiple Choice";

  return (
    <div className="max-w-[28rem] mx-auto px-4 pt-12 pb-16 text-center animate-fade-in">
      {/* Score */}
      <div
        className={`font-heading font-extrabold leading-none tracking-tight ${scoreColor}`}
        style={{ fontSize: "clamp(3.5rem, 12vw, 4.5rem)", letterSpacing: "-0.03em" }}
      >
        {displayScore}
      </div>
      <div className="font-mono font-semibold text-lg text-secondary mt-1">
        {pct}%
      </div>
      <div className="font-mono text-sm text-muted mt-1">
        {results.correct} of {results.totalQuestions} correct
      </div>

      {/* Meta */}
      <div className="flex justify-center gap-6 mt-4 font-mono text-[0.7rem] text-muted uppercase tracking-wider">
        <span>{categoryLabel}</span>
        <span>{modeLabel}</span>
        <span>{results.totalQuestions} questions</span>
      </div>

      {/* Missed questions */}
      {results.missed.length > 0 && (
        <div className="mt-8 rounded-xl bg-bg-card border border-border-light overflow-hidden text-left">
          <div className="px-5 py-3.5 border-b border-border-light flex items-center justify-between">
            <span className="font-heading font-bold text-sm text-primary">
              Missed Questions
            </span>
            <span className="font-mono text-[0.7rem] font-semibold text-accent bg-accent-soft px-2 py-0.5 rounded-md">
              {results.missed.length}
            </span>
          </div>
          {results.missed.map((q, i) => (
            <div
              key={q.id}
              className={`px-5 py-3.5 border-l-2 border-accent ${
                i < results.missed.length - 1
                  ? "border-b border-b-border-light/50"
                  : ""
              }`}
              style={{ paddingLeft: "calc(1.25rem - 2px)" }}
            >
              <div className="text-sm text-secondary">{q.question}</div>
              <div className="font-heading font-bold text-sm text-primary mt-1">
                {q.answer}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        {results.missed.length > 0 && (
          <button
            onClick={onRetry}
            className="flex-1 py-3.5 rounded-xl border-2 border-accent/20 bg-transparent text-accent font-heading font-bold text-sm text-center hover:bg-accent-soft hover:border-accent/30 hover:shadow-sm hover:-translate-y-px active:translate-y-0 active:scale-[0.97] transition-all"
          >
            Retry Missed
          </button>
        )}
        <button
          onClick={onNewSession}
          className="flex-1 py-3.5 rounded-xl border-2 border-transparent bg-accent text-white font-heading font-bold text-sm text-center shadow-[0_1px_2px_rgba(184,53,26,0.15)] hover:bg-[#a02e16] hover:shadow-[0_4px_12px_rgba(184,53,26,0.2)] hover:-translate-y-px active:translate-y-0 active:scale-[0.97] transition-all"
        >
          New Session
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
      `}</style>
    </div>
  );
}
