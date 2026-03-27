"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { handTools, toolCategories, type HandTool } from "@/data/hand-tools";
import { powerTools, powerToolCategories, type PowerTool } from "@/data/power-tools";
import { events } from "@/lib/analytics";

type Tab = "hand" | "power";

function HandToolCard({ tool }: { tool: HandTool }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <button
      onClick={() => {
        setExpanded(!expanded);
        if (!expanded) events.toolViewed(tool.name);
      }}
      className="w-full text-left p-4 rounded-xl bg-bg-card border border-border-light hover:border-border hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-heading font-bold text-sm text-primary">
            {tool.name}
          </h3>
          {tool.aka && (
            <p className="text-xs text-muted mt-0.5">aka {tool.aka}</p>
          )}
        </div>
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted bg-bg-subtle px-2 py-0.5 rounded-md shrink-0 ml-2">
          {toolCategories[tool.category]}
        </span>
      </div>
      {expanded && (
        <p className="text-sm text-secondary leading-relaxed mt-2">
          {tool.description}
        </p>
      )}
    </button>
  );
}

function PowerToolCard({ tool }: { tool: PowerTool }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <button
      onClick={() => {
        setExpanded(!expanded);
        if (!expanded) events.toolViewed(tool.name);
      }}
      className="w-full text-left p-4 rounded-xl bg-bg-card border border-border-light hover:border-border hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between">
        <h3 className="font-heading font-bold text-sm text-primary">
          {tool.name}
        </h3>
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted bg-bg-subtle px-2 py-0.5 rounded-md shrink-0 ml-2">
          {powerToolCategories[tool.category]}
        </span>
      </div>
      {expanded && (
        <div className="mt-3 space-y-1">
          {Object.entries(tool.specs).map(([key, val]) => (
            <div key={key} className="flex gap-2 text-xs">
              <span className="font-medium text-muted w-24 shrink-0">
                {key}
              </span>
              <span className="text-secondary">{val}</span>
            </div>
          ))}
        </div>
      )}
    </button>
  );
}

export default function EquipmentPage() {
  const [tab, setTab] = useState<Tab>("hand");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const handCategories = Object.entries(toolCategories);
  const powerCategories = Object.entries(powerToolCategories);

  const filteredHand = handTools.filter((t) => {
    const matchesSearch =
      !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      (t.aka && t.aka.toLowerCase().includes(search.toLowerCase())) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat =
      categoryFilter === "all" || t.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const filteredPower = powerTools.filter((t) => {
    const matchesSearch =
      !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      Object.values(t.specs).some((v) =>
        v.toLowerCase().includes(search.toLowerCase())
      );
    const matchesCat =
      categoryFilter === "all" || t.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <>
      <Nav />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="mb-8">
            <p className="text-sm font-mono font-medium text-accent tracking-wider uppercase mb-2">
              Equipment
            </p>
            <h1 className="heading text-3xl sm:text-4xl text-primary mb-3">
              Tools & Apparatus
            </h1>
            <p className="text-secondary max-w-xl">
              Every hand tool, power tool, and piece of equipment from the
              handbook. Tap any tool to see its full description.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            {/* Tab toggle */}
            <div className="flex bg-bg-subtle rounded-lg p-1">
              <button
                onClick={() => {
                  setTab("hand");
                  setCategoryFilter("all");
                }}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  tab === "hand"
                    ? "bg-bg-white text-primary shadow-sm"
                    : "text-secondary hover:text-primary"
                }`}
              >
                Hand Tools ({handTools.length})
              </button>
              <button
                onClick={() => {
                  setTab("power");
                  setCategoryFilter("all");
                }}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  tab === "power"
                    ? "bg-bg-white text-primary shadow-sm"
                    : "text-secondary hover:text-primary"
                }`}
              >
                Power Tools ({powerTools.length})
              </button>
            </div>

            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
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
                type="text"
                placeholder="Search tools..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-border-light bg-bg-white text-sm text-primary placeholder:text-muted focus:outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10"
              />
            </div>
          </div>

          {/* Category filter chips */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            <button
              onClick={() => setCategoryFilter("all")}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                categoryFilter === "all"
                  ? "bg-accent text-white"
                  : "bg-bg-subtle text-secondary hover:bg-bg-warm"
              }`}
            >
              All
            </button>
            {(tab === "hand" ? handCategories : powerCategories).map(
              ([key, label]) => (
                <button
                  key={key}
                  onClick={() => setCategoryFilter(key)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    categoryFilter === key
                      ? "bg-accent text-white"
                      : "bg-bg-subtle text-secondary hover:bg-bg-warm"
                  }`}
                >
                  {label}
                </button>
              )
            )}
          </div>

          {/* Tools grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {tab === "hand"
              ? filteredHand.map((tool) => (
                  <HandToolCard key={tool.name} tool={tool} />
                ))
              : filteredPower.map((tool) => (
                  <PowerToolCard key={tool.name} tool={tool} />
                ))}
          </div>

          {((tab === "hand" && filteredHand.length === 0) ||
            (tab === "power" && filteredPower.length === 0)) && (
            <div className="text-center py-12 text-muted">
              <p className="text-lg mb-1">No tools found</p>
              <p className="text-sm">Try adjusting your search or filter.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
