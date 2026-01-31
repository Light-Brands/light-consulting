/**
 * Stripe Webhook Route (alternate path)
 *
 * Re-exports the webhook handler from /api/stripe/webhook to support
 * the webhook URL configured in the Stripe dashboard:
 *   https://www.lightbrands.ai/api/webhooks/stripe
 */

export const runtime = 'nodejs';

export { POST } from '@/app/api/stripe/webhook/route';
