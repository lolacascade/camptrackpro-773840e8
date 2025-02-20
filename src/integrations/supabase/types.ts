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
      accounts: {
        Row: {
          created_at: string | null
          id: string
          name: string
          organization_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          organization_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          organization_id?: string
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
      bookings: {
        Row: {
          account_id: string | null
          rv_id: string | null
          check_in: string
          check_out: string
          created_at: string | null
          customer_id: string | null
          id: string
          organization_id: string | null
          rv_id: string | null
          site_id: string | null
          special_requirements: string | null
          status: string
          total_amount: number | null
        }
        Insert: {
          account_id?: string | null
          rv_id?: string | null
          check_in: string
          check_out: string
          created_at?: string | null
          customer_id?: string | null
          id?: string
          organization_id?: string | null
          rv_id?: string | null
          site_id?: string | null
          special_requirements?: string | null
          status?: string
          total_amount?: number | null
        }
        Update: {
          account_id?: string | null
          rv_id?: string | null
          check_in?: string
          check_out?: string
          created_at?: string | null
          customer_id?: string | null
          id?: string
          organization_id?: string | null
          rv_id?: string | null
          site_id?: string | null
          special_requirements?: string | null
          status?: string
          total_amount?: number | null
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
            foreignKeyName: "bookings_rv_id_fkey"
            columns: ["rv_id"]
            isOneToOne: false
            referencedRelation: "rvs"
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
            foreignKeyName: "bookings_rv_id_fkey"
            columns: ["rv_id"]
            isOneToOne: false
            referencedRelation: "rvs"
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
      customers: {
        Row: {
          account_id: string | null
          created_at: string | null
          email: string | null
          first_name: string
          id: string
          last_name: string
          organization_id: string | null
          phone: string | null
        }
        Insert: {
          account_id?: string | null
          created_at?: string | null
          email?: string | null
          first_name: string
          id?: string
          last_name: string
          organization_id?: string | null
          phone?: string | null
        }
        Update: {
          account_id?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string
          id?: string
          last_name?: string
          organization_id?: string | null
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      rvs: {
        Row: {
          account_id: string | null
          created_at: string | null
          customer_id: string | null
          id: string
          make: string
          model: string
          organization_id: string | null
          year: number | null
        }
        Insert: {
          account_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          id?: string
          make: string
          model: string
          organization_id?: string | null
          year?: number | null
        }
        Update: {
          account_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          id?: string
          make?: string
          model?: string
          organization_id?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "rvs_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rvs_organization_id_fkey"
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
          id: string
          location: string
          name: string
          organization_id: string | null
        }
        Insert: {
          account_id?: string | null
          created_at?: string | null
          id?: string
          location: string
          name: string
          organization_id?: string | null
        }
        Update: {
          account_id?: string | null
          created_at?: string | null
          id?: string
          location?: string
          name?: string
          organization_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sites_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_accounts: {
        Row: {
          account_id: string
          user_id: string
        }
        Insert: {
          account_id: string
          user_id: string
        }
        Update: {
          account_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_accounts_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_organizations: {
        Row: {
          created_at: string | null
          id: string
          organization_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_organizations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_organizations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_booking_total: {
        Args: {
          p_rv_id: string
          p_start_date: string
          p_end_date: string
        }
        Returns: number
      }
      calculate_rv_booking_total: {
        Args: {
          p_rv_id: string
          p_start_date: string
          p_end_date: string
        }
        Returns: number
      }
      check_booking_trends_access: {
        Args: {
          org_id: string
          acc_id: string
        }
        Returns: boolean
      }
      check_customer_email_exists: {
        Args: {
          p_email: string
          p_organization_id: string
        }
        Returns: boolean
      }
      check_email_exists: {
        Args: {
          email_to_check: string
        }
        Returns: boolean
      }
      check_login_rate_limit: {
        Args: {
          p_email: string
          p_ip_address: string
        }
        Returns: boolean
      }
      check_organization_member: {
        Args: {
          user_id: string
          org_id: string
        }
        Returns: boolean
      }
      check_password_reset_rate_limit: {
        Args: {
          p_email: string
        }
        Returns: boolean
      }
      check_user_account_access: {
        Args: {
          user_id: string
          acc_id: string
        }
        Returns: boolean
      }
      check_user_organization_access: {
        Args: {
          user_id: string
          org_id: string
        }
        Returns: boolean
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
      get_booking_invoice_audit: {
        Args: {
          p_org_id: string
          p_acc_id: string
          p_days?: number
        }
        Returns: {
          booking_id: string
          booking_total_amount: number
          booking_status: Database["public"]["Enums"]["booking_status"]
          booking_created_at: string
          invoice_id: string
          invoice_amount: number
          invoice_status: string
          invoice_type: string
          invoice_created_at: string
        }[]
      }
      get_booking_stats:
        | {
            Args: {
              org_id: string
              acc_id: string
            }
            Returns: {
              check_in_date: string
              active_bookings: number
              check_ins: number
              completed_bookings: number
              cancelled_bookings: number
            }[]
          }
        | {
            Args: {
              org_id: string
              acc_id: string
              start_date?: string
              end_date?: string
            }
            Returns: {
              check_in_date: string
              active_bookings: number
              check_ins: number
              completed_bookings: number
              cancelled_bookings: number
            }[]
          }
      get_booking_stats_by_period: {
        Args: {
          org_id: string
          acc_id: string
          start_date?: string
          end_date?: string
        }
        Returns: {
          active_bookings: number
          check_ins: number
          completed_bookings: number
          cancelled_bookings: number
        }[]
      }
      get_enhanced_booking_stats: {
        Args: {
          org_id: string
          acc_id: string
          start_date?: string
          end_date?: string
        }
        Returns: {
          active_bookings: number
          quarterly_growth: number
          yoy_comparison: number
          avg_tenancy_days: number
          min_tenancy_days: number
          max_tenancy_days: number
          todays_checkins: number
          monthly_checkins: number
          period_checkins: number
          todays_checkouts: number
          monthly_checkouts: number
          period_checkouts: number
        }[]
      }
      get_user_roles: {
        Args: {
          user_id: string
        }
        Returns: {
          organization_id: string
          account_id: string
          org_role: string
          account_role: string
        }[]
      }
      populate_booking_trends: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      user_belongs_to_org_and_account: {
        Args: {
          org_id: string
          acc_id: string
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
      booking_status:
        | "pending"
        | "confirmed"
        | "cancelled"
        | "completed"
        | "checked_in"
      rv_pricing_category:
        | "up_to_15"
        | "up_to_20"
        | "up_to_30"
        | "up_to_35"
        | "up_to_40"
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
