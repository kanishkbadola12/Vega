import { TabsProps } from "../../types"
import Button from "../ui/Button"

const Tabs = ({
    handlePortfolioTabClick,
    activeTab,
    setActiveTab
}: TabsProps): React.ReactElement => {
  return (
    <div className="flex border-b border-gray-300">
        <Button
            label="Portfolio"
            onClick={handlePortfolioTabClick}
            activeCondition={activeTab === "portfolio"}
            styleClass="py-2 px-4"
            activeClass="border-b-2 border-black-500 font-medium"
            inactiveClass="text-gray-600 hover:text-black"
            testId="portfolio-button"
        />
        <Button
            label="Historical"
            onClick={() => setActiveTab("historical")}
            activeCondition={activeTab === "historical"}
            styleClass="py-2 px-4"
            activeClass="border-b-2 border-black-500 font-medium"
            inactiveClass="text-gray-600 hover:text-black"
            testId="historical-button"
        />
    </div>
  )
}

export default Tabs