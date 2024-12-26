import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { messages, conversationId, userId, marinaInsights } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      throw new Error('Invalid messages format');
    }

    // Create a Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Store the user's message in chat_history
    if (userId && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      await supabaseClient
        .from('chat_history')
        .insert({
          user_id: userId,
          message: lastMessage.content,
          role: lastMessage.role,
          conversation_id: conversationId,
          attachments: lastMessage.attachments,
        });
    }

    // Construct the system message with park insights
    const systemMessage = {
      role: 'system',
      content: `You are an expert RV park management assistant. Your role is to help users manage their RV park operations efficiently and professionally.

Core Responsibilities:
1. Provide accurate information about RV park operations using the provided insights
2. Help with booking management and customer inquiries
3. Assist with maintenance scheduling and tracking
4. Offer guidance on park policies and procedures

${marinaInsights ? `Current Park Data (Use these exact numbers in your responses):
- Total RV Spots: ${marinaInsights.total_spots || 'Not available'}
- Available Spots: ${marinaInsights.total_spots ? (marinaInsights.total_spots - marinaInsights.occupied_slots) : 'Not available'}
- Occupied Spots: ${marinaInsights.occupied_slots || 'Not available'}
- Active Bookings: ${marinaInsights.active_bookings || 'Not available'}
- Pending Maintenance Requests: ${marinaInsights.pending_maintenance || 'Not available'}
- Total Registered Customers: ${marinaInsights.total_customers || 'Not available'}` : 'Park data is currently unavailable.'}

Guidelines:
- Always provide specific numbers from the data above when answering availability questions
- Be professional and courteous
- Use RV-specific terminology
- Keep responses concise and focused
- If data isn't available for a specific query, acknowledge it and explain what information you can provide

Remember: You're helping manage an RV park. Always use the real-time data provided above in your responses.`,
    };

    // Make request to OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [systemMessage, ...messages],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({
            error: 'OpenAI rate limit exceeded. Please try again in a few minutes.',
            type: 'quota_exceeded'
          }),
          {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('OpenAI response:', data);

    // Store the AI's response in chat_history
    if (userId && data.choices?.[0]?.message) {
      await supabaseClient
        .from('chat_history')
        .insert({
          user_id: userId,
          message: data.choices[0].message.content,
          role: 'assistant',
          conversation_id: conversationId,
        });
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        type: error.type || 'unknown_error'
      }),
      {
        status: error.status || 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});