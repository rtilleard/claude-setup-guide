import Footnote from "../Footnote";
import TAMCalculator from "../TAMCalculator";

export default function TAM() {
  return (
    <div className="space-y-4">
      <p className="text-[14px]" style={{ color: "#141413" }}>
        The UK addressable market for a Claude for Small Business equivalent
        is sized by three levers: reach (the share of SMEs the programme
        touches), paid conversion (the share of those that buy a seat) and
        ARPU (annual revenue per paying SME, anchored to comparable SaaS).
        <Footnote id={[1, 2, 5, 6]} />
      </p>

      <TAMCalculator />

      <div className="text-[12px] space-y-1.5 pt-1" style={{ color: "#4A4842" }}>
        <p>
          <strong>Reach</strong> is the share of the 5.69m UK SMEs the
          programme reaches through partners, the tour,
          and inbound product trials.
          <Footnote id={4} />
        </p>
        <p>
          <strong>Conversion</strong> sits below typical SaaS
          trial-to-paid rates because the funnel includes fluency-tour
          attendees as well as product-led signups.
        </p>
        <p>
          <strong>ARPU</strong> anchors to Microsoft 365 Business Standard
          (£9.60 per user per month) and Xero (around £10 per month) as
          UK SMB-comparable price points. Claude team is priced at £18 per user per month, so this pricing is conservative.
        </p>
      </div>
    </div>
  );
}
