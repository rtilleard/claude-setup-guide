"use client";

import { sourceById } from "./sources";

export default function Footnote({ id }: { id: number | number[] }) {
  const ids = Array.isArray(id) ? id : [id];
  const label = ids.join(",");
  const sources = ids.map((i) => sourceById(i));
  const titles = sources.map((s) => s.short).join("; ");
  const primary = sources[0];

  return (
    <a
      href={primary.url}
      target="_blank"
      rel="noopener noreferrer"
      title={`${titles}. Opens source in new tab.`}
      className="ml-0.5 text-[0.65em] font-medium text-[#D97757] hover:text-[#141413] no-underline"
      style={{ textDecoration: "none" }}
    >
      [{label}]
    </a>
  );
}
