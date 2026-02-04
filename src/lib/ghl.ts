const GHL_API_BASE = 'https://rest.gohighlevel.com/v1';

function getApiKey(): string {
  const key = process.env.GHL_API_KEY;
  if (!key) throw new Error('GHL_API_KEY is not set');
  return key;
}

function headers(): HeadersInit {
  return {
    Authorization: `Bearer ${getApiKey()}`,
    'Content-Type': 'application/json',
  };
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GHLContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  companyName?: string;
  tags?: string[];
  customField?: Record<string, string>;
}

interface GHLContactResponse {
  contact?: { id: string };
  id?: string;
}

// ---------------------------------------------------------------------------
// Create / upsert contact
// ---------------------------------------------------------------------------

export async function createContact(
  payload: GHLContactPayload
): Promise<string | null> {
  const res = await fetch(`${GHL_API_BASE}/contacts/`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      companyName: payload.companyName,
      tags: payload.tags ?? [],
      customField: payload.customField ?? {},
    }),
  });

  if (!res.ok) {
    console.error('GHL createContact failed', res.status, await res.text());
    return null;
  }

  const body: GHLContactResponse = await res.json();
  return body.contact?.id ?? body.id ?? null;
}

// ---------------------------------------------------------------------------
// Add tag to contact
// ---------------------------------------------------------------------------

export async function addTag(
  contactId: string,
  tag: string
): Promise<boolean> {
  const res = await fetch(`${GHL_API_BASE}/contacts/${contactId}/tags/`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ tags: [tag] }),
  });

  if (!res.ok) {
    console.error('GHL addTag failed', res.status, await res.text());
    return false;
  }

  return true;
}

// ---------------------------------------------------------------------------
// Update pipeline stage
// ---------------------------------------------------------------------------

export async function updatePipelineStage(
  contactId: string,
  pipelineId: string,
  stageId: string
): Promise<boolean> {
  const res = await fetch(
    `${GHL_API_BASE}/pipelines/${pipelineId}/opportunities/`,
    {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        contactId,
        pipelineId,
        stageId,
        title: `Application – ${contactId}`,
        status: 'open',
      }),
    }
  );

  if (!res.ok) {
    console.error(
      'GHL updatePipelineStage failed',
      res.status,
      await res.text()
    );
    return false;
  }

  return true;
}
