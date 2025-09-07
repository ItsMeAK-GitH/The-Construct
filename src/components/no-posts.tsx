'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PenSquare } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export function NoPosts() {
    const { user, loading } = useAuth();
    if(loading) {
        return null;
    }
    return (
      <div className="text-center py-20 bg-card/80 backdrop-blur-sm border border-primary/20 shadow-lg rounded-lg">
        <h2 className="font-headline text-3xl mb-3 text-primary">No transmissions detected.</h2>
        
        {user ? (
            <>
                <p className="text-muted-foreground mb-6">
                The data stream is clear. Be the first to broadcast a message.
                </p>
                <Button asChild>
                    <Link href="/posts/new">
                        <PenSquare className="mr-2" />
                        Create New Post
                    </Link>
                </Button>
            </>
        ) : (
            <p className="text-muted-foreground mb-6">
                Log in to broadcast your first message.
            </p>
        )}
      </div>
    );
  }
  