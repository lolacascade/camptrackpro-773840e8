export type SiteType = 'pull-through' | 'back-in' | 'tent-only' | null;
export type HookupType = 'full' | 'partial' | 'dry' | null;
export type SurfaceType = 'gravel' | 'concrete' | 'asphalt' | 'grass' | 'dirt' | null;
export type PowerOption = '20A' | '30A' | '50A' | null;

export interface DistanceToFacilities {
  restrooms?: number;
  showers?: number;
  dumpStation?: number;
  picnicArea?: number;
}

export interface MaxCapacity {
  people: number;
  vehicles: number;
  weight?: number;
}

export interface Pricing {
  nightly: number;
  weekly: number;
  monthly: number;
  trimester?: number;
  semester?: number;
  annual?: number;
}

export interface SpecialFeatures {
  petFriendly: boolean;
  shade: boolean;
  firePit: boolean;
  picnicTable: boolean;
  wifi: boolean;
}

export interface SiteFormData {
  name: string;
  site_type: SiteType;
  length_ft: number;
  width_ft: number;
  hookup_type: HookupType;
  electricity_voltage: PowerOption;
  surface_type: SurfaceType;
  distance_to_facilities: DistanceToFacilities;
  max_capacity: MaxCapacity;
  status: string;
  special_features: SpecialFeatures;
  pricing: Pricing;
  photos: string[];
  notes: string;
  location_identifier: string;
}

export const SITE_TYPE_OPTIONS = [
  { value: '', label: 'No Selection' },
  { value: 'pull-through', label: 'Pull-through' },
  { value: 'back-in', label: 'Back-in' },
  { value: 'tent-only', label: 'Tent-only' }
];

export const HOOKUP_TYPE_OPTIONS = [
  { value: '', label: 'No Selection' },
  { value: 'full', label: 'Full Hookup' },
  { value: 'partial', label: 'Partial Hookup' },
  { value: 'dry', label: 'No Hookup' }
];

export const POWER_OPTIONS = [
  { value: '', label: 'No Selection' },
  { value: '30A', label: '30 AMP' },
  { value: '50A', label: '50 AMP' },
  { value: '20A', label: '20 AMP' }
];

export const SURFACE_TYPE_OPTIONS = [
  { value: '', label: 'No Selection' },
  { value: 'concrete', label: 'Concrete' },
  { value: 'gravel', label: 'Gravel' },
  { value: 'grass', label: 'Grass' },
  { value: 'dirt', label: 'Dirt' },
  { value: 'asphalt', label: 'Asphalt' }
];