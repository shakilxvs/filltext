'use client';

export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a2a] py-5 mt-10">
      <div className="max-w-[900px] mx-auto px-4 text-center">
        <p className="text-[#737373] text-sm">
          FillText — Free by{' '}
          <a
            href="https://shakilxvs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            @shakilxvs
          </a>
        </p>
      </div>
    </footer>
  );
}
