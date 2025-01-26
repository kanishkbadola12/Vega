import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { PortfolioDonutChartProps } from "../types";
import { colorPalette } from "../colorPallet";

const PortfolioDonutChart = ({ portfolioData }: PortfolioDonutChartProps) => {
  if (!portfolioData) {
    return <div>Loading...</div>;
  }

  console.log(portfolioData);
  
  const COLORS = portfolioData.map((_, index) => {
    return colorPalette[index % colorPalette.length].hexCode;
  });

  return (
    <div className="flex justify-center items-center p-4 w-full h-auto bg-gray-100">
      <div className="w-full max-w-sm">
        <ResponsiveContainer width="100%" height={400}>
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