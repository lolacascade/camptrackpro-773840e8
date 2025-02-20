
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
    status: 'available' | 'occupied' | 'maintenance';
    asset_type: 'class_a' | 'class_b' | 'class_c' | 'travel_trailer' | 'fifth_wheel' | 'popup';
    asset_size: 'small' | 'medium' | 'large';
    organization_id: string;
    account_id: string;
    created_at: string;
  };
  sites: {
    id: string;
    name: string;
    location: string;
    status: 'available' | 'occupied' | 'maintenance';
    length_ft: number | null;
    width_ft: number | null;
    has_water: boolean;
    electricity_voltage: number | null;
    is_covered: boolean;
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
  user_accounts: {
    user_id: string;
    account_id: string;
    role: string;
  };
  user_organizations: {
    user_id: string;
    organization_id: string;
    role: string;
  };
  marina_details: {
    id: string;
    name: string;
    address: string;
    contact_email: string;
    contact_phone: string;
    website: string | null;
    total_slips: number;
    organization_id: string;
    account_id: string;
    created_at: string;
  };
};
