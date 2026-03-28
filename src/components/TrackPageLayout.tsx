"use client";

import { useState, useEffect } from "react";

interface Section {
  id: string;
  title: string;
}

export default function TrackPageLayout({
  sections,
  accentColor,
  children,
}: {
  sections: Section[];
  accentColor: string;
  children: React.ReactNode;
}) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-15% 0px -75% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Mobile sticky section nav */}
      <div className="lg:hidden sticky top-[3.5rem] z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-2 bg-bg/95 backdrop-blur-sm border-b border-border-light">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 text-xs font-medium w-full"
          style={{ color: accentColor }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <span className="font-heading font-bold uppercase tracking-wider">
            {sections.find((s) => s.id === activeSection)?.title || "Sections"}
          </span>
          <span className="text-muted ml-auto font-mono">
            {sections.findIndex((s) => s.id === activeSection) + 1}/{sections.length}
          </span>
        </button>
        {mobileOpen && (
          <nav className="mt-2 pb-1 space-y-0.5">
            {sections.map(({ id, title }, i) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className="flex items-center gap-2 w-full text-left px-2 py-1.5 rounded-md text-xs transition-colors"
                style={
                  activeSection === id
                    ? { backgroundColor: accentColor + "12", color: accentColor, fontWeight: 700 }
                    : { color: "var(--color-secondary)" }
                }
              >
                <span className="font-mono text-[10px] w-5 shrink-0 opacity-50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {title}
              </button>
            ))}
          </nav>
        )}
      </div>

      <div className="flex gap-10 py-10 sm:py-14">
        {/* Desktop sticky sidebar */}
        <aside className="hidden lg:block w-52 shrink-0">
          <nav className="sticky top-24 space-y-0.5">
            <div
              className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3 pl-3"
              style={{ color: accentColor }}
            >
              Sections
            </div>
            {sections.map(({ id, title }, i) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className="group flex items-start gap-2 w-full text-left px-3 py-2 rounded-lg text-xs transition-all"
                  style={
                    isActive
                      ? {
                          backgroundColor: accentColor + "12",
                          color: accentColor,
                          fontWeight: 700,
                        }
                      : {}
                  }
                >
                  <span
                    className="font-mono text-[10px] mt-px w-5 shrink-0 transition-colors"
                    style={isActive ? { color: accentColor } : { color: "var(--color-muted)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`leading-snug transition-colors ${
                      isActive ? "" : "text-secondary group-hover:text-primary"
                    }`}
                  >
                    {title}
                  </span>
                </button>
              );
            })}

            {/* Progress indicator */}
            <div className="mt-4 mx-3">
              <div className="h-0.5 bg-border-light rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: accentColor,
                    width: `${((sections.findIndex((s) => s.id === activeSection) + 1) / sections.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
