"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { generateQuestions, shuffleAnswers } from "@/lib/questions";
import type { Question } from "@/lib/questions";

interface TrackQuizProps {
  trackSlug: string;
  accentColor: string;
}

const LETTERS = ["A", "B", "C", "D"];

export default function TrackQuiz({ trackSlug, accentColor }: TrackQuizProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [missed, setMissed] = useState<Question[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasGenerated = useRef(false);

  // Generate questions on first expand
  useEffect(() => {
    if (isExpanded && !hasGenerated.current) {
      const q = generateQuestions({ trackSlug, count: 10 });
      setQuestions(q);
      hasGenerated.current = true;
    }
  }, [isExpanded, trackSlug]);

  // Set options when question changes
  useEffect(() => {
    if (questions.length > 0 && currentIndex < questions.length) {
      setOptions(shuffleAnswers(questions[currentIndex]));
      setSelected(null);
    }
  }, [currentIndex, questions]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSelect = useCallback(
    (index: number) => {
      if (selected !== null || !questions[currentIndex]) return;
      setSelected(index);

      const current = questions[currentIndex];
      const isCorrect = options[index] === current.answer;
      if (isCorrect) setScore((s) => s + 1);
      if (!isCorrect) setMissed((m) => [...m, current]);

      timerRef.current = setTimeout(() => {
        if (currentIndex + 1 >= questions.length) {
          setIsComplete(true);
        } else {
          setCurrentIndex((i) => i + 1);
        }
      }, 1000);
    },
    [selected, questions, currentIndex, options]
  );

  const handleRetry = () => {
    const q = generateQuestions({ trackSlug, count: 10 });
    setQuestions(q);
    setCurrentIndex(0);
    setScore(0);
    setMissed([]);
    setIsComplete(false);
    hasGenerated.current = true;
  };

  // Check if this track has enough questions
  const availableCount = generateQuestions({ trackSlug }).length;
  if (availableCount < 4) return null;

  const current = questions[currentIndex];
  const isAnswered = selected !== null;

  return (
    <div className="mt-12 rounded-xl border border-border-light overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-5 sm:px-6 py-5 bg-bg-card hover:bg-bg-subtle transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: accentColor + "12", color: accentColor }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
          </div>
          <span className="font-heading font-bold text-[0.95rem] text-primary">
            Quiz Yourself
          </span>
          <span className="font-mono text-[0.7rem] text-muted ml-1">
            10 questions
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-muted transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="px-5 sm:px-6 pb-6 border-t border-border-light bg-bg-card">
          {!isComplete && current ? (
            <>
              <div className="font-mono text-xs text-muted text-center pt-4 pb-3">
                Question {currentIndex + 1} of {questions.length}
              </div>
              {current.image && (
                <div className="relative w-full max-w-[160px] h-[100px] mx-auto mb-3 rounded-lg bg-bg-subtle overflow-hidden">
                  <Image
                    src={current.image}
                    alt="Tool"
                    fill
                    className="object-contain p-2"
                    sizes="160px"
                  />
                </div>
              )}
              <div className="font-heading font-bold text-base text-primary text-center pb-3">
                {current.question}
              </div>
              <div className="space-y-2">
                {options.map((option, i) => {
                  const isCorrectOption = option === current.answer;
                  const isSelectedOption = selected === i;
                  const isWrong = isSelectedOption && !isCorrectOption;

                  let stateClass = "";
                  if (isAnswered) {
                    if (isCorrectOption) {
                      stateClass = "border-green bg-green-soft";
                    } else if (isWrong) {
                      stateClass = "border-accent bg-accent-soft";
                    } else {
                      stateClass = "opacity-35";
                    }
                  }

                  return (
                    <button
                      key={`${currentIndex}-${i}`}
                      onClick={() => handleSelect(i)}
                      disabled={isAnswered}
                      className={`w-full text-left py-3 px-4 rounded-lg border-[1.5px] bg-bg-white text-sm font-medium text-primary flex items-center transition-all duration-150 select-none ${
                        isAnswered
                          ? stateClass
                          : "border-border-light hover:border-border hover:-translate-y-px active:scale-[0.98]"
                      }`}
                    >
                      <span
                        className={`font-mono font-bold text-[0.65rem] mr-2.5 w-5 h-5 flex items-center justify-center rounded shrink-0 transition-all ${
                          isAnswered && isCorrectOption
                            ? "bg-green text-white"
                            : isAnswered && isWrong
                              ? "bg-accent text-white"
                              : "bg-bg-subtle text-muted"
                        }`}
                      >
                        {LETTERS[i]}
                      </span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>
            </>
          ) : isComplete ? (
            <div className="pt-6 pb-2 text-center">
              <div
                className={`font-heading font-extrabold text-3xl ${
                  score / questions.length >= 0.8
                    ? "text-green"
                    : score / questions.length >= 0.6
                      ? "text-amber"
                      : "text-accent"
                }`}
              >
                {score}/{questions.length}
              </div>
              <div className="font-mono text-sm text-muted mt-1">
                {Math.round((score / questions.length) * 100)}% correct
              </div>
              {missed.length > 0 && (
                <div className="mt-4 text-left space-y-2">
                  {missed.map((q) => (
                    <div
                      key={q.id}
                      className="text-xs border-l-2 border-accent pl-3 py-1"
                    >
                      <span className="text-secondary">{q.question}</span>
                      <span className="font-heading font-bold text-primary ml-1">
                        {q.answer}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={handleRetry}
                className="mt-4 px-6 py-2.5 rounded-lg border border-border-light text-sm font-heading font-bold text-primary hover:bg-bg-warm hover:border-border transition-all active:scale-[0.97]"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="py-8 text-center text-sm text-muted">
              Loading questions...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
