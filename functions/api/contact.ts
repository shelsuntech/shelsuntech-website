export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept",
      "Access-Control-Max-Age": "86400",
    },
  });
}

export async function onRequestPost(context: { request: Request; env: any }) {
  const { request, env } = context;

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
  };

  try {
    const body = await request.json() as any;
    const { name, email, phone, message, company, pageUrl } = body;
    const turnstileResponse = body["cf-turnstile-response"];

    console.log(`[Pages Function] Contact form submission received for: ${email || 'unknown'}`);

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

    // Retrieve and Validate Secrets/Env vars from Cloudflare Page Env
    const apiKey = env.RESEND_API_KEY;
    const fromEmail = env.FROM_EMAIL;
    const contactEmail = env.CONTACT_EMAIL;
    const replyFromEmail = env.REPLY_FROM_EMAIL;
    const turnstileSecretKey = env.TURNSTILE_SECRET_KEY || '1x00000000000000000000000000000000AA';

    if (!apiKey || !fromEmail || !contactEmail || !replyFromEmail) {
      console.error("[Pages Function Config Error] Missing one or more required Cloudflare Environment Secrets:", {
        hasApiKey: !!apiKey,
        hasFromEmail: !!fromEmail,
        hasContactEmail: !!contactEmail,
        hasReplyFromEmail: !!replyFromEmail
      });
      return new Response(
        JSON.stringify({
          success: false,
          error: "Server configuration error: Missing required environment variables (RESEND_API_KEY, FROM_EMAIL, CONTACT_EMAIL, or REPLY_FROM_EMAIL) on Cloudflare Pages.",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const ipAddress = request.headers.get("CF-Connecting-IP") || request.headers.get("X-Real-IP") || "Unknown";

    // Validate Turnstile Token
    if (!turnstileResponse) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Security check failed: Please complete the security check.",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    try {
      const verifyResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: turnstileSecretKey,
          response: turnstileResponse,
          remoteip: ipAddress === "Unknown" ? "" : ipAddress,
        }),
      });

      const verifyData = await verifyResponse.json() as any;
      if (!verifyData.success) {
        console.error("[Pages Function] Turnstile verification failed:", verifyData);
        return new Response(
          JSON.stringify({
            success: false,
            error: "Security check failed: Cloudflare Turnstile token validation failed.",
          }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    } catch (verifyErr: any) {
      console.error("[Pages Function] Turnstile verification request failed:", verifyErr);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Security check failed: Unable to connect to Turnstile verification servers.",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Format addresses dynamically to include name headers if they don't have them
    const formattedFrom = fromEmail.includes("<") ? fromEmail : `ShelSunTech <${fromEmail}>`;
    const formattedReplyFrom = replyFromEmail.includes("<") ? replyFromEmail : `ShelSunTech <${replyFromEmail}>`;

    // Formulate metadata
    const submissionTime = new Date().toLocaleString("en-US", {
      timeZone: "UTC",
      dateStyle: "full",
      timeStyle: "long",
    }) + " (UTC)";

    const originUrl = pageUrl || request.headers.get("Referer") || "https://shelsuntech.com";
    const userAgent = request.headers.get("User-Agent") || "Unknown";

    // Draft lead notification email for the internal team
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
            <h1 class="title">New Contact Form Submission</h1>
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
            <div class="value" style="font-family: monospace;">${phone || 'Not Provided'}</div>
          </div>

          <div class="field-group">
            <div class="label">Message</div>
            <div class="value message-text">${message}</div>
          </div>

          <div class="field-group">
            <div class="label">Submission Metadata</div>
            <div class="meta-box">
              Date & Time: ${submissionTime}<br>
              Referrer URL: <a href="${originUrl}" style="color: #38bdf8; text-decoration: none;">${originUrl}</a><br>
              IP Address: ${ipAddress}<br>
              User Agent: ${userAgent}
            </div>
          </div>

          <div class="footer">
            SECURE EMAIL ENGINE // POWERED BY CLOUDFLARE PAGES FUNCTIONS & RESEND
          </div>
        </div>
      </body>
      </html>
    `;

    // Draft automatic confirmation email for the customer
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
              <p style="margin: 4px 0;"><strong>Contact Number:</strong> ${phone || 'Not Provided'}</p>
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

    // 1. Send lead notification to internal team
    const teamResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: formattedFrom,
        to: [contactEmail],
        reply_to: email,
        subject: "New Contact Form Submission - ShelSunTech",
        html: teamEmailHtml,
      }),
    });

    if (!teamResponse.ok) {
      const teamErrorDetails = await teamResponse.text();
      console.error("[Pages Function Error] Failed to send team notification email via Resend:", teamErrorDetails);
      return new Response(
        JSON.stringify({ success: false, error: `Failed to notify team: ${teamErrorDetails}` }),
        {
          status: teamResponse.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`[Pages Function] Notification email dispatched successfully to ${contactEmail}`);

    // 2. Send automatic confirmation back to customer
    const customerResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: formattedReplyFrom,
        to: [email],
        subject: "We've received your request - ShelSunTech",
        html: customerEmailHtml,
      }),
    });

    if (!customerResponse.ok) {
      const customerErrorDetails = await customerResponse.text();
      console.warn("[Pages Function Warning] Failed to send customer confirmation email:", customerErrorDetails);
    } else {
      console.log(`[Pages Function] Auto-confirmation email dispatched successfully to ${email}`);
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (err: any) {
    console.error("[Pages Function Exception] Fatal error in request handler:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message || "An unexpected processing error occurred on Cloudflare." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
}
