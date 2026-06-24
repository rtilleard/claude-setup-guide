"use client";

import { useState } from "react";

type Phase = {
  id: string;
  weeks: string;
  title: string;
  items: { headline: string; detail: string }[];
};

const PHASES: Phase[] = [
  {
    id: "p1",
    weeks: "Weeks 1–4",
    title: "Audit and partner map",
    items: [
      {
        headline: "UK partner inventory",
        detail:
          "Map every viable distribution layer: FSB, ICAEW, Xero/Sage app stores, business banks, Help to Grow providers. Score each on reach × adoption-readiness × time-to-contract.",
      },
      {
        headline: "Product gap analysis",
        detail:
          "Compare the US Claude for Small Business surface to the UK equivalent stack. Identify the integration gap list and push the build as far as possible using the latest coding agents to ship UK integrations at pace. Run interviews with existing UK Claude SMB customers and with non-users in the same segment to surface what is working, what is missing, and which workflows to prioritise first.",
      },
      {
        headline: "Pricing and packaging",
        detail:
          "Start from the standard Claude for Small Business packages, presented in pounds with VAT and an ICO / GDPR posture suitable for UK SMEs. Investigate whether targeted bundles or introductory discounts (for example with accountancy bodies or the FSB) would accelerate adoption, and bring options back for decision.",
      },
      {
        headline: "Lean operating model",
        detail:
          "Run the launch single-handed, drawing on existing London applied AI, marketing and policy resource for execution support. No new hire required in the first phase.",
      },
    ],
  },
  {
    id: "p2",
    weeks: "Weeks 5–8",
    title: "First contracts and product wedge",
    items: [
      {
        headline: "Three signed partner LOIs",
        detail:
          "Aim: one accountancy body, one bank, one government-adjacent (Help to Grow or Be the Business). Each with named pilot scope.",
      },
      {
        headline: "Xero / Sage integration in flight",
        detail:
          "First integrations built and shipped using the latest coding agents, with partner approvals in train. Target first integration live by month four.",
      },
      {
        headline: "London launch event scoped",
        detail:
          "Venue, date, speaker list, partner co-brand. Targeted at month-three close.",
      },
      {
        headline: "First UK case studies",
        detail:
          "Recruit five design-partner SMBs from existing Claude UK users. Build the three best into case studies.",
      },
    ],
  },
  {
    id: "p3",
    weeks: "Weeks 9–12",
    title: "London launch and first cohort",
    items: [
      {
        headline: "London launch, Month 3",
        detail:
          "Public launch of Claude for Small Business UK&I. First 100-person fluency cohort. Tier-1 press secured ahead of go-live.",
      },
      {
        headline: "Tour calendar through month 9",
        detail:
          "Finalise the ten-city tour calendar, anchor partner contracts at each stop, and brief the existing UK marketing and policy team on event production.",
      },
      {
        headline: "Quarter 2 commitments to leadership",
        detail:
          "Targets table from slide 7 confirmed or adjusted on the basis of quarter-one signal.",
      },
    ],
  },
];

export default function PlanTimeline() {
  const [expanded, setExpanded] = useState<string | null>("p1-0");

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
      style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui" }}
    >
      {PHASES.map((p) => (
        <div key={p.id} className="border border-[#E8E5DC] bg-white">
          <div className="px-4 py-3 border-b border-[#E8E5DC]">
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#6B6862]">
              {p.weeks}
            </div>
            <div
              className="text-[15px] font-semibold text-[#141413] mt-0.5"
              style={{ fontFamily: "var(--font-source-serif), Georgia, serif" }}
            >
              {p.title}
            </div>
          </div>
          <div className="divide-y divide-[#F0EDE3]">
            {p.items.map((it, i) => {
              const key = `${p.id}-${i}`;
              const open = expanded === key;
              return (
                <button
                  key={key}
                  onClick={() => setExpanded(open ? null : key)}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#F5F2EA] transition-colors"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[13px] text-[#141413]">
                      {it.headline}
                    </span>
                    <span className="text-[#D97757] text-[12px]">
                      {open ? "−" : "+"}
                    </span>
                  </div>
                  {open && (
                    <div className="text-[12px] text-[#4A4842] mt-2 leading-relaxed">
                      {it.detail}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
