export interface AfroPay {
  publicKey: string;
  email?: string;
  amount: number;
  currency: string;
  description?: string;
  metadata?: {
    donationId: string;
    donorName?: string;
  };
  ref?: string;
  onClose?: () => void;
  onSuccess?: (reference: string) => void;
}

export const initializeAfroPay = (config: AfroPay) => {
  if (typeof window === "undefined") return;

  // In a real integration, you would:
  // 1. Call your backend API to create a payment reference
  // 2. Initialize AfroPay Checkout with the returned reference
  // 3. Handle the callback

  const handleAfroPay = () => {
    // Placeholder for actual AfroPay integration
    console.log("AfroPay would be initialized here", config);
    // window.AfroPay?.initialize?.(config);
  };

  return handleAfroPay;
};

export const generatePaymentReference = () => {
  return `AP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};
