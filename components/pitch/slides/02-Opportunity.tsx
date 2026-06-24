import Footnote from "../Footnote";

export default function Opportunity() {
  return (
    <div className="space-y-5 max-w-5xl">
      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        <Stat
          number="5.69m"
          label="UK SMEs"
          detail="99.85% of all private-sector businesses in the UK."
          footnote={1}
        />
        <Stat
          number="14% / 23%"
          label="AI adoption — micro and mid-sized SMEs"
          detail="Micro businesses at 14% and mid-sized at 23%, against 36% for large firms and a 16% all-business average."
          footnote={2}
        />
        <Stat
          number="£47bn / yr"
          label="UK productivity prize"
          detail="DSIT estimate of the annual GDP uplift from a full and safe embrace of AI, sustained over the next decade."
          footnote={3}
        />
      </div>

      <p className="text-[14px]" style={{ color: "#4A4842" }}>
        Taken together the figures describe a market that is large, underserved
        and politically primed for an AI fluency programme. Anthropic has
        a product shaped to it. The open question is who runs the launch in
        the United Kingdom.
      </p>

      <div
        className="border-t pt-3 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2"
        style={{ borderColor: "#E8E5DC", fontFamily: "var(--font-inter), ui-sans-serif, system-ui" }}
      >
        <Definition term="Micro" detail="1 to 9 employees" />
        <Definition term="Small" detail="10 to 49 employees" />
        <Definition term="Medium" detail="50 to 249 employees" />
        <Definition term="Large" detail="250+ employees" />
      </div>
      <p
        className="text-[11px]"
        style={{ color: "#6B6862", fontFamily: "var(--font-inter), ui-sans-serif, system-ui" }}
      >
        Standard UK / OECD employee-band definitions used by DSIT and the
        ONS. SMEs are micro, small and medium combined.
      </p>
    </div>
  );
}

function Definition({ term, detail }: { term: string; detail: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "#6B6862" }}>
        {term}
      </div>
      <div className="text-[13px]" style={{ color: "#141413" }}>{detail}</div>
    </div>
  );
}

function Stat({
  number,
  label,
  detail,
  footnote,
}: {
  number: string;
  label: string;
  detail: string;
  footnote: number;
}) {
  return (
    <div className="border-l-2 pl-4" style={{ borderColor: "#141413" }}>
      <div
        className="text-3xl md:text-4xl font-semibold tracking-tight"
        style={{ fontFamily: "var(--font-source-serif), Georgia, serif", color: "#141413" }}
      >
        {number}
        <Footnote id={footnote} />
      </div>
      <div
        className="text-[10px] uppercase tracking-[0.2em] mt-1"
        style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui", color: "#6B6862" }}
      >
        {label}
      </div>
      <div className="text-[13px] mt-1" style={{ color: "#4A4842" }}>{detail}</div>
    </div>
  );
}
