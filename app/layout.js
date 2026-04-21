import './globals.css';

export const metadata = {
  title: 'FillText — Free Lorem Ipsum & Placeholder Text Generator',
  description:
    'Generate Lorem Ipsum, random English, or keyword-based placeholder text instantly. Choose words, sentences, paragraphs, or bytes. Free, fast, no ads.',
  keywords:
    'lorem ipsum generator, placeholder text, dummy text, random text generator, filler text',
  openGraph: {
    title: 'FillText — Lorem Ipsum Generator',
    description:
      'The cleanest free placeholder text generator. Lorem Ipsum, English, keyword-based. Words, sentences, paragraphs.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0f0f0f] text-[#e5e5e5] min-h-screen">{children}</body>
    </html>
  );
}
