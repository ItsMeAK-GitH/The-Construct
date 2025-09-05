import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-9xl font-bold font-headline text-primary">404</h1>
          <p className="text-2xl md:text-3xl font-light text-muted-foreground mt-4">
            Page Not Found
          </p>
          <p className="mt-2 mb-8 text-foreground">
            Sorry, the page you are looking for does not exist.
          </p>
          <Button asChild>
            <Link href="/">Go back home</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
