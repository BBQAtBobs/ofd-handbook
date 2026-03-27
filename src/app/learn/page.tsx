import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { learningTracks, trackGroups } from "@/data/learning-tracks";

export const metadata = {
  title: "Learn — OFD Handbook",
  description:
    "13 structured learning tracks covering OFD fundamentals, operations, equipment, and special ops.",
};

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  accent: {
    bg: "bg-accent-soft",
    text: "text-accent",
    border: "border-accent/10",
  },
  blue: {
    bg: "bg-blue-soft",
    text: "text-blue",
    border: "border-blue/10",
  },
  amber: {
    bg: "bg-amber-soft",
    text: "text-amber",
    border: "border-amber/10",
  },
  green: {
    bg: "bg-green-soft",
    text: "text-green",
    border: "border-green/10",
  },
};

export default function LearnPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="mb-10">
            <p className="text-sm font-mono font-medium text-accent tracking-wider uppercase mb-2">
              Learning Tracks
            </p>
            <h1 className="heading text-3xl sm:text-4xl text-primary mb-3">
              Study the Handbook
            </h1>
            <p className="text-secondary max-w-xl">
              13 guided tracks organized from fundamentals through special
              operations. Each track breaks the handbook into focused,
              digestible sections.
            </p>
          </div>

          {trackGroups.map((group) => {
            const tracks = learningTracks.filter(
              (t) => t.group === group.name
            );
            const colors = colorMap[group.color];
            return (
              <section key={group.name} className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className={`w-2 h-2 rounded-full ${colors.bg.replace("bg-", "bg-").replace("-soft", "")}`}
                    style={{
                      backgroundColor:
                        group.color === "accent"
                          ? "#b8351a"
                          : group.color === "blue"
                            ? "#2a6fa8"
                            : group.color === "amber"
                              ? "#c97a2e"
                              : "#2e8b57",
                    }}
                  />
                  <h2 className="font-heading font-bold text-lg text-primary">
                    {group.name}
                  </h2>
                  <span className="text-xs text-muted">
                    {tracks.length} tracks
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {tracks.map((track) => (
                    <Link
                      key={track.slug}
                      href={`/learn/${track.slug}`}
                      className={`group p-5 rounded-xl bg-bg-card border ${colors.border} hover:border-transparent hover:shadow-md transition-all duration-200`}
                    >
                      <h3 className="font-heading font-bold text-base text-primary mb-1.5 group-hover:text-accent transition-colors">
                        {track.title}
                      </h3>
                      <p className="text-xs text-secondary leading-relaxed mb-3">
                        {track.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-muted">
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
                            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                          />
                        </svg>
                        <span>{track.sections.length} sections</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
