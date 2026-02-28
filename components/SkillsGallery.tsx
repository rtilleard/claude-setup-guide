const skills = [
  {
    category: "Calendar",
    items: [
      { cmd: "/calendar-today", description: "Everything on your schedule today, with conflicts flagged." },
      { cmd: "/calendar-week", description: "7-day overview grouped by day, with a one-line weekly theme." },
      { cmd: "/prep-meeting", description: "Agenda, attendees, suggested questions, and relevant emails for your next meeting." },
      { cmd: "/find-time", description: "Three open slots in the next 5 working days that avoid back-to-back stacking." },
    ],
  },
  {
    category: "Email",
    items: [
      { cmd: "/inbox-triage", description: "Sorts your inbox into Urgent / Important / FYI with suggested replies for urgent emails." },
      { cmd: "/draft-reply", description: "Drafts a concise, professional reply to any email thread." },
      { cmd: "/email-digest", description: "Weekly digest: decisions made, things you owe, things you're waiting on." },
      { cmd: "/unsubscribe-scan", description: "Lists newsletters and marketing emails and helps you unsubscribe." },
    ],
  },
  {
    category: "Analysis",
    items: [
      { cmd: "/analyse-data", description: "Stats, patterns, and 3–5 actionable insights from any CSV or spreadsheet." },
      { cmd: "/research", description: "Clear, jargon-free report on any topic with key facts and next steps." },
      { cmd: "/weekly-review", description: "Personalised review of your past week and top 3 priorities for next week." },
      { cmd: "/summarise", description: "2–3 sentence summary, key bullets, and one practical takeaway from any document." },
    ],
  },
];

export default function SkillsGallery() {
  return (
    <section id="skills">
      <h2 className="text-xl font-bold text-gray-900 mb-8">All 12 skills</h2>

      <div className="space-y-10">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              {group.category}
            </h3>
            <ul className="space-y-4">
              {group.items.map((skill) => (
                <li key={skill.cmd} className="flex gap-4">
                  <code className="text-sm font-mono text-orange-600 shrink-0 w-44">
                    {skill.cmd}
                  </code>
                  <span className="text-sm text-gray-600 leading-relaxed">
                    {skill.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <a
          href="#setup"
          className="text-sm font-medium text-orange-600 hover:underline underline-offset-2"
        >
          Install all 12 skills →
        </a>
      </div>
    </section>
  );
}
