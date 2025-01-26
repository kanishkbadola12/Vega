export interface Asset {
    name: string;
    price: number;
}

export interface PortfolioDataProps {
    portfolioData: Asset[] | null
}

export interface ToggleViewProps {
    portfolioView: string;
    handleTogglePortfolioView: () => void
}

export interface ButtonProps {
    label: string;
    onClick: () => void;
    activeCondition: boolean;
    activeClass: string;
    inactiveClass: string;
    styleClass: string;
}