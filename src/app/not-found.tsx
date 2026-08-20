import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16">
      <p className="font-mono text-xs text-muted-foreground">404</p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight">
        There's nothing here
      </h1>
      <p className="mt-3 text-base text-muted-foreground">
        The page you're after doesn't exist, or it moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block font-mono text-xs text-link hover:underline"
      >
        ← Back home
      </Link>
    </div>
  );
}
