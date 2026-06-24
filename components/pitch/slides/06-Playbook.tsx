import Footnote from "../Footnote";
import UKTourMap from "../UKTourMap";

const MOTIONS = [
  {
    n: "1",
    title: "Product. Localise the surface",
    body: "Replace or supplement the US default integrations. Xero, Sage, Starling Bank, Monzo Business, HMRC Making Tax Digital, GDPR / ICO compliance posture. UK-currency billing and VAT-aware workflows. Take this as far as possible using the latest coding agents to ship integrations at pace, with applied AI in support.",
  },
  {
    n: "2",
    title: "Partnerships. Win the distribution layer",
    body: "FSB (5.6m-business reach), ICAEW (200k+ accountants), Xero / Sage app stores, Starling / Monzo Business channels, Be the Business, Innovate UK, Tech Nation. Public sector partners: Help to Grow: Digital, DSIT, devolved enterprise agencies.",
  },
  {
    n: "3",
    title: "Fluency tour. 10 UK&I cities in one month",
    body: "Mirror the US programme but compress it. Free half-day workshops for 100 SMB leaders per stop, run as a four-week sprint covering London, Bristol, Cardiff, Birmingham, Manchester, Leeds, Belfast, Glasgow, Edinburgh and Dublin. Co-hosted with the FSB and regional chambers.",
  },
  {
    n: "4",
    title: "Sectoral wedges. Land three verticals first",
    body: "Creative agencies (London, Manchester, Bristol). Professional services such as accountants, solicitors and consultants. E-commerce, including Shopify and WooCommerce sellers. Each wedge has a named template stack and a named partner.",
  },
];

export default function Playbook() {
  return (
    <div className="space-y-4">
      <p className="text-[14px] max-w-3xl" style={{ color: "#141413" }}>
        The proposed playbook has four motions. Each requires a single
        owner and most of them can be run in parallel because they touch
        different parts of the market. Partnerships will move fastest,
        because the contracts are independent of the engineering work.
        Product is the slowest motion but creates the deepest moat. The
        tour is what makes both motions visible to the press, government
        and SME audience.
        <Footnote id={[4, 7, 8]} />
      </p>

      <div className="grid md:grid-cols-2 gap-x-6 gap-y-3">
        {MOTIONS.map((m) => (
          <div key={m.n} className="grid grid-cols-[32px_1fr] gap-3">
            <div
              className="text-2xl font-semibold tabular-nums"
              style={{ fontFamily: "var(--font-source-serif), Georgia, serif", color: "#D6D2C4" }}
            >
              {m.n}
            </div>
            <div>
              <div className="text-[13px] font-semibold" style={{ color: "#141413" }}>
                {m.title}
              </div>
              <p className="text-[12px] mt-0.5" style={{ color: "#4A4842" }}>{m.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-1">
        <UKTourMap />
      </div>
    </div>
  );
}
