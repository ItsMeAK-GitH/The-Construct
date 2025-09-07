import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Post } from '@/types';
import { format, parseISO } from 'date-fns';

export function PostCard({ post }: { post: Post }) {
  const date = parseISO(post.createdAt);
  const formattedDate = format(date, 'MMMM d, yyyy');

  return (
    <Link href={`/posts/${post.id}`} className="group">
      <Card className="h-full flex flex-col transition-all duration-300 group-hover:shadow-accent/20 group-hover:shadow-2xl group-hover:scale-105 border-primary/20 bg-card/80 backdrop-blur-lg hover:animate-glitch animate-fade-in-up">
        <CardHeader>
          <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{post.title}</CardTitle>
          <CardDescription>By {post.author}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="line-clamp-4 text-sm text-foreground/80">{post.content}</p>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">{formattedDate}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
