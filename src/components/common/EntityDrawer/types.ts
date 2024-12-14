import { ReactNode } from "react"
import { Database } from "@/integrations/supabase/types"

// Get table names from Database type
type DatabaseTables = Database['public']['Tables']
type DatabaseViews = Database['public']['Views']
export type TableNames = keyof (DatabaseTables & DatabaseViews)

export interface Field {
  name: string
  label: string
  type: 'text' | 'number' | 'select' | 'date'
  required?: boolean
  options?: { value: string; label: string }[]
}

export interface EntityDrawerProps {
  entity: any
  open: boolean
  onClose: () => void
  onEntityUpdated: () => void
  title: string
  fields: Field[]
  tableName: TableNames
}

export interface FormField extends Field {
  value: any
  onChange: (value: any) => void
}