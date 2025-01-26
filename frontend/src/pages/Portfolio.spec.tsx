import { render, screen } from "@testing-library/react";
import Portfolio from "./Portfolio";

describe("Portfolio", () => {
  test("renders heading", async () => {
    render(<Portfolio />);
    expect(screen.getByRole("heading", { name: "Users" })).toBeInTheDocument();
  });

  test("renders a list of users", async () => {
    render(<Portfolio />);
    const users = await screen.findAllByRole("listitem");
    expect(users).toHaveLength(2);
  });
});