/**
 * Interactive Test Page for LeadConnector Booking Webhook
 *
 * GET /api/assessment/booking-webhook/test
 * Returns an HTML page for testing the webhook interactively.
 *
 * NOTE: This should be disabled in production.
 */

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Allow in production with secret query param for debugging
  if (process.env.NODE_ENV === 'production') {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const validSecret = process.env.DEBUG_SECRET || 'lc-debug-2024';
    if (secret !== validSecret) {
      return NextResponse.json(
        {
          error: 'Test page requires secret parameter',
          hint: 'Add ?secret=YOUR_SECRET to the URL',
        },
        { status: 403 }
      );
    }
  }

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LeadConnector Webhook Tester</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0a0a0a;
      color: #e5e5e5;
      margin: 0;
      padding: 20px;
      line-height: 1.6;
    }
    .container { max-width: 1200px; margin: 0 auto; }
    h1 { color: #f5a623; margin-bottom: 10px; }
    .subtitle { color: #888; margin-bottom: 30px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
    .panel {
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 20px;
    }
    h2 { color: #f5a623; font-size: 18px; margin-top: 0; }
    label { display: block; margin-bottom: 5px; color: #aaa; font-size: 14px; }
    input, textarea, select {
      width: 100%;
      padding: 10px;
      margin-bottom: 15px;
      background: #0a0a0a;
      border: 1px solid #333;
      border-radius: 4px;
      color: #e5e5e5;
      font-family: inherit;
    }
    textarea { min-height: 200px; font-family: monospace; font-size: 13px; }
    button {
      background: #f5a623;
      color: #0a0a0a;
      border: none;
      padding: 12px 24px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      font-size: 14px;
      margin-right: 10px;
      margin-bottom: 10px;
    }
    button:hover { background: #d4900f; }
    button.secondary {
      background: #333;
      color: #e5e5e5;
    }
    button.secondary:hover { background: #444; }
    .result {
      background: #0a0a0a;
      border: 1px solid #333;
      border-radius: 4px;
      padding: 15px;
      margin-top: 15px;
      white-space: pre-wrap;
      font-family: monospace;
      font-size: 13px;
      max-height: 400px;
      overflow-y: auto;
    }
    .success { border-color: #22c55e; }
    .error { border-color: #ef4444; }
    .info { background: #1e3a5f; border-color: #3b82f6; padding: 15px; border-radius: 4px; margin-bottom: 20px; }
    .info a { color: #60a5fa; }
    .quick-actions { margin-bottom: 20px; }
    .quick-actions button { margin-right: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>LeadConnector Webhook Tester</h1>
    <p class="subtitle">Test the booking webhook integration</p>

    <div class="info">
      <strong>Endpoints:</strong><br>
      POST <a href="/api/assessment/booking-webhook">/api/assessment/booking-webhook</a> - Webhook receiver<br>
      GET <a href="/api/assessment/booking-webhook/debug">/api/assessment/booking-webhook/debug</a> - View received webhooks<br>
      GET <a href="/api/assessment/booking?email=test@example.com">/api/assessment/booking?email=test@example.com</a> - Lookup booking
    </div>

    <div class="grid">
      <div class="panel">
        <h2>Send Test Webhook</h2>

        <div class="quick-actions">
          <button onclick="loadPreset('standard')">Standard Payload</button>
          <button onclick="loadPreset('minimal')">Minimal</button>
          <button onclick="loadPreset('flat')">Flat Contact</button>
        </div>

        <label>Email (required)</label>
        <input type="email" id="email" value="test@example.com" />

        <label>Name</label>
        <input type="text" id="name" value="John Doe" />

        <label>Start Time</label>
        <input type="datetime-local" id="startTime" />

        <label>Full Payload (JSON)</label>
        <textarea id="payload"></textarea>

        <button onclick="sendWebhook()">Send Webhook</button>
        <button class="secondary" onclick="refreshDebug()">Refresh Debug Log</button>

        <div id="sendResult" class="result" style="display: none;"></div>
      </div>

      <div class="panel">
        <h2>Recent Webhooks</h2>
        <button class="secondary" onclick="refreshDebug()">Refresh</button>
        <button class="secondary" onclick="lookupBooking()">Lookup Booking</button>
        <div id="debugResult" class="result">Loading...</div>
      </div>
    </div>
  </div>

  <script>
    // Get secret from URL to pass to debug endpoint
    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get('secret') || '';

    // Set default start time to 7 days from now
    const defaultStart = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    document.getElementById('startTime').value = defaultStart.toISOString().slice(0, 16);

    // Preset payloads
    const presets = {
      standard: () => ({
        id: 'appt_test_' + Date.now(),
        contactId: 'contact_123',
        calendarId: 'cal_abc',
        startTime: new Date(document.getElementById('startTime').value).toISOString(),
        endTime: new Date(new Date(document.getElementById('startTime').value).getTime() + 30 * 60 * 1000).toISOString(),
        status: 'booked',
        title: 'AI Assessment Call',
        contact: {
          id: 'contact_123',
          email: document.getElementById('email').value,
          firstName: document.getElementById('name').value.split(' ')[0],
          lastName: document.getElementById('name').value.split(' ').slice(1).join(' ') || 'Test',
          phone: '+1234567890',
        },
        timezone: 'America/New_York',
        notes: 'Test booking from webhook tester',
      }),
      minimal: () => ({
        id: 'appt_min_' + Date.now(),
        email: document.getElementById('email').value,
        startTime: new Date(document.getElementById('startTime').value).toISOString(),
      }),
      flat: () => ({
        appointmentId: 'appt_flat_' + Date.now(),
        email: document.getElementById('email').value,
        name: document.getElementById('name').value,
        phone: '+0987654321',
        startTime: new Date(document.getElementById('startTime').value).toISOString(),
        status: 'confirmed',
      }),
    };

    function loadPreset(name) {
      const payload = presets[name]();
      document.getElementById('payload').value = JSON.stringify(payload, null, 2);
    }

    // Load standard preset on page load
    loadPreset('standard');

    async function sendWebhook() {
      const resultDiv = document.getElementById('sendResult');
      resultDiv.style.display = 'block';
      resultDiv.className = 'result';
      resultDiv.textContent = 'Sending...';

      try {
        let payload;
        try {
          payload = JSON.parse(document.getElementById('payload').value);
        } catch (e) {
          throw new Error('Invalid JSON in payload: ' + e.message);
        }

        const response = await fetch('/api/assessment/booking-webhook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const result = await response.json();
        resultDiv.textContent = 'Response (' + response.status + '):\\n' + JSON.stringify(result, null, 2);
        resultDiv.className = 'result ' + (result.success ? 'success' : 'error');

        // Refresh debug log after sending
        setTimeout(refreshDebug, 500);
      } catch (error) {
        resultDiv.textContent = 'Error: ' + error.message;
        resultDiv.className = 'result error';
      }
    }

    async function refreshDebug() {
      const resultDiv = document.getElementById('debugResult');
      resultDiv.textContent = 'Loading...';

      try {
        const debugUrl = '/api/assessment/booking-webhook/debug' + (secret ? '?secret=' + encodeURIComponent(secret) : '');
        const response = await fetch(debugUrl);
        const result = await response.json();
        resultDiv.textContent = JSON.stringify(result, null, 2);
        resultDiv.className = 'result';
      } catch (error) {
        resultDiv.textContent = 'Error: ' + error.message;
        resultDiv.className = 'result error';
      }
    }

    async function lookupBooking() {
      const email = document.getElementById('email').value;
      const resultDiv = document.getElementById('debugResult');
      resultDiv.textContent = 'Looking up booking for ' + email + '...';

      try {
        const response = await fetch('/api/assessment/booking?email=' + encodeURIComponent(email));
        const result = await response.json();
        resultDiv.textContent = 'Booking Lookup Result:\\n' + JSON.stringify(result, null, 2);
        resultDiv.className = 'result ' + (result.success ? 'success' : 'error');
      } catch (error) {
        resultDiv.textContent = 'Error: ' + error.message;
        resultDiv.className = 'result error';
      }
    }

    // Load debug log on page load
    refreshDebug();
  </script>
</body>
</html>
  `;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
