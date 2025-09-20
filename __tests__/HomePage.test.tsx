import { render, screen, waitFor } from "@testing-library/react";
import HomePage from "@/app/page";
import * as api from "@/lib/api";

const mockCocktails = [
  { idDrink: "1", strDrink: "Margarita", strDrinkThumb: "url1", strCategory: "Cocktail" },
  { idDrink: "2", strDrink: "Mojito", strDrinkThumb: "url2", strCategory: "Cocktail" },
  { idDrink: "3", strDrink: "Negroni", strDrinkThumb: "url3", strCategory: "Cocktail" },
  { idDrink: "4", strDrink: "Martini", strDrinkThumb: "url4", strCategory: "Cocktail" },
  { idDrink: "5", strDrink: "Old Fashioned", strDrinkThumb: "url5", strCategory: "Cocktail" },
];

jest.spyOn(api, "getRandomCocktail").mockImplementation(async () => ({
  drinks: [mockCocktails[Math.floor(Math.random() * mockCocktails.length)]],
}));

describe("HomePage", () => {
  it("renders 5 cocktails", async () => {
    render(await HomePage());
    await waitFor(() => {
      expect(screen.getAllByRole("heading").length).toBeGreaterThanOrEqual(5);
    });
  });
});
