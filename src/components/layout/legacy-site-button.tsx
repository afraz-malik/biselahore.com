import { History, ExternalLink } from "lucide-react";

export function LegacySiteButton() {
  return (
    <a
      href="https://home.biselahore.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open old version of BISE Lahore website in a new tab"
      className="group fixed bottom-5 left-5 z-50 inline-flex h-14 w-52 items-center overflow-hidden rounded-full border border-blue-400 bg-[linear-gradient(135deg,rgba(239,246,255,0.98)_0%,rgba(191,219,254,0.96)_58%,rgba(186,230,253,0.95)_100%)] pl-3.5 pr-3.5 text-slate-900 shadow-[0_18px_40px_-18px_rgba(30,64,175,0.62)] ring-1 ring-blue-300/75 transition-all duration-300 hover:-translate-y-0.5 hover:w-64 hover:border-blue-500 hover:bg-[linear-gradient(135deg,rgba(59,130,246,0.98)_0%,rgba(37,99,235,0.96)_54%,rgba(14,165,233,0.95)_100%)] hover:text-white hover:shadow-[0_22px_48px_-16px_rgba(37,99,235,0.55)] focus-visible:w-64 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
    >
      <History className="size-5 shrink-0" aria-hidden />
      <span className="ml-3 flex min-w-0 flex-col opacity-100 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="text-sm leading-4.5 font-semibold">Old Version</span>
        <span className="text-[11px] leading-4 text-slate-700 transition-colors duration-300 group-hover:text-white/85 group-focus-visible:text-white/85">
          Open classic website
        </span>
      </span>
      <ExternalLink className="ml-auto size-3.5 shrink-0 opacity-100 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden />
    </a>
  );
}