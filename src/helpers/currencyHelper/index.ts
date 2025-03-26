import { currencyFormat } from 'simple-currency-format';

export const formatToNaira = (value: string | number): string => {
    const numericValue = typeof value === 'string' ? Number(value) : value;

    if (isNaN(numericValue)) {
        return '0';
    }
    
    return currencyFormat(numericValue, 'en-US', 'NGN');
};
