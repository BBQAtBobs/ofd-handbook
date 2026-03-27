"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Search from "@/components/Search";

const navLinks = [
  { href: "/learn", label: "Learn" },
  { href: "/stations", label: "Stations" },
  { href: "/quick-ref", label: "Quick Ref" },
  { href: "/equipment", label: "Equipment" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-bg/90 border-b border-border-light">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <span className="text-white font-heading font-bold text-xs tracking-wide">
              OFD
            </span>
          </div>
          <span className="font-heading font-bold text-sm text-primary tracking-tight hidden sm:block">
            Handbook
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <Search />
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent-soft text-accent"
                    : "text-secondary hover:text-primary hover:bg-bg-warm"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
