"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const SUGGESTIONS = [
  "vercel/next.js",
  "supabase/supabase",
  "tiangolo/fastapi",
  "honojs/hono",
];

export function UrlForm() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function go(raw: string) {
    const input = raw.trim();
    if (!input) return;
    setSubmitting(true);
    const slug = input
      .replace(/^https?:\/\/(www\.)?github\.com\//, "")
      .replace(/\.git$/, "")
      .replace(/\/$/, "");
    router.push(`/onboarding?repo=${encodeURIComponent(slug)}`);
  }

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          go(value);
        }}
      >
        <div
          className={`group flex items-center gap-2 rounded-2xl border bg-card p-2 pl-5 transition-all duration-300 ${
            focused
              ? "border-accent/60 shadow-soft-lg"
              : "border-line-strong shadow-soft-md"
          }`}
        >
          <span className="hidden font-mono text-[15px] text-ink-faint sm:inline">
            github.com/
          </span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="owner/repo"
            spellCheck={false}
            autoComplete="off"
            className="h-12 flex-1 bg-transparent pl-1 font-mono text-[15px] text-ink outline-none placeholder:text-ink-faint"
          />
          <button
            type="submit"
            disabled={!value.trim() || submitting}
            className="flex h-12 shrink-0 items-center gap-1.5 rounded-xl bg-ink px-5 text-[14.5px] font-medium text-paper transition-all duration-300 hover:gap-2.5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? "Reading…" : "Explain"}
            {!submitting && <ArrowRight className="h-4 w-4" strokeWidth={2} />}
          </button>
        </div>
      </form>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <span className="mr-1 text-[13px] text-ink-faint">Try one:</span>
        {SUGGESTIONS.map((s, i) => (
          <motion.button
            key={s}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.07, duration: 0.5 }}
            onClick={() => go(s)}
            className="rounded-full border border-line bg-card/70 px-3 py-1.5 font-mono text-[12.5px] text-ink-soft backdrop-blur transition-colors hover:border-accent/50 hover:text-ink"
          >
            {s}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
