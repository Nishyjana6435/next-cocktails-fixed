"use client";

import { useEffect, useState } from "react";
import CocktailCard, { Cocktail } from "@/components/CocktailCard";
import { getRandomCocktail } from "@/lib/api";

async function fetchUniqueCocktails(count: number): Promise<Cocktail[]> {
  const seen = new Set<string>();
  const cocktails: Cocktail[] = [];

  while (cocktails.length < count) {
    const { drinks } = await getRandomCocktail();
    const c = drinks[0];

    if (!seen.has(c.idDrink)) {
      seen.add(c.idDrink);
      cocktails.push({
        idDrink: c.idDrink,
        strDrink: c.strDrink,
        strDrinkThumb: c.strDrinkThumb,
        strCategory: c.strCategory,
      });
    }
  }

  return cocktails;
}

export default function HomePage() {
  const [drinks, setDrinks] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(false);

  const loadDrinks = async () => {
    setLoading(true);
    const cocktails = await fetchUniqueCocktails(5);
    setDrinks(cocktails);
    setLoading(false);
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {drinks.map((c) => (
          <CocktailCard
            key={c.idDrink}
            cocktail={{
              idDrink: c.idDrink,
              strDrink: c.strDrink,
              strDrinkThumb: c.strDrinkThumb,
              strCategory: c.strCategory,
            }}
          />
        ))}
      </div>
    </section>
  );
}
