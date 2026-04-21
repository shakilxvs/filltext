'use client';

export default function Header() {
  return (
    <header className="border-b border-[#2a2a2a] py-6">
      <div className="max-w-[900px] mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            FillText
          </span>
        </h1>
        <p className="text-[#737373] text-sm mt-1.5 font-medium">
          The cleanest placeholder text generator on the internet
        </p>
      </div>
    </header>
  );
}
