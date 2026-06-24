export default function Ask() {
  return (
    <div className="space-y-4 max-w-3xl">
      <p className="text-[14px]" style={{ color: "#141413" }}>
        The ask is a thirty-minute conversation. The proposed scope is the
        single role described below.
      </p>

      <div
        className="border p-4"
        style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui", borderColor: "#141413" }}
      >
        <div className="text-[10px] uppercase tracking-[0.2em] mb-1.5" style={{ color: "#D97757" }}>
          Proposed scope
        </div>
        <div
          className="text-xl font-semibold leading-tight"
          style={{ fontFamily: "var(--font-source-serif), Georgia, serif", color: "#141413" }}
        >
          Lead, Claude for Small and Medium Businesses UK&amp;I
        </div>
        <div className="text-[12px] mt-2" style={{ color: "#4A4842" }}>
          A zero-to-one emerging-segment role. Accountable for the four motions set out on slide six and
          the targets on slide seven. Proposed as a single-person role for
          the first six months. The case for a first additional hire
          would be revisited on the basis of traction.
        </div>
      </div>

      <div
        className="grid grid-cols-[90px_1fr] gap-y-1 gap-x-5 text-[13px]"
        style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui", color: "#141413" }}
      >
        <div style={{ color: "#6B6862" }}>Name</div>
        <div>Robbie Tilleard</div>
        <div style={{ color: "#6B6862" }}>Email</div>
        <div>
          <a
            href="mailto:robtilleard@gmail.com"
            className="underline underline-offset-2"
            style={{ color: "#D97757" }}
          >
            robtilleard@gmail.com
          </a>
        </div>
        <div style={{ color: "#6B6862" }}>Web</div>
        <div>
          <a
            href="https://robbietilleard.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
            style={{ color: "#D97757" }}
          >
            robbietilleard.com
          </a>
        </div>
      </div>

      <p
        className="text-[12px] pt-3 border-t"
        style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui", color: "#6B6862", borderColor: "#E8E5DC" }}
      >
        Annexes follow at slides eleven and twelve, setting out alternative
        verticals in design and cyber respectively, provided to show range
        of thinking rather than as a hedge against the principal
        recommendation.
      </p>
    </div>
  );
}
