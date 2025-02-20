
import { RV as BaseRV } from '@/types/rv';

export interface RVFormData {
  make: string;
  model: string;
  year: number | null;
  site_id?: string;
  customer_id?: string;
}

export interface FeatureRV extends BaseRV {
  updated_at?: string;
}
