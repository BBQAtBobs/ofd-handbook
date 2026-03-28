"use client";

import { useState, useEffect, useCallback } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Flashcard from "@/components/study/Flashcard";
import MultipleChoice from "@/components/study/MultipleChoice";
import SessionResults from "@/components/study/SessionResults";
import {
  generateQuestions,
  getAllCategories,
  getSubtopics,
  type Question,
  type QuestionCategory,
  type StudyMode,
  type SessionResult,
} from "@/lib/questions";
import { getLastScores, resetProgress } from "@/lib/study-progress";

type Phase = "setup" | "session" | "results";

// ─── Icons ───────────────────────────────────────────────────────────

function StationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function TruckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}
function ToolIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}
function MixedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 3 21 3 21 8" />
      <line x1="4" y1="20" x2="21" y2="3" />
      <polyline points="21 16 21 21 16 21" />
      <line x1="15" y1="15" x2="21" y2="21" />
      <line x1="4" y1="4" x2="9" y2="9" />
    </svg>
  );
}

const CATEGORY_CONFIG: Record<
  string,
  { color: string; colorSoft: string; icon: () => React.ReactNode }
> = {
  stations: { color: "var(--color-accent)", colorSoft: "var(--color-accent-soft)", icon: StationIcon },
  trucks: { color: "var(--color-blue)", colorSoft: "var(--color-blue-soft)", icon: TruckIcon },
  tools: { color: "var(--color-amber)", colorSoft: "var(--color-amber-soft)", icon: ToolIcon },
  mixed: { color: "var(--color-green)", colorSoft: "var(--color-green-soft)", icon: MixedIcon },
};

// ─── Page ────────────────────────────────────────────────────────────

export default function StudyPage() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [category, setCategory] = useState<QuestionCategory | "mixed">("stations");
  const [selectedSubtopics, setSelectedSubtopics] = useState<string[]>([]);
  const [mode, setMode] = useState<StudyMode>("flashcard");
  const [count, setCount] = useState<number | "all">(10);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [results, setResults] = useState<SessionResult | null>(null);
  const [lastScores, setLastScores] = useState<
    Record<string, { correct: number; total: number } | null>
  >({});

  const categories = getAllCategories();
  const totalMixed = categories.reduce((sum, c) => sum + c.count, 0);

  // Get subtopics for the selected category
  const availableSubtopics =
    category !== "mixed" ? getSubtopics(category) : [];
  const allSubtopicValues = availableSubtopics.map((s) => s.value);

  // When category changes, reset subtopics to "all selected"
  const handleCategoryChange = useCallback(
    (cat: QuestionCategory | "mixed") => {
      setCategory(cat);
      setSelectedSubtopics([]); // empty = all
    },
    []
  );

  // Subtopic toggle logic: empty array means "all selected"
  const isAllSubtopicsSelected =
    selectedSubtopics.length === 0 ||
    selectedSubtopics.length === allSubtopicValues.length;

  const toggleSubtopic = useCallback(
    (subtopic: string) => {
      setSelectedSubtopics((prev) => {
        // If currently "all" (empty), focus on just this subtopic
        if (prev.length === 0) {
          return [subtopic];
        }
        // If this was the only one selected, go back to all
        if (prev.length === 1 && prev[0] === subtopic) {
          return [];
        }
        // Toggle normally
        if (prev.includes(subtopic)) {
          return prev.filter((s) => s !== subtopic);
        }
        // If adding this would select all, reset to empty (= all)
        const next = [...prev, subtopic];
        if (next.length === allSubtopicValues.length) return [];
        return next;
      });
    },
    [allSubtopicValues]
  );

  const isSubtopicSelected = (subtopic: string) =>
    selectedSubtopics.length === 0 || selectedSubtopics.includes(subtopic);

  // Count questions for current selection
  const selectedQuestionCount =
    category === "mixed"
      ? totalMixed
      : isAllSubtopicsSelected
        ? categories.find((c) => c.value === category)?.count ?? 0
        : generateQuestions({
            category,
            subtopics: selectedSubtopics,
          }).length;

  // Load last scores from localStorage
  useEffect(() => {
    setLastScores(getLastScores());
  }, [phase]);

  const startSession = useCallback(() => {
    const q = generateQuestions({
      category: category === "mixed" ? "mixed" : category,
      subtopics:
        category !== "mixed" && !isAllSubtopicsSelected
          ? selectedSubtopics
          : undefined,
      count: count === "all" ? undefined : count,
    });
    if (q.length === 0) return;
    setQuestions(q);
    setResults(null);
    setPhase("session");
  }, [category, selectedSubtopics, isAllSubtopicsSelected, count]);

  const handleComplete = useCallback((result: SessionResult) => {
    setResults(result);
    setPhase("results");
  }, []);

  const handleRetry = useCallback(() => {
    if (!results || results.missed.length === 0) return;
    setQuestions(results.missed);
    setResults(null);
    setPhase("session");
  }, [results]);

  const handleNewSession = useCallback(() => {
    setPhase("setup");
  }, []);

  const handleReset = useCallback(() => {
    resetProgress();
    setLastScores({});
  }, []);

  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* ─── Setup ─── */}
        {phase === "setup" && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
            <div className="text-sm font-mono font-semibold text-accent tracking-wider uppercase mb-2">
              Study
            </div>
            <h1 className="heading text-3xl sm:text-4xl text-primary mb-3">
              Test Your Knowledge
            </h1>
            <p className="text-secondary max-w-xl">
              Choose a category, pick your mode, and start drilling.
            </p>

            {/* Category */}
            <div className="font-heading text-[0.65rem] font-bold uppercase tracking-[0.15em] text-muted mb-3 mt-8">
              Category
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(
                [
                  ...categories.map((c) => ({
                    value: c.value,
                    label: c.label,
                    count: c.count,
                  })),
                  { value: "mixed" as const, label: "Mixed", count: totalMixed },
                ] as { value: QuestionCategory | "mixed"; label: string; count: number }[]
              ).map((cat) => {
                const config = CATEGORY_CONFIG[cat.value];
                const isSelected = category === cat.value;
                const Icon = config.icon;
                return (
                  <button
                    key={cat.value}
                    onClick={() => handleCategoryChange(cat.value)}
                    className={`relative p-[1.125rem] rounded-xl bg-bg-card border-2 cursor-pointer transition-all duration-200 text-left select-none hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)] active:translate-y-0 active:scale-[0.98] ${
                      isSelected
                        ? "-translate-y-px shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                        : "border-border-light hover:border-border"
                    }`}
                    style={{
                      borderColor: isSelected ? config.color : undefined,
                      backgroundColor: isSelected ? config.colorSoft : undefined,
                    }}
                  >
                    {isSelected && (
                      <span
                        className="absolute top-2.5 right-2.5 w-[1.125rem] h-[1.125rem] rounded-full flex items-center justify-center animate-check-pop"
                        style={{ backgroundColor: config.color }}
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    )}
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-all duration-200"
                      style={{
                        backgroundColor: isSelected ? config.color : config.colorSoft,
                        color: isSelected ? "white" : config.color,
                      }}
                    >
                      <Icon />
                    </div>
                    <div className="font-heading font-bold text-sm text-primary">
                      {cat.label}
                    </div>
                    <div className="font-mono text-[0.7rem] text-muted mt-0.5">
                      {cat.count} questions
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Subtopics */}
            {category !== "mixed" && availableSubtopics.length > 1 && (
              <>
                <div className="font-heading text-[0.65rem] font-bold uppercase tracking-[0.15em] text-muted mb-3 mt-6">
                  Focus
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedSubtopics([])}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 select-none border ${
                      isAllSubtopicsSelected
                        ? "text-white border-transparent shadow-sm"
                        : "bg-bg-card border-border-light text-secondary hover:border-border hover:text-primary"
                    }`}
                    style={
                      isAllSubtopicsSelected
                        ? { backgroundColor: CATEGORY_CONFIG[category].color }
                        : undefined
                    }
                  >
                    All ({categories.find((c) => c.value === category)?.count})
                  </button>
                  {availableSubtopics.map((sub) => {
                    const active = isSubtopicSelected(sub.value) && !isAllSubtopicsSelected;
                    return (
                      <button
                        key={sub.value}
                        onClick={() => toggleSubtopic(sub.value)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 select-none border ${
                          active
                            ? "text-white border-transparent shadow-sm"
                            : "bg-bg-card border-border-light text-secondary hover:border-border hover:text-primary"
                        }`}
                        style={
                          active
                            ? { backgroundColor: CATEGORY_CONFIG[category].color }
                            : undefined
                        }
                      >
                        {sub.value} ({sub.count})
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* Mode */}
            <div className="font-heading text-[0.65rem] font-bold uppercase tracking-[0.15em] text-muted mb-3 mt-8">
              Mode
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(
                [
                  {
                    value: "flashcard" as const,
                    name: "Flashcards",
                    desc: "Flip & self-grade",
                    difficulty: "LEARN",
                    diffColor: "var(--color-green)",
                    diffBg: "var(--color-green-soft)",
                  },
                  {
                    value: "multiple-choice" as const,
                    name: "Multiple Choice",
                    desc: "Pick the right answer",
                    difficulty: "PRACTICE",
                    diffColor: "var(--color-blue)",
                    diffBg: "var(--color-blue-soft)",
                  },
                ] as const
              ).map((m) => {
                const isSelected = mode === m.value;
                return (
                  <button
                    key={m.value}
                    onClick={() => setMode(m.value)}
                    className={`relative p-5 rounded-xl bg-bg-card border-2 cursor-pointer transition-all duration-200 text-left select-none flex items-start gap-4 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)] active:translate-y-0 active:scale-[0.98] ${
                      isSelected
                        ? "border-accent bg-accent-soft -translate-y-px shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                        : "border-border-light hover:border-border"
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-3 right-3 w-[1.125rem] h-[1.125rem] rounded-full bg-accent flex items-center justify-center animate-check-pop">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    )}
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 ${
                        isSelected
                          ? "bg-accent text-white shadow-[0_2px_8px_rgba(184,53,26,0.25)]"
                          : "bg-bg-subtle text-secondary"
                      }`}
                    >
                      {m.value === "flashcard" ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="M12 4v16" />
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 11l3 3L22 4" />
                          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="font-heading font-bold text-[0.95rem] text-primary">
                        {m.name}
                      </div>
                      <div className="text-xs text-secondary mt-0.5">{m.desc}</div>
                      <span
                        className="inline-block font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] mt-1.5 px-2 py-0.5 rounded"
                        style={{ backgroundColor: m.diffBg, color: m.diffColor }}
                      >
                        {m.difficulty}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Count selector */}
            <div className="font-heading text-[0.65rem] font-bold uppercase tracking-[0.15em] text-muted mb-3 mt-8">
              Questions
            </div>
            <div className="inline-flex bg-bg-subtle border border-border-light rounded-lg p-[3px]">
              {([10, 20, "all"] as const).map((v) => {
                const isSelected = count === v;
                return (
                  <button
                    key={String(v)}
                    onClick={() => setCount(v)}
                    className={`relative z-[1] px-6 py-2 rounded-[calc(0.625rem-3px)] font-mono text-sm transition-all duration-200 select-none active:scale-[0.97] ${
                      isSelected
                        ? "bg-bg-white text-primary font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.03)]"
                        : "text-muted font-medium hover:text-secondary"
                    }`}
                  >
                    {v === "all" ? "All" : v}
                  </button>
                );
              })}
            </div>

            {/* Start */}
            <div className="mt-8">
              <button
                onClick={startSession}
                className="w-full sm:w-auto px-8 py-[0.9375rem] rounded-xl bg-accent text-white font-heading font-bold text-sm tracking-wide shadow-[0_1px_2px_rgba(184,53,26,0.15)] hover:bg-[#a02e16] hover:shadow-[0_4px_12px_rgba(184,53,26,0.2)] hover:-translate-y-px active:translate-y-0 active:scale-[0.98] transition-all"
              >
                Start Studying
              </button>
            </div>

            {/* History */}
            {Object.values(lastScores).some((v) => v !== null) && (
              <div className="mt-10 pt-8 border-t border-border-light">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-heading font-bold text-sm text-primary">
                    Recent Progress
                  </span>
                  <button
                    onClick={handleReset}
                    className="font-mono text-[0.65rem] text-muted hover:text-accent transition-colors"
                  >
                    Reset
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {categories.map((cat) => {
                    const config = CATEGORY_CONFIG[cat.value];
                    const score = lastScores[cat.value];
                    const pct = score ? (score.correct / score.total) * 100 : 0;
                    return (
                      <div
                        key={cat.value}
                        className="p-4 rounded-lg bg-bg-card border border-border-light"
                      >
                        <div className="flex items-center gap-2 mb-2.5">
                          <div
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: config.color }}
                          />
                          <span className="font-heading text-[0.7rem] font-semibold text-secondary">
                            {cat.label}
                          </span>
                        </div>
                        {score ? (
                          <div className="font-mono font-semibold text-xl text-primary leading-none mb-2">
                            {score.correct}
                            <span className="font-normal text-muted text-sm">
                              /{score.total}
                            </span>
                          </div>
                        ) : (
                          <div className="font-mono text-lg text-muted leading-none mb-2">
                            &mdash;
                          </div>
                        )}
                        <div className="h-[3px] bg-border-light rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: config.color,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── Session ─── */}
        {phase === "session" && questions.length > 0 && (
          <>
            {mode === "flashcard" ? (
              <Flashcard
                questions={questions}
                category={category}
                onComplete={handleComplete}
              />
            ) : (
              <MultipleChoice
                questions={questions}
                category={category}
                onComplete={handleComplete}
              />
            )}
          </>
        )}

        {/* ─── Results ─── */}
        {phase === "results" && results && (
          <SessionResults
            results={results}
            onRetry={handleRetry}
            onNewSession={handleNewSession}
          />
        )}
      </main>
      {phase === "setup" && <Footer />}

      <style jsx>{`
        @keyframes checkPop {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-check-pop {
          animation: checkPop 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </>
  );
}
