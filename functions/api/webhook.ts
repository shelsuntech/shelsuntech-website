export async function onRequest(context: { request: Request; env: any }) {
  const { request } = context;

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  // Handle WhatsApp Cloud API Verification GET Requests
  if (request.method === "GET") {
    const url = new URL(request.url);
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");

    if (mode && token) {
      if (mode === "subscribe") {
        console.log("[Pages Function Webhook] WhatsApp subscribe challenge received.");
        // Returns the challenge back to Facebook/WhatsApp servers to confirm the webhook URL is active
        return new Response(challenge || "verified", {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "text/plain" },
        });
      }
    }

    return new Response(
      JSON.stringify({ status: "active", message: "WhatsApp Webhook Listener active. Perform POST with data payloads." }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  // Handle POST Payload Events (WhatsApp incoming messages, lead events, etc.)
  if (request.method === "POST") {
    try {
      const payload = await request.json();
      console.log("[Pages Function Webhook] JSON payload received:", payload);

      // In the future, parse WhatsApp message bodies, notify assistants, trigger agents, etc. Here.

      return new Response(
        JSON.stringify({ success: true, message: "Webhook event logged successfully." }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } catch (err: any) {
      console.error("[Pages Function Webhook] Failed to process webhook event:", err);
      return new Response(
        JSON.stringify({ success: false, error: err.message || "Invalid payload" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  }

  return new Response(
    JSON.stringify({ error: "Method not allowed" }),
    {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
}
