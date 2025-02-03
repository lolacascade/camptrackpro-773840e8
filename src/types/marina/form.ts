import { MarinaFormData } from '@/types/marina';

export interface UseMarinaFormProps {
  initialData?: Partial<MarinaFormData>;
  onSuccess?: () => void;
}

export interface InputChangeEvent {
  target: {
    name: string;
    value: string | number | boolean;
    type?: string;
  };
}

export const defaultMarinaFormData: MarinaFormData = {
  name: '',
  address: '',
  contact_email: '',
  contact_phone: '',
  total_slips: 0,
  website: '',
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
  approach_info: {
    depth: '',
    width: '',
    obstacles: '',
  },
  services_amenities: {
    fuel: false,
    electricity: false,
    water: false,
    pumpout: false,
    maintenance: false,
  },
  other_features: {
    restrooms: false,
    showers: false,
    laundry: false,
    parking: false,
    wifi: false,
  },
  social_media: {
    facebook: '',
    instagram: '',
    twitter: '',
  },
};