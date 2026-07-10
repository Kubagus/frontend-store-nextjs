import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-heading mb-4">404</h1>
      <p className="text-xl text-[#64748B] mb-8">Page not found</p>
      <Link
        href="/"
        className="px-6 py-3 bg-primary text-white font-medium rounded-[10px] hover:bg-primary-dark transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
