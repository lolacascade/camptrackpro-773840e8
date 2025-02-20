
export interface Tables {
  organizations: {
    id: string;
    name: string;
    created_at: string;
  };
  accounts: {
    id: string;
    name: string;
    organization_id: string;
    created_at: string;
  };
  customers: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    created_at: string;
  };
  rvs: {
    id: string;
    make: string;
    model: string;
    year: number | null;
    customer_id: string | null;
    created_at: string;
  };
  sites: {
    id: string;
    name: string;
    location: string;
    created_at: string;
  };
  bookings: {
    id: string;
    customer_id: string;
    rv_id: string;
    site_id: string;
    check_in: string;
    check_out: string;
    status: 'pending' | 'confirmed' | 'checked_in' | 'completed' | 'cancelled';
    total_amount: number;
    special_requirements?: string;
    organization_id: string;
    account_id: string;
    user_id: string;
    created_at: string;
    updated_at: string;
  };
  profiles: {
    id: string;
    first_name?: string;
    last_name?: string;
    email: string;
    role: string;
    created_at: string;
  };
  maintenance_requests: {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
    priority: 'low' | 'medium' | 'high';
    site_id?: string;
    rv_id?: string;
    created_at: string;
    due_date?: string;
    completed_at?: string;
    organization_id: string;
    account_id: string;
  };
  expenses: {
    id: string;
    description: string;
    amount: number;
    category: string;
    date: string;
    status: 'pending' | 'completed' | 'cancelled';
    organization_id: string;
    account_id: string;
    created_at: string;
  };
  invoices: {
    id: string;
    booking_id?: string;
    amount: number;
    status: 'pending' | 'paid' | 'cancelled';
    type: string;
    organization_id: string;
    account_id: string;
    created_at: string;
  };
  chat_history: {
    id: string;
    user_id: string;
    message: string;
    role: 'user' | 'assistant';
    created_at: string;
    organization_id: string;
    account_id: string;
  };
  customer_notes: {
    id: string;
    customer_id: string;
    note: string;
    tag?: string;
    created_at: string;
    organization_id: string;
    account_id: string;
  };
  booking_trends_data: {
    id: string;
    month: string;
    short_term_bookings: number;
    long_term_bookings: number;
    cancellations: number;
    organization_id: string;
    account_id: string;
  };
  marina_details: {
    id: string;
    name: string;
    description?: string;
    address?: string;
    contact_email?: string;
    contact_phone?: string;
    organization_id: string;
    account_id: string;
    created_at: string;
    updated_at: string;
  };
  password_reset_attempts: {
    id: string;
    email: string;
    attempt_time: string;
    successful: boolean;
  };
}

export type TableName = keyof Tables;
