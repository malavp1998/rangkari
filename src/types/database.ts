// Manually written to match supabase-schema.sql.
// Replace with: npx supabase gen types typescript --project-id <id> > src/types/database.ts

export type Database = {
  public: {
    Tables: {
      paintings: {
        Row: {
          id: string
          title: string
          description: string | null
          price: number
          dimensions: string | null
          medium: string | null
          year_created: number | null
          status: 'available' | 'reserved' | 'sold'
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          price: number
          dimensions?: string | null
          medium?: string | null
          year_created?: number | null
          status?: 'available' | 'reserved' | 'sold'
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string | null
          price?: number
          dimensions?: string | null
          medium?: string | null
          year_created?: number | null
          status?: 'available' | 'reserved' | 'sold'
          featured?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      painting_images: {
        Row: {
          id: string
          painting_id: string
          url: string
          storage_path: string
          display_order: number
          is_primary: boolean
          created_at: string
        }
        Insert: {
          id?: string
          painting_id: string
          url: string
          storage_path: string
          display_order?: number
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          url?: string
          storage_path?: string
          display_order?: number
          is_primary?: boolean
        }
        Relationships: [
          {
            foreignKeyName: 'painting_images_painting_id_fkey'
            columns: ['painting_id']
            isOneToOne: false
            referencedRelation: 'paintings'
            referencedColumns: ['id']
          }
        ]
      }
      painting_videos: {
        Row: {
          id: string
          painting_id: string
          url: string
          storage_path: string
          created_at: string
        }
        Insert: {
          id?: string
          painting_id: string
          url: string
          storage_path: string
          created_at?: string
        }
        Update: {
          url?: string
          storage_path?: string
        }
        Relationships: [
          {
            foreignKeyName: 'painting_videos_painting_id_fkey'
            columns: ['painting_id']
            isOneToOne: false
            referencedRelation: 'paintings'
            referencedColumns: ['id']
          }
        ]
      }
      orders: {
        Row: {
          id: string
          order_number: string
          customer_name: string
          customer_email: string
          customer_phone: string
          shipping_address: {
            name: string
            phone: string
            address_line1: string
            address_line2?: string
            city: string
            state: string
            pincode: string
          }
          painting_id: string
          amount_paid: number
          shipping_fee: number
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          razorpay_signature: string | null
          status: 'pending' | 'paid' | 'packed' | 'shipped' | 'delivered' | 'cancelled'
          tracking_number: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number?: string
          customer_name: string
          customer_email: string
          customer_phone: string
          shipping_address: Database['public']['Tables']['orders']['Row']['shipping_address']
          painting_id: string
          amount_paid: number
          shipping_fee?: number
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          razorpay_signature?: string | null
          status?: Database['public']['Tables']['orders']['Row']['status']
          tracking_number?: string | null
          notes?: string | null
        }
        Update: {
          status?: Database['public']['Tables']['orders']['Row']['status']
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          razorpay_signature?: string | null
          tracking_number?: string | null
          notes?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'orders_painting_id_fkey'
            columns: ['painting_id']
            isOneToOne: false
            referencedRelation: 'paintings'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      painting_status: 'available' | 'reserved' | 'sold'
      order_status: 'pending' | 'paid' | 'packed' | 'shipped' | 'delivered' | 'cancelled'
    }
  }
}
