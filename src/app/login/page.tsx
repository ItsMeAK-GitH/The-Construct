'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Header } from '@/components/layout/header';

function GoogleIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
            <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
            <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.223 0-9.651-3.358-11.303-8h-8.05C7.3 35.845 14.894 44 24 44z" />
            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C43.032 36.751 46 30.73 46 24c0-1.341-.138-2.65-.389-3.917z" />
        </svg>
    )
}

export default function LoginPage() {
  const { user, signInWithGoogle, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
            <Card className="w-full max-w-md mx-4 bg-card/80 backdrop-blur-sm border-primary/20">
                <CardHeader className="text-center">
                    <CardTitle className="font-headline text-3xl">Access The Construct</CardTitle>
                    <CardDescription>
                        Connect your consciousness to the stream.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        className="w-full"
                        onClick={signInWithGoogle}
                        disabled={loading}
                    >
                        <GoogleIcon />
                        Sign in with Google
                    </Button>
                </CardContent>
            </Card>
        </main>
    </div>
  );
}