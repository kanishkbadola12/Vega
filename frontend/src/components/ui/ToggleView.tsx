import { ToggleViewProps } from "../../types";

const ToggleView = ({ portfolioView, handleTogglePortfolioView } : ToggleViewProps) => {
    return (
      <div className="flex items-center">
        <label htmlFor="toggle" className="relative inline-block w-12 h-6">
          <input
            id="toggle"
            type="checkbox"
            className="sr-only peer"
            onChange={handleTogglePortfolioView}
            value={portfolioView}
          />
          <span className="block w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-black"></span>
          <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition-transform"></span>
        </label>
        <span className="ml-2">Enable Table View</span>
      </div>
    );
};
  
export default ToggleView;