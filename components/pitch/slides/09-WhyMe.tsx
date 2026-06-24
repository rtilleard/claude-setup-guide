const CARDS = [
  {
    role: "Lorikeet, GM EMEA, 2025 to present",
    motion: "Maps to motion 1, 2 and 4",
    outcome:
      "Lead local sales, forward deployed engineering and PM, and marketing for an AI-native business, taking it from zero to multi-million-pound revenue in twelve months. Customer outcomes include 60%+ uplift in onboarding conversion and 80%+ automation of inbound support. Sit on the global leadership team.",
    relevance:
      "The mechanics of standing up a UK go-to-market motion for an AI-native product, including the regulated-industries posture that any SMB programme will need.",
  },
  {
    role: "Multiverse, Product Director, 2022 to 2025",
    motion: "Maps to motion 1 and 3",
    outcome:
      "Led the core Learner experience as the company grew from $70m to $200m booked revenue. Operated what is plausibly the UK's largest formal AI training programme via the apprenticeship levy, reaching tens of thousands of working adults across UK employers. Drove $35m+ of additional annual revenue and a 12% NPS uplift.",
    relevance:
      "Direct experience designing AI fluency at scale in the UK, with public-money mechanics (apprenticeship levy) that overlap with Help to Grow funding.",
  },
  {
    role: "Fluidly, Head of Growth (Product), 2021 to 2022",
    motion: "Maps to motion 1 and 2",
    outcome:
      "ML-native cash flow product for UK SMBs and accountants. Overhauled onboarding (10% conversion uplift, 3× engagement, 5× sales leads). Supported the leadership process leading to acquisition by OakNorth Bank.",
    relevance:
      "Direct UK SMB GTM in the exact partner stack (Xero, Sage, accountants, business banks) that any UK Claude for Small Business launch will run through.",
  },
  {
    role: "Behavioural Insights Team (Nudge Unit), 2017 to 2019",
    motion: "Maps to motion 2 and 3",
    outcome:
      "Built a new practice area focused on helping small and medium businesses adopt new behaviours. Took it from zero to $1m+ in two years, ran large-scale field trials with national regulators (one delivered a 3% compliance uplift at no extra cost), and made investment decisions on behavioural-science products.",
    relevance:
      "Public-sector partnerships, government-grade rigour on outcome measurement, and a credible voice with DSIT and devolved enterprise agencies.",
    link: {
      href: "https://www.bi.team/publications/boosting-businesses-applying-behavioural-insights-to-business-policy/",
      label: "Boosting Businesses: applying behavioural insights to business policy",
    },
  },
];

export default function WhyMe() {
  return (
    <div className="space-y-3">
      <p className="text-[14px] max-w-3xl" style={{ color: "#141413" }}>
        Four prior roles transfer most directly to the motions set out on
        slide six. Each is mapped to the motion or motions it most closely
        resembles. The common thread is the building of zero-to-one
        commercial wedges in the UK, using AI and behavioural
        science as the principal lever. Full background on{" "}
        <a
          href="https://www.linkedin.com/in/robert-tilleard/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
          style={{ color: "#D97757" }}
        >
          LinkedIn
        </a>.
      </p>

      <div className="grid md:grid-cols-2 gap-3">
        {CARDS.map((c) => (
          <div
            key={c.role}
            className="border bg-white px-4 py-3"
            style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui", borderColor: "#E8E5DC" }}
          >
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <div
                className="text-[13px] font-semibold"
                style={{ fontFamily: "var(--font-source-serif), Georgia, serif", color: "#141413" }}
              >
                {c.role}
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "#D97757" }}>
                {c.motion}
              </div>
            </div>
            <p className="text-[12px] mt-1.5" style={{ color: "#4A4842" }}>{c.outcome}</p>
            <p className="text-[11px] mt-1 italic" style={{ color: "#6B6862" }}>
              Why it transfers: {c.relevance}
            </p>
            {"link" in c && c.link ? (
              <p className="text-[11px] mt-1.5">
                <a
                  href={c.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                  style={{ color: "#D97757" }}
                >
                  {c.link.label}
                </a>
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
