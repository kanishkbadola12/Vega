import { Asset, PortfolioDataProps } from "../types"

const PositionsTable = ({ portfolioData }: PortfolioDataProps) => {
  const assetHeading = portfolioData && 
    portfolioData.some((asset: Asset) => asset.name.toLowerCase() === 'stock') 
    ? 'Asset Class' : 'Asset Name';

  return (
    <div className="flex flex-col p-4 w-full justify-center h-auto bg-gray-100">
      <div className="w-[70%] mx-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="py-3 px-4 text-md font-semibold text-gray-700">{assetHeading}</th>
              <th className="py-3 px-4 text-md font-semibold text-gray-700">Price</th>
            </tr>
          </thead>
          <tbody>
            {portfolioData?.map((asset) => (
              <tr key={asset.name} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4 text-md text-gray-800">{asset.name}</td>
                <td className="py-3 px-4 text-md text-gray-800">
                  {asset.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PositionsTable