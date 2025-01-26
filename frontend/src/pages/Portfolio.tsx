import type React from "react";
import { useEffect, useState } from "react";
import PortfolioDonutChart from "../components/PortfolioDonutChart";
import HistoricalChart from "../components/HistoricalChart";
import { useFetch } from "../hooks/useFetch";
import { Asset } from "../types";
import ToggleView from "../components/ui/ToggleView";
import PositionsTable from "../components/PositionsTable";
import Button from "../components/ui/Button";

type Portfolio = "portfolio" | "historical";
type AssetType = "assetClass" | "asset";

const Portfolio = (): React.ReactElement => {
  const [asset, setAsset] = useState<AssetType>("assetClass");
  const [activeTab, setActiveTab] = useState<Portfolio>("portfolio");
  const [portfolioView, setPortfolioView] = useState<string>('chart');
  const [portfolioData, setPortfolioData] = useState<Asset[] | null>([])

  const { data, loading, error } = useFetch<Asset[]>(`http://localhost:3000/assets?view=${asset}`);

  const handleTogglePortfolioView = (): void => {
    setPortfolioView(prevView => prevView === 'chart' ? 'table' : 'chart');
  }

  useEffect(() => {
    setPortfolioData(data);
  }, [data]);
  
  if(loading) return <div>Loading...</div>;
  if(error) return <div>Error</div>;

  return (
    <div className="container mx-auto px-4 py-8 bg-white text-black">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-black">Financial Portfolio</h1>
      </div>
      <div className="mb-6">
        <div className="flex border-b border-gray-300">
          <Button
            label="Portfolio"
            onClick={() => setActiveTab("portfolio")}
            activeCondition={activeTab === "portfolio"}
            styleClass="py-2 px-4"
            activeClass="border-b-2 border-black-500 font-medium"
            inactiveClass="text-gray-600 hover:text-black"
          />
          <Button
            label="Historical"
            onClick={() => setActiveTab("historical")}
            activeCondition={activeTab === "historical"}
            styleClass="py-2 px-4"
            activeClass="border-b-2 border-black-500 font-medium"
            inactiveClass="text-gray-600 hover:text-black"
          />
        </div>
      </div>
      {activeTab === "portfolio" ? (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-semibold mb-4 text-black">Portfolio Balance</h2>
              <ToggleView portfolioView={portfolioView} handleTogglePortfolioView={handleTogglePortfolioView} />
            </div>
            {portfolioView === "chart" ? (
              <>
                <div className="flex space-x-2 mb-4">
                  <Button
                    label="By Asset Class"
                    onClick={() => setAsset("assetClass")}
                    activeCondition={asset === "assetClass"}
                    styleClass="px-3 py-1 rounded font-semibold"
                    activeClass="bg-black text-white"
                    inactiveClass="bg-white text-black hover:bg-gray-100"
                  />
                  <Button
                    label="By Asset"
                    onClick={() => setAsset("asset")}
                    activeCondition={asset === "asset"}
                    styleClass="px-3 py-1 rounded font-semibold"
                    activeClass="bg-black text-white"
                    inactiveClass="bg-white text-black hover:bg-gray-100"
                  />
                </div>
                <PortfolioDonutChart portfolioData={portfolioData} />
              </>
            ) : (
              <PositionsTable portfolioData={portfolioData} />
            )}
          </div>
        </div>
      ) : (
        <HistoricalChart />
      )}
    </div>
  );
};

export default Portfolio;