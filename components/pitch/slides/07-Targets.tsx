import Footnote from "../Footnote";

const ROWS: { metric: string; m6: string; m12: string }[] = [
  { metric: "SMBs trained at fluency events", m6: "2,000", m12: "6,000" },
  { metric: "Paying SMB seats activated", m6: "47,000", m12: "140,000" },
  { metric: "Channel partner contracts signed", m6: "8", m12: "20" },
  { metric: "Government / public-body MoUs", m6: "2", m12: "4" },
  { metric: "Press moments (Tier-1 UK national)", m6: "4", m12: "10" },
  { metric: "Indicative ARR (UK only)", m6: "£10m", m12: "£30m+" },
];

export default function Targets() {
  return (
    <div className="space-y-3">
      <p className="text-[14px] max-w-3xl" style={{ color: "#141413" }}>
        The table below sets out a proposed bar for year one. The metrics
        deliberately pair reach (training and memoranda of understanding)
        with conversion (seats and revenue) so that the programme cannot
        drift into events expenditure without commercial return. The return
        does not compound; it is exponential. Year one is the slowest. If
        the launch is right, this is a £100m+ business by year two.
        <Footnote id={[4, 7]} />
      </p>

      <div
        className="border border-[#E8E5DC] bg-white"
        style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui" }}
      >
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-[#E8E5DC] bg-[#F5F2EA]">
              <th className="text-left px-4 py-3 text-[11px] uppercase tracking-[0.15em] text-[#6B6862] font-medium">
                Metric
              </th>
              <th className="text-right px-3 py-3 text-[11px] uppercase tracking-[0.15em] text-[#6B6862] font-medium">
                Month 6
              </th>
              <th className="text-right px-3 py-3 text-[11px] uppercase tracking-[0.15em] text-[#6B6862] font-medium">
                Month 12
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.metric} className="border-b border-[#F0EDE3] last:border-b-0">
                <td className="px-4 py-3 text-[#141413]">{r.metric}</td>
                <td className="px-3 py-3 text-right text-[#141413] font-semibold tabular-nums">
                  {r.m6}
                </td>
                <td className="px-3 py-3 text-right text-[#141413] font-semibold tabular-nums">
                  {r.m12}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[12px] max-w-3xl" style={{ color: "#4A4842" }}>
        Two outcomes outside the numbers also warrant tracking. The first
        is the establishment of an Anthropic UK SMB identity that the
        Federation of Small Businesses and ICAEW are willing to endorse
        publicly. The second is the body of UK case studies, with a target
        of five by month six and fifteen by month twelve, used to recruit the
        next cohort of customers and the next tier of partners.
      </p>

      <p
        className="text-[11px] max-w-3xl italic pt-2 border-t"
        style={{ color: "#6B6862", borderColor: "#E8E5DC", fontFamily: "var(--font-inter), ui-sans-serif, system-ui" }}
      >
        Note. The easy critique is that this is not ambitious enough. I
        agree, and have conviction that with the right support these
        numbers go higher.
      </p>
    </div>
  );
}
