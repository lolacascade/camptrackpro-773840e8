import { z } from "zod";

export const dockSpotFormSchema = z.object({
  name: z.string().min(2, {
    message: "Spot name must be at least 2 characters.",
  }),
  length_ft: z.number().optional(),
  width_ft: z.number().optional(),
  is_covered: z.boolean().default(false),
  has_water: z.boolean().default(false),
  electricity_voltage: z.string().optional(),
  utility_connection_type: z.string().optional(),
  status: z.enum(['available', 'occupied', 'maintenance']).default('available'),
  organization_id: z.string().uuid().optional(),
  account_id: z.string().uuid().optional(),
});

export type DockSpotFormValues = z.infer<typeof dockSpotFormSchema>;