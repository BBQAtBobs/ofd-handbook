import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { learningTracks } from "@/data/learning-tracks";
import { getTrackContent } from "@/data/track-content";

export function generateStaticParams() {
  return learningTracks.map((track) => ({ slug: track.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const track = learningTracks.find((t) => t.slug === params.slug);
  if (!track) return { title: "Not Found — OFD Handbook" };
  return {
    title: `${track.title} — OFD Handbook`,
    description: track.description,
  };
}

const colorMap: Record<string, { dot: string; bg: string; text: string }> = {
  accent: { dot: "#b8351a", bg: "bg-accent-soft", text: "text-accent" },
  blue: { dot: "#2a6fa8", bg: "bg-blue-soft", text: "text-blue" },
  amber: { dot: "#c97a2e", bg: "bg-amber-soft", text: "text-amber" },
  green: { dot: "#2e8b57", bg: "bg-green-soft", text: "text-green" },
};

export default async function TrackPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const track = learningTracks.find((t) => t.slug === slug);
  if (!track) notFound();

  const content = getTrackContent(slug);
  const colors = colorMap[track.color];
  const trackIndex = learningTracks.findIndex((t) => t.slug === slug);
  const prevTrack = trackIndex > 0 ? learningTracks[trackIndex - 1] : null;
  const nextTrack =
    trackIndex < learningTracks.length - 1
      ? learningTracks[trackIndex + 1]
      : null;

  return (
    <>
      <Nav />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-muted mb-6">
            <Link href="/learn" className="hover:text-primary transition-colors">
              Learn
            </Link>
            <span>/</span>
            <span className={colors.text}>{track.group}</span>
            <span>/</span>
            <span className="text-secondary">{track.title}</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: colors.dot }}
              />
              <span className="text-xs font-medium text-muted uppercase tracking-wider">
                {track.group}
              </span>
            </div>
            <h1 className="heading text-3xl sm:text-4xl text-primary mb-3">
              {track.title}
            </h1>
            <p className="text-secondary leading-relaxed">
              {track.description}
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {content.map((section, i) => (
              <section
                key={i}
                id={section.id}
                className="scroll-mt-20"
              >
                <h2 className="font-heading font-bold text-xl text-primary mb-4 pb-2 border-b border-border-light">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.blocks.map((block, j) => {
                    if (block.type === "text") {
                      return (
                        <p
                          key={j}
                          className="text-sm text-secondary leading-relaxed"
                        >
                          {block.content}
                        </p>
                      );
                    }
                    if (block.type === "list") {
                      return (
                        <ul
                          key={j}
                          className="space-y-1.5 text-sm text-secondary"
                        >
                          {block.items!.map((item, k) => (
                            <li key={k} className="flex gap-2">
                              <span className="text-accent mt-1 shrink-0">
                                •
                              </span>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    if (block.type === "definition") {
                      return (
                        <div key={j} className="space-y-2">
                          {block.definitions!.map(([term, def], k) => (
                            <div
                              key={k}
                              className="flex gap-3 py-2 border-b border-border-light/50 last:border-0"
                            >
                              <span className="font-heading font-bold text-sm text-primary w-32 shrink-0">
                                {term}
                              </span>
                              <span className="text-sm text-secondary leading-relaxed">
                                {def}
                              </span>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    if (block.type === "table") {
                      return (
                        <div key={j} className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-border-light">
                                {block.headers!.map((h, k) => (
                                  <th
                                    key={k}
                                    className="text-left py-2 pr-4 text-xs font-medium text-muted uppercase tracking-wider"
                                  >
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {block.rows!.map((row, k) => (
                                <tr
                                  key={k}
                                  className="border-b border-border-light/50"
                                >
                                  {row.map((cell, l) => (
                                    <td
                                      key={l}
                                      className={`py-2 pr-4 ${l === 0 ? "font-mono font-semibold text-primary" : "text-secondary"}`}
                                    >
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    }
                    if (block.type === "callout") {
                      return (
                        <div
                          key={j}
                          className={`p-4 rounded-lg ${colors.bg} border border-${track.color}/10`}
                        >
                          <p className={`text-sm font-medium ${colors.text}`}>
                            {block.content}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* Navigation */}
          <div className="mt-12 pt-6 border-t border-border-light flex items-center justify-between">
            {prevTrack ? (
              <Link
                href={`/learn/${prevTrack.slug}`}
                className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                  />
                </svg>
                {prevTrack.title}
              </Link>
            ) : (
              <div />
            )}
            {nextTrack ? (
              <Link
                href={`/learn/${nextTrack.slug}`}
                className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors"
              >
                {nextTrack.title}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
