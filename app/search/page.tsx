"use client";

import { useState, useEffect } from "react";
import SearchInput from "@/components/SearchInput";
import CocktailGrid from "@/components/CocktailGrid";
import FavouritesList from "@/components/FavouriteList";
import { Cocktail } from "@/components/CocktailCard";
import { searchCocktailsByName } from "@/lib/api";

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [drinks, setDrinks] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(false);
  const [favourites, setFavourites] = useState<Cocktail[]>([]);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setDrinks([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await searchCocktailsByName(debouncedQuery);
        setDrinks(data.drinks ?? []);
      } catch (err) {
        console.error("Search error", err);
        setDrinks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery]);

  const addToFavourites = (drink: Cocktail) => {
    if (favourites.some((f) => f.idDrink === drink.idDrink)) return;
    setFavourites((prev) => [...prev, drink]);
  };

  const removeFromFavourites = (id: string) => {
    setFavourites((prev) => prev.filter((f) => f.idDrink !== id));
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <aside className="lg:col-span-1">
        <FavouritesList
          favourites={favourites}
          onRemove={removeFromFavourites}
        />
      </aside>

      <div className="lg:col-span-3 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold">Search Cocktails</h1>
          <p className="text-gray-600">
            Type a cocktail name to search. Try <em>Margarita</em>,{" "}
            <em>Mojito</em>, or <em>Negroni</em>.
          </p>
        </header>

        <SearchInput value={query} onChange={setQuery} />

        {loading && <p className="text-gray-500">Loading...</p>}
        {!loading && debouncedQuery && drinks.length === 0 && (
          <p className="text-gray-500">
            No results for <strong>{debouncedQuery}</strong>.
          </p>
        )}

        <CocktailGrid drinks={drinks} onAdd={addToFavourites} />
      </div>
    </section>
  );
}
