"use client";

import { useEffect, useState } from "react";
import CocktailCard from "@/components/CocktailCard";
import { Cocktail, getRandomCocktail } from "@/lib/api";

async function fetchUniqueCocktails(count: number): Promise<Cocktail[]> {
  const seen = new Set<string>();
  const cocktails: Cocktail[] = [];

  // keep fetching until we have enough unique cocktails
  while (cocktails.length < count) {
    const needed = count - cocktails.length;

    // fetch multiple in parallel
    const results = await Promise.all(
      Array.from({ length: needed }, () => getRandomCocktail())
    );

    for (const { drinks } of results) {
      const c = drinks[0];
      if (c && !seen.has(c.idDrink)) {
        seen.add(c.idDrink);
        cocktails.push(c);
      }
    }
  }

  return cocktails;
}

export default function HomePage() {
  const [drinks, setDrinks] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDrinks = async () => {
    setLoading(true);
    setError(null);
    try {
      const cocktails = await fetchUniqueCocktails(5);
      setDrinks(cocktails);
    } catch (err) {
      console.error("Failed to fetch cocktails", err);
      setError("Could not load cocktails. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDrinks();
  }, []);

  return (
    <section className="space-y-6">
      <header className="space-y-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Discover Random Cocktails</h1>
          <p className="text-gray-600">
            Each refresh gives you 5 unique cocktails.
          </p>
        </div>
        <button
          onClick={loadDrinks}
          disabled={loading}
          className="button border"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </header>

      {error && <p className="text-red-500">{error}</p>}

      {loading && drinks.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-40 bg-gray-100 animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {drinks.map((c) => (
            <CocktailCard key={c.idDrink} cocktail={c} />
          ))}
        </div>
      )}
    </section>
  );
}
