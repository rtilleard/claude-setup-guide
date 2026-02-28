"use client";

import { useState } from "react";

type TerminalApp = "terminal" | "iterm2" | "other";

const apps: { id: TerminalApp; name: string }[] = [
  { id: "terminal", name: "Terminal.app" },
  { id: "iterm2", name: "iTerm2" },
  { id: "other", name: "Other" },
];

const steps: Record<TerminalApp, { heading: string; body: string }[]> = {
  terminal: [
    {
      heading: "Option A — System-wide (easiest)",
      body: "System Settings → Appearance → Dark.\n\nTerminal.app follows automatically.",
    },
    {
      heading: "Option B — Terminal only",
      body: "Terminal → Settings (⌘,) → Profiles tab.\n\nPick a dark theme — Pro, Homebrew, or Novel all work. Click Default to make it stick.",
    },
    {
      heading: "Tell Claude Code",
      body: "Run /config in Claude Code and set the theme to Dark.",
    },
  ],
  iterm2: [
    {
      heading: "Switch to a dark colour scheme",
      body: "iTerm2 → Settings (⌘,) → Profiles → Colors → Color Presets…\n\nChoose a dark preset — Dark Background, Tango Dark, or Solarized Dark are popular.",
    },
    {
      heading: "Optional: follow macOS dark mode",
      body: "In Settings → Appearance, set Theme to System. Then set macOS to Dark in System Settings → Appearance and iTerm2 will adapt.",
    },
    {
      heading: "Tell Claude Code",
      body: "Run /config in Claude Code and set the theme to Dark.",
    },
  ],
  other: [
    {
      heading: "Set macOS to dark mode",
      body: "System Settings → Appearance → Dark.\n\nMost terminals — Warp, Ghostty, Alacritty, Kitty — follow this automatically or have their own theme setting.",
    },
    {
      heading: "Check your terminal's own settings",
      body: "Look for Theme or Colour scheme in preferences. Popular dark options: Tokyo Night, Dracula, Catppuccin Mocha, One Dark.",
    },
    {
      heading: "Tell Claude Code",
      body: "Run /config in Claude Code and set the theme to Dark.",
    },
  ],
};

export default function TerminalDarkMode() {
  const [app, setApp] = useState<TerminalApp>("terminal");

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Set up dark mode</h2>
      <p className="text-sm text-gray-600">
        Claude Code inherits its appearance from your terminal. Set your terminal to dark first, then update Claude Code to match.
      </p>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200">
        {apps.map((a) => (
          <button
            key={a.id}
            onClick={() => setApp(a.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer -mb-px ${
              app === a.id
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {a.name}
          </button>
        ))}
      </div>

      <div className="space-y-5 pt-1">
        {steps[app].map((step, i) => (
          <div key={i}>
            <h3 className="text-sm font-semibold text-gray-800 mb-1">
              {i + 1}. {step.heading}
            </h3>
            <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
              {step.body}
            </p>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400">
        Not sure which terminal you have? If you haven't installed anything extra, it's <strong className="text-gray-500">Terminal.app</strong> — it ships with every Mac.
      </p>
    </section>
  );
}
