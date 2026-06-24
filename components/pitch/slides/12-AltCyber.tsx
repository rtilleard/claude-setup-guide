import Footnote from "../Footnote";

export default function AltCyber() {
  return (
    <div className="space-y-3 max-w-5xl">
      <p className="text-[14px]" style={{ color: "#141413" }}>
        The UK has the biggest cyber sector in Europe. NCSC, GCHQ, the AI
        Safety Institute and Belfast&apos;s CSIT cluster are all here. The
        sector made £13.2bn in revenue and £7.8bn in GVA last year, across
        about 2,091 firms.<Footnote id={10} /> Anthropic&apos;s safety work
        fits this market well.
      </p>

      <div
        className="border border-[#E8E5DC] bg-white"
        style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui" }}
      >
        <div className="px-5 py-4 border-b border-[#E8E5DC] text-[11px] uppercase tracking-[0.2em] text-[#6B6862]">
          Plan
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E8E5DC]">
          <Cell
            label="Wedge"
            body="SMB cyber rules: Cyber Essentials, ISO 27001, DPA and GDPR. Run by Claude agents. The channel is 40,000 UK Managed Service Providers (MSPs) and IT-services SMBs."
          />
          <Cell
            label="Distribution"
            body="Work with CREST, IASME, the UK Cyber Security Council and NCSC industry partners. Reach long-tail SMBs through MSP groups like Datto and Pax8."
          />
          <Cell
            label="Proof points"
            body="100 MSPs using Claude compliance agents in six months. Public deal with NCSC or AISI on safe AI for SMB. UK first, then EU."
          />
        </div>
      </div>

      <p className="text-[12px]" style={{ color: "#4A4842" }}>
        Cyber sells slower than SMB. Sales cycles can be long. The trade-off is brand:
        Anthropic owns a safety story in business that no one else
        can match. My own CV fits SMB better. But I have done work at
        Lorikeet in regulated industries and at BIT with national
        regulators.
      </p>
    </div>
  );
}

function Cell({ label, body }: { label: string; body: string }) {
  return (
    <div className="px-5 py-4">
      <div className="text-[10px] uppercase tracking-[0.2em] text-[#6B6862] mb-1.5">
        {label}
      </div>
      <p className="text-[13px] text-[#4A4842]">{body}</p>
    </div>
  );
}
