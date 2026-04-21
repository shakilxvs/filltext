'use client';

import { BookOpen, Shuffle, Globe, Tag } from 'lucide-react';

const types = [
  { id: 'lorem', label: 'Classic Lorem', Icon: BookOpen },
  { id: 'random-latin', label: 'Random Latin', Icon: Shuffle },
  { id: 'english', label: 'English', Icon: Globe },
  { id: 'keyword', label: 'Keyword-Based', Icon: Tag },
];

export default function TypeSelector({ type, onChange }) {
  return (
    <div>
      <label className="text-xs font-semibold text-[#737373] uppercase tracking-widest mb-2 block">
        Text Type
      </label>
      <div className="grid grid-cols-2 gap-1.5">
        {types.map(({ id, label, Icon }) => {
          const active = type === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 border text-left ${
                active
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                  : 'bg-[#1a1a1a] border-[#2a2a2a] text-[#737373] hover:border-indigo-500/40 hover:text-[#e5e5e5]'
              }`}
            >
              <Icon size={14} className={active ? 'text-indigo-400' : ''} />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
