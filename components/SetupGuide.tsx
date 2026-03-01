"use client";

import { useState } from "react";
import CodeBlock from "./CodeBlock";

type Platform = "google" | "microsoft" | "apple" | "google-direct";

const platforms: { id: Platform; name: string }[] = [
  { id: "google", name: "Google" },
  { id: "microsoft", name: "Microsoft" },
  { id: "apple", name: "Apple" },
  { id: "google-direct", name: "Google (direct)" },
];

const installScript = `#!/bin/bash
# Claude Code Productivity Skills — Install Script
# Paste this into your Terminal and press Enter

mkdir -p ~/.claude/commands

# ── Calendar ──────────────────────────────────────────────────────────────────

cat > ~/.claude/commands/calendar-today.md << 'SKILL'
Using my connected calendar, show me everything scheduled for today.
Format each event clearly: time → event name → location (if set).
Flag any back-to-back meetings or conflicts.
End with a one-line summary of how busy the day looks.
SKILL

cat > ~/.claude/commands/calendar-week.md << 'SKILL'
Show my calendar for the next 7 days, grouped by day.
Show the date, day name, and all events for each day.
Highlight any unusually busy days or scheduling conflicts.
Give a one-line theme or main focus for the week.
SKILL

cat > ~/.claude/commands/prep-meeting.md << 'SKILL'
Look up my next upcoming meeting on my calendar.
Prepare me with:
1. What the meeting is about
2. Who is attending
3. The agenda (if there is one)
4. 3 good questions I should ask or points to cover
5. Any related emails I should know about
$ARGUMENTS
SKILL

cat > ~/.claude/commands/find-time.md << 'SKILL'
Help me find a good time to schedule a new meeting.
Check my calendar for free slots in the next 5 working days.
Avoid scheduling: early mornings, lunch (12-1pm), or back-to-back stacking.
Suggest 3 good options with the day, time, and why it works.
Meeting details: $ARGUMENTS
SKILL

# ── Email ─────────────────────────────────────────────────────────────────────

cat > ~/.claude/commands/inbox-triage.md << 'SKILL'
Check my email inbox and help me triage it.
Sort emails into three buckets:
  • Urgent — needs a reply today
  • Important — needs a reply this week
  • FYI — no action needed
Show urgent emails first. For each urgent email, write a suggested one-line reply.
SKILL

cat > ~/.claude/commands/draft-reply.md << 'SKILL'
Draft a reply to the most recent email in my inbox (or to the thread I describe below).
Tone: professional but warm. Length: concise — no fluff.
If the email asks multiple questions, answer each one separately and clearly.
What I want to say / context: $ARGUMENTS
SKILL

cat > ~/.claude/commands/email-digest.md << 'SKILL'
Give me a digest of my most important emails from the past 7 days.
Highlight:
  • Decisions that were made
  • Action items I owe other people
  • Things I'm waiting on others for
  • Anything I might have missed
SKILL

cat > ~/.claude/commands/unsubscribe-scan.md << 'SKILL'
Scan my recent emails and identify newsletters, marketing emails, and mailing lists.
For each one, show: sender name, how often they arrive, and the last email subject line.
Then ask me which ones I'd like to unsubscribe from, and help me do it.
SKILL

cat > ~/.claude/commands/inbox-zero.md << 'SKILL'
Work through my unread emails one at a time, starting with the most recent.

For each email:
1. Show me: sender, subject, and a 1–2 sentence summary of what it's asking
2. Draft a reply — professional but warm, concise, no fluff
3. Ask me: "Send / Edit / Skip / Stop?"
   • Send — send the reply as-is
   • Edit — show me the draft so I can change it, then confirm before sending
   • Skip — leave it for later and move to the next email
   • Stop — end the session and summarise what was handled

Keep going until I say Stop or there are no more unread emails.
SKILL

# ── Analysis ──────────────────────────────────────────────────────────────────

cat > ~/.claude/commands/analyse-data.md << 'SKILL'
Analyse the data file I'm providing.
Give me:
1. A plain-English summary of what the data contains
2. Key statistics (averages, totals, ranges, outliers)
3. Interesting patterns or trends you notice
4. 3–5 actionable insights
5. Suggested chart types if this were to be visualised
File: $ARGUMENTS
SKILL

cat > ~/.claude/commands/research.md << 'SKILL'
Research this topic and give me a clear, jargon-free report: $ARGUMENTS

Structure:
1. Plain-English explanation of the topic
2. Key facts, numbers, and statistics
3. Different perspectives or approaches
4. Practical implications — what does this mean for me?
5. Suggested next steps or further reading
SKILL

cat > ~/.claude/commands/weekly-review.md << 'SKILL'
Help me do a weekly review.

Look at:
  • My calendar from the past 7 days (what did I actually spend time on?)
  • Any important emails or outstanding tasks
  • My upcoming week's calendar

Then give me:
  • A summary of the past week
  • What went well and what was challenging
  • Top 3 priorities for next week
  • Suggested focus areas or things to protect time for
SKILL

cat > ~/.claude/commands/summarise.md << 'SKILL'
Summarise the following document, article, or content.

Give me:
  • A 2–3 sentence summary
  • Key points as a bullet list (max 7 bullets)
  • One practical takeaway I can act on

Content: $ARGUMENTS
SKILL

echo ""
echo "✓ 13 skills installed successfully!"
echo ""
echo "Try these in Claude Code:"
echo "  /calendar-today        — See today's schedule"
echo "  /inbox-triage          — Prioritise your inbox"
echo "  /research remote work  — Research any topic"
echo ""`;

const mcpConfigs: Record<Platform, { title: string; steps: { heading: string; body: string; code?: string; language?: string; filename?: string }[] }> = {
  google: {
    title: "Connect Google Calendar & Gmail",
    steps: [
      {
        heading: "What to expect — this takes about 2 minutes",
        body: "Claude has built-in Gmail and Google Calendar integrations — no developer accounts, no API keys, no Terminal commands needed. You just connect them through your Claude.ai account, and they're available in Claude Code automatically.",
      },
      {
        heading: "1. Open Claude.ai settings",
        body: "Go to claude.ai in your browser.\nClick your profile photo in the top right → Settings.\nClick Integrations in the left sidebar.",
      },
      {
        heading: "2. Connect Gmail",
        body: "Find Gmail in the list of integrations and click Connect.\nSign in with your Google account and grant access when prompted.",
      },
      {
        heading: "3. Connect Google Calendar",
        body: "Back on the Integrations page, find Google Calendar and click Connect.\nSign in with your Google account again and grant access.",
      },
      {
        heading: "4. Connect Google Drive",
        body: "Find Google Drive in the integrations list and click Connect.\nGrant access when prompted — this lets Claude search and read files stored in your Drive.",
      },
      {
        heading: "5. Restart Claude Code",
        body: "Quit Claude Code and reopen it. Gmail, Calendar, and Drive are now connected — no extra configuration needed.\n\nThese integrations are tied to your Claude.ai account, so they'll work automatically whenever you're logged in.",
      },
    ],
  },
  microsoft: {
    title: "Connect Outlook & Microsoft 365",
    steps: [
      {
        heading: "Create a free Azure app (5 minutes)",
        body: `Go to portal.azure.com → App registrations → New registration.\nName it "Claude Code", choose "Accounts in any organizational directory (and personal Microsoft accounts)", then Register.\nCopy your Application (client) ID.\nUnder API permissions, add: Calendars.Read · Mail.Read · Mail.Send · Files.Read\nUnder Certificates & secrets, create a client secret and copy the Value.`,
      },
      {
        heading: "Add the Microsoft 365 MCP server",
        body: "Add this to your Claude Code settings, replacing the client ID with yours:",
        code: JSON.stringify({ mcpServers: { "microsoft-365": { command: "npx", args: ["-y", "@softeria/ms-365-mcp-server"], env: { MS_CLIENT_ID: "paste-your-client-id-here", MS_TENANT_ID: "common" } } } }, null, 2),
        language: "json",
        filename: "~/.claude/claude.json",
      },
      {
        heading: "Authenticate",
        body: "Run this once to log in:",
        code: "npx @softeria/ms-365-mcp-server --auth",
        language: "bash",
      },
    ],
  },
  "google-direct": {
    title: "Connect Google directly (advanced)",
    steps: [
      {
        heading: "What to expect — this takes about 15 minutes",
        body: "This method connects Google directly to Claude Code without going through Claude.ai. It requires setting up your own API credentials in Google Cloud Console — a developer tool not designed for beginners. Use this only if you prefer not to use the Claude.ai integration.",
      },
      {
        heading: "1. Create a Google Cloud project",
        body: "Go to console.cloud.google.com.\nClick the project dropdown at the top left → New Project.\nName it Claude Code → Create.\nMake sure it's selected before continuing.",
      },
      {
        heading: "2. Enable Gmail and Calendar APIs",
        body: "Go to APIs & Services → Library.\nSearch Gmail API → click it → Enable.\nGo back to Library, search Google Calendar API → Enable.",
      },
      {
        heading: "3. Configure the OAuth consent screen",
        body: "Go to APIs & Services → OAuth consent screen.\nChoose External → Create.\nFill in:\n  • App name: Claude Code\n  • User support email: your Gmail address\n  • Developer contact email: your Gmail address\nClick Save and Continue through the next two screens (you can skip Scopes).\nOn the Test users screen → Add Users → enter your Gmail address → Save.",
      },
      {
        heading: "4. Create OAuth credentials",
        body: "Go to APIs & Services → Credentials.\nClick Create Credentials → OAuth client ID.\nApplication type: Desktop app.\nName it Claude Code → Create.\nClick the name of the credential you just created (not the edit icon).\nOn the detail page, click Download JSON.\nRename the downloaded file to gcp-oauth.keys.json.",
      },
      {
        heading: "5. Authenticate Gmail",
        body: "In Terminal, run these two commands. The second one will open a browser — sign in with your Google account and grant access.",
        code: "mkdir -p ~/.gmail-mcp && cp ~/Downloads/gcp-oauth.keys.json ~/.gmail-mcp/\nnpx @gongrzhe/server-gmail-autoauth-mcp auth",
        language: "bash",
      },
      {
        heading: "6. Authenticate Calendar",
        body: "Run this — it will open another browser window for Calendar access:",
        code: "GOOGLE_OAUTH_CREDENTIALS=~/.gmail-mcp/gcp-oauth.keys.json npx @cocal/google-calendar-mcp auth",
        language: "bash",
      },
      {
        heading: "7. Update your Claude Code config",
        body: "Add both servers to ~/.claude/claude.json (create the file if it doesn't exist):",
        code: JSON.stringify({ mcpServers: { gmail: { command: "npx", args: ["@gongrzhe/server-gmail-autoauth-mcp"] }, "google-calendar": { command: "npx", args: ["@cocal/google-calendar-mcp"], env: { GOOGLE_OAUTH_CREDENTIALS: "/Users/YOUR-USERNAME/.gmail-mcp/gcp-oauth.keys.json" } } } }, null, 2),
        language: "json",
        filename: "~/.claude/claude.json",
      },
      {
        heading: "8. Restart Claude Code",
        body: "Quit and reopen Claude Code. Gmail and Calendar are now connected.\n\nIf you see an 'Access blocked' error during auth: go back to the OAuth consent screen in Google Cloud Console, scroll to Test users, and make sure your Gmail address is listed.",
      },
    ],
  },
  apple: {
    title: "Connect Apple Mail & Calendar",
    steps: [
      {
        heading: "Allow Terminal to access Mail & Calendar",
        body: "Go to System Settings → Privacy & Security → Automation.\nFind Terminal (or iTerm2) in the list and enable the toggles for Mail and Calendar.\nThat's it — no API keys needed.",
      },
      {
        heading: "Optional: add web search for research skills",
        body: "If you want /research and /summarise to fetch live web content, add this MCP server:",
        code: JSON.stringify({ mcpServers: { fetch: { command: "npx", args: ["-y", "@modelcontextprotocol/server-fetch"] } } }, null, 2),
        language: "json",
        filename: "~/.claude/claude.json",
      },
    ],
  },
};

export default function SetupGuide() {
  const [platform, setPlatform] = useState<Platform>("google");
  const config = mcpConfigs[platform];

  return (
    <section id="setup" className="space-y-12">
      <h2 className="text-xl font-bold text-gray-900">Set up</h2>

      {/* Step 1: Open Terminal */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">1. Open Terminal</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Terminal is a built-in Mac app that lets you type commands directly to your computer — like texting your Mac instead of clicking around. You'll use it to install everything on this page.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          To open it: press <kbd className="font-mono text-xs bg-gray-100 border border-gray-300 rounded px-1.5 py-0.5">⌘ Space</kbd> to open Spotlight, type <strong>Terminal</strong>, then press <kbd className="font-mono text-xs bg-gray-100 border border-gray-300 rounded px-1.5 py-0.5">Enter</kbd>.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          A window will open with a blinking cursor. That's Terminal — you're ready.
        </p>
      </div>

      {/* Step 2: Install Node.js */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">2. Install Node.js</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Node.js is a tool that runs JavaScript on your computer. Claude Code needs it to work.
        </p>
        <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside leading-relaxed">
          <li>
            Go to{" "}
            <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-gray-900">
              nodejs.org
            </a>
          </li>
          <li>Click the big <strong>Download Node.js (LTS)</strong> button</li>
          <li>Open the file that downloads and follow the installer</li>
          <li>Once it's done, come back here</li>
        </ol>
        <p className="text-sm text-gray-600 leading-relaxed">
          To check it worked, paste this into Terminal and press Enter — you should see a version number:
        </p>
        <CodeBlock code="node --version" />
      </div>

      {/* Step 3: Install Claude Code */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">3. Install Claude Code</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Paste this into Terminal and press Enter:
        </p>
        <CodeBlock code="npm install -g @anthropic-ai/claude-code" />
        <p className="text-sm text-gray-600 leading-relaxed">
          When it's done, type <code className="text-xs font-mono bg-gray-100 px-1 py-0.5 rounded">claude</code> and press Enter to open Claude Code for the first time. It will ask you to log in with your Anthropic account.
        </p>
        <CodeBlock code="claude" />
        <p className="text-xs text-gray-400">
          No account yet?{" "}
          <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
            Create one free at console.anthropic.com
          </a>
        </p>
      </div>

      {/* Step 4: Create a working folder */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">4. Create a working folder</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Claude works within whatever folder you open it from — it can read and create files there. Running it from your home folder gives it access to everything on your Mac, which isn't ideal. A dedicated folder keeps things tidy and scopes what Claude can see.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          Think of it like a desk. Claude works on whatever's on the desk. This folder is your desk.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          Create the folder by pasting this into Terminal:
        </p>
        <CodeBlock code="mkdir -p ~/Documents/Claude" />
        <p className="text-sm text-gray-600 leading-relaxed">
          From now on, every time you want to use Claude Code, open Terminal and run:
        </p>
        <CodeBlock code={`cd ~/Documents/Claude\nclaude`} />
        <p className="text-sm text-gray-600 leading-relaxed">
          You can also combine them into one line: <code className="text-xs font-mono bg-gray-100 px-1 py-0.5 rounded">cd ~/Documents/Claude &amp;&amp; claude</code>
        </p>
        <p className="text-xs text-gray-400">
          Note: the <code className="text-xs font-mono">npm install -g</code> command in step 3 installed Claude Code <em>globally</em> — the <code className="text-xs font-mono">-g</code> flag means it's available as a command from anywhere on your Mac, like <code className="text-xs font-mono">open</code> or <code className="text-xs font-mono">ls</code>. The working folder is simply where Claude <em>operates from</em> when you launch it.
        </p>
      </div>

      {/* Step 5: Create the skills folder */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">5. Create your skills folder</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Skills are small text files that live in a folder called <code className="text-xs font-mono bg-gray-100 px-1 py-0.5 rounded">~/.claude/commands/</code> on your computer. The <code className="text-xs font-mono bg-gray-100 px-1 py-0.5 rounded">~</code> just means your home folder — the one with your name on it.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          Paste this into Terminal to create the folder:
        </p>
        <CodeBlock code="mkdir -p ~/.claude/commands" />
        <p className="text-sm text-gray-600 leading-relaxed">
          Nothing will happen — that's normal. The folder has been created.
        </p>
      </div>

      {/* Step 6: Install skills */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">6. Install all 13 skills</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Now paste the script below into Terminal and press Enter. It writes all 13 skill files into the folder you just created.
        </p>
        <CodeBlock code={installScript} filename="Paste into Terminal — installs all 13 skills" />
        <p className="text-sm text-gray-600 leading-relaxed">
          You should see a message that says <em>13 skills installed successfully</em>.
        </p>
      </div>

      {/* Step 7: Connect platform */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">7. Connect your calendar, email & documents</h3>

        <div className="flex gap-1 border-b border-gray-200">
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => setPlatform(p.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer -mb-px ${
                platform === p.id
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="space-y-6 pt-2">
          <p className="text-xs text-gray-400">{config.title}</p>
          {config.steps.map((step, i) => (
            <div key={i} className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-800">{step.heading}</h4>
              <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{step.body}</p>
              {step.code && (
                <CodeBlock code={step.code} language={step.language} filename={step.filename} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Done */}
      <div className="border border-gray-200 rounded-xl p-5 space-y-3">
        <p className="text-sm font-semibold text-gray-900">You're all set. Here's how to launch Claude Code:</p>
        <CodeBlock code={`cd ~/Documents/Claude\nclaude`} />
        <p className="text-sm text-gray-600">Then try these to get started:</p>
        <div className="flex flex-wrap gap-2">
          {["/calendar-today", "/inbox-triage", "/research AI tools for work"].map((cmd) => (
            <code key={cmd} className="text-xs font-mono text-orange-600 bg-orange-50 px-2 py-1 rounded">
              {cmd}
            </code>
          ))}
        </div>
        <p className="text-sm text-gray-400 pt-1">
          <strong className="text-gray-500">A note on connecting:</strong> The email and calendar integrations do work well, but occasionally need a second attempt to connect. If something isn&apos;t coming through, disconnect and reconnect — it usually gets there.
        </p>
      </div>
    </section>
  );
}
