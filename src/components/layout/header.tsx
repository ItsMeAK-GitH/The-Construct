import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PenSquare } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <FeatherIcon className="h-6 w-6 text-primary" />
          <span className="font-headline text-2xl font-bold text-primary">WriteNow</span>
        </Link>
        <Button asChild>
          <Link href="/posts/new">
            <PenSquare className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>
    </header>
  );
}

function FeatherIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
        <path d="M16 8 2 22" />
        <path d="M17.5 15H9" />
      </svg>
    )
  }
