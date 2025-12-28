/* eslint-disable @typescript-eslint/no-explicit-any */
// components/AIVibeSection.tsx - UPDATED with new components
"use client";

import { useState } from "react";
import { marked } from "marked";
import { WeatherData, LocationData } from "@/types/types";
import WeatherCard from "./WeatherCard"; // ✅ NEW
import AIBadge from "./AiBadge"; // ✅ NEW
import LoadingSpinner from "./LoadingSpinner"; // ✅ NEW
import { getWeatherDescription, calculateFeelsLikeTemp } from "@/utils/service";
import { API_CONFIG } from "@/types/constants"; // ✅ NEW

interface AIVibeSectionProps {
  weatherData: WeatherData | null;
  location: LocationData | null;
}

export default function AIVibeSection({
  weatherData,
  location,
}: AIVibeSectionProps) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [showResponse, setShowResponse] = useState(false);

  const generateVibe = async () => {
    if (!weatherData || !location) {
      setError("Weather data not loaded yet.");
      return;
    }

    setLoading(true);
    setError("");
    setResponse("");
    setShowResponse(true);

    const feelsLike = calculateFeelsLikeTemp(
      weatherData.current.temperature_2m,
      weatherData.current.relative_humidity_2m,
      weatherData.current.wind_speed_10m
    );

    const vibePrompt = `
Generate a concise, trendy lifestyle guide based on the weather in ${location.city}, ${location.countryCode}.

Weather Details:
• Condition: ${getWeatherDescription(weatherData.current.weather_code)}
• Temperature: ${Math.round(weatherData.current.temperature_2m)}°C
• Feels Like: ${Math.round(feelsLike)}°C

Act like a modern lifestyle assistant and provide the following sections:

### 1. Vibe of the Day (one-line, fun, emoji-rich)
### 2. Weather Alerts / News (2 short bullet points)
### 3. Outfit Guide
   - Men
   - Women
### 4. Food Corner
   - Local, National & International food suggestions
   - Include 1–2 nearby restaurant names for each category
### 5. Playlist Suggestions
   - Marathi
   - Hindi
   - English
### 6. Activities
   - 1 Indoor activity
   - 1 Outdoor activity
### 7. Nearby Places to Visit (3–5 suggestions)

Format strictly in **clean Markdown**, using headings, tables, bullets & emojis. Keep tone engaging, crisp, and relatable.
`;

    const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyBg13y6IUrGDbNAnQsKbIcaWes_1T2KqWA";

    try {
      const resp = await fetch(
        `${API_CONFIG.GEMINI_BASE}/models/${API_CONFIG.GEMINI_MODEL}:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: vibePrompt }] }],
          }),
        }
      );

      if (!resp.ok) {
        const errData = await resp.json();
        throw new Error(
          `API Error: ${errData.error?.message || resp.statusText}`
        );
      }

      const result = await resp.json();
      const output = result.candidates?.[0]?.content?.parts?.[0]?.text;

      if (output) {
        let html = marked.parse(output, { breaks: true }) as string;

        // Enhanced styling for AI response
        html = html
          .replace(
            /<h1>/g,
            '<h1 class="text-2xl font-bold text-purple-300 mt-4 mb-2 border-b border-purple-500/30 pb-2">'
          )
          .replace(
            /<h2>/g,
            '<h2 class="text-xl font-semibold text-purple-200 mt-4 mb-2">'
          )
          .replace(
            /<h3>/g,
            '<h3 class="text-lg font-semibold text-purple-100 mt-3 mb-1">'
          )
          .replace(
            /<table>/g,
            '<div class="overflow-x-auto"><table class="border-collapse border border-white/20 my-4 w-full text-sm">'
          )
          .replace(/<\/table>/g, "</table></div>")
          .replace(
            /<th>/g,
            '<th class="border border-white/20 bg-purple-900/40 p-3 text-left font-semibold">'
          )
          .replace(/<td>/g, '<td class="border border-white/20 p-3">')
          .replace(
            /<ul>/g,
            '<ul class="list-disc list-inside space-y-1 ml-2 text-white/90">'
          )
          .replace(
            /<ol>/g,
            '<ol class="list-decimal list-inside space-y-1 ml-2 text-white/90">'
          )
          .replace(/<strong>/g, '<strong class="font-bold text-purple-200">')
          .replace(/<em>/g, '<em class="italic text-white/80">');

        setResponse(html);
      } else {
        throw new Error("No response content");
      }
    } catch (err: any) {
      setError(err.message || "Failed to generate AI recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="vibe-section" className="scroll-mt-24">
      <WeatherCard
        className="max-w-6xl mx-auto text-center"
      >
      {/* ✅ NEW: Using AIBadge component */}
      <AIBadge 
        text="AI Powered" 
        icon="fa-robot"
        className="mb-4"
      />

      {/* Section Title */}
      <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
        <i className="fas fa-sparkles mr-2 text-purple-400"></i> Weather Vibes
      </h3>

      {/* Description */}
      <p className="mb-8 text-white/80 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
        Discover outfits, food, and music perfectly matched to the current
        weather. Let our AI be your personal weather stylist.
      </p>

      {/* Generate Button */}
      <button
        id="vibe-check-btn"
        onClick={generateVibe}
        disabled={loading}
        className="gradient-btn relative group text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <i className="fas fa-wand-magic-sparkles"></i>
          {loading ? "Generating..." : "Generate Vibe"}
        </span>
      </button>

      {/* Response Container */}
      {showResponse && (
        <div className="mt-10 text-left border-t border-white/10 pt-8">
          {/* ✅ NEW: Using LoadingSpinner component */}
          {loading && (
            <LoadingSpinner 
              size="md"
              text="Crafting your vibe..."
            />
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-gradient-to-r from-red-500/20 to-red-600/15 border-2 border-red-500/40 rounded-xl p-6 fade-in">
              <h3 className="text-red-300 font-semibold mb-2">
                ⚠️ AI Connection Failed
              </h3>
              <p className="text-red-200 text-sm mb-2">{error}</p>
              <p className="text-red-200/70 text-xs">
                <strong>Troubleshooting:</strong>
                <br />
                1. Check if API key is valid
                <br />
                2. Verify Gemini API is enabled
                <br />
                3. Check browser console for details
              </p>
            </div>
          )}

          {/* AI Response */}
          {response && !loading && (
            <div
              className="prose prose-invert max-w-none fade-in"
              dangerouslySetInnerHTML={{ __html: response }}
            />
          )}
        </div>
      )}
      </WeatherCard>
    </section>
  );
}
