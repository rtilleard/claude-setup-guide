"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Cover from "./slides/01-Cover";
import Opportunity from "./slides/02-Opportunity";
import WhatShipped from "./slides/03-WhatShipped";
import TAM from "./slides/04-TAM";
import AdoptionGap from "./slides/05-AdoptionGap";
import Playbook from "./slides/06-Playbook";
import Targets from "./slides/07-Targets";
import NinetyDay from "./slides/08-NinetyDay";
import WhyMe from "./slides/09-WhyMe";
import Ask from "./slides/10-Ask";
import AltDesign from "./slides/11-AltDesign";
import AltCyber from "./slides/12-AltCyber";
import LinaOchman from "./slides/LinaOchman";
import Sources from "./slides/13-Sources";

type Slide = {
  title: string;
  section: "Main" | "Alternative" | "Context" | "Reference";
  body: React.ReactNode;
};

const SLIDES: Slide[] = [
  { title: "Cover", section: "Main", body: <Cover /> },
  { title: "A commercial and public interest opportunity", section: "Main", body: <Opportunity /> },
  { title: "What Anthropic shipped in May 2026", section: "Main", body: <WhatShipped /> },
  { title: "Sizing the UK prize", section: "Main", body: <TAM /> },
  { title: "Adoption gap across UK SMEs", section: "Main", body: <AdoptionGap /> },
  { title: "Four-motion playbook", section: "Main", body: <Playbook /> },
  { title: "What good looks like at 12 months", section: "Main", body: <Targets /> },
  { title: "First 90 days", section: "Main", body: <NinetyDay /> },
  { title: "Why me", section: "Main", body: <WhyMe /> },
  { title: "Ask", section: "Main", body: <Ask /> },
  { title: "Alternative: Design", section: "Alternative", body: <AltDesign /> },
  { title: "Alternative: Cyber", section: "Alternative", body: <AltCyber /> },
  { title: "Lina Ochman, US counterpart", section: "Context", body: <LinaOchman /> },
  { title: "Sources", section: "Reference", body: <Sources /> },
];

export default function Deck() {
  const [index, setIndex] = useState(0);
  const total = SLIDES.length;

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(total - 1, next));
      setIndex(clamped);
      if (typeof window !== "undefined") {
        history.replaceState(null, "", `#${clamped + 1}`);
      }
    },
    [total],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = parseInt(window.location.hash.replace("#", ""), 10);
    if (!Number.isNaN(hash) && hash >= 1 && hash <= total) {
      setIndex(hash - 1);
    }
    const onHash = () => {
      const h = parseInt(window.location.hash.replace("#", ""), 10);
      if (!Number.isNaN(h) && h >= 1 && h <= total) setIndex(h - 1);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [total]);

  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let startTime = 0;
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      startTime = Date.now();
    };
    const onTouchEnd = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("input,button,a,select,textarea,label,[role=slider]")) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      const dt = Date.now() - startTime;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);

      if (absX > 50 && absX > absY * 1.5 && dt < 600) {
        if (dx < 0) goTo(index + 1);
        else goTo(index - 1);
        return;
      }

      if (absX < 10 && absY < 10 && dt < 300) {
        const w = window.innerWidth;
        if (t.clientX > w * 0.5) goTo(index + 1);
        else goTo(index - 1);
      }
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [index, goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "j" || e.key === "PageDown") {
        e.preventDefault();
        goTo(index + 1);
      } else if (e.key === "ArrowLeft" || e.key === "k" || e.key === "PageUp") {
        e.preventDefault();
        goTo(index - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(total - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, goTo, total]);

  const current = SLIDES[index];
  const mainSlides = useMemo(() => SLIDES.filter((s) => s.section === "Main").length, []);

  return (
    <main
      className="h-screen flex flex-col overflow-hidden"
      style={{
        fontFamily: "var(--font-source-serif), Georgia, 'Times New Roman', serif",
        background: "#FAF9F5",
        color: "#141413",
      }}
    >
      <Header current={index + 1} total={total} section={current.section} mainSlides={mainSlides} />

      <section className="flex-1 min-h-0 overflow-hidden">
        <div className="max-w-6xl mx-auto h-full px-6 md:px-10 py-5 md:py-7 overflow-y-auto">
          <div className="mb-4">
            <div
              className="text-[10px] uppercase tracking-[0.2em] mb-1.5"
              style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui", color: "#6B6862" }}
            >
              {current.section === "Alternative"
                ? "Annex. Alternative vertical"
                : current.section === "Context"
                  ? "Annex. Intelligence"
                  : current.section === "Reference"
                    ? "Annex. Sources"
                    : `Section ${index + 1} of ${mainSlides}`}
            </div>
            <h2
              className="text-xl md:text-2xl font-semibold tracking-tight"
              style={{ color: "#141413" }}
            >
              {current.title}
            </h2>
          </div>
          <article
            key={index}
            className="prose-memo animate-fadein"
            style={{ lineHeight: 1.55 }}
          >
            {current.body}
          </article>
        </div>
      </section>

      <Nav index={index} total={total} goTo={goTo} />

      <style>{`
        @keyframes fadein {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadein { animation: fadein 200ms ease-out; }
        .prose-memo p { margin: 0 0 0.75em 0; }
        .prose-memo p:last-child { margin-bottom: 0; }
        .clay-accent { color: #D97757; }
        @media print {
          .deck-chrome { display: none !important; }
          main { display: block !important; height: auto !important; overflow: visible !important; }
          section { overflow: visible !important; }
        }
      `}</style>
    </main>
  );
}

function Header({
  current,
  total,
  section,
  mainSlides,
}: {
  current: number;
  total: number;
  section: Slide["section"];
  mainSlides: number;
}) {
  return (
    <header
      className="deck-chrome sticky top-0 z-10"
      style={{
        fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
        background: "#FAF9F5",
        borderBottom: "1px solid #E8E5DC",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-3 flex items-center justify-between text-[11px] uppercase tracking-[0.2em]" style={{ color: "#6B6862" }}>
        <span className="flex items-center gap-2">
          <svg viewBox="0 0 92 64" className="w-3 h-2.5" aria-hidden="true">
            <path d="M66.4915 0H52.5029L78.0115 64H92.0001L66.4915 0Z" fill="#141413" />
            <path d="M26.08 0L0.571472 64H14.8343L20.0512 50.56H46.7374L51.9543 64H66.2172L40.7086 0H26.08ZM24.6647 38.6743L33.3943 16.1829L42.1239 38.6743H24.6647Z" fill="#141413" />
          </svg>
          <span>Submission. Confidential draft</span>
        </span>
        <span>
          {section === "Main"
            ? `${current} / ${mainSlides}`
            : `${current} / ${total} (annex)`}
        </span>
      </div>
    </header>
  );
}

function Nav({
  index,
  total,
  goTo,
}: {
  index: number;
  total: number;
  goTo: (n: number) => void;
}) {
  return (
    <footer
      className="deck-chrome"
      style={{
        fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
        background: "#FAF9F5",
        borderTop: "1px solid #E8E5DC",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-3 flex items-center justify-between text-sm">
        <button
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          className="disabled:cursor-not-allowed transition-colors"
          style={{
            color: index === 0 ? "#C7C2B5" : "#141413",
          }}
        >
          ← Previous
        </button>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="w-1.5 h-1.5 rounded-full transition-colors"
              style={{
                background: i === index ? "#D97757" : "#D6D2C4",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => goTo(index + 1)}
          disabled={index === total - 1}
          className="disabled:cursor-not-allowed transition-colors"
          style={{
            color: index === total - 1 ? "#C7C2B5" : "#141413",
          }}
        >
          Next →
        </button>
      </div>
    </footer>
  );
}
