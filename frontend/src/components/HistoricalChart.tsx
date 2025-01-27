import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useFetch } from "../hooks/useFetch";
import CustomTooltip from "./ui/CustomTooltip";
import { formatNumber } from "../utils/formatters";

const HistoricalChart = (): React.ReactElement => {
  const { data, loading, error } = useFetch<any>(`http://localhost:3000/portfolios`);

  console.log(data);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-black">Historical Performance</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 30,
            right: 30,
            left: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="date" stroke="#000" />
          <YAxis stroke="#000" tickFormatter={formatNumber} padding={{bottom: 30}} />
          <Tooltip
            content={<CustomTooltip active={false} payload={[]} label={""} />}
          />
          <Legend
            formatter={() => {
              return <span style={{ color: "#000000" }}>Valuation</span>
            }}
          />
          <Line type="monotone" dataKey="totalPrice" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default HistoricalChart