/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0f0f0f',
        panel: '#1a1a1a',
        border: '#2a2a2a',
        accent: '#6366f1',
        violet: '#8b5cf6',
        text: '#e5e5e5',
        muted: '#737373',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
