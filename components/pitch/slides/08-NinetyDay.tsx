import PlanTimeline from "../PlanTimeline";

export default function NinetyDay() {
  return (
    <div className="space-y-3">
      <p className="text-[14px] max-w-3xl" style={{ color: "#141413" }}>
        The proposed plan runs over twelve weeks in three phases. The first
        phase is largely listening and mapping; the principal risk of
        compressing it is signing the wrong first partner or not being close enough to SMBs. The second and
        third phases are designed to deliver a public London launch by week
        twelve, with three signed partner contracts and success stories from SMBs already signed up.
    
      </p>

      <PlanTimeline />

      <p className="text-[12px] max-w-3xl" style={{ color: "#4A4842" }}>
        Items expand on click. No new headcount is proposed during this
        phase but could accelerate the launch and increase ambition if available. The launch is run single-handed, drawing on the existing
        London applied AI, marketing and policy teams for engineering and
        event production. The case for a first hire would be revisited at
        month six on the basis of demonstrated traction against the targets
        on slide seven.
      </p>
    </div>
  );
}
