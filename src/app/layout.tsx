import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { MatrixRainingLetters } from '@/components/layout/matrix-background';

export const metadata: Metadata = {
  title: 'WriteNow',
  description: 'A modern blog application to share your thoughts.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <MatrixRainingLetters />
        <div className="relative z-10 h-screen overflow-y-auto scroll-smooth">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
