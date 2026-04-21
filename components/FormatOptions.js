'use client';

import { Settings } from 'lucide-react';

export default function FormatOptions({ options, onChange, type }) {
  const toggle = (key) => {
    if (key === 'uppercase' && !options.uppercase) {
      onChange({ ...options, uppercase: true, lowercase: false });
    } else if (key === 'lowercase' && !options.lowercase) {
      onChange({ ...options, lowercase: true, uppercase: false });
    } else {
      onChange({ ...options, [key]: !options[key] });
    }
  };

  const checkboxes = [
    {
      key: 'htmlTags',
      label: 'Wrap in HTML <p> tags',
    },
    {
      key: 'startWithLorem',
      label: 'Start with "Lorem ipsum..."',
      disabled: type !== 'lorem',
      disabledNote: 'Only for Classic Lorem',
    },
    {
      key: 'uppercase',
      label: 'ALL UPPERCASE',
    },
    {
      key: 'lowercase',
      label: 'all lowercase',
    },
    {
      key: 'lineBreaks',
      label: 'Line breaks between paragraphs',
    },
  ];

  return (
    <div>
      <label className="text-xs font-semibold text-[#737373] uppercase tracking-widest mb-2 flex items-center gap-1.5">
        <Settings size={11} />
        Format Options
      </label>
      <div className="space-y-2">
        {checkboxes.map(({ key, label, disabled, disabledNote }) => {
          const isDisabled = disabled;
          const checked = options[key];
          return (
            <label
              key={key}
              className={`flex items-center gap-2.5 cursor-pointer group ${isDisabled ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              <div
                onClick={() => !isDisabled && toggle(key)}
                className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all duration-150 ${
                  checked && !isDisabled
                    ? 'bg-indigo-600 border-indigo-500'
                    : 'bg-[#0f0f0f] border-[#3a3a3a] group-hover:border-indigo-500/50'
                } ${isDisabled ? 'pointer-events-none' : ''}`}
              >
                {checked && !isDisabled && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5L3.5 7L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-[#a3a3a3] group-hover:text-[#e5e5e5] transition-colors select-none">
                {label}
                {isDisabled && disabledNote && (
                  <span className="text-[#4a4a4a] ml-1.5 text-xs">({disabledNote})</span>
                )}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
