import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import Portfolio from "./Portfolio"
import { useFetch } from "../hooks/useFetch"

jest.mock("../hooks/useFetch")
jest.mock("../components/PortfolioDonutChart", () => () => (
  <div data-testid="portfolio-donut-chart">Mocked Donut Chart</div>
))
jest.mock("../components/HistoricalChart", () => () => (
  <div data-testid="historical-chart">Mocked Historical Chart</div>
))
jest.mock("../components/PositionsTable", () => () => <div data-testid="positions-table">Mocked Positions Table</div>)

describe("Portfolio Component", () => {
  const mockPortfolioData = [
    { id: 1, name: "Asset 1", price: 1000 },
    { id: 2, name: "Asset 2", price: 2000 },
  ]

  beforeEach(() => {
    (useFetch as jest.Mock).mockReturnValue({
      data: mockPortfolioData,
      loading: false,
      error: null,
    })
  })

  test("renders portfolio view by default", async () => {
    render(<Portfolio />)

    expect(screen.getByText("Financial Portfolio")).toBeInTheDocument()
    expect(screen.getByText("Portfolio Balance")).toBeInTheDocument()
    expect(screen.getByTestId("portfolio-donut-chart")).toBeInTheDocument()
  })

  test("switches to historical view when Historical tab is clicked", async () => {
    render(<Portfolio />)

    fireEvent.click(screen.getByText("Historical"))

    expect(screen.getByTestId("historical-chart")).toBeInTheDocument()
  })

  test("toggles between chart and table view", async () => {
    render(<Portfolio />)

    const toggleViewButton = screen.getByTestId("toggle-view");

    expect(screen.getByTestId("portfolio-donut-chart")).toBeInTheDocument()

    fireEvent.click(toggleViewButton)
    expect(screen.getByTestId("positions-table")).toBeInTheDocument()

    fireEvent.click(toggleViewButton)
    expect(screen.getByTestId("portfolio-donut-chart")).toBeInTheDocument()
  })

  test("switches between asset class and asset views", async () => {
    render(<Portfolio />)

    const assetClassButton = screen.getByTestId("asset-class-button");
    const assetButton = screen.getByTestId("asset-button");

    expect(assetClassButton).toHaveClass("text-black");
    expect(assetButton).toHaveClass("text-white");

    fireEvent.click(assetButton);

    expect(assetButton).toHaveClass("text-white");
    expect(assetClassButton).toHaveClass("text-black");
  })

  test("displays loading state", async () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    })

    render(<Portfolio />)

    expect(screen.getByText("Loading...")).toBeInTheDocument()
  })

  test("displays error state", async () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: "An error occurred",
    })

    render(<Portfolio />)

    expect(screen.getByText("Error")).toBeInTheDocument()
  })

  test("resets to chart view and asset class when switching back to Portfolio tab", async () => {
    render(<Portfolio />)

    fireEvent.click(screen.getByText("Historical"))
    expect(screen.getByTestId("historical-chart")).toBeInTheDocument()

    fireEvent.click(screen.getByText("Portfolio"))

    expect(screen.getByTestId("portfolio-donut-chart")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /by asset class/i })).toHaveClass("bg-black")
  })
})