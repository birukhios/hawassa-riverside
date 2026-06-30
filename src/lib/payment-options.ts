// Payment options for the AfroPay-style checkout.

export interface Brand {
  id: string;
  name: string;
  // styled wordmark used as a fallback until the real logo image is added
  label: string;
  color: string;
  // optional brand logo image in /public/logos
  logo?: string;
}

// Local mobile-money wallets
export const WALLETS: Brand[] = [
  {
    id: "telebirr",
    name: "telebirr",
    label: "telebirr",
    color: "#00aceb",
    logo: "/logos/telebirr.png",
  },
  {
    id: "cbe-birr",
    name: "CBE Birr",
    label: "CBE Birr",
    color: "#7a1f5c",
    logo: "/logos/cbe-birr.svg",
  },
  {
    id: "mpesa",
    name: "M-PESA",
    label: "M-PESA",
    color: "#15a800",
    logo: "/logos/mpesa.png",
  },
  {
    id: "awash",
    name: "Awash BIRR",
    label: "Awash BIRR",
    color: "#e8762b",
    logo: "/logos/awash.jpeg",
  },
];

// Ethiopian banks for direct bank payment
export const BANKS = [
  "Commercial Bank of Ethiopia (CBE)",
  "Awash Bank",
  "Dashen Bank",
  "Bank of Abyssinia",
  "Cooperative Bank of Oromia",
  "Wegagen Bank",
  "Hibret Bank (United)",
  "Nib International Bank",
  "Zemen Bank",
  "Abay Bank",
  "Oromia International Bank",
  "Berhan Bank",
];

// Currencies for international donors ("any currency")
export const CURRENCIES = [
  { code: "ETB", symbol: "Br", name: "Ethiopian Birr" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
  { code: "SAR", symbol: "﷼", name: "Saudi Riyal" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
];
