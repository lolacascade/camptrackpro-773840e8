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
          asset_name: string | null
          asset_size: string | null
          asset_type: string | null
          created_at: string
          customer_id: string | null
          daily_rate: number
          id: string
          name: string
          slip_id: number | null
          status: string
          type: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          asset_name?: string | null
          asset_size?: string | null
          asset_type?: string | null
          created_at?: string
          customer_id?: string | null
          daily_rate: number
          id?: string
          name: string
          slip_id?: number | null
          status?: string
          type: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          asset_name?: string | null
          asset_size?: string | null
          asset_type?: string | null
          created_at?: string
          customer_id?: string | null
          daily_rate?: number
          id?: string
          name?: string
          slip_id?: number | null
          status?: string
          type?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assets_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_slip_id_fkey"
            columns: ["slip_id"]
            isOneToOne: false
            referencedRelation: "slots"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          asset_id: string
          check_in_date: string
          check_out_date: string
          created_at: string
          created_by: string
          customer_id: string
          id: string
          reservation_code: string | null
          slot_id: number | null
          special_requirements: string | null
          status: Database["public"]["Enums"]["booking_status"]
          total_amount: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          asset_id: string
          check_in_date: string
          check_out_date: string
          created_at?: string
          created_by: string
          customer_id: string
          id?: string
          reservation_code?: string | null
          slot_id?: number | null
          special_requirements?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          total_amount: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          asset_id?: string
          check_in_date?: string
          check_out_date?: string
          created_at?: string
          created_by?: string
          customer_id?: string
          id?: string
          reservation_code?: string | null
          slot_id?: number | null
          special_requirements?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
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
          asset_id: string | null
          booking_id: string | null
          created_at: string | null
          id: number
        }
        Insert: {
          asset_id?: string | null
          booking_id?: string | null
          created_at?: string | null
          id?: number
        }
        Update: {
          asset_id?: string | null
          booking_id?: string | null
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
      chat_history: {
        Row: {
          attachments: Json | null
          conversation_id: string | null
          created_at: string | null
          id: number
          message: string
          role: string
          user_id: string | null
        }
        Insert: {
          attachments?: Json | null
          conversation_id?: string | null
          created_at?: string | null
          id?: number
          message: string
          role: string
          user_id?: string | null
        }
        Update: {
          attachments?: Json | null
          conversation_id?: string | null
          created_at?: string | null
          id?: number
          message?: string
          role?: string
          user_id?: string | null
        }
        Relationships: []
      }
      chat_marina_insights: {
        Row: {
          content: Json
          created_at: string | null
          id: number
          insight_type: string
          updated_at: string | null
        }
        Insert: {
          content: Json
          created_at?: string | null
          id?: number
          insight_type: string
          updated_at?: string | null
        }
        Update: {
          content?: Json
          created_at?: string | null
          id?: number
          insight_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      customer_notes: {
        Row: {
          created_at: string | null
          customer_id: string
          id: number
          note: string
          tag: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          id?: number
          note: string
          tag?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          id?: number
          note?: string
          tag?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_notes_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          lifetime_value: number | null
          phone: string | null
          postal_code: string | null
          state: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          lifetime_value?: number | null
          phone?: string | null
          postal_code?: string | null
          state?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          lifetime_value?: number | null
          phone?: string | null
          postal_code?: string | null
          state?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          category: string
          created_at: string | null
          date: string
          description: string
          id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          category: string
          created_at?: string | null
          date: string
          description: string
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string | null
          date?: string
          description?: string
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      invoices: {
        Row: {
          amount: number
          booking_id: string | null
          created_at: string | null
          id: string
          status: string
          type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          booking_id?: string | null
          created_at?: string | null
          id?: string
          status?: string
          type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string | null
          created_at?: string | null
          id?: string
          status?: string
          type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_requests: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          created_at: string | null
          customer_id: string | null
          description: string
          id: number
          priority: string
          slot_id: number | null
          status: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string | null
          customer_id?: string | null
          description: string
          id?: number
          priority?: string
          slot_id?: number | null
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string | null
          customer_id?: string | null
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
            foreignKeyName: "maintenance_requests_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_requests_slot_id_fkey"
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
      monthly_budgets: {
        Row: {
          amount: number
          category: string
          created_at: string | null
          id: string
          month: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          category: string
          created_at?: string | null
          id?: string
          month: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string | null
          id?: string
          month?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      slots: {
        Row: {
          created_at: string | null
          customer_id: string | null
          dock: string | null
          electricity_voltage: string | null
          has_water: boolean | null
          id: number
          is_covered: boolean | null
          last_activity_at: string | null
          length_ft: number | null
          location_coordinates: Json | null
          location_identifier: string | null
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
          customer_id?: string | null
          dock?: string | null
          electricity_voltage?: string | null
          has_water?: boolean | null
          id?: number
          is_covered?: boolean | null
          last_activity_at?: string | null
          length_ft?: number | null
          location_coordinates?: Json | null
          location_identifier?: string | null
          maintenance_id?: number | null
          name: string
          status?: string
          updated_at?: string | null
          user_id?: string | null
          utility_connection_type?: string | null
          width_ft?: number | null
          zone?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          dock?: string | null
          electricity_voltage?: string | null
          has_water?: boolean | null
          id?: number
          is_covered?: boolean | null
          last_activity_at?: string | null
          length_ft?: number | null
          location_coordinates?: Json | null
          location_identifier?: string | null
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
            foreignKeyName: "slots_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_booking_total: {
        Args: {
          p_asset_id: string
          p_start_date: string
          p_end_date: string
        }
        Returns: number
      }
      check_user_role: {
        Args: {
          user_id: string
          required_role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      booking_status: "pending" | "confirmed" | "cancelled" | "completed"
      user_role: "admin" | "manager" | "staff" | "customer"
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
