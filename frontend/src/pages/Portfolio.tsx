import type React from "react"
import { useState } from "react"
import { useTheme } from "../hooks/useTheme"
import ThemeToggle from "../components/ThemeToggle"
import PortfolioDonutChart from "../components/PortfolioDonutChart"
import PositionsTable from "../components/PositionsTable"
import HistoricalChart from "../components/HistoricalChart"

const Portfolio: React.FC = () => {
  const [view, setView] = useState<"assetClass" | "asset">("assetClass")
  const [activeTab, setActiveTab] = useState<"portfolio" | "historical">("portfolio")
  const { theme } = useTheme()

  return (
    <div className={`container mx-auto px-4 py-8 ${theme}`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-text">Financial Portfolio</h1>
        <ThemeToggle />
      </div>
      <div className="mb-6">
        <div className="flex border-b border-text-secondary">
          <button
            className={`py-2 px-4 ${
              activeTab === "portfolio"
                ? "border-b-2 border-primary font-medium"
                : "text-text-secondary hover:text-text"
            }`}
            onClick={() => setActiveTab("portfolio")}
          >
            Portfolio
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "historical"
                ? "border-b-2 border-primary font-medium"
                : "text-text-secondary hover:text-text"
            }`}
            onClick={() => setActiveTab("historical")}
          >
            Historical
          </button>
        </div>
      </div>
      {activeTab === "portfolio" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-background-secondary p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-text">Portfolio Balance</h2>
            <div className="flex space-x-2 mb-4">
              <button
                onClick={() => setView("assetClass")}
                className={`px-3 py-1 rounded ${
                  view === "assetClass"
                    ? "bg-primary text-background"
                    : "bg-background text-text hover:bg-background-secondary"
                }`}
              >
                By Asset Class
              </button>
              <button
                onClick={() => setView("asset")}
                className={`px-3 py-1 rounded ${
                  view === "asset"
                    ? "bg-primary text-background"
                    : "bg-background text-text hover:bg-background-secondary"
                }`}
              >
                By Asset
              </button>
            </div>
            <PortfolioDonutChart />
          </div>
          <div className="bg-background-secondary p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-text">Positions</h2>
            <PositionsTable />
          </div>
        </div>
      ) : (
        <div className="bg-background-secondary p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-text">Historical Performance</h2>
          <HistoricalChart />
        </div>
      )}
    </div>
  )
}

export default Portfolio

