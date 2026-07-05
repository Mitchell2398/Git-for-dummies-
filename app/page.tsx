import { UrlForm } from "@/components/url-form";
import { SiteNav } from "@/components/site-nav";
import { StrollingGuide } from "@/components/strolling-guide";
import { FileText, Clapperboard, BookOpen, Map, Compass } from "lucide-react";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="relative z-10 mx-auto w-full max-w-5xl px-5 sm:px-6">
        {/* Hero */}
        <section className="pt-28 sm:pt-32">
          <div className="mx-auto max-w-2xl text-center">
            <div
              className="animate-rise inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-[12.5px] text-ink-soft"
              style={{ animationDelay: "0.05s" }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green" />
              </span>
              A one-page explainer &amp; a walkthrough video, from one link
            </div>

            <h1
              className="animate-rise mt-6 font-display text-[clamp(2.4rem,6vw,3.9rem)] font-semibold leading-[1] tracking-[-0.03em] text-ink"
              style={{ animationDelay: "0.12s" }}
            >
              A senior engineer for
              <br />
              any GitHub repo.
            </h1>

            <p
              className="animate-rise mx-auto mt-5 max-w-xl text-[1.075rem] leading-relaxed text-ink-soft"
              style={{ animationDelay: "0.2s" }}
            >
              Paste a link and our resident greybeard reads the code for you —
              what it does, where to start, and what to watch out for. Delivered
              as a one-page PDF and a short video.
            </p>
          </div>

          {/* Framed pixel-art scene with the command bar at its base */}
          <div
            className="animate-rise relative mt-12"
            style={{ animationDelay: "0.32s" }}
          >
            <div className="relative overflow-hidden rounded-[26px] border border-line-strong shadow-soft-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/art/hero.webp"
                alt="A cozy, sunlit study — bookshelves, plants, and an old monitor quietly running code"
                className="aspect-[16/9] w-full object-cover sm:aspect-[21/9]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper via-paper/70 to-transparent" />
              <div className="pointer-events-none absolute inset-0 rounded-[26px] ring-1 ring-inset ring-black/5" />
            </div>

            {/* Command bar, straddling the bottom edge, guide strolling on top */}
            <div
              id="explain"
              className="relative mx-auto -mt-10 w-[94%] max-w-2xl scroll-mt-28 sm:-mt-12"
            >
              <StrollingGuide />
              <UrlForm />
            </div>
          </div>

          <div
            className="animate-rise mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-ink-faint"
            style={{ animationDelay: "0.5s" }}
          >
            <span className="inline-flex items-center gap-1.5">
              <FileText className="h-4 w-4" strokeWidth={1.75} />
              One-page PDF explainer
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clapperboard className="h-4 w-4" strokeWidth={1.75} />
              8-minute walkthrough video
            </span>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="scroll-mt-24 py-28">
          <p className="text-center text-[12px] font-medium uppercase tracking-[0.16em] text-ink-faint">
            How it works
          </p>
          <h2 className="mx-auto mt-3 max-w-lg text-center font-display text-[1.9rem] font-semibold leading-tight tracking-[-0.02em] text-ink">
            Like a senior engineer sat beside you for ten minutes.
          </h2>

          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className="rounded-2xl border border-line bg-card p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-paper-sunk text-ink-soft">
                    <step.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </span>
                  <span className="font-mono text-[12px] text-ink-faint">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-[16px] font-semibold tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <footer className="border-t border-line py-10 text-center text-[13px] text-ink-faint">
          git for dummies — the code gets read to you, not at you.
        </footer>
      </main>
    </>
  );
}

const STEPS = [
  {
    icon: BookOpen,
    title: "It reads the whole thing",
    body: "The README, the important files, the way the pieces connect — the reading you'd otherwise do yourself.",
  },
  {
    icon: Map,
    title: "It draws you a map",
    body: "Plain-English explanation, a simple architecture sketch, and a tour of every folder — no jargon.",
  },
  {
    icon: Compass,
    title: "It tells you where to start",
    body: "The three files to read first, the surprising bits, and exactly what it'd do if it joined tomorrow.",
  },
];
