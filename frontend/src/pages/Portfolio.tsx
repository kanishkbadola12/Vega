import type React from "react";
import { useEffect, useState } from "react";
import PortfolioDonutChart from "../components/PortfolioDonutChart";
import PositionsTable from "../components/PositionsTable";
import HistoricalChart from "../components/HistoricalChart";
import { useFetch } from "../hooks/useFetch";
import { Asset } from "../types";

const Portfolio: React.FC = () => {
  const [view, setView] = useState<"assetClass" | "asset">("assetClass");
  const [activeTab, setActiveTab] = useState<"portfolio" | "historical">("portfolio");
  const [portfolioData, setPortfolioData] = useState<Asset[] | null>([])

  const { data, loading, error } = useFetch<Asset[]>(`http://localhost:3000/assets?view=${view}`);
  
  useEffect(() => {
    setPortfolioData(data);
  }, [data]);
  
  if(loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8 bg-white text-black">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-black">Financial Portfolio</h1>
      </div>
      <div className="mb-6">
        <div className="flex border-b border-gray-300">
          <button
            className={`py-2 px-4 ${
              activeTab === "portfolio"
                ? "border-b-2 border-black-500 font-medium"
                : "text-gray-600 hover:text-black"
            }`}
            onClick={() => setActiveTab("portfolio")}
          >
            Portfolio
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "historical"
                ? "border-b-2 border-black-500 font-medium"
                : "text-gray-600 hover:text-black"
            }`}
            onClick={() => setActiveTab("historical")}
          >
            Historical
          </button>
        </div>
      </div>
      {activeTab === "portfolio" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-black">Portfolio Balance</h2>
            <div className="flex space-x-2 mb-4">
              <button
                onClick={() => setView("assetClass")}
                className={`px-3 py-1 rounded ${
                  view === "assetClass"
                    ? "bg-black text-white "
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                By Asset Class
              </button>
              <button
                onClick={() => setView("asset")}
                className={`px-3 py-1 rounded ${
                  view === "asset"
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                By Asset
              </button>
            </div>
            <PortfolioDonutChart portfolioData={portfolioData} />
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-black">Positions</h2>
            <PositionsTable />
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-black">Historical Performance</h2>
          <HistoricalChart />
        </div>
      )}
    </div>
  );
};

export default Portfolio;
