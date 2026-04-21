'use client';

import { Tag } from 'lucide-react';

export default function KeywordInput({ keyword, onChange, visible }) {
  if (!visible) return null;

  return (
    <div className="animate-in fade-in slide-in-from-top-1 duration-200">
      <label className="text-xs font-semibold text-[#737373] uppercase tracking-widest mb-2 block">
        Keyword / Topic
      </label>
      <div className="relative">
        <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]" />
        <input
          type="text"
          value={keyword}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. technology, food, travel"
          className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg pl-9 pr-3 py-2.5 text-sm text-[#e5e5e5] placeholder-[#4a4a4a] focus:outline-none focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
        />
      </div>
      <p className="text-[#4a4a4a] text-xs mt-1.5">
        Supports: technology, food, travel, sports, health, business, science, education
      </p>
    </div>
  );
}
