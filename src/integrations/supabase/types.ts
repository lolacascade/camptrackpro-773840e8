export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      boats: {
        Row: {
          boat_name: string
          boat_size: string | null
          created_at: string | null
          customer_id: number | null
          id: number
          slip_id: number | null
          updated_at: string | null
        }
        Insert: {
          boat_name: string
          boat_size?: string | null
          created_at?: string | null
          customer_id?: number | null
          id?: number
          slip_id?: number | null
          updated_at?: string | null
        }
        Update: {
          boat_name?: string
          boat_size?: string | null
          created_at?: string | null
          customer_id?: number | null
          id?: number
          slip_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_customer_id"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_slip_id"
            columns: ["slip_id"]
            isOneToOne: false
            referencedRelation: "slips"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          address: string | null
          created_at: string | null
          email: string | null
          id: number
          name: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          name: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          name?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      invoices: {
        Row: {
          amount: number
          created_at: string | null
          customer_id: number | null
          due_date: string
          id: number
          issued_date: string
          slip_id: number | null
          status: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          customer_id?: number | null
          due_date: string
          id?: number
          issued_date: string
          slip_id?: number | null
          status: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          customer_id?: number | null
          due_date?: string
          id?: number
          issued_date?: string
          slip_id?: number | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_customer_id"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_slip_id"
            columns: ["slip_id"]
            isOneToOne: false
            referencedRelation: "slips"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_inventory: {
        Row: {
          id: number
          item_name: string
          last_updated: string | null
          quantity: number
          restock_threshold: number
        }
        Insert: {
          id?: number
          item_name: string
          last_updated?: string | null
          quantity: number
          restock_threshold: number
        }
        Update: {
          id?: number
          item_name?: string
          last_updated?: string | null
          quantity?: number
          restock_threshold?: number
        }
        Relationships: []
      }
      maintenance_requests: {
        Row: {
          assigned_to: number | null
          completed_at: string | null
          created_at: string | null
          customer_id: number | null
          description: string
          id: number
          slip_id: number | null
          status: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: number | null
          completed_at?: string | null
          created_at?: string | null
          customer_id?: number | null
          description: string
          id?: number
          slip_id?: number | null
          status: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: number | null
          completed_at?: string | null
          created_at?: string | null
          customer_id?: number | null
          description?: string
          id?: number
          slip_id?: number | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_assigned_to"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_customer_id"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_slip_id"
            columns: ["slip_id"]
            isOneToOne: false
            referencedRelation: "slips"
            referencedColumns: ["id"]
          },
        ]
      }
      marina_details: {
        Row: {
          address: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          id: number
          name: string
          total_slips: number | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: number
          name: string
          total_slips?: number | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: number
          name?: string
          total_slips?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      slip_audit_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: number
          new_status: string | null
          previous_status: string | null
          slip_id: number | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: number
          new_status?: string | null
          previous_status?: string | null
          slip_id?: number | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: number
          new_status?: string | null
          previous_status?: string | null
          slip_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "slip_audit_logs_slip_id_fkey"
            columns: ["slip_id"]
            isOneToOne: false
            referencedRelation: "slips"
            referencedColumns: ["id"]
          },
        ]
      }
      slips: {
        Row: {
          created_at: string | null
          customer_id: number | null
          dock: string | null
          dock_number: string
          electricity_voltage: string | null
          has_water: boolean | null
          id: number
          is_covered: boolean | null
          last_activity_at: string | null
          length_ft: number | null
          location_coordinates: Json | null
          maintenance_id: number | null
          name: string
          power_connection_type: string | null
          status: string
          updated_at: string | null
          width_ft: number | null
          zone: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: number | null
          dock?: string | null
          dock_number?: string
          electricity_voltage?: string | null
          has_water?: boolean | null
          id?: number
          is_covered?: boolean | null
          last_activity_at?: string | null
          length_ft?: number | null
          location_coordinates?: Json | null
          maintenance_id?: number | null
          name: string
          power_connection_type?: string | null
          status: string
          updated_at?: string | null
          width_ft?: number | null
          zone?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: number | null
          dock?: string | null
          dock_number?: string
          electricity_voltage?: string | null
          has_water?: boolean | null
          id?: number
          is_covered?: boolean | null
          last_activity_at?: string | null
          length_ft?: number | null
          location_coordinates?: Json | null
          maintenance_id?: number | null
          name?: string
          power_connection_type?: string | null
          status?: string
          updated_at?: string | null
          width_ft?: number | null
          zone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_customer_id"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_maintenance_id"
            columns: ["maintenance_id"]
            isOneToOne: false
            referencedRelation: "maintenance_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      stripe_checkout_sessions: {
        Row: {
          attrs: Json | null
          customer: string | null
          id: string | null
          payment_intent: string | null
          subscription: string | null
        }
        Insert: {
          attrs?: Json | null
          customer?: string | null
          id?: string | null
          payment_intent?: string | null
          subscription?: string | null
        }
        Update: {
          attrs?: Json | null
          customer?: string | null
          id?: string | null
          payment_intent?: string | null
          subscription?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
