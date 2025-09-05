import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost } from '@/lib/actions';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { DeletePostButton } from '@/components/delete-post-button';
import { Separator } from '@/components/ui/separator';
import { format, parseISO } from 'date-fns';
import { Badge } from '@/components/ui/badge';

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }
  
  const createdDate = format(parseISO(post.createdAt), 'MMMM d, yyyy');
  const updatedDate = format(parseISO(post.updatedAt), 'MMMM d, yyyy');

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        <article className="max-w-3xl mx-auto">
          <header className="mb-8">
            <h1 className="font-headline text-4xl md:text-5xl font-bold leading-tight mb-4">{post.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>By {post.author}</span>
              <Separator orientation="vertical" className="h-4" />
              <span>Published on {createdDate}</span>
            </div>
            {updatedDate !== createdDate && (
                 <Badge variant="outline" className="mt-4">Last updated on {updatedDate}</Badge>
            )}
          </header>
          
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12" style={{ whiteSpace: 'pre-wrap' }}>
            {post.content}
          </div>

          <Separator className="my-8" />
          
          <div className="flex justify-end gap-4">
            <Button asChild variant="outline" size="sm">
              <Link href={`/posts/${post.id}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <DeletePostButton postId={post.id} />
          </div>
        </article>
      </main>
    </div>
  );
}
