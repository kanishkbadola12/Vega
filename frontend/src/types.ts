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
    onClick: (e: React.MouseEvent) => void;
    styleClass: string;
    activeCondition?: boolean;
    activeClass?: string;
    inactiveClass?: string;
}