import { ToggleViewProps } from "../../types";

const ToggleView = ({ 
    portfolioView,
    handleTogglePortfolioView 
  }: ToggleViewProps): React.ReactElement => {
    return (
      <div className="flex items-center">
        <label htmlFor="toggle" className="relative inline-block w-12 h-6">
          <input
            id="toggle"
            type="checkbox"
            className="sr-only peer"
            onChange={handleTogglePortfolioView}
            value={portfolioView}
            data-testid="toggle-view"
          />
        <span className="block w-12 h-6 bg-gray-300 rounded-full transition-colors duration-300 peer-checked:bg-black"></span>
        <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6"></span>
        </label>
        <span className="ml-2 font-semibold">Table View</span>
      </div>
    );
};
  
export default ToggleView;