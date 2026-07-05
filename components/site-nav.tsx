import { Logo } from "./logo";

export function SiteNav() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center px-4">
      <nav className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/10 bg-[#1c1b19]/90 py-1.5 pl-2 pr-1.5 shadow-soft-lg backdrop-blur-md">
        <div className="px-1.5">
          <Logo onDark />
        </div>
        <a
          href="#how"
          className="hidden rounded-full px-3.5 py-2 text-[13.5px] text-white/70 transition-colors hover:text-white sm:block"
        >
          How it works
        </a>
        <a
          href="#explain"
          className="rounded-full bg-white px-3.5 py-2 text-[13.5px] font-medium text-ink transition-transform hover:scale-[1.03]"
        >
          Explain a repo
        </a>
      </nav>
    </div>
  );
}
