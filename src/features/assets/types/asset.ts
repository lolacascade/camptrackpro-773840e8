
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

// Add type guard for AssetStatus
export function isAssetStatus(status: string): status is AssetStatus {
  return ['available', 'occupied', 'maintenance'].includes(status);
}

// Add type guard for AssetType
export function isAssetType(type: string): type is AssetType {
  return ['class_a', 'class_b', 'class_c', 'travel_trailer', 'fifth_wheel', 'popup'].includes(type);
}

// Add type guard for AssetSize
export function isAssetSize(size: string): size is AssetSize {
  return ['small', 'medium', 'large'].includes(size);
}
