import { getPosts } from '@/lib/actions';
import { PostCard } from '@/components/post-card';
import { Header } from '@/components/layout/header';
import { Suspense } from 'react';
import Loading from './loading';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PenSquare, ArrowDown, Code, BrainCircuit, Share2 } from 'lucide-react';
import { MatrixText } from '@/components/matrix-text';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

async function PostsList() {
  const posts = await getPosts();

  if (posts.length === 0) {
    return (
      <div className="text-center py-20 bg-card/80 backdrop-blur-sm border border-primary/20 shadow-lg rounded-lg">
        <h2 className="font-headline text-3xl mb-3 text-primary">No transmissions detected.</h2>
        <p className="text-muted-foreground mb-6">
          The data stream is clear. Be the first to broadcast a message.
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
        <section className="h-screen flex flex-col items-center justify-center text-center p-4 relative">
            <div className="z-10 animate-fade-in-down">
                <h1 className="font-headline text-primary">
                    <span className="block text-3xl md:text-4xl text-muted-foreground">Welcome to</span>
                    <span className="block text-6xl md:text-8xl font-bold mt-2">
                        <MatrixText text="the Stream" delay={300} />
                    </span>
                </h1>
                <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up">
                   A modern blog for the digital age, where your thoughts flow freely in the ever-shifting currents of the net.
                </p>
            </div>
            <a href="#features" className="absolute bottom-10 z-10 animate-bounce hover:animate-glitch">
                <ArrowDown className="h-8 w-8 text-primary" />
            </a>
        </section>

        <section id="features" className="container mx-auto px-4 md:px-6 py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <Card className="bg-card/70 backdrop-blur-lg border-primary/20 transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-accent/20 hover:scale-105 hover:backdrop-blur-xl hover:animate-glitch">
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                            <Code className="w-10 h-10 text-primary" />
                        </div>
                        <CardTitle className="font-headline text-2xl">Create & Customize</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Forge your own corner of the digital world. Write, edit, and style your posts with a futuristic interface.
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-card/70 backdrop-blur-lg border-primary/20 transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-accent/20 hover:scale-105 hover:backdrop-blur-xl hover:animate-glitch">
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                            <BrainCircuit className="w-10 h-10 text-primary" />
                        </div>
                        <CardTitle className="font-headline text-2xl">AI-Powered Titles</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Leverage the power of AI to generate compelling titles for your posts, ensuring your ideas capture the attention they deserve.
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-card/70 backdrop-blur-lg border-primary/20 transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-accent/20 hover:scale-105 hover:backdrop-blur-xl hover:animate-glitch">
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                            <Share2 className="w-10 h-10 text-primary" />
                        </div>
                        <CardTitle className="font-headline text-2xl">Share Your Reality</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Broadcast your thoughts to the stream. Seamlessly publish and share your articles with the rest of the digital world.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>

        <section id="latest-transmissions" className="container mx-auto px-4 md:px-6 py-12 min-h-screen">
          <div className="mb-8 p-4 rounded-lg bg-card/80 backdrop-blur-sm border border-primary/20 shadow-lg">
            <h2 className="font-headline text-4xl md:text-5xl font-bold">
              Latest Transmissions
            </h2>
          </div>
          <Suspense fallback={<Loading />}>
            <PostsList />
          </Suspense>
        </section>
      </main>
      <Button asChild className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-lg shadow-primary/30 z-50">
          <Link href="/posts/new" aria-label="Create new post">
            <PenSquare className="h-8 w-8" />
          </Link>
      </Button>
    </div>
  );
}
