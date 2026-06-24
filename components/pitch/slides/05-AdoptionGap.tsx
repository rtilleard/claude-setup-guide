import Footnote from "../Footnote";
import AdoptionChart from "../AdoptionChart";

export default function AdoptionGap() {
  return (
    <div className="space-y-4">
      <p className="text-[14px] max-w-3xl" style={{ color: "#141413" }}>
        The shortfall is observable in the public data and runs across the
        whole UK SME population. Micro businesses sit at fourteen per cent
        adoption and mid-sized firms at twenty-three, against thirty-six
        per cent for large firms and sixteen per cent across all UK
        businesses. The gap is widest at the smallest end, but is material
        across micro, small and medium-sized firms alike.
        <Footnote id={[2, 5]} />
      </p>

      <AdoptionChart />
    </div>
  );
}
