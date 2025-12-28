// components/Navbar.tsx
"use client";

import { useState, useEffect, FormEvent } from "react";

interface NavbarProps {
  onSearch: (city: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [searchInput, setSearchInput] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setScrolled(currentScrollY > 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      setSearchInput("");
      setMobileSearchOpen(false);
    }
  };

  const scrollToVibe = () => {
    const vibeSection = document.getElementById("vibe-section");
    if (vibeSection) {
      vibeSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setMobileSearchOpen(false);
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 backdrop-blur-xl bg-black/10 border-b border-white/5 transition-all duration-300 ${
        scrolled ? "shadow-lg" : ""
      } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-2">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-3 py-1">
          <svg
            className="w-8 h-8 md:w-10 md:h-10"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#ffd700", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#ffa500", stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="30" fill="url(#sunGradient)" />
            <path
              d="M 60,70 A 25,25 0 1,1 90,45 A 15,15 0 1,1 60,70"
              fill="rgba(255,255,255,0.8)"
            />
          </svg>
          <span className="text-xl md:text-2xl font-bold tracking-tight">
            AuraWeather
          </span>
        </a>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Desktop AI Button */}
          <button
            onClick={scrollToVibe}
            className="nav-ai-btn hidden md:inline-flex"
          >
            <i className="fas fa-wand-magic-sparkles text-lg"></i>
            <span>AI Vibes</span>
          </button>

          {/* Mobile Search Toggle */}
          <button
            id="search-toggle"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className={`md:hidden glass-item h-10 w-10 flex items-center justify-center rounded-full transition-all duration-300 ${
              mobileSearchOpen ? "active" : ""
            }`}
          >
            <i className="fas fa-search text-lg"></i>
          </button>

          {/* Desktop Search */}
          <form onSubmit={handleSubmit} className="hidden md:flex max-w-xs">
            <div className="relative w-full flex items-center">
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search city..."
                className="search-input w-full text-white placeholder-white/70 rounded-full py-2 pl-4 pr-10"
              />
              <button
                type="submit"
                className="absolute right-1 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-200"
              >
                <i className="fas fa-arrow-right text-sm"></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      <div
        id="mobile-search"
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileSearchOpen ? "active" : "max-h-0 opacity-0"
        }`}
      >
        <form onSubmit={handleSubmit} className="px-2 py-3 flex gap-2">
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search city..."
            className="search-input flex-1 text-white placeholder-white/70 rounded-full py-2 pl-4"
          />
          <button
            type="button"
            onClick={scrollToVibe}
            className="mobile-ai-btn px-4 rounded-full flex items-center justify-center"
            title="AI Vibes"
          >
            <i className="fas fa-wand-magic-sparkles text-lg"></i>
          </button>
        </form>
      </div>
    </nav>
  );
}