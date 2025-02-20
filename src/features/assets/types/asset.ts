
import { Asset as BaseAsset } from '@/types/asset';

export interface Asset extends BaseAsset {
  site_id: string | null;
  status: 'available' | 'occupied' | 'maintenance';
  asset_type: string;
  asset_size: string;
}
