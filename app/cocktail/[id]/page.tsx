import Image from "next/image";
import Link from "next/link";
import { getCocktailById } from "@/lib/api";

function buildIngredients(drink: any) {
  const items: { name: string; measure: string | null }[] = [];
  for (let i = 1; i <= 15; i++) {
    const name = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];
    if (!name) continue;
    items.push({ name, measure: measure ?? null });
  }
  return items;
}

export default async function CocktailDetail({ params }: { params: { id: string } }) {
  const data = await getCocktailById(params.id);
  const drink = data.drinks?.[0];
  if (!drink) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Not found</h1>
        <p>We couldn’t find a cocktail with id {params.id}.</p>
        <Link className="button border" href="/">Go Home</Link>
      </div>
    );
  }

  const ingredients = buildIngredients(drink);

  return (
    <article className="grid gap-8 md:grid-cols-2">
      <div className="card overflow-hidden">
        <div className="relative aspect-square bg-gray-100">
          {drink.strDrinkThumb ? (
            <Image src={drink.strDrinkThumb} alt={drink.strDrink} fill className="object-cover" />
          ) : null}
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{drink.strDrink}</h1>
        <div className="flex gap-2 text-sm text-gray-600">
          <span className="px-2 py-1 rounded bg-gray-100">{drink.strAlcoholic ?? "—"}</span>
          <span className="px-2 py-1 rounded bg-gray-100">{drink.strCategory ?? "—"}</span>
          {drink.strGlass && <span className="px-2 py-1 rounded bg-gray-100">{drink.strGlass}</span>}
        </div>

        <section className="space-y-2">
          <h2 className="font-semibold">Ingredients</h2>
          <ul className="list-disc pl-6 space-y-1">
            {ingredients.map((i, idx) => (
              <li key={idx}><span className="font-medium">{i.name}</span>{i.measure ? ` — ${i.measure}` : ""}</li>
            ))}
          </ul>
        </section>

        {drink.strInstructions && (
          <section className="space-y-2">
            <h2 className="font-semibold">Instructions</h2>
            <p className="text-gray-700 whitespace-pre-line">{drink.strInstructions}</p>
          </section>
        )}

        <div className="pt-2">
          <Link className="button border" href="/">← Back</Link>
        </div>
      </div>
    </article>
  );
}
