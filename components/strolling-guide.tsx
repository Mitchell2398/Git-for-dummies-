"use client";

import { useEffect, useRef, useState } from "react";

type Dir = "idle" | "l" | "r";

const SPRITE: Record<Dir, string> = {
  idle: "/art/guide-idle.gif",
  l: "/art/guide-walk-l.gif",
  r: "/art/guide-walk-r.gif",
};

const LINES = [
  "Paste a repo — I'll walk you through it.",
  "New codebase? Let's make sense of it together.",
  "I'll tell you where to start reading.",
  "Ten minutes, and you'll actually get it.",
];

const LEFT_END = 16;
const RIGHT_END = 74;
const WALK_MS = 5200;
const PAUSE_MS = 2100;

export function StrollingGuide() {
  const [x, setX] = useState(LEFT_END);
  const [dir, setDir] = useState<Dir>("idle");
  const [dur, setDur] = useState(0);
  const [line, setLine] = useState(0);
  const [showBubble, setShowBubble] = useState(false);

  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced.current) {
      setX(50);
      setDir("idle");
      setShowBubble(true);
      return;
    }

    let mounted = true;
    let goingRight = true;
    let timer: ReturnType<typeof setTimeout>;

    const run = () => {
      if (!mounted) return;
      // Pause and chat
      setDir("idle");
      setShowBubble(true);
      setLine((l) => (l + 1) % LINES.length);

      timer = setTimeout(() => {
        if (!mounted) return;
        setShowBubble(false);
        setDir(goingRight ? "r" : "l");
        setDur(WALK_MS);
        setX(goingRight ? RIGHT_END : LEFT_END);

        timer = setTimeout(() => {
          if (!mounted) return;
          goingRight = !goingRight;
          run();
        }, WALK_MS);
      }, PAUSE_MS);
    };

    run();
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 hidden sm:block">
      <div
        className="absolute h-[128px] w-[120px]"
        style={{
          left: `${x}%`,
          marginLeft: "-60px",
          bottom: "-46px",
          transition: dur ? `left ${dur}ms linear` : "none",
        }}
      >
        {/* Speech bubble */}
        <div
          className={`absolute -top-3 left-1/2 w-max max-w-[220px] -translate-x-1/2 rounded-2xl border border-line bg-card px-3 py-1.5 text-center text-[12px] leading-snug text-ink-soft shadow-soft-md transition-all duration-500 ${
            showBubble
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-1 opacity-0"
          }`}
        >
          {LINES[line]}
          <span className="absolute -bottom-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-b border-r border-line bg-card" />
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SPRITE[dir]}
          alt="A senior engineer, here to walk you through the code"
          className="absolute bottom-0 left-0 h-full w-full object-contain"
          draggable={false}
        />
      </div>
    </div>
  );
}
