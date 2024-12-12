export type Invoice = {
  id: number;
  customer_id?: number | null;
  amount: number;
  status: string;
  issued_date: string;
  due_date: string;
  slot_id?: number | null;
  created_at?: string | null;
  user_id?: string | null;
  booking_id?: number | null;
};

export type StripeCheckoutSession = {
  id?: string | null;
  customer?: string | null;
  payment_intent?: string | null;
  subscription?: string | null;
  attrs?: any | null;
};