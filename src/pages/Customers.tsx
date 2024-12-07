import { Layout } from "@/components/layout/Layout"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { CustomerTable } from "@/components/customers/CustomerTable"
import { CustomerDrawer } from "@/components/customers/CustomerDrawer"
import { Customer } from "@/types/customer"
import { supabase } from "@/integrations/supabase/client"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

export default function Customers() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate('/login')
      }
    }
    checkAuth()
  }, [navigate])

  // Check subscription
  const { data: subscriptionStatus, isError: subscriptionError } = useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) throw new Error('No session')
      
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      })
      
      if (error) throw error
      return data
    },
  })

  useEffect(() => {
    if (subscriptionStatus && !subscriptionStatus.subscribed) {
      toast({
        title: "Subscription Required",
        description: "Please subscribe to access the customers page",
        variant: "destructive",
      })
      navigate('/')
    }
  }, [subscriptionStatus, navigate, toast])

  const handleSubscribe = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) throw new Error('No session')

      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      })

      if (error) throw error
      if (data?.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      toast({
        title: "Error",
        description: "Failed to start subscription process.",
        variant: "destructive",
      })
    }
  }

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('name')

      if (error) throw error

      setCustomers(data || [])
    } catch (error) {
      console.error('Error fetching customers:', error)
      toast({
        title: "Error",
        description: "Failed to load customers.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsDrawerOpen(true)
  }

  const handleAdd = () => {
    setSelectedCustomer(null)
    setIsDrawerOpen(true)
  }

  if (subscriptionError) {
    return (
      <Layout>
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#133134] mb-4">Subscription Required</h2>
            <p className="text-[#3E4238] mb-6">Please subscribe to access the customers page</p>
            <Button onClick={handleSubscribe}>Subscribe Now</Button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="flex-1 p-12">
          <div className="bg-transparent rounded-[24px] space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-[#133134]">Customers</h1>
              <Button onClick={handleAdd}>
                <Plus className="mr-2 h-4 w-4" /> Add Customer
              </Button>
            </div>

            {isLoading ? (
              <div className="text-[#3E4238]">Loading customers...</div>
            ) : (
              <CustomerTable
                customers={customers}
                onEdit={handleEdit}
              />
            )}

            <CustomerDrawer
              customer={selectedCustomer}
              open={isDrawerOpen}
              onClose={() => {
                setIsDrawerOpen(false)
                setSelectedCustomer(null)
              }}
              onCustomerUpdated={fetchCustomers}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}