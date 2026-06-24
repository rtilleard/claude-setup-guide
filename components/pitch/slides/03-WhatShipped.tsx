import Footnote from "../Footnote";

export default function WhatShipped() {
  const items: { label: string; value: string }[] = [
    { label: "Launched", value: "13 May 2026 (US)" },
    {
      label: "Product surface",
      value:
        "15 packaged agentic workflows covering payroll planning, monthly close, invoice follow-up and marketing execution.",
    },
    {
      label: "Integrations",
      value:
        "QuickBooks, PayPal, HubSpot, Canva, DocuSign, Google Workspace, Microsoft 365.",
    },
    {
      label: "Distribution",
      value:
        "A 10-city free fluency tour, 100 small business leaders per stop, beginning Chicago.",
    },
    {
      label: "Community-finance partners",
      value:
        "Accion Opportunity Fund, Community Reinvestment Fund USA, Pacific Community Ventures.",
    },
    {
      label: "Foundation play",
      value:
        "Workday Foundation Solopreneurship Accelerator, with 15 founders, seed funding and an LISC-built AI curriculum.",
    },
  ];

  return (
    <div className="space-y-4 max-w-4xl">
      <p className="text-[15px] text-[#141413]">
        The shape of the US launch matters because a UK and Ireland version
        will use it as inspiration for its own roll-out. The component parts
        are set out below.
      </p>

      <dl className="space-y-2">
        {items.map((it) => (
          <div key={it.label} className="grid grid-cols-[150px_1fr] gap-x-5 gap-y-0.5">
            <dt
              className="text-[10px] uppercase tracking-[0.2em] pt-1"
              style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui", color: "#6B6862" }}
            >
              {it.label}
            </dt>
            <dd className="text-[13px]" style={{ color: "#141413" }}>{it.value}</dd>
          </div>
        ))}
      </dl>

      <div className="border-t pt-3" style={{ borderColor: "#E8E5DC" }}>
        <p className="text-[14px] font-semibold" style={{ color: "#141413" }}>
          Whilst Claude for Small Business is available in UK and Ireland, it does not have an accompanying launch programme.
          <Footnote id={4} />
        </p>
        <p className="text-[13px] mt-1.5" style={{ color: "#4A4842" }}>
          There are no localised integrations with Xero, Sage, Tide, Starling or
          Monzo Business; no integration with HMRC Making Tax Digital; no
          signed UK channel partners; no announced UK tour dates; and no
          named UK equivalent of the CDFI partnership ecosystem. OpenAI is
          likely to mirror Claude for Small Business in the UK on a horizon
          of months rather than quarters. This sets the cadence Anthropic
          should aim to beat.
        </p>
      </div>
    </div>
  );
}
