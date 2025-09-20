import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cocktails • Next.js Demo",
  description: "A clean Next.js 14 demo using TheCocktailDB API",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b bg-white/70 backdrop-blur">
          <div className="container flex items-center justify-between py-4">
            <a href="/" className="text-xl font-semibold">🍸 Cocktails</a>
            <nav className="flex gap-4">
              <a className="button" href="/search">Search</a>
              <a className="button" href="https://www.thecocktaildb.com/api.php" target="_blank" rel="noreferrer">API</a>
            </nav>
          </div>
        </header>
        <main className="container py-8">{children}</main>
        <footer className="border-t py-8 mt-12 text-center text-sm text-gray-500">
          Built with Next.js 14 • Tailwind
        </footer>
      </body>
    </html>
  );
}
