
// Follow this setup guide to integrate the Deno standard library
// https://docs.deno.com/runtime/manual/getting_started/javascript_node
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, userTier } = await req.json();
    
    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Missing message in request body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Set different behavior based on user tier
    const responseDelay = userTier === 'enterprise' ? 0 : userTier === 'pro' ? 500 : 1000;
    const model = userTier === 'enterprise' ? 'gpt-4o' : 'gpt-4o-mini';
    
    // Create system message based on user tier
    let systemMessage = 'You are a helpful AI assistant for CodePilot.AI, a development productivity platform.';
    
    if (userTier === 'enterprise') {
      systemMessage += ' Provide detailed, priority support with thorough explanations. You are speaking to an Enterprise tier customer who has priority support.';
    } else if (userTier === 'pro') {
      systemMessage += ' Provide helpful support to Pro tier users. Suggest relevant CodePilot.AI features that could help them.';
    } else {
      systemMessage += ' Explain the benefits of upgrading to Pro or Enterprise tiers when relevant.';
    }
    
    // Add artificial delay based on tier (enterprise users get faster responses)
    if (responseDelay > 0) {
      await new Promise(resolve => setTimeout(resolve, responseDelay));
    }

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('OpenAI API error:', data);
      return new Response(
        JSON.stringify({ error: 'Error communicating with AI service', details: data.error }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiResponse = data.choices[0].message.content;
    
    return new Response(
      JSON.stringify({ content: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
