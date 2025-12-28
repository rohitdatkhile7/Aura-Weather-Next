"use client";

import { useState, FormEvent } from "react";

interface SearchFormProps {
  onSearch: (city: string) => void;
  className?: string;
  placeholder?: string;
}

export default function SearchForm({
  onSearch,
  className = "",
  placeholder = "Search city...",
}: SearchFormProps) {
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setIsLoading(true);
      await onSearch(searchInput.trim());
      setSearchInput("");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative w-full flex items-center">
        <input
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className="search-input w-full text-white placeholder-white/70 rounded-full py-2 pl-4 pr-10 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={isLoading || !searchInput.trim()}
          className="absolute right-1 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <i className="fas fa-spinner fa-spin text-sm"></i>
          ) : (
            <i className="fas fa-arrow-right text-sm"></i>
          )}
        </button>
      </div>
    </form>
  );
}