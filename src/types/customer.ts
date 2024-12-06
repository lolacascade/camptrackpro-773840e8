export interface Customer {
  id: string
  name: string
  email: string | null
  phone: string | null
  address: string | null
  boats: BoatInfo[]
}

export interface BoatInfo {
  name: string
  type: string
  length: string
}