"use client";

import { useState } from "react";

type Bar = { label: string; value: number; sub: string; highlight?: boolean };

const BARS: Bar[] = [
  { label: "UK micro (1–9 staff)", value: 14, sub: "DSIT 2025" },
  { label: "UK mid-sized (10–249)", value: 23, sub: "DSIT 2025" },
  { label: "All UK businesses", value: 16, sub: "DSIT 2025" },
  { label: "UK large (250+)", value: 36, sub: "DSIT 2025", highlight: true },
];

type Region = {
  id: string;
  name: string;
  smes: string;
  note: string;
  x: number;
  y: number;
};

const REGIONS: Region[] = [
  { id: "london", name: "London", smes: "1.07m", note: "Highest density. Creative + professional services concentration.", x: 215, y: 380 },
  { id: "manchester", name: "Manchester", smes: "168k", note: "Northern Powerhouse hub. Strong digital/agency cluster.", x: 175, y: 270 },
  { id: "birmingham", name: "Birmingham", smes: "127k", note: "West Midlands manufacturing + services.", x: 180, y: 320 },
  { id: "bristol", name: "Bristol", smes: "92k", note: "Tech + creative density per capita.", x: 150, y: 380 },
  { id: "edinburgh", name: "Edinburgh", smes: "78k", note: "Scottish capital. Financial services anchor.", x: 175, y: 145 },
  { id: "leeds", name: "Leeds", smes: "98k", note: "Yorkshire commercial hub.", x: 195, y: 260 },
  { id: "cardiff", name: "Cardiff", smes: "62k", note: "Welsh capital. Public sector + creative.", x: 130, y: 350 },
  { id: "belfast", name: "Belfast", smes: "58k", note: "NI capital. Strong cyber cluster (Allstate, CSIT).", x: 105, y: 250 },
  { id: "glasgow", name: "Glasgow", smes: "82k", note: "Largest Scottish city by population.", x: 150, y: 165 },
  { id: "dublin", name: "Dublin", smes: "150k+", note: "Ireland. EU anchor for the I in UK&I.", x: 90, y: 305 },
];

export default function AdoptionChart() {
  const [selected, setSelected] = useState<string | null>("london");
  const region = REGIONS.find((r) => r.id === selected) ?? REGIONS[0];

  return (
    <div className="space-y-6">
      <div
        className="border border-[#E8E5DC] bg-white p-5"
        style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui" }}
      >
        <div className="text-[11px] uppercase tracking-[0.2em] text-[#6B6862] mb-4">
          % of businesses using any AI tool, by size
        </div>
        <div className="space-y-3">
          {BARS.map((b) => (
            <BarRow key={b.label} bar={b} />
          ))}
        </div>
        <div className="text-[11px] text-[#6B6862] mt-4">
          Sources: DSIT AI Adoption in UK Business 2025; OECD Generative AI
          and the SME Workforce, Dec 2025.
        </div>
      </div>

      <div
        className="border border-[#E8E5DC] bg-white p-5 grid grid-cols-[160px_1fr] gap-5"
        style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui" }}
      >
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#6B6862] mb-2">
            UK&amp;I SME density
          </div>
          <svg viewBox="0 0 280 460" className="w-full">
            <UKShape />
            {REGIONS.map((r) => (
              <g
                key={r.id}
                onClick={() => setSelected(r.id)}
                style={{ cursor: "pointer" }}
              >
                <circle
                  cx={r.x}
                  cy={r.y}
                  r={selected === r.id ? 7 : 5}
                  fill={selected === r.id ? "#D97757" : "#78716C"}
                  opacity={selected === r.id ? 1 : 0.7}
                />
                {selected === r.id && (
                  <circle
                    cx={r.x}
                    cy={r.y}
                    r={11}
                    fill="none"
                    stroke="#D97757"
                    strokeWidth={1}
                    opacity={0.3}
                  />
                )}
              </g>
            ))}
          </svg>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#6B6862] mb-2">
            Selected
          </div>
          <div
            className="text-2xl font-semibold text-[#141413]"
            style={{ fontFamily: "var(--font-source-serif), Georgia, serif" }}
          >
            {region.name}
          </div>
          <div className="text-[13px] text-[#6B6862] mt-1">
            {region.smes} SMEs
          </div>
          <p className="text-[14px] text-[#4A4842] mt-3">{region.note}</p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {REGIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelected(r.id)}
                className={`text-[11px] px-2 py-0.5 border rounded-full transition-colors ${
                  selected === r.id
                    ? "border-[#D97757] bg-[#D97757] text-white"
                    : "border-[#E8E5DC] text-[#4A4842] hover:bg-[#F0EDE3] bg-white"
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>
          <div className="text-[11px] text-[#6B6862] mt-3">
            Source: ONS / DBT regional business population data.
          </div>
        </div>
      </div>
    </div>
  );
}

function BarRow({ bar }: { bar: Bar }) {
  const pct = bar.value;
  return (
    <div>
      <div className="flex justify-between items-baseline text-[13px] mb-1">
        <span className="text-[#141413]">{bar.label}</span>
        <span className="font-semibold text-[#141413] tabular-nums">
          {pct}%
        </span>
      </div>
      <div className="h-2 bg-[#F0EDE3] rounded-sm overflow-hidden">
        <div
          className="h-full"
          style={{
            width: `${pct * 2}%`,
            background: bar.highlight ? "#D97757" : "#141413",
          }}
        />
      </div>
    </div>
  );
}

function UKShape() {
  return (
    <path
      d="M 110 80 Q 130 60 160 70 L 180 90 Q 200 100 195 130 L 210 160 Q 215 200 200 225 L 215 260 Q 220 290 200 310 L 220 340 Q 230 370 220 400 L 200 425 Q 170 440 140 425 L 110 410 Q 95 380 100 350 L 85 320 Q 75 285 95 260 L 80 220 Q 75 180 100 160 L 90 130 Q 95 95 110 80 Z M 70 250 Q 85 240 100 255 L 105 280 Q 95 295 75 285 Z M 75 295 Q 95 290 110 305 L 105 320 Q 90 330 75 320 Z"
      fill="#F5F5F4"
      stroke="#D6D3D1"
      strokeWidth="1"
    />
  );
}
