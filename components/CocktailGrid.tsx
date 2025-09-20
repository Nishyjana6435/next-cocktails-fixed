"use client";

import CocktailCard, { Cocktail } from "./CocktailCard";

interface CocktailGridProps {
  drinks: Cocktail[];
  onAdd?: (c: Cocktail) => void;
}

export default function CocktailGrid({ drinks, onAdd }: CocktailGridProps) {
  if (!drinks.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {drinks.map((c) => (
        <CocktailCard
          key={c.idDrink}
          cocktail={c}
          actionLabel={onAdd ? "Add" : undefined}
          actionVariant="add"
          onAction={onAdd}
        />
      ))}
    </div>
  );
}
