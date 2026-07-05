"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Download,
  Star,
  FileCode,
  FolderOpen,
  Layers,
  Lightbulb,
  Compass,
  type LucideIcon,
} from "lucide-react";
import type { OnboardingData, Accent } from "@/lib/mock";
import { Reveal } from "@/components/reveal";
import { Logo } from "@/components/logo";
import { Toc, type TocItem } from "./toc";
import { ArchitectureDiagram } from "./architecture-diagram";
import { RequestFlow } from "./request-flow";
import { VideoCard } from "./video-card";

const TOC: TocItem[] = [
  { id: "what", label: "What it actually does" },
  { id: "why", label: "Why it exists" },
  { id: "before", label: "Before you dive in" },
  { id: "files", label: "The files to read first" },
  { id: "architecture", label: "How it fits together" },
  { id: "request", label: "Follow the request" },
  { id: "folders", label: "A tour of the folders" },
  { id: "tech", label: "What it relies on" },
  { id: "confusions", label: "Things that confused me" },
  { id: "joined", label: "If I joined tomorrow" },
];

const accentText: Record<Accent, string> = {
  blue: "text-accent",
  green: "text-green",
  orange: "text-orange",
};
const accentBorder: Record<Accent, string> = {
  blue: "border-l-accent",
  green: "border-l-green",
  orange: "border-l-orange",
};
const accentBg: Record<Accent, string> = {
  blue: "bg-accent-soft",
  green: "bg-green-soft",
  orange: "bg-orange-soft",
};

export function Onboarding({ data }: { data: OnboardingData }) {
  const repoLabel = `${data.repo.owner}/${data.repo.name}`;

  return (
    <main className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-32 sm:px-8">
      {/* Top bar */}
      <div className="flex items-center justify-between py-6">
        <Logo />
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-[13px] text-ink-soft transition-colors hover:text-ink sm:inline-flex"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            Explain another
          </Link>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-lg border border-line-strong bg-card px-3.5 py-2 text-[13px] font-medium text-ink-soft shadow-soft-sm transition-colors hover:text-ink"
          >
            <Download className="h-4 w-4" strokeWidth={1.75} />
            One-page PDF
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="grid grid-cols-1 gap-8 border-b border-line pb-14 lg:grid-cols-[1fr_380px] lg:gap-12">
        <div className="animate-rise flex flex-col justify-center">
          <a
            href={data.repo.url}
            target="_blank"
            rel="noreferrer"
            className="group mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-[13px] transition-colors hover:border-line-strong"
          >
            <span className="font-mono text-ink">{repoLabel}</span>
            <span className="flex items-center gap-1 text-ink-faint">
              <Star className="h-3.5 w-3.5" strokeWidth={1.75} />
              {data.repo.stars}
            </span>
            <ArrowUpRight
              className="h-3.5 w-3.5 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.75}
            />
          </a>

          <h1 className="font-display text-[clamp(2.3rem,5vw,3.4rem)] font-semibold leading-[1] tracking-[-0.03em] text-ink">
            Your 10-minute
            <br />
            onboarding.
          </h1>

          <p className="mt-5 max-w-md text-[1.075rem] leading-relaxed text-ink-soft">
            If a senior engineer had ten minutes to onboard you to this project,
            this is what they&apos;d tell you first.
          </p>
        </div>

        <div className="animate-rise" style={{ animationDelay: "0.15s" }}>
          <VideoCard video={data.video} repo={repoLabel} />
        </div>
      </div>

      {/* Body */}
      <div className="mt-14 grid grid-cols-1 gap-x-14 lg:grid-cols-[190px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <Toc items={TOC} />
          </div>
        </aside>

        <article className="max-w-2xl">
          {/* What it does */}
          <Section id="what" eyebrow="The one-liner" title="What this project actually does">
            <div className="prose-reading">
              {data.whatItDoes.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Section>

          {/* Why it exists */}
          <Section id="why" eyebrow="The reason it's here" title="Why it exists">
            <div className="grid gap-4 sm:grid-cols-2">
              <MiniCard label="The problem" body={data.whyItExists.problem} accent="orange" />
              <MiniCard label="Who it's for" body={data.whyItExists.audience} accent="green" />
            </div>
          </Section>

          {/* Before you dive in */}
          <Section id="before" eyebrow="Set the scene" title="Before you dive into the code">
            <div className="space-y-3">
              {data.beforeYouDive.map((item, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="rounded-xl border border-line bg-card p-5">
                    <p className="font-display text-[15px] font-semibold tracking-tight text-ink">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-soft">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>

          {/* Key files */}
          <Section
            id="files"
            eyebrow="Start here"
            title="The three files to understand first"
            lede="Not two hundred files. Three — and why each one matters."
            icon={FileCode}
          >
            <ol className="space-y-3">
              {data.keyFiles.map((file, i) => (
                <Reveal key={file.path} delay={i * 0.06}>
                  <li className="rounded-xl border border-line bg-card p-5">
                    <div className="flex items-start gap-4">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-paper-sunk font-display text-[13px] font-semibold text-ink-soft">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <code className="break-all font-mono text-[13.5px] text-accent">
                          {file.path}
                        </code>
                        <p className="mt-1 text-[13px] font-medium text-ink">
                          {file.role}
                        </p>
                        <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">
                          {file.why}
                        </p>
                      </div>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </Section>

          {/* Architecture */}
          <Section
            id="architecture"
            eyebrow="The mental model"
            title="How everything fits together"
            lede={data.architecture.note}
            icon={Layers}
          >
            <ArchitectureDiagram nodes={data.architecture.nodes} />
          </Section>

          {/* Request flow */}
          <Section
            id="request"
            eyebrow="Watch it move"
            title="Follow the request"
            lede="One real call, from your app to the database and back."
          >
            <RequestFlow steps={data.requestFlow} />
          </Section>

          {/* Folders */}
          <Section
            id="folders"
            eyebrow="The guided tour"
            title="A tour of the folders"
            lede="Every folder, explained like a museum guide — not just listed."
            icon={FolderOpen}
          >
            <div className="divide-y divide-line rounded-xl border border-line bg-card">
              {data.folders.map((folder) => (
                <div
                  key={folder.path}
                  className="flex flex-col gap-1 p-5 sm:flex-row sm:gap-6"
                >
                  <code className="shrink-0 font-mono text-[13px] text-ink sm:w-40">
                    {folder.name}
                  </code>
                  <p className="text-[14px] leading-relaxed text-ink-soft">
                    {folder.blurb}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* Technologies */}
          <Section
            id="tech"
            eyebrow="The toolkit"
            title="What this project relies on"
            lede="Not just a list of logos — what each one is actually doing here."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {data.technologies.map((tech, i) => (
                <Reveal key={tech.name} delay={i * 0.04}>
                  <div className="h-full rounded-xl border border-line bg-card p-4">
                    <p className="font-display text-[14.5px] font-semibold tracking-tight text-ink">
                      {tech.name}
                    </p>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-ink-soft">
                      {tech.role}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>

          {/* Confusions */}
          <Section
            id="confusions"
            eyebrow="Honest notes"
            title="Things that confused me"
            lede="The stuff that isn't obvious — the parts I wish someone had warned me about."
            icon={Lightbulb}
          >
            <div className="space-y-3">
              {data.confusions.map((c, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div
                    className={`rounded-r-xl border border-l-[3px] border-line bg-card p-5 ${accentBorder[c.accent]}`}
                  >
                    <p
                      className={`font-display text-[15px] font-semibold tracking-tight ${accentText[c.accent]}`}
                    >
                      {c.title}
                    </p>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-soft">
                      {c.note}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>

          {/* If I joined tomorrow */}
          <Section
            id="joined"
            eyebrow="The signature move"
            title="If I joined this project tomorrow…"
            icon={Compass}
          >
            <div className="rounded-2xl border border-line bg-paper-sunk/60 p-6 sm:p-8">
              <p className="text-[14px] font-medium text-ink">First, I&apos;d read:</p>
              <ol className="mt-4 space-y-3">
                {data.ifIJoined.read.map((r, i) => (
                  <li key={r.path} className="flex items-start gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink font-display text-[12px] font-semibold text-paper">
                      {i + 1}
                    </span>
                    <p className="text-[14.5px] leading-relaxed text-ink-soft">
                      <code className="font-mono text-[13px] text-ink">{r.path}</code>{" "}
                      — {r.reason}
                    </p>
                  </li>
                ))}
              </ol>

              <div className="my-6 h-px bg-line" />

              <p className="text-[14px] font-medium text-ink">Then I&apos;d:</p>
              <ul className="mt-4 space-y-2.5">
                {data.ifIJoined.then.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14.5px] text-ink-soft">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          {/* Closing */}
          <div className="mt-16 rounded-2xl border border-line bg-card p-8 text-center">
            <p className="font-display text-xl font-medium tracking-tight text-ink">
              That&apos;s the tour.
            </p>
            <p className="mx-auto mt-2 max-w-sm text-[14.5px] leading-relaxed text-ink-soft">
              You know what it does, where to start, and where the surprises are.
              That&apos;s enough to open the code and start contributing.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-[14px] font-medium text-paper transition-transform hover:scale-[1.02]"
            >
              Explain another repo
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}

function Section({
  id,
  eyebrow,
  title,
  lede,
  icon: Icon,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lede?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 pt-14 first:pt-0">
      <Reveal>
        <div className="mb-5">
          <div className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-ink-faint">
            {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={2} />}
            {eyebrow}
          </div>
          <h2 className="mt-2 font-display text-[1.7rem] font-semibold leading-tight tracking-[-0.02em] text-ink">
            {title}
          </h2>
          {lede && (
            <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
              {lede}
            </p>
          )}
        </div>
      </Reveal>
      {children}
    </section>
  );
}

function MiniCard({
  label,
  body,
  accent,
}: {
  label: string;
  body: string;
  accent: Accent;
}) {
  return (
    <div className={`rounded-xl border border-line p-5 ${accentBg[accent]}`}>
      <p className={`text-[12px] font-semibold uppercase tracking-[0.1em] ${accentText[accent]}`}>
        {label}
      </p>
      <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{body}</p>
    </div>
  );
}
