import { Dispatch, SetStateAction } from 'react';
import { TooltipProps } from 'recharts';

export type PortfolioType = 'portfolio' | 'historical';
export type AssetType = 'assetClass' | 'asset';

export interface Asset {
    name: string;
    price: number;
}

export interface PortfolioDataProps {
    portfolioData: Asset[] | null
}

export interface TabsProps {
    activeTab: string;
    handlePortfolioTabClick: () => void;
    setActiveTab: Dispatch<SetStateAction<PortfolioType>>
}

export interface HeaderProps {
    userName: string
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
    testId: string;
}

export interface InputProps {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    hasError: boolean
    errorMessage: string | null;
  }

export interface CustomTooltipProps extends TooltipProps<number, string> {
  active: boolean;
  payload: { value: number }[];
  label: string;
}
