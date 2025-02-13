
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { corsHeaders } from '../_shared/cors.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

Deno.serve(async (req) => {
  console.log('check-email-exists function called')

  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { email } = await req.json()
    console.log('Checking email:', email)
    
    if (!email) {
      console.error('No email provided')
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Initialize the Supabase client with the service role key
    const supabase = createClient(supabaseUrl, supabaseServiceRole)
    console.log('Supabase client initialized with URL:', supabaseUrl)
    
    try {
      console.log('Starting user lookup for email:', email)
      const { data: { users }, error: lookupError } = await supabase
        .auth
        .admin
        .listUsers({
          filters: {
            email: email
          }
        })
      
      if (lookupError) {
        console.error('Error during email lookup:', lookupError)
        throw lookupError
      }

      // Explicit boolean evaluation and force true/false
      const exists = Boolean(users && users.length > 0)
      console.log('Email lookup complete. Users found:', users?.length || 0)
      console.log('Email exists:', exists)

      return new Response(
        JSON.stringify({ exists: exists ? true : false }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } catch (lookupError) {
      console.error('Email lookup failed:', lookupError)
      throw lookupError
    }

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to check email existence',
        details: error.message 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
