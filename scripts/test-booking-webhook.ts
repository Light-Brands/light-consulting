#!/usr/bin/env npx ts-node
/**
 * Test script for LeadConnector Booking Webhook
 *
 * Usage:
 *   npx ts-node scripts/test-booking-webhook.ts
 *
 * Or with a custom URL:
 *   WEBHOOK_URL=https://your-domain.com/api/assessment/booking-webhook npx ts-node scripts/test-booking-webhook.ts
 *
 * This simulates what LeadConnector sends when an appointment is booked.
 */

const WEBHOOK_URL = process.env.WEBHOOK_URL || 'http://localhost:3000/api/assessment/booking-webhook';

// Sample payloads that LeadConnector might send
const testPayloads = {
  // Standard appointment creation webhook
  standard: {
    id: 'appt_test_' + Date.now(),
    contactId: 'contact_123',
    calendarId: 'cal_abc',
    startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(), // +30 min
    status: 'booked',
    title: 'AI Assessment Call',
    contact: {
      id: 'contact_123',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
    },
    timezone: 'America/New_York',
    notes: 'Test booking from webhook script',
  },

  // Alternative format with flat contact fields
  flatContact: {
    appointmentId: 'appt_flat_' + Date.now(),
    email: 'flat@example.com',
    name: 'Jane Smith',
    phone: '+0987654321',
    startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(),
    status: 'confirmed',
    calendarId: 'cal_xyz',
  },

  // Minimal payload (edge case testing)
  minimal: {
    id: 'appt_min_' + Date.now(),
    email: 'minimal@example.com',
    startTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  },

  // Using selectedSlot instead of startTime
  selectedSlot: {
    id: 'appt_slot_' + Date.now(),
    contact: {
      email: 'slot@example.com',
      name: 'Slot Test',
    },
    selectedSlot: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
};

async function sendWebhook(name: string, payload: object) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Testing: ${name}`);
  console.log(`${'='.repeat(60)}`);
  console.log('\nPayload:');
  console.log(JSON.stringify(payload, null, 2));

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    console.log(`\nResponse (${response.status}):`);
    console.log(JSON.stringify(result, null, 2));

    if (result.success) {
      console.log('\n✅ Webhook processed successfully');
    } else {
      console.log('\n⚠️  Webhook acknowledged but with issues:', result.error);
    }
  } catch (error) {
    console.error('\n❌ Error sending webhook:', error);
  }
}

async function runTests() {
  console.log('🧪 LeadConnector Booking Webhook Test Suite');
  console.log(`Target URL: ${WEBHOOK_URL}`);
  console.log(`Time: ${new Date().toISOString()}`);

  // Test health check first
  console.log('\n--- Health Check ---');
  try {
    const healthResponse = await fetch(WEBHOOK_URL);
    const healthResult = await healthResponse.json();
    console.log('Health check:', healthResult);
  } catch (error) {
    console.error('Health check failed:', error);
    console.log('\n⚠️  Make sure the dev server is running (npm run dev)');
    return;
  }

  // Run each test payload
  for (const [name, payload] of Object.entries(testPayloads)) {
    await sendWebhook(name, payload);
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n' + '='.repeat(60));
  console.log('🏁 All tests complete');
  console.log('='.repeat(60));
  console.log('\nNext steps:');
  console.log('1. Check the server logs for [LeadConnector Webhook] messages');
  console.log('2. Query the booking lookup endpoint:');
  console.log('   curl "http://localhost:3000/api/assessment/booking?email=test@example.com"');
  console.log('3. Check the database for stored booking data');
}

runTests().catch(console.error);
