export interface IDownloadBoxProps {
    onClose?: () => void
    onFilterChange?: (filters: any) => void
}

export interface IFilterBoxProps {
    label?: string;
    type: 'tier3' | 'merchant' | 'suspend';
    onClose?: () => void;
    onFilterChange?: (filters: any) => void
    options?: string[];
}

export interface MonthFilterProps {
  onMonthSelect?: (month: string) => void;
  onClearMonth?: () => void;
}