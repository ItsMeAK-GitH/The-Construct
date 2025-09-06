import { getPosts } from '@/lib/actions';
import { PostCard } from '@/components/post-card';
import { Header } from '@/components/layout/header';
import { Suspense } from 'react';
import Loading from './loading';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PenSquare } from 'lucide-react';
import { MatrixText } from '@/components/matrix-text';

async function PostsList() {
  const posts = await getPosts();

  if (posts.length === 0) {
    return (
      <div className="text-center py-20 bg-card/50 backdrop-blur-sm rounded-lg border border-primary/20 shadow-lg">
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
        <section className="container mx-auto px-4 md:px-6 py-20 text-center">
            <h1 className="text-5xl md:text-7xl font-bold font-headline text-primary">
                <MatrixText text="Welcome to the Stream" />
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                <MatrixText text="A modern blog for the digital age, where your thoughts flow freely in the ever-shifting currents of the net." delay={1000} />
            </p>
        </section>

        <section className="container mx-auto px-4 md:px-6 pb-12">
          <div className="flex items-center justify-between mb-8">
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
