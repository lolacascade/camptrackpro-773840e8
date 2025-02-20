
import { Asset as BaseAsset, AssetStatus, AssetType, AssetSize } from '@/types/asset';

// Extended asset type for feature-specific functionality
export interface FeatureAsset extends BaseAsset {
  updated_at?: string;
  last_maintenance_date?: string;
  next_maintenance_date?: string;
}

// Feature-specific asset form data
export interface AssetFormData {
  make: string;
  model: string;
  year: number | null;
  asset_type: AssetType;
  asset_size: AssetSize;
  status: AssetStatus;
}
