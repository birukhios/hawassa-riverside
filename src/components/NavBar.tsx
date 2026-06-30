"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#build", label: "What We're Building" },
  { href: "#impact", label: "The Park" },
  { href: "#story", label: "Our Story" },
  { href: "#donate", label: "Donate" },
  { href: "#faq", label: "FAQ" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-black/5" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
        <a
          href="#top"
          className="text-[15px] font-semibold tracking-tight text-ink"
        >
          Hawassa<span className="text-ink-2 font-normal"> Riverside</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[12px] text-ink-2 hover:text-ink transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#donate"
          className="text-[12px] font-medium px-4 py-1.5 rounded-full bg-lake text-white hover:bg-lake-deep transition-colors"
        >
          Donate
        </a>
      </nav>
    </header>
  );
}
