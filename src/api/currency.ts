
export interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number; // Exchange rate relative to base currency (USD)
}

// Mock currency data
const mockCurrencies: Currency[] = [
  { code: 'RUB', name: 'Российский рубль', symbol: '₽', rate: 95.5 },
  { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1 },
  { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.92 },
  { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.79 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', rate: 7.25 },
];

// Mock payment methods
export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const mockPaymentMethods: PaymentMethod[] = [
  { 
    id: 'card', 
    name: 'Credit/Debit Card', 
    description: 'Pay with Visa, Mastercard, or other cards', 
    icon: 'credit-card' 
  },
  { 
    id: 'paypal', 
    name: 'PayPal', 
    description: 'Pay with your PayPal account', 
    icon: 'paypal' 
  },
  { 
    id: 'bank', 
    name: 'Bank Transfer', 
    description: 'Direct transfer from your bank account', 
    icon: 'bank' 
  },
  { 
    id: 'crypto', 
    name: 'Cryptocurrency', 
    description: 'Pay with Bitcoin, Ethereum, or other cryptocurrencies', 
    icon: 'bitcoin' 
  },
];

// Get all available currencies
export const getCurrency = async (): Promise<Currency[]> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  return mockCurrencies;
};

// Convert price between currencies
export const convertPrice = (price: number, fromCurrency: Currency, toCurrency: Currency): number => {
  const valueInUSD = price / fromCurrency.rate;
  return valueInUSD * toCurrency.rate;
};

// Format price with currency symbol
export const formatPrice = (price: number, currency: Currency): string => {
  return `${currency.symbol}${price.toFixed(2)}`;
};

// Get all payment methods
export const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  return mockPaymentMethods;
};
