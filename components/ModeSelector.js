'use client';

import { Type, AlignLeft, AlignCenter, Binary } from 'lucide-react';

const modes = [
  { id: 'words', label: 'Words', Icon: Type },
  { id: 'sentences', label: 'Sentences', Icon: AlignCenter },
  { id: 'paragraphs', label: 'Paragraphs', Icon: AlignLeft },
  { id: 'bytes', label: 'Bytes', Icon: Binary },
];

export default function ModeSelector({ mode, onChange }) {
  return (
    <div>
      <label className="text-xs font-semibold text-[#737373] uppercase tracking-widest mb-2 block">
        Mode
      </label>
      <div className="grid grid-cols-4 gap-1.5">
        {modes.map(({ id, label, Icon }) => {
          const active = mode === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-lg text-xs font-medium transition-all duration-150 border ${
                active
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-900/40'
                  : 'bg-[#1a1a1a] border-[#2a2a2a] text-[#737373] hover:border-indigo-500/50 hover:text-[#e5e5e5]'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
