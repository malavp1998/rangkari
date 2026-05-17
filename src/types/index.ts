export type PaintingStatus = 'available' | 'reserved' | 'sold'

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'packed'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export interface PaintingImage {
  id: string
  painting_id: string
  url: string
  display_order: number
  is_primary: boolean
}

export interface PaintingVideo {
  id: string
  painting_id: string
  url: string
}

export interface Painting {
  id: string
  title: string
  description: string | null
  price: number
  dimensions: string | null
  medium: string | null
  year_created: number | null
  status: PaintingStatus
  featured: boolean
  created_at: string
  painting_images: PaintingImage[]
  painting_videos: PaintingVideo[]
}

export interface ShippingAddress {
  name: string
  phone: string
  address_line1: string
  address_line2?: string
  city: string
  state: string
  pincode: string
}

export interface Order {
  id: string
  order_number: string
  customer_email: string
  customer_phone: string
  customer_name: string
  shipping_address: ShippingAddress
  painting_id: string
  amount_paid: number
  shipping_fee: number
  razorpay_order_id: string | null
  razorpay_payment_id: string | null
  status: OrderStatus
  tracking_number: string | null
  created_at: string
  paintings?: Pick<Painting, 'id' | 'title' | 'price' | 'painting_images'>
}
