export interface Asset {
    asset: string;
    price: number;
}

export interface PortfolioDonutChartProps {
    portfolioData: Asset[] | null
}