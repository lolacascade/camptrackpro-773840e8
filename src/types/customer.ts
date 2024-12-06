export interface Customer {
  id: number
  name: string
  email: string | null
  phone: string | null
  address: string | null
  created_at?: string | null
  updated_at?: string | null
  boats?: BoatInfo[]
}

export interface BoatInfo {
  name: string
  type: string
  length: string
}