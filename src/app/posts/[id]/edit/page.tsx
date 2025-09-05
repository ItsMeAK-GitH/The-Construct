import { notFound } from 'next/navigation';
import { getPost } from '@/lib/actions';
import { Header } from '@/components/layout/header';
import { PostForm } from '@/components/post-form';

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-headline text-3xl md:text-4xl font-bold mb-2">Edit Post</h1>
          <p className="text-muted-foreground mb-8">Make your changes and save the post.</p>
          <PostForm post={post} />
        </div>
      </main>
    </div>
  );
}
