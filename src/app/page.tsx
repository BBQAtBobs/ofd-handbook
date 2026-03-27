import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const entryPoints = [
  {
    href: "/learn",
    title: "Learn",
    subtitle: "Guided Tracks",
    description:
      "13 structured learning tracks covering fundamentals through special ops. Study at your pace.",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
    color: "accent",
  },
  {
    href: "/stations",
    title: "Stations",
    subtitle: "Interactive Map",
    description:
      "All 26 stations with addresses, apparatus, battalion assignments, and an interactive map.",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
    ),
    color: "blue",
  },
  {
    href: "/quick-ref",
    title: "Quick Ref",
    subtitle: "Instant Lookup",
    description:
      "Response matrix, disposition codes, radio channels, pump chart, and more at a glance.",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
        />
      </svg>
    ),
    color: "amber",
  },
  {
    href: "/equipment",
    title: "Equipment",
    subtitle: "Tools & Apparatus",
    description:
      "Hand tools, power tools, hose complement, SCBA, and ladder operations — searchable and categorized.",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.42 15.17l-5.1-5.1a3.12 3.12 0 114.41-4.41l5.1 5.1a3.12 3.12 0 01-4.41 4.41zM21.13 2.87a3 3 0 00-4.24 0l-2.12 2.12 4.24 4.24 2.12-2.12a3 3 0 000-4.24z"
        />
      </svg>
    ),
    color: "green",
  },
];

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

const stats = [
  { value: "26", label: "Stations" },
  { value: "3", label: "Battalions" },
  { value: "60+", label: "Hand Tools" },
  { value: "13", label: "Learning Tracks" },
];

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent-softer to-transparent" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12 sm:pt-20 sm:pb-16">
            <div className="flex items-start gap-4 mb-6">
              <Image
                src="/images/ofd-patch.jpg"
                alt="OFD Patch"
                width={64}
                height={64}
                className="rounded-lg mix-blend-multiply opacity-90 hidden sm:block"
              />
              <div>
                <p className="text-sm font-mono font-medium text-accent tracking-wider uppercase mb-2">
                  Oakland Fire Department
                </p>
                <h1 className="heading text-4xl sm:text-5xl text-primary">
                  Recruit Handbook
                </h1>
              </div>
            </div>
            <p className="text-lg text-secondary max-w-xl leading-relaxed mb-8">
              The complete interactive field reference. Study smarter, look it up
              faster, know your department.
            </p>

            {/* Stats bar */}
            <div className="flex flex-wrap gap-6 sm:gap-10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-heading font-bold text-2xl text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Entry Points Grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {entryPoints.map((entry) => {
              const colors = colorMap[entry.color];
              return (
                <Link
                  key={entry.href}
                  href={entry.href}
                  className={`group relative p-6 rounded-xl bg-bg-card border ${colors.border} hover:border-transparent hover:shadow-lg transition-all duration-200`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-9 h-9 rounded-lg ${colors.bg} ${colors.text} flex items-center justify-center`}
                    >
                      {entry.icon}
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-lg text-primary leading-tight">
                        {entry.title}
                      </h2>
                      <p className={`text-xs font-medium ${colors.text}`}>
                        {entry.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-secondary leading-relaxed">
                    {entry.description}
                  </p>
                  <div
                    className={`absolute top-6 right-6 ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* About / Attribution */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          <div className="rounded-xl bg-bg-card border border-border-light p-6 sm:p-8">
            <h2 className="heading text-xl text-primary mb-3">
              About This Resource
            </h2>
            <div className="text-sm text-secondary leading-relaxed space-y-3">
              <p>
                This interactive digital reference is built from the{" "}
                <strong className="text-primary">
                  OFD Recruit Handbook v2.1
                </strong>{" "}
                (December 2025), authored by{" "}
                <strong className="text-primary">BC Anthony Sanders</strong>.
                It&apos;s designed to make handbook content easier to study,
                search, and reference in the field.
              </p>
              <p>
                This is an{" "}
                <strong className="text-primary">
                  unofficial educational resource
                </strong>{" "}
                created to support recruit training. It is not affiliated with,
                endorsed by, or representative of the City of Oakland or the
                Oakland Fire Department. Always defer to your chain of command
                and official department materials.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
