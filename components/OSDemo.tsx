"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type Scene = "query" | "tasks" | "editor" | "email" | "slack";

const SCENE_ORDER: Scene[] = ["query", "tasks", "editor", "email", "slack"];

const COMMAND_TEXT =
  "Draft the Acme Corp proposal, email it to Sarah, then triage my Slack messages";

const PROPOSAL = `BUSINESS PROPOSAL
Prepared for: Acme Corp | Date: March 7, 2026

OVERVIEW
Strategic partnership proposal outlining a 10-week engagement.

Phase 1 — Discovery & Audit (Weeks 1–2)
Review workflows, stakeholder interviews. $4,500

Phase 2 — Implementation (Weeks 3–8)
Deploy tooling, staff onboarding. $18,000

Phase 3 — Review & Optimise (Weeks 9–10)
Performance review, handover. $3,500

Total: $26,000
Payment: 50% on signing, 50% on Phase 2 completion.

NEXT STEPS
Reply to confirm interest and we'll schedule a 30-minute kick-off call.`;

const EMAIL_BODY = `Hi Sarah,

Please find attached our proposal as discussed. Three-phase engagement, $26,000 total.

Happy to jump on a call to walk you through it.

Best, Robbie`;

// ── Helpers ──────────────────────────────────────────────────────────────────

function TrafficLights() {
  return (
    <div className="flex gap-1.5 flex-shrink-0">
      <div className="w-3 h-3 rounded-full bg-red-500" />
      <div className="w-3 h-3 rounded-full bg-yellow-400" />
      <div className="w-3 h-3 rounded-full bg-green-500" />
    </div>
  );
}

function Dots() {
  return (
    <span className="inline-flex gap-1 ml-1 align-middle">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="w-1.5 h-1.5 rounded-full bg-violet-400 inline-block animate-bounce"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  );
}

// ── Menu bar ──────────────────────────────────────────────────────────────────

function MenuBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-AU", {
          hour: "numeric",
          minute: "2-digit",
        })
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="h-6 bg-black/80 backdrop-blur-sm flex items-center justify-between px-3 text-xs text-white/60 flex-shrink-0">
      <div className="flex items-center gap-4">
        <span className="font-semibold text-white">OS</span>
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Window</span>
      </div>
      <div className="flex items-center gap-4">
        <span>Sat 7 Mar</span>
        <span>{time}</span>
      </div>
    </div>
  );
}

// ── Workflow breadcrumb ───────────────────────────────────────────────────────

const STEPS: { scene: Scene; label: string }[] = [
  { scene: "query", label: "Ask" },
  { scene: "tasks", label: "Tasks" },
  { scene: "editor", label: "Draft" },
  { scene: "email", label: "Email" },
  { scene: "slack", label: "Slack" },
];

const SLACK_MESSAGES = [
  {
    id: "jordan",
    initials: "JK",
    sender: "Jordan Kim",
    channel: "#product",
    ago: "2m ago",
    summary: "Asking if the $26k Acme pricing is negotiable",
    reply:
      "Hey Jordan — pricing is firm but happy to discuss scope. Want to jump on a call tomorrow?",
  },
  {
    id: "maya",
    initials: "MR",
    sender: "Maya Roberts",
    channel: "#ops",
    ago: "8m ago",
    summary: "Needs sign-off on the Q2 budget before EOD",
    reply:
      "Hi Maya, approved — go ahead. I'll send the formal sign-off after my next call.",
  },
  {
    id: "tom",
    initials: "TW",
    sender: "Tom Walsh",
    channel: "DM",
    ago: "14m ago",
    summary: "Following up on last week's intro call",
    reply:
      "Hey Tom, sorry for the delay — let's connect this week. Sending a calendar link now.",
  },
];

function Breadcrumb({
  scene,
  isProcessing,
}: {
  scene: Scene;
  isProcessing: boolean;
}) {
  const idx = SCENE_ORDER.indexOf(scene);

  return (
    <div className="flex items-center justify-center gap-2 pt-4 pb-1 text-xs">
      {STEPS.map((step, i) => {
        const done = i < idx || (i === idx && isProcessing);
        const active = i === idx && !isProcessing;
        const next = i === idx + 1 && isProcessing;

        return (
          <span key={step.scene} className="flex items-center gap-2">
            <span
              className={
                active
                  ? "text-white font-medium"
                  : done || next
                  ? "text-violet-400"
                  : "text-white/20"
              }
            >
              {step.label}
            </span>
            {i < STEPS.length - 1 && (
              <span
                className={
                  done || isProcessing
                    ? "text-violet-400/60"
                    : "text-white/15"
                }
              >
                →
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

// ── NL Bar ────────────────────────────────────────────────────────────────────

interface NLBarProps {
  scene: Scene;
  isProcessing: boolean;
  processingLabel: string;
}

function NLBar({ scene, isProcessing, processingLabel }: NLBarProps) {
  const [value, setValue] = useState("");
  const [editStatus, setEditStatus] = useState<"idle" | "thinking" | "done">(
    "idle"
  );

  const placeholder =
    scene === "query" || scene === "tasks"
      ? "What do you want to do today?"
      : scene === "editor"
      ? "What would you like to change?"
      : scene === "email"
      ? "Ask to revise the email..."
      : "Ask the OS to handle any of these...";

  const displayValue = isProcessing
    ? processingLabel
    : editStatus === "thinking"
    ? "Working on it..."
    : editStatus === "done"
    ? "Done."
    : value;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && scene === "editor" && value.trim() && !isProcessing) {
      setEditStatus("thinking");
      setTimeout(() => {
        setEditStatus("done");
        setValue("");
        setTimeout(() => setEditStatus("idle"), 1000);
      }, 900);
    }
  };

  return (
    <div className="flex-shrink-0 border-t border-white/10 bg-[#0A0A0A]">
      {/* Context strip — shows the original command once it's been run */}
      {scene !== "query" && scene !== "tasks" && (
        <div className="flex items-center gap-2 px-5 pt-2.5">
          <span className="text-white/20 text-[10px] font-mono uppercase tracking-widest">
            Active command
          </span>
          <span className="text-white/35 text-[11px] font-mono truncate">
            {COMMAND_TEXT}
          </span>
        </div>
      )}
      {/* Input row */}
      <div className="flex items-center gap-2 px-4 py-2.5">
        <span className="text-violet-400 font-mono text-sm flex-shrink-0">
          {isProcessing ? "⟳" : ">"}
        </span>
        <input
          type="text"
          value={displayValue}
          onChange={(e) => {
            if (!isProcessing && editStatus === "idle") setValue(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          readOnly={scene === "query" || scene === "tasks" || isProcessing || editStatus !== "idle"}
          className={`flex-1 bg-[#1A1A1A] border rounded-lg px-3 py-2 font-mono text-sm outline-none transition-colors ${
            isProcessing
              ? "border-violet-500/40 text-violet-300"
              : "border-white/10 text-white focus:border-violet-500/50 placeholder-white/25"
          }`}
        />
        {isProcessing ? (
          <Dots />
        ) : (
          <kbd className="text-white/20 text-xs font-mono flex-shrink-0">⏎</kbd>
        )}
      </div>
    </div>
  );
}

// ── Processing view ───────────────────────────────────────────────────────────

function ProcessingView({ label }: { label: string }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4">
      <div className="w-8 h-8 rounded-full border-2 border-violet-400/30 border-t-violet-400 animate-spin" />
      <p className="text-white/50 text-sm font-mono">{label}</p>
    </div>
  );
}

// ── Scene 0: NL Query ─────────────────────────────────────────────────────────

const QUERY_TEXT = "What are my tasks today?";

function QueryScene({ onAdvance }: { onAdvance: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      if (indexRef.current < QUERY_TEXT.length) {
        setDisplayed(QUERY_TEXT.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        clearInterval(id);
        setTimeout(onAdvance, 600);
      }
    }, 55);
    return () => clearInterval(id);
  }, [onAdvance]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 gap-5">
      <p className="text-white/30 text-xs font-mono uppercase tracking-widest">
        Natural language shell
      </p>
      <div className="w-full max-w-2xl bg-[#1A1A1A] border border-white/10 rounded-xl px-5 py-4 flex items-start gap-3">
        <span className="text-violet-400 font-mono text-base mt-0.5 flex-shrink-0">
          {">"}
        </span>
        <span className="text-white font-mono text-base leading-relaxed">
          {displayed}
          <span className="inline-block w-0.5 h-5 bg-violet-400 ml-0.5 align-middle animate-pulse" />
        </span>
      </div>
    </div>
  );
}

// ── Scene 1: Task list ────────────────────────────────────────────────────────

const DEMO_TASKS = [
  {
    id: "proposal",
    label: "Send Acme Corp proposal to Sarah",
    meta: "Due today",
  },
  {
    id: "slack",
    label: "Respond to Slack messages",
    meta: "3 unread",
  },
];

function TaskListScene({ onAdvance }: { onAdvance: () => void }) {
  const [visible, setVisible] = useState<boolean[]>([false, false]);
  const [checked, setChecked] = useState<boolean[]>([true, true]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setVisible((v) => [true, v[1]]), 0),
      setTimeout(() => setVisible((v) => [v[0], true]), 200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const toggle = (i: number) =>
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const anyChecked = checked.some(Boolean);

  return (
    <div className="flex-1 flex items-center justify-center px-6 pb-4 overflow-hidden">
      <div className="w-full max-w-lg flex flex-col gap-5">
        <div className="text-center">
          <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-1">
            Here&apos;s what needs attention
          </p>
          <p className="text-white/50 text-sm">2 things on your plate today</p>
        </div>

        <div className="flex flex-col gap-2">
          {DEMO_TASKS.map((task, i) => (
            <button
              key={task.id}
              onClick={() => toggle(i)}
              className="flex items-center gap-4 bg-[#1A1A1A] border rounded-xl px-5 py-4 transition-all duration-300 text-left cursor-pointer"
              style={{
                opacity: visible[i] ? 1 : 0,
                borderColor: checked[i] ? "rgb(139 92 246 / 0.4)" : "rgb(255 255 255 / 0.1)",
              }}
            >
              <div
                className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
                  checked[i]
                    ? "bg-violet-600 border border-violet-500"
                    : "border border-white/20"
                }`}
              >
                {checked[i] && (
                  <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm transition-colors ${checked[i] ? "text-white/80" : "text-white/35"}`}>
                  {task.label}
                </p>
              </div>
              <span className="text-white/25 text-xs flex-shrink-0">{task.meta}</span>
            </button>
          ))}
        </div>

        <button
          onClick={onAdvance}
          disabled={!anyChecked}
          className="self-center flex items-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
        >
          Start on {checked.filter(Boolean).length === 2 ? "both" : "this"} →
        </button>
      </div>
    </div>
  );
}

// ── Scene 2: Editor ───────────────────────────────────────────────────────────

function EditorScene({ onAdvance }: { onAdvance: () => void }) {
  const [showEditHint, setShowEditHint] = useState(true);
  const [docFocused, setDocFocused] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setShowEditHint(false), 2500);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center px-6 pb-4 overflow-hidden">
      <div className="w-full max-w-3xl h-full max-h-[500px] rounded-xl overflow-hidden border border-white/10 flex flex-col shadow-2xl">
        {/* Title bar */}
        <div className="bg-[#252528] px-4 py-2.5 flex items-center gap-3 flex-shrink-0 border-b border-white/10">
          <TrafficLights />
          <span className="text-white/40 text-xs font-mono flex-1 text-center">
            Acme Corp Proposal.docx
          </span>
          <button
            onClick={onAdvance}
            className="text-xs bg-violet-600 hover:bg-violet-500 text-white px-3 py-1 rounded transition-colors font-medium cursor-pointer"
          >
            Email to Sarah →
          </button>
        </div>
        {/* Toolbar */}
        <div className="bg-[#1E1E20] px-4 py-1.5 flex items-center gap-3 text-white/35 text-xs border-b border-white/10 flex-shrink-0">
          <span className="font-bold">B</span>
          <span className="italic">I</span>
          <span className="underline">U</span>
          <span className="text-white/15 mx-1">|</span>
          <span>Inter</span>
          <span className="text-white/15 mx-1">|</span>
          <span>12</span>
          <span className="text-white/15 mx-1">|</span>
          {showEditHint ? (
            <span className="ml-auto text-violet-400/50 text-xs italic transition-opacity">
              Click to edit
            </span>
          ) : (
            <span className="ml-auto text-white/20">Auto-saved</span>
          )}
        </div>
        {/* Document */}
        <div
          className={`flex-1 bg-white overflow-auto transition-all ${
            docFocused ? "ring-1 ring-violet-500/20" : ""
          }`}
        >
          <div
            contentEditable
            suppressContentEditableWarning
            onFocus={() => setDocFocused(true)}
            onBlur={() => setDocFocused(false)}
            className="min-h-full px-10 py-8 text-gray-900 text-sm leading-7 outline-none whitespace-pre-wrap font-[Georgia,serif] cursor-text"
          >
            {PROPOSAL}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Scene 3 helper: static doc window ─────────────────────────────────────────

function DocWindowStatic() {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-white/10 flex flex-col shadow-2xl pointer-events-none">
      <div className="bg-[#252528] px-4 py-2.5 flex items-center gap-3 flex-shrink-0 border-b border-white/10">
        <TrafficLights />
        <span className="text-white/40 text-xs font-mono flex-1 text-center">
          Acme Corp Proposal.docx
        </span>
      </div>
      <div className="bg-[#1E1E20] px-4 py-1.5 flex items-center gap-3 text-white/35 text-xs border-b border-white/10 flex-shrink-0">
        <span className="font-bold">B</span>
        <span className="italic">I</span>
        <span className="underline">U</span>
        <span className="text-white/15 mx-1">|</span>
        <span>Inter</span>
        <span className="text-white/15 mx-1">|</span>
        <span>12</span>
        <span className="ml-auto text-white/20">Auto-saved</span>
      </div>
      <div className="flex-1 bg-white overflow-hidden">
        <div className="px-10 py-8 text-gray-900 text-sm leading-7 whitespace-pre-wrap font-[Georgia,serif]">
          {PROPOSAL}
        </div>
      </div>
    </div>
  );
}

// ── Scene 3: Email ────────────────────────────────────────────────────────────

function EmailScene({ onAdvance }: { onAdvance: () => void }) {
  const [sent, setSent] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleSend = () => {
    setSent(true);
    setTimeout(() => onAdvance(), 900);
  };

  return (
    <div className="flex-1 flex items-end gap-4 px-6 pb-4 overflow-hidden">
      {/* Ghost doc window — left 44% */}
      <div className="w-[44%] h-full max-h-[500px] opacity-35 scale-[0.88] origin-top-left flex-shrink-0">
        <DocWindowStatic />
      </div>

      {/* Email window — right 54%, slides in */}
      <div
        className="w-[54%] h-full max-h-[500px] flex-shrink-0 rounded-xl overflow-hidden border border-white/10 flex flex-col shadow-2xl transition-all duration-500"
        style={{
          transform: mounted ? "translateX(0)" : "translateX(30px)",
          opacity: mounted ? 1 : 0,
        }}
      >
        {/* Title bar */}
        <div className="bg-[#252528] px-4 py-2.5 flex items-center gap-3 flex-shrink-0 border-b border-white/10">
          <TrafficLights />
          <span className="text-white/40 text-xs font-mono flex-1 text-center">
            New Message
          </span>
          <button
            onClick={handleSend}
            disabled={sent}
            className={`text-xs font-medium px-3 py-1 rounded transition-all cursor-pointer ${
              sent
                ? "bg-green-600 text-white"
                : "bg-violet-600 hover:bg-violet-500 text-white"
            }`}
          >
            {sent ? "Sent ✓" : "Send"}
          </button>
        </div>

        {/* Fields */}
        <div className="bg-[#1C1C1E] flex-1 flex flex-col overflow-hidden text-sm">
          <div className="border-b border-white/10 px-5 py-2.5 flex items-center gap-4">
            <span className="text-white/35 text-xs w-14">To</span>
            <input
              defaultValue="sarah@acmecorp.com"
              className="flex-1 bg-transparent text-white outline-none"
            />
          </div>
          <div className="border-b border-white/10 px-5 py-2.5 flex items-center gap-4">
            <span className="text-white/35 text-xs w-14">Subject</span>
            <input
              defaultValue="Business Proposal — Acme Corp"
              className="flex-1 bg-transparent text-white outline-none"
            />
          </div>
          <div className="border-b border-white/10 px-5 py-2.5 flex items-center gap-2">
            <span className="text-white/35 text-xs w-14">Attach</span>
            <span className="bg-white/8 border border-white/10 text-white/60 text-xs rounded px-2.5 py-1 font-mono">
              Acme Corp Proposal.docx
            </span>
          </div>
          <div
            contentEditable
            suppressContentEditableWarning
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            className={`flex-1 px-5 py-4 text-white/85 leading-relaxed outline-none whitespace-pre-wrap overflow-auto cursor-text transition-all ${
              emailFocused ? "ring-1 ring-violet-500/20" : ""
            }`}
          >
            {EMAIL_BODY}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Scene 4: Slack ────────────────────────────────────────────────────────────

type CardState = "idle" | "drafting" | "replied" | "skipped";

function SlackScene() {
  const [cardStates, setCardStates] = useState<Record<string, CardState>>(
    () => Object.fromEntries(SLACK_MESSAGES.map((m) => [m.id, "idle"]))
  );
  const [showOverlay, setShowOverlay] = useState(false);

  const setCard = (id: string, state: CardState) =>
    setCardStates((prev) => ({ ...prev, [id]: state }));

  const handleReply = (id: string) => {
    if (cardStates[id] !== "idle") return;
    setCard(id, "drafting");
  };

  const handleSkip = (id: string) => {
    if (cardStates[id] !== "idle") return;
    setCard(id, "skipped");
  };

  const handleSend = (id: string) => {
    setCard(id, "replied");
  };

  useEffect(() => {
    const all = Object.values(cardStates);
    if (all.length > 0 && all.every((s) => s === "replied" || s === "skipped")) {
      const id = setTimeout(() => setShowOverlay(true), 500);
      return () => clearTimeout(id);
    }
  }, [cardStates]);

  return (
    <div className="flex-1 flex items-center justify-center px-6 pb-4 overflow-hidden relative">
      {showOverlay && (
        <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center z-20 gap-5">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
            <span className="text-green-400 text-lg">✓</span>
          </div>
          <p className="text-white text-xl font-semibold tracking-tight">
            That&apos;s the vision.
          </p>
          <p className="text-white/45 text-sm max-w-xs text-center leading-relaxed">
            One command. The OS drafted the doc, composed the email, sent it,
            and handled your Slack — while you focused on what matters.
          </p>
          <a
            href="/"
            className="mt-2 text-violet-400 hover:underline underline-offset-2 text-sm"
          >
            ← Back to setup guide
          </a>
        </div>
      )}

      <div className="w-full max-w-2xl h-full max-h-[500px] rounded-xl overflow-hidden border border-white/10 flex flex-col shadow-2xl">
        {/* Title bar */}
        <div className="bg-[#252528] px-4 py-2.5 flex items-center gap-3 flex-shrink-0 border-b border-white/10">
          <TrafficLights />
          <span className="text-white/40 text-xs font-mono flex-1 text-center">
            Slack
          </span>
        </div>

        {/* Header */}
        <div className="px-5 py-3 border-b border-white/10 flex-shrink-0">
          <p className="text-white/50 text-sm">
            3 messages while you were working
          </p>
        </div>

        {/* Message cards */}
        <div className="flex-1 overflow-auto bg-[#1C1C1E] flex flex-col gap-0">
          {SLACK_MESSAGES.map((msg) => {
            const state = cardStates[msg.id];
            return (
              <div
                key={msg.id}
                className={`border-b border-white/10 px-5 py-4 transition-opacity ${
                  state === "skipped" ? "opacity-40" : "opacity-100"
                }`}
              >
                {/* Top row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-violet-600/40 flex items-center justify-center text-violet-300 text-xs font-semibold flex-shrink-0">
                      {msg.initials}
                    </div>
                    <div className="min-w-0">
                      <span className="text-white/80 text-sm font-medium">
                        {msg.sender}
                      </span>
                      <span className="text-white/30 text-xs mx-1.5">·</span>
                      <span className="text-white/35 text-xs">{msg.channel}</span>
                      <span className="text-white/30 text-xs mx-1.5">·</span>
                      <span className="text-white/25 text-xs">{msg.ago}</span>
                    </div>
                  </div>
                  {state === "idle" && (
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleSkip(msg.id)}
                        className="text-xs text-white/30 hover:text-white/60 transition-colors px-2 py-1 cursor-pointer"
                      >
                        Skip
                      </button>
                      <button
                        onClick={() => handleReply(msg.id)}
                        className="text-xs bg-violet-600 hover:bg-violet-500 text-white px-3 py-1 rounded transition-colors cursor-pointer"
                      >
                        Reply →
                      </button>
                    </div>
                  )}
                  {state === "replied" && (
                    <span className="text-green-400 text-xs flex-shrink-0">Sent ✓</span>
                  )}
                  {state === "skipped" && (
                    <span className="text-white/25 text-xs flex-shrink-0">Skipped</span>
                  )}
                  {state === "drafting" && (
                    <span className="text-violet-300 text-xs flex-shrink-0 flex items-center gap-1">
                      Drafting<Dots />
                    </span>
                  )}
                </div>

                {/* Summary */}
                <p className="text-white/45 text-xs mt-2 ml-11">{msg.summary}</p>

                {/* Expanded reply */}
                {(state === "drafting" || state === "replied") && (
                  <div className="mt-3 ml-11">
                    <div className="bg-[#252528] rounded-lg border border-white/10 overflow-hidden">
                      <textarea
                        defaultValue={msg.reply}
                        rows={2}
                        className="w-full bg-transparent text-white/80 text-xs px-3 py-2.5 outline-none resize-none leading-relaxed"
                        readOnly={state === "replied"}
                      />
                      {state === "drafting" && (
                        <div className="border-t border-white/10 px-3 py-2 flex justify-end">
                          <button
                            onClick={() => handleSend(msg.id)}
                            className="text-xs bg-violet-600 hover:bg-violet-500 text-white px-3 py-1 rounded transition-colors cursor-pointer"
                          >
                            Send
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

const PROCESSING_LABELS: Record<string, string> = {
  "query→tasks": "Checking your tasks...",
  "tasks→editor": "Drafting proposal...",
  "editor→email": "Composing email to Sarah...",
  "email→slack": "Checking your messages...",
};

export default function OSDemo() {
  const [scene, setScene] = useState<Scene>("query");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingLabel, setProcessingLabel] = useState("");

  const advance = useCallback(
    (next: Scene) => {
      if (isProcessing) return;
      const key = `${scene}→${next}`;
      const label = PROCESSING_LABELS[key] ?? "Working...";
      if (label) {
        setProcessingLabel(label);
        setIsProcessing(true);
        setTimeout(() => {
          setScene(next);
          setIsProcessing(false);
        }, 1600);
      } else {
        setScene(next);
      }
    },
    [scene, isProcessing]
  );

  const handleQueryAdvance = useCallback(() => advance("tasks"), [advance]);
  const handleTasksAdvance = useCallback(() => advance("editor"), [advance]);
  const handleEditorAdvance = useCallback(() => advance("email"), [advance]);
  const handleEmailAdvance = useCallback(() => advance("slack"), [advance]);

  return (
    <div className="h-screen w-screen bg-[#0D0D0D] flex flex-col overflow-hidden">
      <MenuBar />

      {/* Breadcrumb */}
      <Breadcrumb scene={scene} isProcessing={isProcessing} />

      {/* Content */}
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-opacity duration-300 ${
          isProcessing ? "opacity-0" : "opacity-100"
        }`}
      >
        {scene === "query" && <QueryScene onAdvance={handleQueryAdvance} />}
        {scene === "tasks" && <TaskListScene onAdvance={handleTasksAdvance} />}
        {scene === "editor" && <EditorScene onAdvance={handleEditorAdvance} />}
        {scene === "email" && <EmailScene onAdvance={handleEmailAdvance} />}
        {scene === "slack" && <SlackScene />}
      </div>

      {/* Processing overlay — shown between scenes */}
      {isProcessing && (
        <div className="absolute inset-0 top-6 flex flex-col pointer-events-none">
          {/* Keep breadcrumb visible above */}
          <div className="h-8" />
          <ProcessingView label={processingLabel} />
        </div>
      )}

      <NLBar
        scene={scene}
        isProcessing={isProcessing}
        processingLabel={processingLabel}
      />
    </div>
  );
}
