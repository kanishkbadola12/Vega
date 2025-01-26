import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { PortfolioDataProps } from "../types";
import { colorPalette } from "../colorPallet";

const PortfolioDonutChart = ({ portfolioData }: PortfolioDataProps) => {
  if (!portfolioData) {
    return <div>Loading...</div>;
  }
  
  const COLORS = portfolioData.map((_, index) => {
    return colorPalette[index % colorPalette.length].hexCode;
  });

  return (
    <div className="flex flex-col items-center p-4 w-full h-auto bg-gray-100">
      <div className="w-full">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={portfolioData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="price"
            >
              {portfolioData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                color: "#000000",
              }}
            />
            <Legend
              formatter={(value) => {
                return <span style={{ color: "#000000" }}>{value}</span>
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
    
  )
}

export default PortfolioDonutChart