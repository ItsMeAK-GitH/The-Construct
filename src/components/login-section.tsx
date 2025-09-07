'use client';

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

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

export function LoginSection() {
    const { user, signInWithGoogle, logout, loading } = useAuth();

    return (
        <section id="login" className="container mx-auto px-4 md:px-6 py-24">
            <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-primary/20">
                <CardHeader className="text-center">
                    <CardTitle className="font-headline text-3xl">System Access</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center">
                            <Skeleton className="h-10 w-48" />
                        </div>
                    ) : user ? (
                        <div className="flex flex-col items-center gap-4">
                             <Avatar className="h-20 w-20 border-2 border-primary/50">
                                <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                                <AvatarFallback>
                                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                                </AvatarFallback>
                            </Avatar>
                            <p>Welcome, {user.displayName}</p>
                            <Button onClick={logout} variant="outline">
                                <LogOut className="mr-2 h-4 w-4" />
                                Sign Out
                            </Button>
                        </div>
                    ) : (
                        <>
                        <CardDescription className="text-center mb-4">
                            Connect your consciousness to the stream to manage your posts.
                        </CardDescription>
                        <Button
                            className="w-full"
                            onClick={signInWithGoogle}
                            disabled={loading}
                        >
                            <GoogleIcon />
                            Sign in with Google
                        </Button>
                        </>
                    )}
                </CardContent>
            </Card>
        </section>
    );
}
