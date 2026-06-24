import Footnote from "../Footnote";

export default function LinaOchman() {
  return (
    <div className="space-y-5 max-w-3xl">
      <Block label="Role">
        <p>
          Lina Ochman is US Head of SMB at Anthropic.<Footnote id={11} />
        </p>
      </Block>

      <Block label="Background">
        <p>
          University of California, Berkeley. Sales operations at Flexport.
          GTM leadership at Segment, Miro and Recraft. Now Anthropic.
          <Footnote id={11} />
        </p>
      </Block>

      <Block label="What she is doing">
        <p>
          Leading the rollout of Claude for Small Business in the United
          States, including the tour of American cities being run alongside
          the launch.<Footnote id={12} />
        </p>
      </Block>

      <Block label="Why it matters">
        <p>
          The role shape exists. The question is whether the UK&amp;I
          equivalent should exist.
        </p>
      </Block>
    </div>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      className="grid grid-cols-[140px_1fr] gap-x-5"
      style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui" }}
    >
      <div
        className="text-[10px] uppercase tracking-[0.2em] pt-1"
        style={{ color: "#6B6862" }}
      >
        {label}
      </div>
      <div className="text-[14px]" style={{ color: "#141413" }}>
        {children}
      </div>
    </div>
  );
}
