export interface Env {
  RESEND_API_KEY: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: any): Promise<Response> {
    // 1. Configure CORS Headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept",
      "Access-Control-Max-Age": "86400",
    };

    // Handle OPTIONS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    // 2. Validate Request Method
    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({ success: false, error: "Method not allowed. Use POST." }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    try {
      // 3. Parse and Validate Request Payload
      const body = await request.json() as any;
      const { name, email, phone, message, company, pageUrl } = body;

      console.log(`[Worker] Processing contact form submission for: ${email || 'unknown'}`);

      // Required field validation
      const missingFields: string[] = [];
      if (!name || !name.trim()) missingFields.push("name");
      
      if (!email || !email.trim()) {
        missingFields.push("email");
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        return new Response(
          JSON.stringify({ success: false, error: "Please provide a valid work email address." }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      if (!phone || !phone.trim()) missingFields.push("phone");
      if (!message || !message.trim()) missingFields.push("message");

      if (missingFields.length > 0) {
        return new Response(
          JSON.stringify({
            success: false,
            error: `Missing required fields: ${missingFields.join(", ")}`,
          }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Check for Resend API Key
      if (!env.RESEND_API_KEY) {
        console.error("[Worker Config Error] RESEND_API_KEY environment variable is missing.");
        return new Response(
          JSON.stringify({
            success: false,
            error: "Server configuration error: Resend API Key is missing on the worker.",
          }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Formulate metadata
      const submissionTime = new Date().toLocaleString("en-US", {
        timeZone: "UTC",
        dateStyle: "full",
        timeStyle: "long",
      }) + " (UTC)";
      
      const originUrl = pageUrl || request.headers.get("Referer") || "https://shelsuntech.com";

      // 4. Draft notification email for contact@shelsuntech.com
      const teamEmailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f14; color: #f0f4fa; margin: 0; padding: 24px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #111822; border: 1px solid #1e293b; border-radius: 16px; padding: 32px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.4); }
            .header { border-bottom: 1px solid #1e293b; padding-bottom: 20px; margin-bottom: 24px; }
            .title { color: #22d3ee; font-size: 22px; font-weight: 800; margin: 0; letter-spacing: -0.02em; }
            .subtitle { color: #94a3b8; font-size: 13px; margin: 6px 0 0 0; }
            .field-group { margin-bottom: 20px; }
            .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #64748b; margin-bottom: 6px; }
            .value { font-size: 14px; color: #e2e8f0; line-height: 1.5; background-color: #0b0f14; border: 1px solid #1e293b; border-radius: 8px; padding: 12px 16px; }
            .message-text { white-space: pre-wrap; word-break: break-word; }
            .meta-box { font-size: 12px; font-family: monospace; color: #94a3b8; background-color: #0b0f14; border: 1px dashed #1e293b; border-radius: 8px; padding: 12px 16px; line-height: 1.6; }
            .footer { margin-top: 36px; border-top: 1px solid #1e293b; padding-top: 16px; font-size: 11px; color: #475569; font-family: monospace; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 class="title">New Demo / Lead Request</h1>
              <p class="subtitle">Secure transmission from shelsuntech.com</p>
            </div>
            
            <div class="field-group">
              <div class="label">Name</div>
              <div class="value" style="font-weight: 600; color: #ffffff;">${name}</div>
            </div>

            <div class="field-group">
              <div class="label">Work Email</div>
              <div class="value"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></div>
            </div>

            <div class="field-group">
              <div class="label">Company Name</div>
              <div class="value">${company || 'Not Provided (Individual)'}</div>
            </div>

            <div class="field-group">
              <div class="label">Phone Number</div>
              <div class="value" style="font-family: monospace;">${phone}</div>
            </div>

            <div class="field-group">
              <div class="label">Project Requirements</div>
              <div class="value message-text">${message}</div>
            </div>

            <div class="field-group">
              <div class="label">Lead Meta Info</div>
              <div class="meta-box">
                Timestamp: ${submissionTime}<br>
                Referrer URL: <a href="${originUrl}" style="color: #38bdf8; text-decoration: none;">${originUrl}</a>
              </div>
            </div>

            <div class="footer">
              SECURE EMAIL ENGINE // POWERED BY CLOUDFLARE WORKERS & RESEND
            </div>
          </div>
        </body>
        </html>
      `;

      // 5. Draft automatic confirmation email for the customer
      const customerEmailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f14; color: #f0f4fa; margin: 0; padding: 24px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #111822; border: 1px solid #1e293b; border-radius: 16px; padding: 32px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.4); }
            .header { border-bottom: 1px solid #1e293b; padding-bottom: 20px; margin-bottom: 24px; }
            .title { color: #38bdf8; font-size: 20px; font-weight: 800; margin: 0; letter-spacing: -0.01em; }
            .content { font-size: 14.5px; color: #e2e8f0; line-height: 1.6; }
            .details-box { background-color: #0b0f14; border-left: 4px solid #38bdf8; border-radius: 0 8px 8px 0; padding: 16px; margin: 24px 0; font-size: 13.5px; }
            .details-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; margin-bottom: 8px; }
            .button { display: inline-block; background-color: #38bdf8; color: #0b0f14; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 9999px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 16px; text-align: center; }
            .button:hover { background-color: #22d3ee; }
            .footer { margin-top: 36px; border-top: 1px solid #1e293b; padding-top: 20px; font-size: 12px; color: #64748b; line-height: 1.5; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 class="title">Demo Request Received — ShelSunTech</h1>
            </div>
            
            <div class="content">
              <p>Hi ${name},</p>
              <p>Thank you for reaching out to <strong>ShelSunTech</strong>. We have received your inquiry and initiated dispatch to our engineering team.</p>
              <p>One of our architects is reviewing your requirements and will contact you within 24 hours to schedule a deep-dive product demonstration or discuss system requirements.</p>
              
              <div class="details-box">
                <div class="details-title">Your Inquiry Summary</div>
                <p style="margin: 4px 0;"><strong>Company:</strong> ${company || 'Not Provided (Individual)'}</p>
                <p style="margin: 4px 0;"><strong>Contact Number:</strong> ${phone}</p>
                <p style="margin: 4px 0;"><strong>Submission Time:</strong> ${submissionTime}</p>
              </div>

              <p>If your project is high-priority or you would like to start the conversation immediately, feel free to reply directly to this email, or connect with our active helpline on WhatsApp.</p>
              
              <a href="https://wa.me/918076664199?text=Hi!%20I%27ve%20just%20submitted%20a%20demo%20form%20on%20your%20site%20and%20would%20like%20to%20speed%20up%20the%20onboarding." target="_blank" rel="noopener noreferrer" class="button">Chat with an Engineer</a>
            </div>

            <div class="footer">
              Best regards,<br>
              <strong>ShelSunTech Engineering Group</strong><br>
              <span style="font-size: 10.5px; color: #475569;">Sent automatically from ${originUrl}</span>
            </div>
          </div>
        </body>
        </html>
      `;

      // 6. Request Resend API to send Notification Email to contact@shelsuntech.com
      const teamEmailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "ShelSunTech <info@shelsuntech.com>",
          to: ["contact@shelsuntech.com"],
          subject: `New Lead: ${name} (${company || 'Individual'})`,
          html: teamEmailHtml,
        }),
      });

      if (!teamEmailResponse.ok) {
        const teamErrorDetails = await teamEmailResponse.text();
        console.error(`[Worker Error] Failed to send team notification:`, teamErrorDetails);
        return new Response(
          JSON.stringify({ success: false, error: `Failed to notify ShelSunTech: ${teamErrorDetails}` }),
          {
            status: teamEmailResponse.status,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      console.log("[Worker] Successfully delivered notification email to contact@shelsuntech.com");

      // 7. Request Resend API to send Confirmation Email back to customer
      const customerEmailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "ShelSunTech <info@shelsuntech.com>",
          to: [email],
          subject: "We've received your request - ShelSunTech",
          html: customerEmailHtml,
        }),
      });

      if (!customerEmailResponse.ok) {
        const customerErrorDetails = await customerEmailResponse.text();
        console.warn(`[Worker Warning] Failed to deliver customer confirmation email:`, customerErrorDetails);
        // We log customer email failure but don't fail the client's request because the core notification was delivered.
      } else {
        console.log(`[Worker] Successfully delivered confirmation email to ${email}`);
      }

      // 8. Return standard JSON response
      return new Response(
        JSON.stringify({ success: true }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );

    } catch (err: any) {
      console.error("[Worker Exception] Fatal exception caught in worker processing:", err);
      return new Response(
        JSON.stringify({ success: false, error: err.message || "An unexpected processing error occurred on the worker." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  },
};
