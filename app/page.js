'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { History, ChevronDown, X } from 'lucide-react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import GeneratorPanel from '../components/GeneratorPanel.js';
import OutputPanel from '../components/OutputPanel.js';
import { generateText } from '../lib/utils.js';

const DEFAULT_STATE = {
  mode: 'paragraphs',
  count: 3,
  type: 'lorem',
  keyword: '',
  formatOptions: {
    htmlTags: false,
    startWithLorem: true,
    uppercase: false,
    lowercase: false,
    lineBreaks: true,
  },
};

export default function HomePage() {
  const [state, setState] = useState(DEFAULT_STATE);
  const [output, setOutput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const historyRef = useRef(null);

  const generate = useCallback((currentState) => {
    const { mode, count, type, keyword, formatOptions } = currentState;
    const text = generateText(mode, count, type, keyword, formatOptions);
    setOutput(text);
    return text;
  }, []);

  // Auto-generate on mount
  useEffect(() => {
    generate(DEFAULT_STATE);
  }, []);

  // Auto-generate on state change
  useEffect(() => {
    if (output === '') return; // Skip first render (handled above)
    generate(state);
  }, [state.mode, state.count, state.type, state.formatOptions]);

  // Generate on keyword change with debounce
  useEffect(() => {
    if (state.type !== 'keyword') return;
    const timer = setTimeout(() => {
      generate(state);
    }, 400);
    return () => clearTimeout(timer);
  }, [state.keyword]);

  // Close history dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (historyRef.current && !historyRef.current.contains(e.target)) {
        setHistoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleChange = (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleGenerate = () => {
    // Save current output to history before generating new
    if (output && output.trim()) {
      setHistory((prev) => {
        const entry = {
          id: Date.now(),
          text: output,
          label: `${state.count} ${state.mode} · ${state.type}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        return [entry, ...prev].slice(0, 5);
      });
    }
    generate(state);
  };

  const restoreHistory = (item) => {
    setOutput(item.text);
    setHistoryOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f0f]">
      <Header />

      <main className="flex-1 max-w-[900px] mx-auto w-full px-4 py-6">
        {/* History Bar */}
        {history.length > 0 && (
          <div className="flex justify-end mb-4" ref={historyRef}>
            <div className="relative">
              <button
                onClick={() => setHistoryOpen((o) => !o)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-[#2a2a2a] bg-[#1a1a1a] text-[#737373] hover:border-indigo-500/40 hover:text-[#e5e5e5] transition-all duration-150"
              >
                <History size={12} />
                History ({history.length})
                <ChevronDown size={11} className={`transition-transform ${historyOpen ? 'rotate-180' : ''}`} />
              </button>

              {historyOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-72 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl shadow-xl shadow-black/50 z-50 overflow-hidden">
                  <div className="px-3 py-2 border-b border-[#2a2a2a] flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#737373] uppercase tracking-widest">
                      Recent Generations
                    </span>
                    <button
                      onClick={() => setHistoryOpen(false)}
                      className="text-[#4a4a4a] hover:text-[#737373] transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  {history.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => restoreHistory(item)}
                      className="w-full text-left px-3 py-2.5 hover:bg-[#2a2a2a] transition-colors border-b border-[#2a2a2a] last:border-0"
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-medium text-[#e5e5e5]">{item.label}</span>
                        <span className="text-[10px] text-[#4a4a4a]">{item.time}</span>
                      </div>
                      <p className="text-xs text-[#4a4a4a] truncate">{item.text.slice(0, 60)}...</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Controls Panel */}
          <div className="lg:w-[320px] lg:flex-shrink-0 bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-5">
            <GeneratorPanel
              state={state}
              onChange={handleChange}
              onGenerate={handleGenerate}
            />
          </div>

          {/* Output Panel */}
          <div className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-5">
            <OutputPanel output={output} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
