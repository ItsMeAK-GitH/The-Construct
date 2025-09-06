import { getPosts } from '@/lib/actions';
import { PostCard } from '@/components/post-card';
import { Header } from '@/components/layout/header';
import { Suspense } from 'react';
import Loading from './loading';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PenSquare } from 'lucide-react';

async function PostsList() {
  const posts = await getPosts();

  if (posts.length === 0) {
    return (
      <div className="text-center py-20 bg-card/70 backdrop-blur-lg border border-primary/20 shadow-lg rounded-lg">
        <h2 className="font-headline text-3xl mb-3 text-primary">No transmissions detected.</h2>
        <p className="text-muted-foreground mb-6">
          The data stream is clear. Be the first to broadcast a message.
        </p>
        <Button asChild>
          <Link href="/posts/new">
            <PenSquare className="mr-2 h-4 w-4" />
            Create New Post
          </Link>
        </Button>
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
        <section className="container mx-auto px-4 md:px-6 py-12 min-h-[60vh] flex items-center justify-center">
            <div className="bg-card/70 backdrop-blur-lg border border-primary/20 rounded-lg p-8 md:p-12 text-center shadow-lg animate-fade-in-down">
                <h1 className="text-5xl md:text-7xl font-bold font-headline text-primary">
                    Welcome to the Stream
                </h1>
                <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    A modern blog for the digital age, where your thoughts flow freely in the ever-shifting currents of the net.
                </p>
            </div>
        </section>

        <section className="container mx-auto px-4 md:px-6 pb-12">
          <div className="mb-8 p-4 rounded-lg bg-card/70 backdrop-blur-lg border border-primary/20 shadow-lg">
            <h2 className="font-headline text-4xl md:text-5xl font-bold">
              Latest Transmissions
            </h2>
          </div>
          <Suspense fallback={<Loading />}>
            <PostsList />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
