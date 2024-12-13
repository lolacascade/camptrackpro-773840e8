import { Json } from './common';

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: number;
          customer_id: number;
          check_in_date: string;
          check_out_date: string;
          slot_id: number;
          created_at: string | null;
          special_requirements: string | null;
          status: string;
          reservation_code: string;
        };
        Insert: {
          id?: number;
          customer_id: number;
          check_in_date: string;
          check_out_date: string;
          slot_id: number;
          created_at?: string | null;
          special_requirements?: string | null;
          status?: string;
          reservation_code?: string;
        };
        Update: {
          id?: number;
          customer_id?: number;
          check_in_date?: string;
          check_out_date?: string;
          slot_id?: number;
          created_at?: string | null;
          special_requirements?: string | null;
          status?: string;
          reservation_code?: string;
        };
      };
      customers: {
        Row: {
          id: number;
          name: string;
          email: string | null;
          phone: string | null;
          address: string | null;
          created_at: string | null;
          updated_at: string | null;
          user_id: string | null;
          lifetime_value: number | null;
        };
        Insert: {
          id?: number;
          name: string;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
          lifetime_value?: number | null;
        };
        Update: {
          id?: number;
          name?: string;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
          lifetime_value?: number | null;
        };
      };
      slots: {
        Row: {
          id: number;
          name: string;
          location_identifier: string;
          status: string;
          dock: string | null;
          zone: string | null;
          length_ft: number | null;
          width_ft: number | null;
          is_covered: boolean | null;
          has_water: boolean | null;
          electricity_voltage: string | null;
          utility_connection_type: string | null;
          location_coordinates: Json | null;
          customer_id: number | null;
          maintenance_id: number | null;
          created_at: string | null;
          updated_at: string | null;
          last_activity_at: string | null;
          user_id: string | null;
        };
        Insert: {
          id?: number;
          name: string;
          location_identifier?: string;
          status: string;
          dock?: string | null;
          zone?: string | null;
          length_ft?: number | null;
          width_ft?: number | null;
          is_covered?: boolean | null;
          has_water?: boolean | null;
          electricity_voltage?: string | null;
          utility_connection_type?: string | null;
          location_coordinates?: Json | null;
          customer_id?: number | null;
          maintenance_id?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
          last_activity_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          id?: number;
          name?: string;
          location_identifier?: string;
          status?: string;
          dock?: string | null;
          zone?: string | null;
          length_ft?: number | null;
          width_ft?: number | null;
          is_covered?: boolean | null;
          has_water?: boolean | null;
          electricity_voltage?: string | null;
          utility_connection_type?: string | null;
          location_coordinates?: Json | null;
          customer_id?: number | null;
          maintenance_id?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
          last_activity_at?: string | null;
          user_id?: string | null;
        };
      };
      maintenance_requests: {
        Row: {
          id: number;
          description: string;
          status: string;
          priority: string;
          customer_id: number | null;
          slot_id: number | null;
          assigned_to: number | null;
          created_at: string | null;
          updated_at: string | null;
          completed_at: string | null;
          user_id: string | null;
        };
        Insert: {
          id?: number;
          description: string;
          status: string;
          priority?: string;
          customer_id?: number | null;
          slot_id?: number | null;
          assigned_to?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
          completed_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          id?: number;
          description?: string;
          status?: string;
          priority?: string;
          customer_id?: number | null;
          slot_id?: number | null;
          assigned_to?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
          completed_at?: string | null;
          user_id?: string | null;
        };
      };
    };
    Views: {
      customer_insights: {
        Row: {
          customer_id: number | null;
          name: string | null;
          email: string | null;
          lifetime_value: number | null;
        };
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}