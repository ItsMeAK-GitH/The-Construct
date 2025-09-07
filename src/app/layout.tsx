import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { MatrixRainingLetters } from '@/components/layout/matrix-background';

export const metadata: Metadata = {
  title: 'The Construct',
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
        <link rel="icon" href="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='hsl(120 70% 50%)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M12 2L2 7l10 5 10-5-10-5z' /%3e%3cpath d='M2 17l10 5 10-5' /%3e%3cpath d='M2 12l10 5 10-5' /%3e%3cpath d='M12 22V12' /%3e%3cpath d='M22 7v10' /%3e%3cpath d='M2 7v10' /%3e%3c/svg%3e" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <MatrixRainingLetters />
        <div className="relative z-10 h-screen overflow-y-auto">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
