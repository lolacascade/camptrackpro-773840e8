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
      account_roles: {
        Row: {
          account_id: string | null
          created_at: string
          id: string
          role: string
          user_id: string | null
        }
        Insert: {
          account_id?: string | null
          created_at?: string
          id?: string
          role: string
          user_id?: string | null
        }
        Update: {
          account_id?: string | null
          created_at?: string
          id?: string
          role?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "account_roles_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      accounts: {
        Row: {
          created_at: string
          id: string
          name: string
          organization_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          organization_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          organization_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      assets: {
        Row: {
          account_id: string | null
          asset_name: string | null
          asset_size: string | null
          asset_type: string | null
          created_at: string
          customer_id: string | null
          daily_rate: number | null
          id: string
          name: string
          organization_id: string | null
          site_id: number | null
          status: string
          type: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          account_id?: string | null
          asset_name?: string | null
          asset_size?: string | null
          asset_type?: string | null
          created_at?: string
          customer_id?: string | null
          daily_rate?: number | null
          id?: string
          name: string
          organization_id?: string | null
          site_id?: number | null
          status?: string
          type: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          account_id?: string | null
          asset_name?: string | null
          asset_size?: string | null
          asset_type?: string | null
          created_at?: string
          customer_id?: string | null
          daily_rate?: number | null
          id?: string
          name?: string
          organization_id?: string | null
          site_id?: number | null
          status?: string
          type?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assets_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          account_id: string | null
          asset_id: string
          check_in_date: string
          check_out_date: string
          created_at: string
          created_by: string | null
          customer_id: string
          duration_type: string | null
          id: string
          organization_id: string | null
          reservation_code: string | null
          site_id: number | null
          special_requirements: string | null
          status: Database["public"]["Enums"]["booking_status"]
          total_amount: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          account_id?: string | null
          asset_id: string
          check_in_date: string
          check_out_date: string
          created_at?: string
          created_by?: string | null
          customer_id: string
          duration_type?: string | null
          id?: string
          organization_id?: string | null
          reservation_code?: string | null
          site_id?: number | null
          special_requirements?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          total_amount?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          account_id?: string | null
          asset_id?: string
          check_in_date?: string
          check_out_date?: string
          created_at?: string
          created_by?: string | null
          customer_id?: string
          duration_type?: string | null
          id?: string
          organization_id?: string | null
          reservation_code?: string | null
          site_id?: number | null
          special_requirements?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          total_amount?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
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
            foreignKeyName: "bookings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
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
          account_id: string | null
          created_at: string | null
          customer_id: string
          id: number
          note: string
          organization_id: string | null
          tag: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          account_id?: string | null
          created_at?: string | null
          customer_id: string
          id?: number
          note: string
          organization_id?: string | null
          tag?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          account_id?: string | null
          created_at?: string | null
          customer_id?: string
          id?: number
          note?: string
          organization_id?: string | null
          tag?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_notes_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_notes_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_notes_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_status_history: {
        Row: {
          account_id: string
          created_at: string
          customer_id: string
          id: string
          organization_id: string
          recorded_at: string
          status: string
        }
        Insert: {
          account_id: string
          created_at?: string
          customer_id: string
          id?: string
          organization_id: string
          recorded_at?: string
          status: string
        }
        Update: {
          account_id?: string
          created_at?: string
          customer_id?: string
          id?: string
          organization_id?: string
          recorded_at?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_status_history_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_status_history_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_status_history_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          account_id: string | null
          address: string | null
          city: string | null
          country: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          organization_id: string | null
          phone: string | null
          postal_code: string | null
          state: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          account_id?: string | null
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          organization_id?: string | null
          phone?: string | null
          postal_code?: string | null
          state?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          account_id?: string | null
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          organization_id?: string | null
          phone?: string | null
          postal_code?: string | null
          state?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      expenses: {
        Row: {
          account_id: string
          amount: number | null
          category: string
          created_at: string | null
          date: string
          description: string
          id: string
          notes: string | null
          organization_id: string
          payment_method: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          account_id: string
          amount?: number | null
          category: string
          created_at?: string | null
          date: string
          description: string
          id?: string
          notes?: string | null
          organization_id: string
          payment_method?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          account_id?: string
          amount?: number | null
          category?: string
          created_at?: string | null
          date?: string
          description?: string
          id?: string
          notes?: string | null
          organization_id?: string
          payment_method?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "expenses_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount: number | null
          booking_id: string | null
          created_at: string | null
          id: string
          status: string
          type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          booking_id?: string | null
          created_at?: string | null
          id?: string
          status?: string
          type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number | null
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
          account_id: string | null
          assigned_to: string | null
          completed_at: string | null
          created_at: string | null
          customer_id: string | null
          description: string
          id: number
          organization_id: string | null
          priority: string
          site_id: number | null
          status: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          account_id?: string | null
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string | null
          customer_id?: string | null
          description: string
          id?: number
          organization_id?: string | null
          priority?: string
          site_id?: number | null
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          account_id?: string | null
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string | null
          customer_id?: string | null
          description?: string
          id?: number
          organization_id?: string | null
          priority?: string
          site_id?: number | null
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_requests_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_requests_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_requests_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_requests_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
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
          account_id: string | null
          amount: number | null
          category: string
          created_at: string | null
          id: string
          month: string
          organization_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          account_id?: string | null
          amount?: number | null
          category: string
          created_at?: string | null
          id?: string
          month: string
          organization_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          account_id?: string | null
          amount?: number | null
          category?: string
          created_at?: string | null
          id?: string
          month?: string
          organization_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "monthly_budgets_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "monthly_budgets_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_invites: {
        Row: {
          created_at: string
          email: string
          id: string
          organization_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          organization_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          organization_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_invites_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_roles: {
        Row: {
          created_at: string
          id: string
          organization_id: string | null
          role: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          organization_id?: string | null
          role: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          organization_id?: string | null
          role?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_roles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_id: string | null
          company_name: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          organization_id: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          account_id?: string | null
          company_name?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          organization_id?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          account_id?: string | null
          company_name?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          organization_id?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sites: {
        Row: {
          account_id: string | null
          created_at: string | null
          customer_id: string | null
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
          organization_id: string | null
          status: Database["public"]["Enums"]["site_status"]
          updated_at: string | null
          user_id: string | null
          utility_connection_type: string | null
          width_ft: number | null
        }
        Insert: {
          account_id?: string | null
          created_at?: string | null
          customer_id?: string | null
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
          organization_id?: string | null
          status?: Database["public"]["Enums"]["site_status"]
          updated_at?: string | null
          user_id?: string | null
          utility_connection_type?: string | null
          width_ft?: number | null
        }
        Update: {
          account_id?: string | null
          created_at?: string | null
          customer_id?: string | null
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
          organization_id?: string | null
          status?: Database["public"]["Enums"]["site_status"]
          updated_at?: string | null
          user_id?: string | null
          utility_connection_type?: string | null
          width_ft?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "slots_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "slots_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "slots_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      booking_trends: {
        Row: {
          account_id: string | null
          cancellations: number | null
          long_term_bookings: number | null
          month: string | null
          organization_id: string | null
          short_term_bookings: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
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
      check_user_role:
        | {
            Args: {
              user_id: string
              required_role: Database["public"]["Enums"]["user_role"]
            }
            Returns: boolean
          }
        | {
            Args: {
              user_id: string
              required_role: string
            }
            Returns: boolean
          }
      user_belongs_to_organization: {
        Args: {
          org_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      booking_status: "pending" | "confirmed" | "cancelled" | "completed"
      site_status: "available" | "occupied" | "maintenance"
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
