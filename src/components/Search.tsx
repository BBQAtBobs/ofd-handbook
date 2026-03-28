"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { buildSearchIndex, type SearchItem } from "@/lib/search-index";
import { events } from "@/lib/analytics";

const categoryColors: Record<string, string> = {
  Station: "text-accent bg-accent-soft",
  "Hand Tool": "text-amber bg-amber-soft",
  "Power Tool": "text-amber bg-amber-soft",
  "Disposition Code": "text-blue bg-blue-soft",
  "Response Matrix": "text-accent bg-accent-soft",
  Abbreviation: "text-blue bg-blue-soft",
  "Learning Track": "text-green bg-green-soft",
  "Hose Term": "text-amber bg-amber-soft",
  "Ladder Term": "text-amber bg-amber-soft",
  Knots: "text-green bg-green-soft",
  Phonetic: "text-blue bg-blue-soft",
};

export default function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const index = useMemo(() => buildSearchIndex(), []);
  const fuse = useMemo(
    () =>
      new Fuse(index, {
        keys: [
          { name: "title", weight: 3 },
          { name: "description", weight: 1 },
          { name: "tags", weight: 2 },
          { name: "category", weight: 1 },
        ],
        threshold: 0.35,
        includeScore: true,
      }),
    [index]
  );

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).slice(0, 12);
  }, [fuse, query]);

  const closeModal = useCallback(() => {
    setOpen(false);
    setQuery("");
    triggerRef.current?.focus();
  }, []);

  const navigate = useCallback(
    (item: SearchItem) => {
      events.searchPerformed(query, results.length);
      setOpen(false);
      setQuery("");
      router.push(item.href);
    },
    [query, results.length, router]
  );

  // Keyboard shortcut to open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeModal]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Trap focus inside modal when open
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'input, button, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [open]);

  // Arrow key navigation
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      navigate(results[selectedIndex].item);
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        ref={triggerRef}
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light bg-bg-white text-sm text-muted hover:border-border hover:text-secondary transition-colors"
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden sm:inline text-[10px] font-mono bg-bg-subtle px-1.5 py-0.5 rounded border border-border-light">
          ⌘K
        </kbd>
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[100] bg-primary/30 backdrop-blur-sm flex items-start justify-center pt-[15vh]"
          onClick={closeModal}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Search the handbook"
            className="w-full max-w-lg mx-4 bg-bg-white rounded-xl shadow-2xl border border-border overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border-light">
              <svg
                className="w-4 h-4 text-muted shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search stations, tools, codes, terms..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-sm text-primary placeholder:text-muted focus:outline-none"
              />
              <kbd className="text-[10px] font-mono text-muted bg-bg-subtle px-1.5 py-0.5 rounded border border-border-light">
                ESC
              </kbd>
            </div>

            {/* Results */}
            {query.trim() && (
              <div className="max-h-80 overflow-y-auto py-2">
                {results.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-muted">
                    No results for &ldquo;{query}&rdquo;
                  </div>
                ) : (
                  results.map((result, i) => (
                    <button
                      key={result.item.id}
                      onClick={() => navigate(result.item)}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`w-full text-left px-4 py-2.5 flex items-start gap-3 transition-colors ${
                        i === selectedIndex
                          ? "bg-bg-subtle"
                          : "hover:bg-bg-subtle"
                      }`}
                    >
                      <span
                        className={`text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0 mt-0.5 ${
                          categoryColors[result.item.category] ||
                          "text-muted bg-bg-subtle"
                        }`}
                      >
                        {result.item.category}
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-primary truncate">
                          {result.item.title}
                        </div>
                        <div className="text-xs text-muted truncate">
                          {result.item.description}
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}

            {/* Footer hint */}
            {!query.trim() && (
              <div className="px-4 py-6 text-center text-xs text-muted">
                Search across {index.length} items — stations, tools, codes,
                terminology, and more
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
