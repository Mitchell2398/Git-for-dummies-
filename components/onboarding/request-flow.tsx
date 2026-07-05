"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type { FlowStep } from "@/lib/mock";

export function RequestFlow({ steps }: { steps: FlowStep[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActive((a) => (a + 1) % steps.length),
      1500,
    );
    return () => clearInterval(t);
  }, [steps.length]);

  return (
    <div className="rounded-2xl border border-line bg-card p-5 sm:p-7">
      <div className="relative flex flex-col">
        {/* vertical rail */}
        <span className="absolute bottom-4 left-[7px] top-4 w-px bg-line" />

        {steps.map((step, i) => {
          const isActive = i === active;
          return (
            <div key={step.label} className="relative flex gap-4 pb-6 last:pb-0">
              <span className="relative z-10 mt-1 flex h-[15px] w-[15px] shrink-0 items-center justify-center">
                {isActive && (
                  <motion.span
                    layoutId="flow-pulse"
                    className="absolute inset-0 rounded-full bg-accent/20"
                    transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  />
                )}
                <span
                  className={`h-[9px] w-[9px] rounded-full transition-colors duration-300 ${
                    isActive ? "bg-accent" : "bg-line-strong"
                  }`}
                />
              </span>
              <div
                className={`-mt-0.5 transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-55"
                }`}
              >
                <p className="font-display text-[15px] font-semibold tracking-tight text-ink">
                  {step.label}
                </p>
                <p className="mt-0.5 font-mono text-[12.5px] leading-relaxed text-ink-soft">
                  {step.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
