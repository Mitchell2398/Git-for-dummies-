"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";

const STEPS = [
  "Reading the README",
  "Finding the files that matter",
  "Understanding how it's put together",
  "Learning the project structure",
  "Connecting the dots",
  "Writing your onboarding",
  "Recording the walkthrough",
];

const STEP_MS = 850;

export function LoadingScreen({
  repo,
  onDone,
}: {
  repo: string;
  onDone: () => void;
}) {
  const [active, setActive] = useState(0);
  const [finishing, setFinishing] = useState(false);

  useEffect(() => {
    if (active >= STEPS.length) {
      setFinishing(true);
      const t = setTimeout(onDone, 1400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setActive((a) => a + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [active, onDone]);

  return (
    <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center px-6 py-16">
      <div className="mb-8 flex items-center gap-2.5 text-[13px] text-ink-faint">
        <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-[9px] border border-line bg-paper-sunk">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/art/logo.webp"
            alt=""
            className="h-7 w-7 object-contain"
            style={{ imageRendering: "pixelated" }}
          />
        </span>
        <span className="font-mono">{repo}</span>
      </div>

      <AnimatePresence mode="wait">
        {!finishing ? (
          <motion.div key="steps" exit={{ opacity: 0, y: -8 }}>
            <div className="mb-5 flex items-end gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/art/guide-idle.gif"
                alt="A senior engineer reading through the code"
                className="h-24 w-auto"
                draggable={false}
              />
              <span className="mb-2 inline-flex rounded-2xl border border-line bg-card px-3 py-1.5 text-[13px] text-ink-soft shadow-soft-sm">
                Give me a sec…
              </span>
            </div>
            <h2 className="font-display text-2xl font-medium tracking-tight text-ink">
              I&apos;m reading through the code…
            </h2>
            <ul className="mt-8 space-y-1">
              {STEPS.map((step, i) => {
                const done = i < active;
                const current = i === active;
                return (
                  <li
                    key={step}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-500 ${
                      current ? "bg-card" : ""
                    }`}
                  >
                    <span
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                        done
                          ? "border-green bg-green text-paper"
                          : current
                            ? "border-accent"
                            : "border-line"
                      }`}
                    >
                      {done ? (
                        <Check className="h-3 w-3" strokeWidth={3} />
                      ) : current ? (
                        <motion.span
                          className="h-1.5 w-1.5 rounded-full bg-accent"
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      ) : null}
                    </span>
                    <span
                      className={`text-[15px] transition-colors duration-300 ${
                        done
                          ? "text-ink-faint"
                          : current
                            ? "text-ink"
                            : "text-ink-faint/60"
                      }`}
                    >
                      {step}
                      {current && <Dots />}
                    </span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-display text-[1.7rem] font-medium leading-snug tracking-tight text-ink">
              Okay. I think I&apos;ve got it.
            </p>
            <p className="mt-3 text-[1.05rem] text-ink-soft">
              Here&apos;s how I&apos;d explain this repository to a teammate.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function Dots() {
  const [n, setN] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setN((v) => (v % 3) + 1), 300);
    return () => clearInterval(t);
  }, []);
  return <span className="text-ink-faint">{".".repeat(n)}</span>;
}
