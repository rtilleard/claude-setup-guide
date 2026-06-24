"use client";

import { useState } from "react";

type City = {
  id: string;
  name: string;
  month: string;
  partner: string;
  rationale: string;
  x: number;
  y: number;
};

const CITIES: City[] = [
  { id: "london", name: "London", month: "Week 1", partner: "FSB + ICAEW", rationale: "Capital launch. Press anchor. Largest SME base.", x: 215, y: 380 },
  { id: "bristol", name: "Bristol", month: "Week 1", partner: "Bristol Tech Festival + SWMAS", rationale: "South West creative + tech density.", x: 150, y: 380 },
  { id: "cardiff", name: "Cardiff", month: "Week 1", partner: "Business Wales + FSB Wales", rationale: "Welsh capital. Public sector adjacency.", x: 130, y: 350 },
  { id: "birmingham", name: "Birmingham", month: "Week 2", partner: "Greater Birmingham Chamber + WMCA", rationale: "West Midlands manufacturing tail.", x: 180, y: 320 },
  { id: "manchester", name: "Manchester", month: "Week 2", partner: "Pro-Manchester + Tech Manchester", rationale: "Northern Powerhouse press moment.", x: 175, y: 270 },
  { id: "leeds", name: "Leeds", month: "Week 2", partner: "Leeds Chamber + Yorkshire FSB", rationale: "Yorkshire commercial hub.", x: 195, y: 260 },
  { id: "belfast", name: "Belfast", month: "Week 3", partner: "Invest NI + Catalyst", rationale: "NI launch. Cyber-adjacent ecosystem.", x: 105, y: 250 },
  { id: "glasgow", name: "Glasgow", month: "Week 3", partner: "Scottish Enterprise + Glasgow Chamber", rationale: "Second Scottish stop, scale to W. Scotland.", x: 150, y: 165 },
  { id: "edinburgh", name: "Edinburgh", month: "Week 3", partner: "Scottish Enterprise + FSB Scotland", rationale: "Devolved nations parity. Financial services angle.", x: 175, y: 145 },
  { id: "dublin", name: "Dublin", month: "Week 4", partner: "Enterprise Ireland + Dogpatch Labs", rationale: "Republic of Ireland anchor. EU bridgehead.", x: 90, y: 305 },
];

export default function UKTourMap() {
  const [selected, setSelected] = useState<string>("london");
  const city = CITIES.find((c) => c.id === selected) ?? CITIES[0];

  return (
    <div
      className="border border-[#E8E5DC] bg-white grid grid-cols-[180px_1fr]"
      style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui" }}
    >
      <div className="p-4 border-r border-[#E8E5DC]">
        <div className="text-[11px] uppercase tracking-[0.2em] text-[#6B6862] mb-2">
          10-city tour
        </div>
        <svg viewBox="0 0 280 460" className="w-full">
          <UKShape />
          {CITIES.map((c) => (
            <g
              key={c.id}
              onClick={() => setSelected(c.id)}
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={c.x}
                cy={c.y}
                r={selected === c.id ? 7 : 5}
                fill={selected === c.id ? "#D97757" : "#A8A29E"}
              />
              {selected === c.id && (
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={12}
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
      <div className="p-5">
        <div className="text-[11px] uppercase tracking-[0.2em] text-[#6B6862]">
          {city.month}
        </div>
        <div
          className="text-2xl font-semibold text-[#141413] mt-1"
          style={{ fontFamily: "var(--font-source-serif), Georgia, serif" }}
        >
          {city.name}
        </div>
        <div className="text-[13px] text-[#4A4842] mt-3">
          <span className="text-[#6B6862]">Partners: </span>
          {city.partner}
        </div>
        <p className="text-[14px] text-[#4A4842] mt-3">{city.rationale}</p>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {CITIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={`text-[11px] px-2 py-0.5 border rounded-full transition-colors ${
                selected === c.id
                  ? "border-[#D97757] bg-[#D97757] text-white"
                  : "border-[#E8E5DC] text-[#4A4842] hover:bg-[#F0EDE3] bg-white"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div className="text-[11px] text-[#6B6862] mt-3">
          Partner names are starting hypotheses, not commitments.
        </div>
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
