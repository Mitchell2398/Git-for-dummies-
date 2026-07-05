"use client";

import { motion } from "motion/react";
import type { ArchNode } from "@/lib/mock";

const accentClass: Record<ArchNode["accent"], string> = {
  blue: "border-accent/40 bg-accent-soft",
  green: "border-green/40 bg-green-soft",
  orange: "border-orange/40 bg-orange-soft",
};

const dotClass: Record<ArchNode["accent"], string> = {
  blue: "bg-accent",
  green: "bg-green",
  orange: "bg-orange",
};

export function ArchitectureDiagram({ nodes }: { nodes: ArchNode[] }) {
  return (
    <div className="rounded-2xl border border-line bg-paper-sunk/60 p-5 sm:p-8">
      <div className="flex flex-col items-stretch gap-0">
        {nodes.map((node, i) => (
          <div key={node.id}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className={`rounded-xl border ${accentClass[node.accent]} px-5 py-4`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${dotClass[node.accent]}`}
                />
                <span className="font-display text-[15px] font-semibold tracking-tight text-ink">
                  {node.label}
                </span>
              </div>
              <p className="mt-1 pl-[18px] font-mono text-[12.5px] text-ink-soft">
                {node.sub}
              </p>
            </motion.div>

            {i < nodes.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 + 0.2 }}
                className="flex h-8 items-center justify-center"
              >
                <svg width="12" height="24" viewBox="0 0 12 24" fill="none">
                  <path
                    d="M6 0 V18 M6 18 L1 13 M6 18 L11 13"
                    stroke="var(--line-strong)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
