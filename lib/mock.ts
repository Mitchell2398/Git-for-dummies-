// Mock onboarding content. The backend isn't wired up yet — this is the shape
// the FE renders against, written in the voice we want the product to have.

export type Accent = "blue" | "green" | "orange";

export interface KeyFile {
  path: string;
  role: string;
  why: string;
}

export interface ArchNode {
  id: string;
  label: string;
  sub: string;
  accent: Accent;
}

export interface FlowStep {
  label: string;
  detail: string;
}

export interface Folder {
  name: string;
  path: string;
  blurb: string;
}

export interface Tech {
  name: string;
  role: string;
}

export interface Confusion {
  title: string;
  note: string;
  accent: Accent;
}

export interface OnboardingData {
  repo: {
    owner: string;
    name: string;
    url: string;
    tagline: string;
    stars: string;
    language: string;
  };
  whatItDoes: string[];
  whyItExists: { problem: string; audience: string };
  beforeYouDive: { title: string; body: string }[];
  keyFiles: KeyFile[];
  architecture: { nodes: ArchNode[]; note: string };
  requestFlow: FlowStep[];
  folders: Folder[];
  technologies: Tech[];
  confusions: Confusion[];
  ifIJoined: {
    read: { path: string; reason: string }[];
    then: string[];
  };
  video: {
    duration: string;
    chapters: { time: string; title: string }[];
  };
}

export const mockData: OnboardingData = {
  repo: {
    owner: "supabase",
    name: "supabase",
    url: "https://github.com/supabase/supabase",
    tagline: "The open-source Firebase alternative.",
    stars: "72.4k",
    language: "TypeScript",
  },
  whatItDoes: [
    "Supabase gives you a full backend without writing one. You point it at a Postgres database and it instantly hands you a REST API, realtime subscriptions, authentication, file storage, and a dashboard to manage all of it — the kind of plumbing most teams rebuild from scratch on every project.",
    "The clever part is that everything is generated from your database schema. Add a table and its API appears. Add a row-level security policy and your permissions are enforced everywhere at once. You mostly write SQL and configuration, and the running services do the rest.",
  ],
  whyItExists: {
    problem:
      "Standing up auth, a database API, realtime, and storage usually means gluing together five services and maintaining them forever. Firebase solved that but locked you into a proprietary datastore you can never leave.",
    audience:
      "It's for developers who want Firebase's speed but with a real Postgres database underneath — one they own, can query directly, and can take with them.",
  },
  beforeYouDive: [
    {
      title: "This is a monorepo of many products",
      body: "The repo isn't one app — it's the Studio dashboard, the docs site, dozens of client libraries, and the reference examples, all living together. Most of what you'll touch day-to-day is under `apps/studio`.",
    },
    {
      title: "Postgres is the source of truth",
      body: "Auth, the API, realtime, and permissions are all projections of your database. When something behaves unexpectedly, the answer is almost always in the schema or a row-level security policy, not the application code.",
    },
    {
      title: "It's managed with Turborepo + pnpm",
      body: "Tasks are cached and run across packages by Turborepo. If a build feels like it skipped work, it probably used a cache — that's expected, not a bug.",
    },
  ],
  keyFiles: [
    {
      path: "apps/studio/pages/_app.tsx",
      role: "Where the dashboard boots",
      why: "Every page in the Studio dashboard passes through here first. Providers for auth, theming, and data-fetching are set up in this file — it's the frame the whole UI hangs off.",
    },
    {
      path: "apps/studio/data/",
      role: "How the UI talks to your project",
      why: "All the React Query hooks live here. If you want to understand how the dashboard reads or mutates anything in a project, this folder is the map. Data logic lives here, not in components.",
    },
    {
      path: "packages/ui/",
      role: "The shared design system",
      why: "The buttons, dialogs, and inputs used across every Supabase surface are defined once here. Change something here and it ripples everywhere — which is exactly why it's worth reading first.",
    },
  ],
  architecture: {
    note: "Your app never talks to Postgres directly. Everything routes through the API gateway, which fans out to the service that owns each concern.",
    nodes: [
      { id: "client", label: "Your app", sub: "supabase-js in the browser", accent: "blue" },
      { id: "gateway", label: "API Gateway", sub: "Kong — routes every request", accent: "orange" },
      { id: "services", label: "Services", sub: "Auth · REST · Realtime · Storage", accent: "green" },
      { id: "db", label: "Postgres", sub: "the single source of truth", accent: "blue" },
    ],
  },
  requestFlow: [
    { label: "Your app", detail: "calls supabase.from('todos').select()" },
    { label: "API Gateway", detail: "Kong checks the API key and routes it" },
    { label: "PostgREST", detail: "turns the call into a real SQL query" },
    { label: "Postgres", detail: "row-level security decides what you may see" },
    { label: "Response", detail: "only the rows you're allowed, as JSON" },
  ],
  folders: [
    {
      name: "apps/studio",
      path: "apps/studio",
      blurb: "The dashboard you actually log into. This is the big one — most feature work happens here.",
    },
    {
      name: "apps/docs",
      path: "apps/docs",
      blurb: "The documentation site. Content is largely generated from the code, so edits often start in the source, not here.",
    },
    {
      name: "packages/ui",
      path: "packages/ui",
      blurb: "The shared component library. Think of it as Supabase's own little design-system boutique.",
    },
    {
      name: "packages/common",
      path: "packages/common",
      blurb: "Shared helpers and types used across apps — telemetry, constants, small utilities that don't belong to any one product.",
    },
    {
      name: "examples",
      path: "examples",
      blurb: "Dozens of runnable starter projects. The fastest way to see a feature used the way the team intends.",
    },
    {
      name: "i18n",
      path: "i18n",
      blurb: "Translations of the README. Harmless to ignore while you're learning the codebase.",
    },
  ],
  technologies: [
    { name: "Next.js", role: "Runs the dashboard and the docs site, and handles their routing." },
    { name: "PostgreSQL", role: "Stores everything. It's not just the database — it's the engine the whole platform is built on." },
    { name: "React Query", role: "Manages all server data in the UI — caching, refetching, and keeping screens in sync." },
    { name: "Tailwind CSS", role: "Styles the interface, layered under the shared component library." },
    { name: "Turborepo", role: "Coordinates builds across the monorepo and caches work so it isn't repeated." },
    { name: "Kong", role: "The gateway every API request passes through before reaching a service." },
  ],
  confusions: [
    {
      title: "Permissions live in the database, not the code",
      note: "The first time a query returns fewer rows than you expect, you'll go hunting through the app for a filter. It isn't there — a row-level security policy in Postgres is doing it. Check the policies before the code.",
      accent: "orange",
    },
    {
      title: "The API is generated, so there's no route file to read",
      note: "There's no `routes.ts` that defines the REST API. PostgREST reflects it directly from your schema at runtime. If an endpoint is missing, the fix is usually a table or a grant, not a handler.",
      accent: "blue",
    },
    {
      title: "'Studio' and 'Supabase' aren't the same thing",
      note: "In conversation people say Supabase, but in the code the dashboard is Studio. Keep the two straight and a lot of file paths suddenly make sense.",
      accent: "green",
    },
  ],
  ifIJoined: {
    read: [
      { path: "apps/studio/pages/_app.tsx", reason: "to see how the dashboard is wired together" },
      { path: "apps/studio/data/", reason: "to learn the one pattern used for all data access" },
      { path: "packages/ui/", reason: "so the components stop looking unfamiliar" },
    ],
    then: [
      "Run a local project with the CLI and click through the dashboard.",
      "Pick one small screen and trace it from the component back to its data hook.",
      "Read a couple of row-level security policies until the permission model clicks.",
    ],
  },
  video: {
    duration: "8 min",
    chapters: [
      { time: "0:00", title: "What Supabase actually is" },
      { time: "1:40", title: "The monorepo, at a glance" },
      { time: "3:15", title: "How a request travels" },
      { time: "5:30", title: "Where permissions really live" },
      { time: "7:10", title: "Where I'd start reading" },
    ],
  },
};
