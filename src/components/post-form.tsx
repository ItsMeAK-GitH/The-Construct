'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Post } from '@/types';
import { createPost, updatePost, suggestTitles } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useAuth } from '@/hooks/use-auth';

const PostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long.'),
  content: z.string().min(10, 'Content must be at least 10 characters long.'),
  author: z.string().min(2, 'Author name must be at least 2 characters long.'),
});

type PostFormValues = z.infer<typeof PostSchema>;

interface PostFormProps {
  post?: Post;
}

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isEdit ? 'Save Changes' : 'Publish Post'}
    </Button>
  );
}

export function PostForm({ post }: PostFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { user } = useAuth();
  
  const authorName = post?.author || user?.displayName || '';

  const form = useForm<PostFormValues>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      author: authorName,
    },
    mode: 'onChange',
  });

  const { pending } = useFormStatus();

  const [createState, createAction] = useActionState(createPost, null);
  const [updateState, updateAction] = useActionState(post ? updatePost.bind(null, post.id) : () => null, null);

  const formAction = post ? updateAction : createAction;
  
  const handleSuggestTitles = async () => {
    const content = form.getValues('content');
    setIsSuggesting(true);
    setSuggestions([]);
    const result = await suggestTitles(content);
    if(result.error) {
        toast({ title: "Couldn't get suggestions", description: result.error, variant: 'destructive' });
    } else {
        setSuggestions(result.suggestions);
    }
    setIsSuggesting(false);
  };
  
  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form action={formAction} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Your amazing post title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell your story..."
                      className="min-h-[300px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

             <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} readOnly={!!post?.author} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {suggestions.length > 0 && (
                 <Card className="bg-accent/20">
                    <CardHeader>
                        <CardTitle className="flex items-center text-lg font-headline">
                            <Sparkles className="w-5 h-5 mr-2 text-accent-foreground" />
                            AI Title Suggestions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                        {suggestions.map((s, i) => (
                            <li key={i}>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start text-left h-auto"
                                    onClick={() => {
                                        form.setValue('title', s, { shouldValidate: true });
                                        setSuggestions([]);
                                    }}
                                >
                                    {s}
                                </Button>
                            </li>
                        ))}
                        </ul>
                    </CardContent>
                 </Card>
            )}

            <Button type="button" variant="outline" onClick={handleSuggestTitles} disabled={isSuggesting || pending}>
                {isSuggesting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                )}
                Suggest Titles with AI
            </Button>
            
            <div className="flex justify-end gap-4">
              <Button type="button" variant="ghost" onClick={() => router.back()} disabled={pending}>
                Cancel
              </Button>
              <SubmitButton isEdit={!!post} />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
