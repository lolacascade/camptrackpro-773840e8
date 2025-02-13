
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
    console.log('Supabase client initialized')
    
    try {
      // Use our new database function to check if email exists
      const { data, error } = await supabase
        .rpc('check_email_exists', { email_to_check: email })
      
      if (error) {
        console.error('Database function error:', error)
        throw error
      }

      console.log('Email exists check result:', data)

      return new Response(
        JSON.stringify({ exists: data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } catch (dbError) {
      console.error('Database error:', dbError)
      throw dbError
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
