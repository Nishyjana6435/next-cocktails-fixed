const BASE = process.env.NEXT_PUBLIC_COCKTAIL_API_BASE ?? "https://www.thecocktaildb.com/api/json/v1/1";

export type Drink = Record<string, any>;

async function getJSON<T>(path: string): Promise<T> {
  const url = `${BASE}${path}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`API error ${res.status}: ${url}`);
  return res.json() as Promise<T>;
}

export async function getRandomCocktail() {
  return getJSON<{ drinks: Drink[] }>("/random.php");
}

export async function getCocktailById(id: string) {
  return getJSON<{ drinks: Drink[] }>(`/lookup.php?i=${encodeURIComponent(id)}`);
}

export async function searchCocktailsByName(q: string) {
  return getJSON<{ drinks: Drink[] | null }>(`/search.php?s=${encodeURIComponent(q)}`);
}
