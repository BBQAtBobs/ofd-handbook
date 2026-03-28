import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study — OFD Handbook",
  description:
    "Test your knowledge of OFD stations, truck companies, and tools with flashcards and multiple choice quizzes.",
};

export default function StudyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
