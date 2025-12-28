// components/Footer.tsx
"use client";

import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-8 border-t border-white/5/50 bg-black/10 glass-container">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          {/* Brand + tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 shadow-md shadow-yellow-500/30">
                <Image src="/icon.svg" alt="AuraWeather Logo" width={20} height={20}
                 />
              </span>
              <span className="text-lg font-semibold tracking-tight">
                AuraWeather
              </span>
            </div>
            <p className="text-xs md:text-sm text-white/60 max-w-xs">
              A modern, AI-augmented weather experience with real-time data,
              rich visuals, and lifestyle insights.
            </p>
          </div>

          {/* Tech + providers */}
          <div className="text-center md:text-left text-xs md:text-sm text-white/60 flex flex-col gap-1">
            <p className="font-medium text-white/70 flex items-center justify-center md:justify-start gap-2">
              <i className="fas fa-cloud-moon-rain text-blue-300" />
              <span>Powered by</span>
            </p>
            <p>
              <a
                href="https://open-meteo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Open‑Meteo API
              </a>{" "}
              ·{" "}
              <a
                href="https://ai.google.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Gemini AI
              </a>
            </p>
          </div>

          {/* Social / links */}
          <div className="flex flex-col items-center md:items-end gap-3 text-xs text-white/60">
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/rohitdatkhile7"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-item flex items-center justify-center h-9 w-9 text-white/70 hover:text-white transition-colors"
                title="GitHub"
              >
                <i className="fab fa-github text-base" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-item flex items-center justify-center h-9 w-9 text-sky-300 hover:text-sky-200 transition-colors"
                title="Twitter / X"
              >
                <i className="fab fa-twitter text-base" />
              </a>
              <a
                href="https://www.linkedin.com/in/rohit-datkhile-b201a8244/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-item flex items-center justify-center h-9 w-9 text-blue-300 hover:text-blue-200 transition-colors"
                title="LinkedIn"
              >
                <i className="fab fa-linkedin-in text-base" />
              </a>
            </div>
            <p className="text-center md:text-right text-white/40">
              © {currentYear} AuraWeather. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
