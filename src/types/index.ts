export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string; // Stored as ISO string for serialization
  updatedAt: string; // Stored as ISO string for serialization
}
