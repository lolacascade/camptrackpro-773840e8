export type SiteType = 'pull-through' | 'back-in' | 'tent-only' | 'none';
export type HookupType = 'full' | 'partial' | 'dry' | 'none';
export type SurfaceType = 'gravel' | 'concrete' | 'asphalt' | 'grass' | 'dirt' | 'none';
export type PowerOption = '20A' | '30A' | '50A' | 'none';

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
  zone?: string;
  location_identifier: string;
}