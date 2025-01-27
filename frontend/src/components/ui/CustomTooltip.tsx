import { CustomTooltipProps } from "../../types";
import { formatDate, formatNumber } from "../../utils/formatters";

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      console.log(payload);
      return (
            <div className="border-0 bg-gray-100 rounded-lg shadow-md">
                <p className="p-4 text-sm text-gray-700 font-semibold">{`${formatDate(label)}: ${formatNumber(payload[0].value)}`}</p>
            </div>
        );
    }

    return null;
}

export default CustomTooltip;