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
      assets: {
        Row: {
          asset_name: string
          asset_size: string | null
          asset_type: string | null
          created_at: string | null
          customer_id: number | null
          id: number
          slip_id: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          asset_name: string
          asset_size?: string | null
          asset_type?: string | null
          created_at?: string | null
          customer_id?: number | null
          id?: number
          slip_id?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          asset_name?: string
          asset_size?: string | null
          asset_type?: string | null
          created_at?: string | null
          customer_id?: number | null
          id?: number
          slip_id?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_customer_id"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_insights"
            referencedColumns: ["customer_id"]
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
            referencedRelation: "slots"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          check_in_date: string
          check_out_date: string
          created_at: string | null
          customer_id: number
          id: number
          reservation_code: string
          slot_id: number
          special_requirements: string | null
          status: string
        }
        Insert: {
          check_in_date: string
          check_out_date: string
          created_at?: string | null
          customer_id: number
          id?: number
          reservation_code: string
          slot_id: number
          special_requirements?: string | null
          status?: string
        }
        Update: {
          check_in_date?: string
          check_out_date?: string
          created_at?: string | null
          customer_id?: number
          id?: number
          reservation_code?: string
          slot_id?: number
          special_requirements?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_insights"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "bookings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_slot_id_fkey"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "slots"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings_assets: {
        Row: {
          asset_id: number | null
          booking_id: number | null
          created_at: string | null
          id: number
        }
        Insert: {
          asset_id?: number | null
          booking_id?: number | null
          created_at?: string | null
          id?: number
        }
        Update: {
          asset_id?: number | null
          booking_id?: number | null
          created_at?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "bookings_assets_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_assets_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_notes: {
        Row: {
          created_at: string | null
          customer_id: number | null
          id: number
          note: string | null
          tag: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: number | null
          id?: number
          note?: string | null
          tag?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: number | null
          id?: number
          note?: string | null
          tag?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_notes_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_insights"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "customer_notes_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_preferences: {
        Row: {
          customer_id: number | null
          id: number
          last_updated: string | null
          preferred_slot_id: number | null
          preferred_zone: string | null
        }
        Insert: {
          customer_id?: number | null
          id?: number
          last_updated?: string | null
          preferred_slot_id?: number | null
          preferred_zone?: string | null
        }
        Update: {
          customer_id?: number | null
          id?: number
          last_updated?: string | null
          preferred_slot_id?: number | null
          preferred_zone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_preferences_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_insights"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "customer_preferences_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_preferences_preferred_slot_id_fkey"
            columns: ["preferred_slot_id"]
            isOneToOne: false
            referencedRelation: "slots"
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
          lifetime_value: number | null
          name: string
          phone: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          lifetime_value?: number | null
          name: string
          phone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          lifetime_value?: number | null
          name?: string
          phone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      invoices: {
        Row: {
          amount: number
          booking_id: number | null
          created_at: string | null
          customer_id: number | null
          due_date: string
          id: number
          issued_date: string
          slot_id: number | null
          status: string
          type: string
          user_id: string | null
        }
        Insert: {
          amount: number
          booking_id?: number | null
          created_at?: string | null
          customer_id?: number | null
          due_date: string
          id?: number
          issued_date: string
          slot_id?: number | null
          status: string
          type?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          booking_id?: number | null
          created_at?: string | null
          customer_id?: number | null
          due_date?: string
          id?: number
          issued_date?: string
          slot_id?: number | null
          status?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_booking_id"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_customer_id"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_insights"
            referencedColumns: ["customer_id"]
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
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "slots"
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
          priority: string
          slot_id: number | null
          status: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          assigned_to?: number | null
          completed_at?: string | null
          created_at?: string | null
          customer_id?: number | null
          description: string
          id?: number
          priority?: string
          slot_id?: number | null
          status: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          assigned_to?: number | null
          completed_at?: string | null
          created_at?: string | null
          customer_id?: number | null
          description?: string
          id?: number
          priority?: string
          slot_id?: number | null
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_assigned_to"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "customer_insights"
            referencedColumns: ["customer_id"]
          },
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
            referencedRelation: "customer_insights"
            referencedColumns: ["customer_id"]
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
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "slots"
            referencedColumns: ["id"]
          },
        ]
      }
      marina_details: {
        Row: {
          address: string | null
          approach_info: Json | null
          contact_email: string | null
          contact_phone: string | null
          coordinates: Json | null
          created_at: string | null
          id: number
          name: string
          other_features: Json | null
          photos: string[] | null
          services_amenities: Json | null
          social_media: Json | null
          total_slips: number | null
          updated_at: string | null
          user_id: string | null
          videos: string[] | null
          website: string | null
        }
        Insert: {
          address?: string | null
          approach_info?: Json | null
          contact_email?: string | null
          contact_phone?: string | null
          coordinates?: Json | null
          created_at?: string | null
          id?: number
          name: string
          other_features?: Json | null
          photos?: string[] | null
          services_amenities?: Json | null
          social_media?: Json | null
          total_slips?: number | null
          updated_at?: string | null
          user_id?: string | null
          videos?: string[] | null
          website?: string | null
        }
        Update: {
          address?: string | null
          approach_info?: Json | null
          contact_email?: string | null
          contact_phone?: string | null
          coordinates?: Json | null
          created_at?: string | null
          id?: number
          name?: string
          other_features?: Json | null
          photos?: string[] | null
          services_amenities?: Json | null
          social_media?: Json | null
          total_slips?: number | null
          updated_at?: string | null
          user_id?: string | null
          videos?: string[] | null
          website?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          is_subscribed: boolean | null
          stripe_customer_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          is_subscribed?: boolean | null
          stripe_customer_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          is_subscribed?: boolean | null
          stripe_customer_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      slot_audit_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: number
          new_status: string | null
          previous_status: string | null
          slot_id: number | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: number
          new_status?: string | null
          previous_status?: string | null
          slot_id?: number | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: number
          new_status?: string | null
          previous_status?: string | null
          slot_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "slip_audit_logs_slip_id_fkey"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "slots"
            referencedColumns: ["id"]
          },
        ]
      }
      slots: {
        Row: {
          created_at: string | null
          customer_id: number | null
          dock: string | null
          electricity_voltage: string | null
          has_water: boolean | null
          id: number
          is_covered: boolean | null
          last_activity_at: string | null
          length_ft: number | null
          location_coordinates: Json | null
          location_identifier: string
          maintenance_id: number | null
          name: string
          status: string
          updated_at: string | null
          user_id: string | null
          utility_connection_type: string | null
          width_ft: number | null
          zone: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: number | null
          dock?: string | null
          electricity_voltage?: string | null
          has_water?: boolean | null
          id?: number
          is_covered?: boolean | null
          last_activity_at?: string | null
          length_ft?: number | null
          location_coordinates?: Json | null
          location_identifier?: string
          maintenance_id?: number | null
          name: string
          status: string
          updated_at?: string | null
          user_id?: string | null
          utility_connection_type?: string | null
          width_ft?: number | null
          zone?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: number | null
          dock?: string | null
          electricity_voltage?: string | null
          has_water?: boolean | null
          id?: number
          is_covered?: boolean | null
          last_activity_at?: string | null
          length_ft?: number | null
          location_coordinates?: Json | null
          location_identifier?: string
          maintenance_id?: number | null
          name?: string
          status?: string
          updated_at?: string | null
          user_id?: string | null
          utility_connection_type?: string | null
          width_ft?: number | null
          zone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_customer_id"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_insights"
            referencedColumns: ["customer_id"]
          },
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
      customer_insights: {
        Row: {
          customer_id: number | null
          email: string | null
          lifetime_value: number | null
          name: string | null
        }
        Relationships: []
      }
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
