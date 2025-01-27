import React, { useState, useEffect } from "react";
import PortfolioDonutChart from "../components/PortfolioDonutChart";
import HistoricalChart from "../components/HistoricalChart";
import { useFetch } from "../hooks/useFetch";
import { Asset } from "../types";
import ToggleView from "../components/layout/ToggleView";
import PositionsTable from "../components/PositionsTable";
import Button from "../components/ui/Button";
import Header from "../components/layout/Header";
import LoadingSpinner from "../components/layout/LoadingSpinner";
import Tabs from "../components/layout/Tabs";
import Error from "../components/layout/Error";

type Portfolio = 'portfolio' | 'historical';
type AssetType = 'assetClass' | 'asset';

const Portfolio = (): React.ReactElement => {
  const [asset, setAsset] = useState<AssetType>('assetClass');
  const [activeTab, setActiveTab] = useState<Portfolio>('portfolio');
  const [portfolioView, setPortfolioView] = useState<string>('chart');
  const [portfolioData, setPortfolioData] = useState<Asset[] | null>([]);
  const [userName, setUserName] = useState<string>('');
  const { data, loading, error } = useFetch<Asset[]>(`http://localhost:3000/assets?view=${asset}`);

  const handleTogglePortfolioView = (): void => {
    setPortfolioView(prevView => prevView === 'chart' ? 'table' : 'chart');
  };

  // Reset to original view when coming back to the Portolio tab
  const handlePortfolioTabClick = (): void => {
    setActiveTab("portfolio"); 
    setPortfolioView('chart'); 
    setAsset('assetClass');
  };

  // Set Portfolio data as per class or a certain asset
  useEffect(() => {
    setPortfolioData(data);
  }, [data]);
  
  useEffect(() => {
    const storedCredentials = localStorage.getItem("loginCredentials");
    
    if (storedCredentials) {
      const { fullName } = JSON.parse(storedCredentials);
      setUserName(fullName.split(" ")[0] || "Guest");
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 bg-white text-black">
      <Header userName={userName} />
      <div className="mb-6">
        <div className="flex border-b border-gray-300">
          <Tabs handlePortfolioTabClick={handlePortfolioTabClick} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
      {activeTab === "portfolio" ? (
        <>
          {/* Handle the error state: if an error occurs during data fetching, display an error message or component. */}
          {error ? (
            <Error />
          ) : (
            // Display a loading spinner while the data is being fetched. Once loading is complete, render the main content.
            loading ? <LoadingSpinner /> : (
              <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                  <div className="flex justify-between mb-4">
                    <h2 className="text-2xl font-semibold mb-4 text-black">Portfolio Balance</h2>
                    <ToggleView portfolioView={portfolioView} handleTogglePortfolioView={handleTogglePortfolioView} />
                  </div>
                  {portfolioView === "chart" ? (
                    <>
                      <div className="flex flex-col gap-4 items-center sm:flex-row space-x-2 mb-4">
                        <Button
                          label="By Asset Class"
                          onClick={() => setAsset("assetClass")}
                          activeCondition={asset === "assetClass"}
                          styleClass="w-[50%] sm:w-auto px-3 py-1 rounded font-semibold"
                          activeClass="bg-black text-white"
                          inactiveClass="bg-white text-black hover:bg-gray-100"
                          testId="asset-button"
                        />
                        <Button
                          label="By Asset"
                          onClick={() => setAsset("asset")}
                          activeCondition={asset === "asset"}
                          styleClass="w-[50%] sm:w-auto px-3 py-1 rounded font-semibold"
                          activeClass="bg-black text-white"
                          inactiveClass="bg-white text-black hover:bg-gray-100"
                          testId="asset-class-button"
                        />
                      </div>
                      <PortfolioDonutChart portfolioData={portfolioData} />
                    </>
                  ) : (
                    <PositionsTable portfolioData={portfolioData} />
                  )}
                </div>
              </div>
            )
          )}
        </>
      ): <HistoricalChart />}
    </div>
  );
};

export default Portfolio;