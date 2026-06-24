import { SOURCES } from "../sources";

export default function Sources() {
  return (
    <div className="space-y-6 max-w-4xl">
      <p
        className="text-[15px] text-[#4A4842]"
        style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui" }}
      >
        Numbered footnotes throughout the memo refer to the sources below.
        Anchored to primary sources where possible (gov.uk, ONS, OECD,
        Anthropic), with single secondary citations for benchmarks.
      </p>

      <ol
        className="space-y-3 text-[13px] text-[#141413] list-none pl-0"
        style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui" }}
      >
        {SOURCES.map((s) => (
          <li key={s.id} className="grid grid-cols-[30px_1fr] gap-3">
            <div className="text-[#6B6862] font-medium tabular-nums">
              [{s.id}]
            </div>
            <div>
              <div className="text-[#141413]">{s.full}</div>
              {s.url && (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-[#6B6862] underline underline-offset-2 hover:text-[#141413] break-all"
                >
                  {s.url}
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
