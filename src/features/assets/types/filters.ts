
import { AssetFilters as BaseAssetFilters } from '@/types/asset';

// Extended filters for feature-specific functionality
export interface FeatureAssetFilters extends BaseAssetFilters {
  maintenanceDate?: Date | null;
  availability?: boolean;
}
