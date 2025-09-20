import { render, screen, fireEvent } from "@testing-library/react";
import CocktailCard, { Cocktail } from "@/components/CocktailCard";

const mockCocktail: Cocktail = {
  idDrink: "123",
  strDrink: "Margarita",
  strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
  strCategory: "Cocktail",
};

describe("CocktailCard", () => {
  it("renders cocktail details", () => {
    render(<CocktailCard cocktail={mockCocktail} />);
    expect(screen.getByText("Margarita")).toBeInTheDocument();
    expect(screen.getByText("Cocktail")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Margarita");
  });

  it("calls onAction when button clicked", () => {
    const handleAdd = jest.fn();
    render(
      <CocktailCard
        cocktail={mockCocktail}
        actionLabel="Add"
        onAction={handleAdd}
      />
    );
    fireEvent.click(screen.getByText("Add"));
    expect(handleAdd).toHaveBeenCalledWith(mockCocktail);
  });
});
