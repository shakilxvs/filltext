'use client';

import { BarChart2 } from 'lucide-react';
import { countWords, countChars, countCharsNoSpaces, countSentences, countParagraphs, estimateReadTime } from '../lib/utils.js';

export default function StatsBar({ text }) {
  const stats = [
    { label: 'Words', value: countWords(text).toLocaleString() },
    { label: 'Chars', value: countChars(text).toLocaleString() },
    { label: 'No Spaces', value: countCharsNoSpaces(text).toLocaleString() },
    { label: 'Sentences', value: countSentences(text).toLocaleString() },
    { label: 'Paragraphs', value: countParagraphs(text).toLocaleString() },
    { label: 'Read Time', value: estimateReadTime(text) },
  ];

  return (
    <div className="mt-3">
      <div className="flex items-center gap-1.5 mb-2">
        <BarChart2 size={11} className="text-[#737373]" />
        <span className="text-xs font-semibold text-[#737373] uppercase tracking-widest">Stats</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {stats.map(({ label, value }) => (
          <div
            key={label}
            className="flex items-center gap-1.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md px-2.5 py-1"
          >
            <span className="text-[#4a4a4a] text-xs">{label}</span>
            <span className="text-[#e5e5e5] text-xs font-mono font-semibold">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
