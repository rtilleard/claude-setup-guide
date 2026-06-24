export default function Cover() {
  return (
    <div className="space-y-4 max-w-3xl">
      <div className="flex items-center gap-3 pb-2 border-b" style={{ borderColor: "#E8E5DC" }}>
        <svg viewBox="0 0 92 64" className="h-5 w-auto" aria-hidden="true">
          <path d="M66.4915 0H52.5029L78.0115 64H92.0001L66.4915 0Z" fill="#141413" />
          <path d="M26.08 0L0.571472 64H14.8343L20.0512 50.56H46.7374L51.9543 64H66.2172L40.7086 0H26.08ZM24.6647 38.6743L33.3943 16.1829L42.1239 38.6743H24.6647Z" fill="#141413" />
        </svg>
        <span
          className="text-[10px] uppercase tracking-[0.2em]"
          style={{ color: "#6B6862", fontFamily: "var(--font-inter), ui-sans-serif, system-ui" }}
        >
          Anthropic UK&amp;I submission
        </span>
      </div>

      <div
        className="grid grid-cols-[70px_1fr] gap-y-0.5 gap-x-3 text-[13px]"
        style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui", color: "#141413" }}
      >
        <div style={{ color: "#6B6862" }}>To</div>
        <div>Pip White, Head of UK&amp;I, Northern Europe and Israel, Anthropic</div>
        <div style={{ color: "#6B6862" }}>From</div>
        <div>Robbie Tilleard</div>
        <div style={{ color: "#6B6862" }}>Date</div>
        <div>13 June 2026</div>
        <div style={{ color: "#6B6862" }}>Re</div>
        <div>Bringing Claude for Small and Medium Businesses to the UK&amp;I</div>
        <div style={{ color: "#6B6862" }}>Status</div>
        <div>Confidential draft for discussion</div>
      </div>

      <hr style={{ borderColor: "#E8E5DC" }} />

      <div className="space-y-3 text-[15px]" style={{ color: "#141413" }}>
        <p>
          Anthropic launched Claude for Small Business in the United States
          on 13 May 2026, with fifteen packaged workflows, deep integrations
          into the tools small operators already use, a ten-city free fluency
          tour, and a community-finance partnership model.
        </p>
        <p>
          No equivalent programme yet exists in the United Kingdom or
          Ireland. The UK has 5.69 million micro, small and medium-sized
          enterprises, and the government estimates the productivity prize
          from AI at up to £47 billion a year over the next decade. There
          is therefore a window to land a similar shaped programme here
          focused on Small and Medium Businesses, with UK partners and on
          a faster cadence than the competition is likely to manage.
        </p>
        <p>
          This memo sets out the size of the opportunity, a four-motion
          playbook for landing it, a first ninety days of work, and the case
          for me to lead that work. Alternative verticals in design and
          cyber are included as annexes.
        </p>
      </div>

      <div
        className="text-[11px] pt-2"
        style={{ color: "#6B6862", fontFamily: "var(--font-inter), ui-sans-serif, system-ui" }}
      >
        Estimated read time is eight minutes. Navigate with left and right
        arrow keys. Source list is at slide fourteen.
      </div>
    </div>
  );
}
