
import { Asset as BaseAsset } from '@/types/asset';

// Feature-specific asset form data
export interface AssetFormData {
  make: string;
  model: string;
  year: number | null;
  site_id?: string;
}

// Extended asset type for feature-specific functionality
export interface FeatureAsset extends BaseAsset {
  updated_at?: string;
}
