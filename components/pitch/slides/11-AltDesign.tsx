import Footnote from "../Footnote";

export default function AltDesign() {
  return (
    <div className="space-y-3 max-w-5xl">
      <p className="text-[14px]" style={{ color: "#141413" }}>
        The UK has the biggest creative industry in Europe. It is worth
        £124bn.<Footnote id={9} /> Design firms produce text, image and
        video every day. They already use Adobe, Canva and Figma. Their
        clients pay them well, so they can afford strong tools. Claude is
        a good fit.
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
            body="London and Manchester design firms. About 70,000 businesses."
          />
          <Cell
            label="Distribution"
            body="Work with D&AD, the Design Business Association, Creative UK and the IPA. Sponsor the London Design Festival. Run a three-city tour: London, Manchester, Bristol."
          />
          <Cell
            label="Proof points"
            body="50 case-study agencies in six months. £100k+ annual contracts at the top end. Smaller seats below."
          />
        </div>
      </div>

      <p className="text-[12px]" style={{ color: "#4A4842" }}>
        This market is smaller than SMB and grows more slowly. But it would
        put Anthropic in front of the UK creative world. That matters if
        Anthropic wants to be seen as the AI lab that artists and designers
        trust. Great wedge for Anthropic given focus on enablement of creatives rather than replacement.
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
