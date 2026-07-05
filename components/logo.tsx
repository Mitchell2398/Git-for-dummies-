import Link from "next/link";

export function Logo({
  className = "",
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span
        className={`grid h-8 w-8 place-items-center overflow-hidden rounded-[9px] border ${
          onDark ? "border-white/15 bg-white/10" : "border-line bg-paper-sunk"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/art/logo.webp"
          alt=""
          className="h-7 w-7 object-contain"
          style={{ imageRendering: "pixelated" }}
        />
      </span>
      <span
        className={`font-display text-[15px] font-semibold tracking-[-0.02em] ${
          onDark ? "text-white" : "text-ink"
        }`}
      >
        git for dummies
      </span>
    </Link>
  );
}
