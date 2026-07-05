# Git for Dummies

**A senior engineer for any GitHub repository.**

Paste a repo URL and our resident greybeard — a pixel-art wizard who strolls
along the search bar — reads the code for you. You get the onboarding a senior
engineer would give you over coffee, as a one-page PDF explainer and a short
walkthrough video.

> If a senior engineer had ten minutes to onboard you to this project, this is
> what they'd tell you first.

This repo is the **frontend only**. The backend (repo analysis, PDF + video
generation) isn't wired up yet — the UI renders against mock content in
[`lib/mock.ts`](lib/mock.ts), shaped exactly how the real API should respond.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Tailwind CSS v4** with a warm, paper-first design system (`app/globals.css`)
- **Geist** (display + mono) and **Inter** (body) via `next/font`
- **Motion** for Linear-style reveals and micro-interactions
- **Lucide** icons
- Pixel-art hero, logo, and mascot in `public/art/` (the animated wizard sprites
  are RPG walk-cycle GIFs; the study scene and logo were generated with Nano
  Banana / Gemini 2.5 Flash Image)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000, paste a repo (or pick one of the suggestions), and
you'll land on the onboarding page after the loading sequence.

## Where things live

| Path | What it is |
| --- | --- |
| `app/page.tsx` | Landing page — art banner, command bar, one primary action |
| `components/strolling-guide.tsx` | The wizard mascot that walks along the search bar |
| `components/site-nav.tsx` / `components/logo.tsx` | Floating pill nav + wordmark |
| `app/onboarding/page.tsx` | The onboarding route |
| `components/loading-screen.tsx` | The "I'm reading through the code…" sequence |
| `components/onboarding/onboarding.tsx` | The full 10-minute onboarding article |
| `components/onboarding/*` | TOC, architecture diagram, request flow, video card |
| `lib/mock.ts` | The content the backend will eventually produce |

## Wiring up the backend

Replace the mock in `components/onboarding/onboarding-flow.tsx` with a real fetch
that returns the `OnboardingData` shape from `lib/mock.ts`. Everything downstream
is already typed against it.
