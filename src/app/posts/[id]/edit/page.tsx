'use client';
import { notFound, useRouter } from 'next/navigation';
import { getPost } from '@/lib/actions';
import { Header } from '@/components/layout/header';
import { PostForm } from '@/components/post-form';
import { useEffect, useState } from 'react';
import type { Post } from '@/types';
import Loading from '@/app/loading';
import { useAuth } from '@/hooks/use-auth';

export default function EditPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loadingPost, setLoadingPost] = useState(true);
  const { user, loading: loadingAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loadingAuth && !user) {
      router.push('/login');
    }
  }, [user, loadingAuth, router]);
  
  useEffect(() => {
    const fetchPost = async () => {
      setLoadingPost(true);
      const fetchedPost = await getPost(params.id);
      setPost(fetchedPost);
      setLoadingPost(false);
    };
    fetchPost();
  }, [params.id]);

  if (loadingPost || loadingAuth) {
    return <Loading />;
  }

  if (!post) {
    notFound();
  }

  if (user && post.author !== user.displayName) {
      // Or show an unauthorized page
      notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-headline text-3xl md:text-4xl font-bold mb-2">Edit Post</h1>
          <p className="text-muted-foreground mb-8">Make your changes and save the post.</p>
          <PostForm post={post} author={user?.displayName!} />
        </div>
      </main>
    </div>
  );
}
