"use client";

import { useState } from "react";
import { Play, Clock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { OnboardingData } from "@/lib/mock";

export function VideoCard({
  video,
  repo,
}: {
  video: OnboardingData["video"];
  repo: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-soft-md">
      {/* Player surface */}
      <div className="group relative aspect-video w-full overflow-hidden bg-ink">
        {/* faux frame gradient */}
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(120% 120% at 20% 10%, rgba(63,110,163,0.35), transparent 55%), radial-gradient(120% 120% at 90% 90%, rgba(192,122,69,0.28), transparent 55%)",
          }}
        />
        <div className="absolute inset-0 grid place-items-center">
          <AnimatePresence>
            {!playing && (
              <motion.button
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={() => setPlaying(true)}
                className="grid h-16 w-16 place-items-center rounded-full bg-paper/95 text-ink shadow-soft-lg transition-transform duration-300 group-hover:scale-105"
                aria-label="Play walkthrough"
              >
                <Play className="ml-0.5 h-6 w-6 fill-ink" strokeWidth={0} />
              </motion.button>
            )}
          </AnimatePresence>
          {playing && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-6 text-center font-mono text-[12.5px] text-paper/70"
            >
              The video renderer isn&apos;t wired up yet —
              <br />
              this is where your 8-minute walkthrough plays.
            </motion.p>
          )}
        </div>

        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-md bg-ink/70 px-2 py-1 text-[12px] font-medium text-paper backdrop-blur">
          <Clock className="h-3 w-3" strokeWidth={2} />
          {video.duration}
        </div>
      </div>

      {/* Meta */}
      <div className="p-4">
        <p className="font-display text-[15px] font-semibold tracking-tight text-ink">
          A {video.duration} walkthrough of {repo}
        </p>
        <p className="mt-0.5 text-[13px] text-ink-faint">
          Watch instead of read — same onboarding, out loud.
        </p>

        <ul className="mt-4 space-y-0.5">
          {video.chapters.map((c) => (
            <li
              key={c.time}
              className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-[13.5px] transition-colors hover:bg-paper-sunk"
            >
              <span className="font-mono text-[12px] text-accent">{c.time}</span>
              <span className="text-ink-soft">{c.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
