export default function Hero() {
  return (
    <section>
      <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
        Claude Code Skills Pack
      </h1>
      <p className="text-gray-600 text-lg leading-relaxed mb-8">
        12 ready-made skills for Claude Code — manage your calendar, triage
        your inbox, and analyse data, all in plain English from your terminal.
      </p>
      <div className="flex gap-4 text-sm font-medium">
        <a
          href="#setup"
          className="text-orange-600 hover:underline underline-offset-2"
        >
          Get set up →
        </a>
        <a
          href="#skills"
          className="text-gray-500 hover:underline underline-offset-2"
        >
          See all skills
        </a>
      </div>
    </section>
  );
}
