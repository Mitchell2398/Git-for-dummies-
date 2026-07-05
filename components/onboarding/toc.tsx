"use client";

import { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  label: string;
}

export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="flex flex-col gap-0.5 text-[13.5px]">
      <p className="mb-2 pl-3 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-faint">
        On this page
      </p>
      {items.map((it) => {
        const isActive = active === it.id;
        return (
          <a
            key={it.id}
            href={`#${it.id}`}
            className={`group flex items-center gap-2.5 rounded-md py-1.5 pl-3 pr-2 transition-colors ${
              isActive
                ? "text-ink"
                : "text-ink-faint hover:text-ink-soft"
            }`}
          >
            <span
              className={`h-3.5 w-px shrink-0 transition-colors ${
                isActive ? "bg-accent" : "bg-line group-hover:bg-line-strong"
              }`}
            />
            <span className="leading-snug">{it.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
