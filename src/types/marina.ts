export interface MarinaFormData {
  name: string;
  address: string;
  contact_email: string;
  contact_phone: string;
  total_slips: number | null;
  website: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  approach_info: {
    depth: string;
    obstacles: string;
    current: string;
  };
  services_amenities: {
    fuel: boolean;
    power: boolean;
    water: boolean;
    wifi: boolean;
    showers: boolean;
    laundry: boolean;
  };
  other_features: {
    restaurant: boolean;
    shop: boolean;
    repair: boolean;
    storage: boolean;
  };
  social_media: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}