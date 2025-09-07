'use server';

import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { generatePostTitleSuggestions } from '@/ai/flows/generate-post-title-suggestions';
import type { Post } from '@/types';

const PostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long.'),
  content: z.string().min(10, 'Content must be at least 10 characters long.'),
  author: z.string().min(2, 'Author name must be at least 2 characters long.'),
});

type FirestorePost = Omit<Post, 'id' | 'createdAt' | 'updatedAt'> & {
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// Helper to convert Firestore doc to Post type
function toPost(doc: any): Post {
    const data = doc.data() as FirestorePost;
    return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate().toISOString(),
        updatedAt: data.updatedAt.toDate().toISOString(),
    };
}


export async function createPost(prevState: any, formData: FormData) {
  const validatedFields = PostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    author: formData.get('author'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await addDoc(collection(db, 'posts'), {
      ...validatedFields.data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error creating post:', error);
    return { message: 'Failed to create post.' };
  }
  
  revalidatePath('/');
  redirect('/');
}

export async function updatePost(id: string, prevState: any, formData: FormData) {
  const validatedFields = PostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    author: formData.get('author'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  try {
    const postRef = doc(db, 'posts', id);
    await updateDoc(postRef, {
      ...validatedFields.data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating post:', error);
    return { message: 'Failed to update post.' };
  }

  revalidatePath('/');
  revalidatePath(`/posts/${id}`);
  redirect(`/posts/${id}`);
}

export async function deletePost(id: string) {
    try {
        await deleteDoc(doc(db, 'posts', id));
    } catch (error) {
        console.error('Error deleting post:', error);
        return { message: 'Failed to delete post.' };
    }
  
  revalidatePath('/');
  redirect('/');
}

export async function getPosts(): Promise<Post[]> {
  try {
    const postsCollection = collection(db, 'posts');
    const q = query(postsCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(toPost);
  } catch (e) {
    console.error("Couldn't get posts", e);
    return [];
  }
}

export async function getPost(id: string): Promise<Post | null> {
  try {
    const postDoc = await getDoc(doc(db, 'posts', id));
    if (!postDoc.exists()) {
      return null;
    }
    return toPost(postDoc);
  } catch (e) {
    console.error(`Couldn't get post ${id}`, e);
    return null;
  }
}

export async function suggestTitles(content: string): Promise<{ suggestions: string[]; error?: string }> {
  if (content.trim().length < 50) {
    return { suggestions: [], error: "Please provide at least 50 characters of content for suggestions." };
  }
  try {
    const result = await generatePostTitleSuggestions({ content });
    return { suggestions: result.titleSuggestions };
  } catch (error) {
    console.error('AI title suggestion failed:', error);
    return { suggestions: [], error: 'Failed to generate title suggestions. Please try again later.' };
  }
}
