import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import TrackPageLayout from "@/components/TrackPageLayout";
import TrackQuiz from "@/components/study/TrackQuiz";
import { learningTracks } from "@/data/learning-tracks";
import { getTrackContent, ContentBlock } from "@/data/track-content";

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

const colorHex: Record<string, string> = {
  accent: "#b8351a",
  blue: "#2a6fa8",
  amber: "#c97a2e",
  green: "#2e8b57",
};

function renderBlock(block: ContentBlock, j: number, hex: string) {
  if (block.type === "text") {
    return (
      <p key={j} className="text-sm text-secondary leading-relaxed">
        {block.content}
      </p>
    );
  }

  if (block.type === "list") {
    return (
      <ul key={j} className="space-y-2.5 text-sm">
        {block.items!.map((item, k) => (
          <li key={k} className="flex gap-3 items-start">
            <span
              className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: hex }}
            />
            <span className="text-secondary leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "definition") {
    const defs = block.definitions!;
    const isGrid = defs.length >= 4;
    return (
      <div
        key={j}
        className={
          isGrid
            ? "grid grid-cols-1 sm:grid-cols-2 gap-3"
            : "grid gap-3"
        }
      >
        {defs.map(([term, def], k) => (
          <div
            key={k}
            className="rounded-lg bg-bg-card border border-border-light overflow-hidden hover:border-border hover:shadow-sm transition-all"
          >
            <div className="flex items-start gap-0">
              <div
                className="w-1 self-stretch shrink-0"
                style={{ backgroundColor: hex }}
              />
              <div className="p-3 flex-1 min-w-0">
                <div className="font-heading font-bold text-xs text-primary mb-1">
                  {term}
                </div>
                <div className="text-xs text-secondary leading-relaxed">
                  {def}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (block.type === "table") {
    return (
      <div
        key={j}
        className="overflow-x-auto rounded-lg border border-border-light shadow-sm"
      >
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: hex }}>
              {block.headers!.map((h, k) => (
                <th
                  key={k}
                  className="text-left py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white"
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
                className={`border-b border-border-light/50 last:border-0 ${
                  k % 2 === 0 ? "bg-bg-white" : "bg-bg-subtle"
                } hover:bg-bg-warm/50 transition-colors`}
              >
                {row.map((cell, l) => (
                  <td
                    key={l}
                    className={`py-2.5 px-4 ${
                      l === 0
                        ? "font-heading font-bold text-primary"
                        : "text-secondary"
                    }`}
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
        className="flex items-start gap-3 p-4 rounded-lg border-l-4"
        style={{
          borderLeftColor: hex,
          backgroundColor: hex + "08",
        }}
      >
        <svg
          className="w-5 h-5 shrink-0 mt-0.5"
          style={{ color: hex }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
        <p className="text-sm font-semibold" style={{ color: hex }}>
          {block.content}
        </p>
      </div>
    );
  }

  if (block.type === "tool-cards" && block.tools) {
    return (
      <div
        key={j}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        {block.tools.map((tool, k) => (
          <div
            key={k}
            className="rounded-lg bg-bg-card border border-border-light overflow-hidden hover:border-border hover:shadow-sm transition-all"
          >
            {tool.image ? (
              <div className="relative w-full h-36 bg-bg-subtle">
                <Image
                  src={tool.image}
                  alt={tool.name}
                  fill
                  className="object-contain p-3"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            ) : null}
            <div className="flex items-start gap-0">
              <div
                className="w-1 self-stretch shrink-0"
                style={{ backgroundColor: hex }}
              />
              <div className="p-3 flex-1 min-w-0">
                <div className="font-heading font-bold text-xs text-primary mb-0.5">
                  {tool.name}
                </div>
                {tool.aka && (
                  <div className="text-[11px] text-muted mb-1">
                    aka {tool.aka}
                  </div>
                )}
                <div className="text-xs text-secondary leading-relaxed">
                  {tool.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export default async function TrackPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const track = learningTracks.find((t) => t.slug === slug);
  if (!track) notFound();

  const content = getTrackContent(slug);
  const hex = colorHex[track.color];
  const trackIndex = learningTracks.findIndex((t) => t.slug === slug);
  const prevTrack = trackIndex > 0 ? learningTracks[trackIndex - 1] : null;
  const nextTrack =
    trackIndex < learningTracks.length - 1
      ? learningTracks[trackIndex + 1]
      : null;

  const resolveTrackHref = (t: (typeof learningTracks)[number]) =>
    `/learn/${t.slug}`;

  return (
    <>
      <Nav />
      <main className="flex-1">
        <TrackPageLayout
          sections={content.map((s) => ({ id: s.id, title: s.title }))}
          accentColor={hex}
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-muted mb-6">
            <Link
              href="/learn"
              className="hover:text-primary transition-colors"
            >
              Learn
            </Link>
            <span className="opacity-40">/</span>
            <span className="text-secondary">{track.title}</span>
          </div>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="w-8 h-1 rounded-full"
                style={{ backgroundColor: hex }}
              />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.15em]"
                style={{ color: hex }}
              >
                {track.group}
              </span>
            </div>
            <h1 className="heading text-3xl sm:text-4xl text-primary mb-3">
              {track.title}
            </h1>
            <p className="text-secondary leading-relaxed max-w-2xl">
              {track.description}
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-14">
            {content.map((section, i) => (
              <section key={i} id={section.id} className="scroll-mt-24">
                {/* Section header */}
                <div className="flex items-start gap-4 mb-6">
                  <span
                    className="font-heading font-extrabold text-3xl leading-none select-none opacity-15"
                    style={{ color: hex }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-1">
                    <h2 className="font-heading font-bold text-lg text-primary">
                      {section.title}
                    </h2>
                  </div>
                </div>

                {/* Blocks */}
                <div className="space-y-5 pl-0 sm:pl-12">
                  {section.blocks.map((block, j) =>
                    renderBlock(block, j, hex)
                  )}
                </div>
              </section>
            ))}
          </div>

          {/* Prev / Next */}
          <div className="mt-16 pt-6 border-t border-border-light grid grid-cols-2 gap-4">
            {prevTrack ? (
              <Link
                href={resolveTrackHref(prevTrack)}
                className="group p-4 rounded-lg border border-border-light hover:border-border hover:shadow-sm transition-all"
              >
                <div className="text-[10px] font-medium text-muted uppercase tracking-wider mb-1">
                  Previous
                </div>
                <div className="flex items-center gap-2 text-sm font-heading font-bold text-primary group-hover:text-accent transition-colors">
                  <svg
                    className="w-4 h-4 shrink-0"
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
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextTrack ? (
              <Link
                href={resolveTrackHref(nextTrack)}
                className="group p-4 rounded-lg border border-border-light hover:border-border hover:shadow-sm transition-all text-right"
              >
                <div className="text-[10px] font-medium text-muted uppercase tracking-wider mb-1">
                  Next
                </div>
                <div className="flex items-center justify-end gap-2 text-sm font-heading font-bold text-primary group-hover:text-accent transition-colors">
                  {nextTrack.title}
                  <svg
                    className="w-4 h-4 shrink-0"
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
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* Quiz */}
          <TrackQuiz trackSlug={slug} accentColor={hex} />
        </TrackPageLayout>
      </main>
      <Footer />
    </>
  );
}
