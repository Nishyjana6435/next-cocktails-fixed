"use client";

import CocktailCard, { Cocktail } from "./CocktailCard";

interface FavouritesListProps {
    favourites: Cocktail[];
    onRemove: (id: string) => void;
}

export default function FavouritesList({
    favourites,
    onRemove,
}: FavouritesListProps) {
    if (favourites.length === 0) return null;

    return (
        <section className="space-y-4">
            <h2 className="text-xl font-bold">Favourites</h2>
            <div className="grid">
                {favourites.map((f) => (
                    <CocktailCard
                        key={f.idDrink}
                        cocktail={f}
                        actionLabel="Remove"
                        actionVariant="remove"
                        onAction={() => onRemove(f.idDrink)}
                    />
                ))}
            </div>
        </section>
    );
}
