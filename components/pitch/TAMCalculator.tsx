"use client";

import { useState } from "react";

type Scenario = { name: string; reach: number; convert: number; arpu: number };

const SCENARIOS: Scenario[] = [
  { name: "Conservative", reach: 5, convert: 15, arpu: 120 },
  { name: "Base", reach: 12, convert: 20, arpu: 216 },
  { name: "Stretch", reach: 20, convert: 30, arpu: 360 },
];

const SME_TOTAL = 5_690_000;

export default function TAMCalculator() {
  const [reach, setReach] = useState(12);
  const [convert, setConvert] = useState(20);
  const [arpu, setArpu] = useState(216);

  const reached = Math.round((SME_TOTAL * reach) / 100);
  const paying = Math.round((reached * convert) / 100);
  const annualRevenue = paying * arpu;

  const fmtMoney = (v: number) => {
    if (v >= 1_000_000_000) return `£${(v / 1_000_000_000).toFixed(2)}bn`;
    if (v >= 1_000_000) return `£${(v / 1_000_000).toFixed(1)}m`;
    return `£${v.toLocaleString("en-GB")}`;
  };
  const fmtCount = (v: number) => {
    if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(2)}m`;
    if (v >= 1_000) return `${(v / 1_000).toFixed(0)}k`;
    return v.toLocaleString("en-GB");
  };

  const applyScenario = (s: Scenario) => {
    setReach(s.reach);
    setConvert(s.convert);
    setArpu(s.arpu);
  };

  return (
    <div
      className="border border-[#E8E5DC] bg-white"
      style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui" }}
    >
      <div className="px-5 py-4 border-b border-[#E8E5DC] bg-[#F5F2EA] flex items-center justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#6B6862]">
            Potential ARR
          </div>
          <div
            className="text-3xl md:text-4xl font-semibold tracking-tight text-[#141413] leading-none mt-1"
            style={{ fontFamily: "var(--font-source-serif), Georgia, serif" }}
          >
            {fmtMoney(annualRevenue)}
          </div>
        </div>
        <div className="flex gap-1">
          {SCENARIOS.map((s) => (
            <button
              key={s.name}
              onClick={() => applyScenario(s)}
              className={`text-[11px] px-2 py-1 border rounded-sm transition-colors ${
                reach === s.reach && convert === s.convert && arpu === s.arpu
                  ? "border-[#D97757] bg-[#D97757] text-white"
                  : "border-[#E8E5DC] text-[#4A4842] hover:bg-[#F0EDE3] bg-white"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 py-5 space-y-5">
        <Slider
          label="SMEs reached by the programme"
          value={reach}
          onChange={setReach}
          min={1}
          max={50}
          unit="%"
          detail={`${fmtCount(reached)} of 5.69m`}
        />
        <Slider
          label="Paid conversion of reached SMEs"
          value={convert}
          onChange={setConvert}
          min={5}
          max={50}
          unit="%"
          detail={`${fmtCount(paying)} paying customers`}
        />
        <Slider
          label="Annual revenue per paying SME"
          value={arpu}
          onChange={setArpu}
          min={120}
          max={600}
          step={10}
          unit="£"
          unitPosition="before"
          detail="Anchored to Microsoft 365 Business Standard (~£115/yr) and Xero (~£120/yr) benchmarks"
        />
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
  unitPosition = "after",
  detail,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  unit: string;
  unitPosition?: "before" | "after";
  detail?: string;
}) {
  const display =
    unitPosition === "before" ? `${unit}${value}` : `${value}${unit}`;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <label className="text-[13px] text-[#4A4842]">{label}</label>
        <span className="text-[15px] font-semibold text-[#141413] tabular-nums">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{ accentColor: "#D97757" }}
      />
      {detail && (
        <div className="text-[11px] text-[#6B6862] mt-1">{detail}</div>
      )}
    </div>
  );
}
