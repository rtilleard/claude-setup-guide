const features = [
  {
    icon: "📅",
    title: "Calendar",
    color: "blue" as const,
    tagline: "Know your schedule, always",
    skills: [
      { cmd: "/calendar-today", desc: "See today's full schedule at a glance" },
      { cmd: "/calendar-week", desc: "Get a 7-day overview and spot busy days" },
      { cmd: "/prep-meeting", desc: "Prepare notes before your next meeting" },
      { cmd: "/find-time", desc: "Find a free slot for a new meeting" },
    ],
  },
  {
    icon: "📧",
    title: "Email",
    color: "green" as const,
    tagline: "Inbox under control",
    skills: [
      { cmd: "/inbox-triage", desc: "Prioritise your inbox by urgency" },
      { cmd: "/draft-reply", desc: "Draft a polished reply to any email" },
      { cmd: "/email-digest", desc: "Weekly digest of your most important emails" },
      { cmd: "/unsubscribe-scan", desc: "Find newsletters you no longer need" },
    ],
  },
  {
    icon: "📊",
    title: "Analysis",
    color: "purple" as const,
    tagline: "Answers, not raw data",
    skills: [
      {
        cmd: "/analyse-data",
        desc: "Analyse any CSV, spreadsheet, or dataset",
      },
      {
        cmd: "/research",
        desc: "Research any topic with a clear, plain-English report",
      },
      {
        cmd: "/weekly-review",
        desc: "Personalised weekly productivity review",
      },
      { cmd: "/summarise", desc: "Summarise any document or article instantly" },
    ],
  },
];

const colorMap = {
  blue: {
    section: "bg-blue-50 border-blue-100",
    badge: "bg-blue-100 text-blue-700",
    dot: "bg-blue-400",
    icon: "bg-blue-100",
  },
  green: {
    section: "bg-emerald-50 border-emerald-100",
    badge: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-400",
    icon: "bg-emerald-100",
  },
  purple: {
    section: "bg-violet-50 border-violet-100",
    badge: "bg-violet-100 text-violet-700",
    dot: "bg-violet-400",
    icon: "bg-violet-100",
  },
};

export default function SkillsPreview() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What you&apos;ll be able to do
          </h2>
          <p className="text-gray-500 text-lg">
            13 skills that work right from your terminal, in plain English.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const colors = colorMap[feature.color];
            return (
              <div
                key={feature.title}
                className={`${colors.section} border rounded-2xl p-6`}
              >
                <div
                  className={`w-11 h-11 ${colors.icon} rounded-xl flex items-center justify-center text-2xl mb-4`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 mb-5">{feature.tagline}</p>

                <ul className="space-y-3.5">
                  {feature.skills.map((skill) => (
                    <li key={skill.cmd} className="flex items-start gap-2.5">
                      <span
                        className={`${colors.dot} w-1.5 h-1.5 rounded-full mt-1.5 shrink-0`}
                      />
                      <div>
                        <code
                          className={`text-xs font-mono ${colors.badge} px-1.5 py-0.5 rounded`}
                        >
                          {skill.cmd}
                        </code>
                        <p className="text-sm text-gray-600 mt-1">
                          {skill.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
