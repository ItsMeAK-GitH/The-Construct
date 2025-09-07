'use client';

import { Header } from '@/components/layout/header';
import { PostForm } from '@/components/post-form';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from '@/app/loading';

export default function NewPostPage() {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-headline text-3xl md:text-4xl font-bold mb-2">Create New Post</h1>
          <p className="text-muted-foreground mb-8">Fill in the details below to publish your article.</p>
          <PostForm author={user?.displayName} />
        </div>
      </main>
    </div>
  );
}
