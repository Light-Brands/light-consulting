/**
 * Document Analysis API Route
 * Light Brand Consulting
 *
 * POST /api/analyze-documents
 * - Accepts file upload and user info
 * - Extracts text from documents
 * - Analyzes with Google Gemini
 * - Creates lead submission
 * - Returns AI-generated value proposition report
 */

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { LeadSubmissionInsert } from '@/types/proposals';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

interface AIReport {
  context: string;
  challenges: string[];
  opportunities: string[];
  valueProposition: string;
  nextSteps: string[];
}

interface AnalyzeDocumentsResponse {
  success: boolean;
  report?: AIReport;
  leadId?: string;
  error?: string;
}

/**
 * Extract text from PDF using pdf-parse
 */
async function extractPDFText(buffer: Buffer): Promise<string> {
  try {
    // Dynamic import for pdf-parse (CommonJS module)
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pdfParse = require('pdf-parse') as (buffer: Buffer) => Promise<{ text: string }>;
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

/**
 * Extract text from DOCX using mammoth
 */
async function extractDOCXText(buffer: Buffer): Promise<string> {
  try {
    const mammoth = await import('mammoth');
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    console.error('Error extracting DOCX text:', error);
    throw new Error('Failed to extract text from DOCX');
  }
}

/**
 * Extract text from various document types
 */
async function extractDocumentText(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = file.name.toLowerCase();
  const mimeType = file.type;

  // PDF
  if (mimeType === 'application/pdf' || fileName.endsWith('.pdf')) {
    return extractPDFText(buffer);
  }

  // DOCX
  if (
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    fileName.endsWith('.docx')
  ) {
    return extractDOCXText(buffer);
  }

  // DOC (older format) - try DOCX extractor first, fallback to text
  if (mimeType === 'application/msword' || fileName.endsWith('.doc')) {
    try {
      return await extractDOCXText(buffer);
    } catch {
      // Fallback to raw text extraction
      return buffer.toString('utf-8');
    }
  }

  // Plain text files
  if (
    mimeType === 'text/plain' ||
    mimeType === 'text/markdown' ||
    fileName.endsWith('.txt') ||
    fileName.endsWith('.md')
  ) {
    return buffer.toString('utf-8');
  }

  throw new Error('Unsupported file type. Please upload a PDF, DOCX, DOC, TXT, or MD file.');
}

/**
 * Analyze document with Google Gemini
 */
async function analyzeWithGemini(documentText: string): Promise<AIReport> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `You are an AI consultant analyzing a comprehensive business document to create a personalized value proposition for AI transformation.

The user has shared a document that explains their business. Analyze it thoroughly and provide:

1. **Business Context** (2-3 sentences)
   - Industry, business model, current state
   - Size/stage of business if mentioned

2. **Key Challenges & Pain Points** (3-5 bullet points)
   - What problems or bottlenecks are mentioned or implied?
   - What keeps them up at night?

3. **AI Transformation Opportunities** (3-5 bullet points)
   - Where could AI create leverage in their business?
   - What processes could be automated or enhanced?
   - Where are they leaving value on the table?

4. **Personalized Value Proposition** (2-3 paragraphs)
   - How can AI specifically transform THIS business?
   - What would success look like for them?
   - Why is this the right time for AI transformation?

5. **Recommended Next Steps** (3-4 actionable items)
   - What should they do first?
   - What's the logical progression?

Be specific, insightful, and reference details from their document. Make them feel understood.

Document content:
${documentText.substring(0, 30000)} ${documentText.length > 30000 ? '... [truncated for processing]' : ''}

IMPORTANT: Your response MUST be valid JSON with these exact keys: context, challenges, opportunities, valueProposition, nextSteps

Format your response as:
{
  "context": "Business context description here",
  "challenges": ["Challenge 1", "Challenge 2", "Challenge 3"],
  "opportunities": ["Opportunity 1", "Opportunity 2", "Opportunity 3"],
  "valueProposition": "Full value proposition paragraphs here",
  "nextSteps": ["Step 1", "Step 2", "Step 3"]
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from AI');
    }

    const parsed = JSON.parse(jsonMatch[0]) as AIReport;

    // Validate the response structure
    if (
      !parsed.context ||
      !Array.isArray(parsed.challenges) ||
      !Array.isArray(parsed.opportunities) ||
      !parsed.valueProposition ||
      !Array.isArray(parsed.nextSteps)
    ) {
      throw new Error('Missing required fields in AI response');
    }

    return parsed;
  } catch (error) {
    console.error('Error analyzing with Gemini:', error);

    // Return a fallback report if Gemini fails
    return {
      context: 'Based on the document provided, we can see a business looking to leverage AI for transformation and growth.',
      challenges: [
        'Identifying the right AI opportunities for your specific business context',
        'Building internal capabilities to implement and maintain AI solutions',
        'Ensuring AI initiatives align with business objectives',
        'Managing the change management aspects of AI adoption',
      ],
      opportunities: [
        'Automating repetitive processes to free up human capital for strategic work',
        'Leveraging AI for data-driven decision making',
        'Enhancing customer experience through intelligent automation',
        'Building proprietary AI capabilities as a competitive advantage',
      ],
      valueProposition:
        'Your business is at an inflection point where AI can create significant leverage. The key is not just implementing AI tools, but building a strategic foundation that compounds over time.\n\nWe help businesses like yours move from AI-curious to AI-native, ensuring every implementation creates lasting value. Our approach focuses on building capabilities you own, not renting solutions that create dependencies.',
      nextSteps: [
        'Schedule a diagnostic call to dive deeper into your specific context',
        'Identify 2-3 quick wins that can demonstrate AI value within 30 days',
        'Develop a roadmap for building internal AI capabilities',
        'Create a measurement framework for tracking AI ROI',
      ],
    };
  }
}

/**
 * Create lead submission in database
 */
async function createLeadSubmission(
  name: string,
  email: string,
  company: string | undefined,
  report: AIReport,
  documentName: string
): Promise<string | null> {
  const leadData: LeadSubmissionInsert = {
    service: 'diagnostic',
    name,
    email,
    company: company || null,
    intake_data: {
      source: 'ai-document-analysis',
      document_name: documentName,
      ai_report_context: report.context,
      ai_report_challenges: report.challenges.join('; '),
      ai_report_opportunities: report.opportunities.join('; '),
    },
    status: 'new',
  };

  // If Supabase is not configured, return mock ID
  if (!isSupabaseConfigured()) {
    return crypto.randomUUID();
  }

  const { data, error } = await supabaseAdmin
    .from('lead_submissions')
    .insert(leadData as unknown as never)
    .select('id')
    .single();

  if (error) {
    console.error('Error creating lead submission:', error);
    return null;
  }

  return (data as { id: string } | null)?.id || null;
}

/**
 * POST /api/analyze-documents
 */
export async function POST(request: NextRequest): Promise<NextResponse<AnalyzeDocumentsResponse>> {
  try {
    // Check for Gemini API key
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'AI analysis service is not configured' },
        { status: 503 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const name = formData.get('name') as string | null;
    const email = formData.get('email') as string | null;
    const company = formData.get('company') as string | undefined;

    // Validate required fields
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'Document file is required' },
        { status: 400 }
      );
    }

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate file size (20MB max)
    const maxSize = 20 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File size must be under 20MB' },
        { status: 400 }
      );
    }

    // Extract text from document
    let documentText: string;
    try {
      documentText = await extractDocumentText(file);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to process document';
      return NextResponse.json({ success: false, error: message }, { status: 400 });
    }

    // Check if document has meaningful content
    if (documentText.trim().length < 100) {
      return NextResponse.json(
        {
          success: false,
          error: 'Document appears to be empty or too short. Please upload a more comprehensive document.',
        },
        { status: 400 }
      );
    }

    // Analyze with Gemini
    const report = await analyzeWithGemini(documentText);

    // Create lead submission (auto-submit)
    const leadId = await createLeadSubmission(name, email, company, report, file.name);

    return NextResponse.json({
      success: true,
      report,
      leadId: leadId || undefined,
    });
  } catch (error) {
    console.error('Error in POST /api/analyze-documents:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
