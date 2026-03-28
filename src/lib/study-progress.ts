import type { SessionResult, QuestionCategory } from "./questions";

const STORAGE_KEY = "ofd-study-progress";

export interface StudyProgress {
  sessions: SessionResult[];
  questionHistory: Record<string, { seen: number; correct: number }>;
}

function defaultProgress(): StudyProgress {
  return { sessions: [], questionHistory: {} };
}

export function getProgress(): StudyProgress {
  if (typeof window === "undefined") return defaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    return JSON.parse(raw) as StudyProgress;
  } catch {
    return defaultProgress();
  }
}

export function saveSessionResult(result: SessionResult): void {
  if (typeof window === "undefined") return;
  try {
    const progress = getProgress();

    // Append session (cap at 20)
    progress.sessions.push(result);
    if (progress.sessions.length > 20) {
      progress.sessions = progress.sessions.slice(-20);
    }

    // Update per-question history
    const allQuestionIds = [
      ...result.missed.map((q) => ({ id: q.id, correct: false })),
    ];
    // Questions that were correct = total - missed
    // We need to track correct ones too. Since missed is stored,
    // we can infer: all questions in session minus missed = correct.
    // But we don't have all question IDs in SessionResult.
    // For now, just track missed questions as seen+incorrect.
    for (const q of result.missed) {
      const h = progress.questionHistory[q.id] || { seen: 0, correct: 0 };
      h.seen += 1;
      progress.questionHistory[q.id] = h;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Quota exceeded or other error — silently fail
  }
}

export function getLastScores(): Record<
  string,
  { correct: number; total: number } | null
> {
  const progress = getProgress();
  const categories: QuestionCategory[] = ["stations", "trucks", "tools"];
  const result: Record<string, { correct: number; total: number } | null> = {};

  for (const cat of categories) {
    const lastSession = [...progress.sessions]
      .reverse()
      .find((s) => s.category === cat || s.category === "mixed");
    if (lastSession && lastSession.category === cat) {
      result[cat] = {
        correct: lastSession.correct,
        total: lastSession.totalQuestions,
      };
    } else {
      result[cat] = null;
    }
  }

  return result;
}

export function resetProgress(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // silently fail
  }
}
