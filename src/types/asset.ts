import { BaseEntity } from "./common/base";
import { PersonName } from "./common/person";
import { Slot } from "./slot";

export interface Asset extends BaseEntity {
  asset_name: string | null;
  asset_size: string | null;
  asset_type: string | null;
  customer_id: string | null;
  slip_id: number | null;
  name: string;
  type: string;
  status: string;
  daily_rate: number;
  customers?: (PersonName & { id: string }) | null;
  slots?: Slot | null;
}