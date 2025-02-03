export interface MarinaFormData {
  name: string;
  address: string;
  contact_email: string;
  contact_phone: string;
  total_slips: number;
  website: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  approach_info: {
    depth: string;
    width: string;
    obstacles: string;
  };
  services_amenities: {
    fuel: boolean;
    electricity: boolean;
    water: boolean;
    pumpout: boolean;
    maintenance: boolean;
  };
  other_features: {
    restrooms: boolean;
    showers: boolean;
    laundry: boolean;
    parking: boolean;
    wifi: boolean;
  };
  social_media: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

export interface MarinaFormProps {
  initialData?: Partial<MarinaFormData>;
  onSuccess?: () => void;
}