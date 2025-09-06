import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-40">
      <div className="container mx-auto flex h-16 items-center justify-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80 hover:animate-glitch-alt">
          <FuturisticLogo className="h-8 w-8 text-primary" />
          <span className="font-headline text-2xl font-bold text-primary">The Construct</span>
        </Link>
      </div>
    </header>
  );
}

function FuturisticLogo(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
        <path d="M12 22V12" />
        <path d="M22 7v10" />
        <path d="M2 7v10" />
      </svg>
    )
  }
