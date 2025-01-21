import { BaseEntity } from "./common/base";
import { PersonName } from "./common/person";

export interface Customer extends BaseEntity, PersonName {
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  lifetime_value?: number;
}