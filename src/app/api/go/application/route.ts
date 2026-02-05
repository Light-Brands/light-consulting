import { NextResponse } from 'next/server';
import { createContact, updatePipelineStage } from '@/lib/ghl';

interface ApplicationBody {
  firstName: string;
  lastName: string;
  email: string;
  coreBusiness: string;
  monthlyIncome: string;
  creditScore: string;
}

export async function POST(request: Request) {
  let body: ApplicationBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON' },
      { status: 400 }
    );
  }

  const { firstName, lastName, email, coreBusiness, monthlyIncome, creditScore } = body;

  if (!firstName || !lastName || !email) {
    return NextResponse.json(
      { success: false, error: 'Missing required fields' },
      { status: 400 }
    );
  }

  // If GHL_API_KEY is not set, log and return success (don't block the funnel)
  if (!process.env.GHL_API_KEY) {
    console.warn('GHL_API_KEY not set — skipping CRM sync');
    return NextResponse.json({ success: true, contactId: null });
  }

  try {
    const contactId = await createContact({
      firstName,
      lastName,
      email,
      tags: ['LB \u2013 Applied'],
      customField: {
        core_business: coreBusiness,
        monthly_income: monthlyIncome,
        credit_score: creditScore,
      },
    });

    // Move to pipeline stage if configured
    const pipelineId = process.env.GHL_PIPELINE_ID;
    const stageId = process.env.GHL_STAGE_ID_APPLIED;
    if (contactId && pipelineId && stageId) {
      await updatePipelineStage(contactId, pipelineId, stageId);
    }

    return NextResponse.json({ success: true, contactId });
  } catch (err) {
    console.error('GHL API error:', err);
    // Don't block user flow even on error
    return NextResponse.json({ success: true, contactId: null });
  }
}
