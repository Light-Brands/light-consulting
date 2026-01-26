/**
 * Email Service Configuration
 * Light Brand Consulting
 *
 * Uses Resend for transactional emails
 */

import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const isEmailConfigured = () => Boolean(resendApiKey);

const fromEmail = process.env.EMAIL_FROM || 'Light Brand <noreply@lightbrand.co>';

interface SendMagicLinkOptions {
  to: string;
  magicLinkUrl: string;
  clientName?: string;
}

export async function sendMagicLinkEmail({ to, magicLinkUrl, clientName }: SendMagicLinkOptions) {
  if (!resend) {
    console.log('[Email] Resend not configured. Magic link URL:', magicLinkUrl);
    return { success: true, mock: true };
  }

  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to,
    subject: 'Sign in to Light Brand Client Portal',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0b; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 500px; background-color: #141416; border-radius: 16px; border: 1px solid #27272a;">
          <tr>
            <td style="padding: 40px;">
              <!-- Logo -->
              <div style="text-align: center; margin-bottom: 32px;">
                <span style="display: inline-block; background: linear-gradient(135deg, #E8B84A, #D4A544); padding: 12px 20px; border-radius: 8px; font-weight: bold; color: #0a0a0b; font-size: 14px;">LB</span>
              </div>

              <!-- Heading -->
              <h1 style="color: #fafafa; font-size: 24px; font-weight: 600; text-align: center; margin: 0 0 16px 0;">
                Sign in to your Client Portal
              </h1>

              <!-- Greeting -->
              <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; text-align: center; margin: 0 0 32px 0;">
                ${clientName ? `Hi ${clientName},` : 'Hi there,'}<br>
                Click the button below to access your Client Command Center.
              </p>

              <!-- Button -->
              <div style="text-align: center; margin-bottom: 32px;">
                <a href="${magicLinkUrl}" style="display: inline-block; background: linear-gradient(135deg, #E8B84A, #D4A544); color: #0a0a0b; font-weight: 600; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-size: 16px;">
                  Access Your Dashboard
                </a>
              </div>

              <!-- Expiration Notice -->
              <p style="color: #71717a; font-size: 14px; text-align: center; margin: 0 0 24px 0;">
                This link expires in 15 minutes.
              </p>

              <!-- Divider -->
              <hr style="border: none; border-top: 1px solid #27272a; margin: 24px 0;">

              <!-- Alternative Link -->
              <p style="color: #71717a; font-size: 13px; text-align: center; margin: 0;">
                If the button doesn't work, copy and paste this link:<br>
                <a href="${magicLinkUrl}" style="color: #E8B84A; word-break: break-all;">${magicLinkUrl}</a>
              </p>
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <p style="color: #52525b; font-size: 12px; text-align: center; margin-top: 24px;">
          &copy; ${new Date().getFullYear()} Light Brand Consulting. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
    text: `
Sign in to Light Brand Client Portal

${clientName ? `Hi ${clientName},` : 'Hi there,'}

Click the link below to access your Client Command Center:
${magicLinkUrl}

This link expires in 15 minutes.

If you didn't request this link, you can safely ignore this email.

© ${new Date().getFullYear()} Light Brand Consulting
    `.trim(),
  });

  if (error) {
    console.error('[Email] Failed to send magic link:', error);
    throw error;
  }

  return { success: true, id: data?.id };
}
