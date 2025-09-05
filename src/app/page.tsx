import { getPosts } from '@/lib/actions';
import { PostCard } from '@/components/post-card';
import { Header } from '@/components/layout/header';
import { Suspense } from 'react';
import Loading from './loading';

async function PostsList() {
  const posts = await getPosts();

  if (posts.length === 0) {
    return (
      <div className="text-center py-20 bg-card rounded-lg shadow-sm">
        <h2 className="font-headline text-2xl mb-2">Nothing posted yet</h2>
        <p className="text-muted-foreground">
          Why don't you be the first to create a new post?
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 md:px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
              Latest Posts
            </h1>
          </div>
          <Suspense fallback={<Loading />}>
            <PostsList />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
