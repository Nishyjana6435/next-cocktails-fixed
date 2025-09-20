"use client";

import Image from "next/image";

export type Cocktail = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strCategory?: string | null;
};

interface CocktailCardProps {
  cocktail: Cocktail;
  actionLabel?: string; // optional
  onAction?: (c: Cocktail) => void; // optional
  actionVariant?: "add" | "remove";
}

export default function CocktailCard({
  cocktail,
  actionLabel,
  onAction,
  actionVariant = "add",
}: CocktailCardProps) {
  return (
    <div className="card flex flex-col items-center text-center p-3 w-full">
      <div className="relative w-full aspect-square mb-3">
        {cocktail.strDrinkThumb && (
          <Image
            src={cocktail.strDrinkThumb}
            alt={cocktail.strDrink}
            fill
            className="object-cover rounded-lg"
          />
        )}
      </div>

      <h3 className="font-semibold text-sm line-clamp-2">{cocktail.strDrink}</h3>
      <p className="text-xs text-gray-500 mb-2">
        {cocktail.strCategory ?? "—"}
      </p>

      {actionLabel && onAction && (
        <button
          onClick={() => onAction(cocktail)}
          className={`button border text-xs ${actionVariant === "remove"
              ? "bg-red-50 text-red-600"
              : "bg-white text-gray-800"
            }`}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
