
import { GenericSchema } from "./database/tables";

export type Database = GenericSchema;

export type Tables<T extends keyof Database["Tables"]> = Database["Tables"][T]["Row"];
export type Enums<T extends keyof Database["Enums"]> = Database["Enums"][T];
export type TablesInsert<T extends keyof Database["Tables"]> = Database["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof Database["Tables"]> = Database["Tables"][T]["Update"];
