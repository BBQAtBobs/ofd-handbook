import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border-light bg-bg-warm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/images/oakland-tree.svg"
              alt="City of Oakland"
              width={28}
              height={28}
              className="opacity-40"
            />
            <div className="text-xs text-muted leading-relaxed">
              <p className="font-medium text-secondary">
                Oakland Fire Department Recruit Handbook
              </p>
              <p>
                Version 2.1 — Authored by BC Anthony Sanders
              </p>
            </div>
          </div>
          <div className="text-xs text-muted text-center sm:text-right leading-relaxed">
            <p>
              Unofficial digital reference. Not affiliated with or endorsed by
              the City of Oakland.
            </p>
            <p className="mt-1">
              For official information, contact OFD Administration at
              510-238-3856.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
