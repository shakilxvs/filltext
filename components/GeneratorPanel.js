'use client';

import { useState } from 'react';
import { Minus, Plus, RefreshCw, Zap } from 'lucide-react';
import ModeSelector from './ModeSelector.js';
import TypeSelector from './TypeSelector.js';
import KeywordInput from './KeywordInput.js';
import FormatOptions from './FormatOptions.js';

const modeLimits = {
  words: { min: 1, max: 2000, default: 50 },
  sentences: { min: 1, max: 500, default: 5 },
  paragraphs: { min: 1, max: 100, default: 3 },
  bytes: { min: 10, max: 10000, default: 500 },
};

const presets = [
  { label: 'Tweet', mode: 'words', count: 30 },
  { label: 'Short Para', mode: 'paragraphs', count: 1 },
  { label: 'Full Page', mode: 'paragraphs', count: 5 },
];

export default function GeneratorPanel({ state, onChange, onGenerate }) {
  const { mode, count, type, keyword, formatOptions } = state;
  const limits = modeLimits[mode];

  const handleModeChange = (newMode) => {
    const newLimits = modeLimits[newMode];
    onChange({
      mode: newMode,
      count: newLimits.default,
    });
  };

  const handleCountChange = (val) => {
    const num = parseInt(val, 10);
    if (isNaN(num)) return;
    onChange({ count: Math.min(Math.max(num, limits.min), limits.max) });
  };

  const handleDecrement = () => {
    onChange({ count: Math.max(count - 1, limits.min) });
  };

  const handleIncrement = () => {
    onChange({ count: Math.min(count + 1, limits.max) });
  };

  const handlePreset = (preset) => {
    const newLimits = modeLimits[preset.mode];
    onChange({ mode: preset.mode, count: preset.count });
  };

  const showBytesWarning = mode === 'bytes' && count > 10000;

  return (
    <div className="flex flex-col gap-5">
      {/* Presets */}
      <div>
        <label className="text-xs font-semibold text-[#737373] uppercase tracking-widest mb-2 flex items-center gap-1.5">
          <Zap size={11} />
          Quick Presets
        </label>
        <div className="flex gap-1.5">
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => handlePreset(preset)}
              className="flex-1 py-1.5 px-2 rounded-md text-xs font-medium border border-[#2a2a2a] bg-[#0f0f0f] text-[#737373] hover:border-indigo-500/50 hover:text-[#e5e5e5] transition-all duration-150"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mode */}
      <ModeSelector mode={mode} onChange={handleModeChange} />

      {/* Count */}
      <div>
        <label className="text-xs font-semibold text-[#737373] uppercase tracking-widest mb-2 block">
          Amount
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrement}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#2a2a2a] bg-[#0f0f0f] text-[#737373] hover:border-indigo-500/50 hover:text-[#e5e5e5] transition-all duration-150 flex-shrink-0"
          >
            <Minus size={14} />
          </button>
          <input
            type="number"
            value={count}
            min={limits.min}
            max={limits.max}
            onChange={(e) => handleCountChange(e.target.value)}
            className="flex-1 text-center bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg py-2 text-sm font-mono font-semibold text-[#e5e5e5] focus:outline-none focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/30 transition-colors [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            onClick={handleIncrement}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#2a2a2a] bg-[#0f0f0f] text-[#737373] hover:border-indigo-500/50 hover:text-[#e5e5e5] transition-all duration-150 flex-shrink-0"
          >
            <Plus size={14} />
          </button>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[#4a4a4a] text-xs">Min: {limits.min}</span>
          <span className="text-[#4a4a4a] text-xs capitalize">{mode}</span>
          <span className="text-[#4a4a4a] text-xs">Max: {limits.max.toLocaleString()}</span>
        </div>
        {showBytesWarning && (
          <p className="mt-1.5 text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-md px-2.5 py-1.5">
            Maximum is 10,000 bytes. Value has been capped.
          </p>
        )}
      </div>

      {/* Type */}
      <TypeSelector type={type} onChange={(t) => onChange({ type: t })} />

      {/* Keyword */}
      <KeywordInput
        keyword={keyword}
        onChange={(kw) => onChange({ keyword: kw })}
        visible={type === 'keyword'}
      />

      {/* Format */}
      <FormatOptions
        options={formatOptions}
        onChange={(opts) => onChange({ formatOptions: opts })}
        type={type}
      />

      {/* Generate Button */}
      <button
        onClick={onGenerate}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all duration-150 shadow-lg shadow-indigo-900/30 active:scale-[0.98] mt-1"
      >
        <RefreshCw size={14} />
        Generate Text
      </button>
    </div>
  );
}
