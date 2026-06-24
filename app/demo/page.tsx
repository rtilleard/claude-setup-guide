import type { Metadata } from "next";
import OSDemo from "@/components/OSDemo";

export const metadata: Metadata = {
  title: "The Future OS — Demo",
  description:
    "A vision of natural language as the operating system. Command → Document → Email.",
};

export default function DemoPage() {
  return <OSDemo />;
}
