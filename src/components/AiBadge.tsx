// components/AIBadge.tsx
"use client";

interface AIBadgeProps {
  text?: string;
  icon?: string;
  className?: string;
}

export default function AIBadge({
  text = "AI Powered",
  icon = "fa-robot",
  className = "",
}: AIBadgeProps) {
  return (
    <span
      className={`ai-feature-badge inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-widest text-purple-200 border border-purple-400/60 bg-purple-600/15 backdrop-blur-sm transition-all duration-300 hover:bg-purple-600/25 hover:border-purple-400/90 hover:-translate-y-1 ${className}`}
    >
      <i className={`fas ${icon} text-purple-400`}></i>
      {text}
    </span>
  );
}