
export type Tables = {
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
    email: string | null;
    phone: string | null;
    organization_id: string;
    account_id: string;
    created_at: string;
  };
  rvs: {
    id: string;
    make: string;
    model: string;
    year: number | null;
    customer_id: string | null;
    site_id: string | null;
    organization_id: string;
    account_id: string;
    created_at: string;
  };
  sites: {
    id: string;
    name: string;
    location: string;
    organization_id: string;
    account_id: string;
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
    special_requirements: string | null;
    organization_id: string;
    account_id: string;
    created_at: string;
  };
};
