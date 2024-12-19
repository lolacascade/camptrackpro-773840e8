import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { messages, conversationId, userId, parkInsights } = await req.json();

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
        });
    }

    // Make request to OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert RV park management assistant. Your role is to help users manage their RV park operations efficiently and professionally.

Core Responsibilities:
1. Provide accurate information about RV park operations using the provided insights
2. Help with booking management and customer inquiries
3. Assist with maintenance scheduling and tracking
4. Offer guidance on park policies and procedures

Guidelines:
- Always be professional and courteous
- Provide specific, actionable advice based on the park's data
- Use RV-specific terminology (e.g., "RV site" not "slip" or "dock")
- When discussing numbers or statistics, reference the actual park data provided
- If you're unsure about something, acknowledge it and suggest where to find the information
- Keep responses concise and focused on the user's question

Current Park Insights:
${JSON.stringify(parkInsights, null, 2)}

Remember: You're helping manage an RV park, not a marina or other facility. Tailor all responses accordingly.`,
          },
          ...messages,
        ],
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