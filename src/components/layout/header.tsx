'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '../ui/skeleton';
import { LogOut, PenSquare } from 'lucide-react';

export function Header() {
  const { user, loading, logout } = useAuth();

  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80 hover:animate-glitch-alt">
          <FuturisticLogo className="h-8 w-8 text-primary" />
          <span className="font-headline text-2xl font-bold text-primary">The Construct</span>
        </Link>
        <div className="flex items-center gap-4">
          {loading ? (
            <Skeleton className="h-10 w-24 rounded-md" />
          ) : user ? (
            <>
              <Button asChild>
                <Link href="/posts/new">
                  <PenSquare/>
                  New Post
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-primary/50">
                      <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                      <AvatarFallback>
                        {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button asChild>
                <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
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
