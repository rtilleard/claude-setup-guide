import Hero from "@/components/Hero";
import SetupGuide from "@/components/SetupGuide";
import SkillsGallery from "@/components/SkillsGallery";
import TerminalDarkMode from "@/components/TerminalDarkMode";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 space-y-16">
      <Hero />
      <hr className="border-gray-200" />
      <SetupGuide />
      <hr className="border-gray-200" />
      <SkillsGallery />
      <hr className="border-gray-200" />
      <TerminalDarkMode />
      <footer className="pt-4 text-sm text-gray-400">
        Built for{" "}
        <a
          href="https://claude.ai/code"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-gray-600"
        >
          Claude Code
        </a>{" "}
        by Anthropic.
      </footer>
    </main>
  );
}
