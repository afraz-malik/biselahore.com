"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const CHATBOT_URL = "https://chatbot.biselahore.com";
const TOOLTIP_MESSAGES = [
  "Chat with us",
  "Query your result",
  "Need help with admissions?",
];

function RobotFaceIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="7" width="16" height="12" rx="3" />
      <path d="M12 4v3" />
      <circle cx="9" cy="12" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="1.25" fill="currentColor" stroke="none" />
      <path d="M9 16h6" />
    </svg>
  );
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTooltipIndex, setActiveTooltipIndex] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShowTooltip(false);
      return;
    }

    setShowTooltip(true);
    const displayTimer = window.setTimeout(() => {
      setShowTooltip(false);
    }, 2200);

    const intervalTimer = window.setInterval(() => {
      setActiveTooltipIndex((value) => (value + 1) % TOOLTIP_MESSAGES.length);
      setShowTooltip(true);
      window.setTimeout(() => setShowTooltip(false), 1800);
    }, 2800);

    return () => {
      window.clearTimeout(displayTimer);
      window.clearInterval(intervalTimer);
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-2 right-2 z-[999] flex flex-col items-end gap-2 sm:bottom-3 sm:right-3">
      {isOpen ? (
        <div
          className="w-[min(90vw,380px)] overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_18px_50px_-22px_rgba(15,23,42,0.55)]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <div className="h-[640px] max-h-[72vh] bg-slate-50">
            <iframe
              src={CHATBOT_URL}
              title="BISE Lahore Chatbot"
              className="h-full w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      ) : null}

      {!isOpen ? (
        <div
          className={`mr-3 mb-1 flex items-center transition-all duration-300 ${
            showTooltip ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
          }`}
        >
          <span className="rounded-full bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-lg">
            {TOOLTIP_MESSAGES[activeTooltipIndex]}
          </span>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className={`flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-white/70 text-white shadow-[0_14px_40px_-14px_rgba(2,132,199,0.8)] transition duration-200 hover:scale-[1.03] ${
          isOpen
            ? "bg-slate-900"
            : "bg-gradient-to-r from-blue-700 via-sky-700 to-cyan-600"
        }`}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
      >
        {isOpen ? <X className="h-5 w-5" /> : <RobotFaceIcon />}
      </button>
    </div>
  );
}
