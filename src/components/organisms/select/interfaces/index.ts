export interface IFilterFieldProps {
    label: string;
    name?: string;
    type: 'select' | 'date' | 'number';
    placeholder: string;
    options?: Array<{ label: string; value: string }>;
    bg?:string;
    disabled?: boolean;
    value?: string;
    errorMessage?: string
}

export interface IBankSelectorProps {
    accountNumber: string;
    bankCode?: string; 
    bankName?: string;
  onBankSelect: (bankDetails: {
    bankName: string;
    bankCode: string;
    accountName: string;
    bankLogo: string;
  }) => void;
}

export interface SelectFieldProps {
  value: string | null;
  options: { value: string; label: string }[];
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};