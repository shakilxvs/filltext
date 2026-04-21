'use client';

import CopyButton from './CopyButton.js';
import StatsBar from './StatsBar.js';

export default function OutputPanel({ output }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold text-[#737373] uppercase tracking-widest">
          Output
        </label>
        <CopyButton text={output} />
      </div>
      <textarea
        readOnly
        value={output}
        className="w-full flex-1 min-h-[300px] lg:min-h-[450px] max-h-[500px] bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl p-4 text-sm text-[#e5e5e5] font-mono leading-relaxed resize-none focus:outline-none focus:border-[#3a3a3a] scrollbar-thin"
        placeholder="Your generated text will appear here..."
      />
      <StatsBar text={output} />
    </div>
  );
}
