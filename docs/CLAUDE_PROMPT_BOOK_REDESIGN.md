# Claude Prompt: Redesign /book Page with AI Document Analysis

## Context

You are working on a Next.js 14+ application (App Router) for Light Brand Consulting. The current `/book` page is a multi-step booking form that collects service selection, contact info, intake questions, and confirmation. 

**Current Implementation:**
- Location: `src/page-components/Book.tsx` and `src/app/book/page.tsx`
- 4 steps: Service Selection → Contact Info → Intake Questions → Confirmation
- Uses components from `src/components/` (ServiceSelectionVisual, ContactInfoFormVisual, IntakeQuestionsVisual, BookingConfirmationVisual)
- Submits to `/api/leads` endpoint
- Design system uses Tailwind CSS with custom theme tokens (radiance-gold, depth-base, etc.)

## Requirements

### Core Principle: MAXIMUM FRICTIONLESS EXPERIENCE

**Goal**: Make it as easy as possible for users to share their business context and get value. Every extra click, field, or step is friction. Eliminate it.

**Key Principles:**
- **3 steps maximum** (upload+contact → AI analysis → report)
- **Auto-proceed** wherever possible (no "Next" buttons if not needed)
- **Minimal fields** (only name + email required)
- **Single file upload** (one comprehensive doc is better than multiple)
- **Clear messaging** about what document to upload
- **Auto-submit** after report generation (no confirmation step)
- **Visual feedback** at every moment

### What We Want to Change

1. **Remove Step 1 (Service Selection)** - Everyone will go through the AI Readiness Diagnostic, so no service selection needed
2. **Ultra-Frictionless Experience** - Minimize steps, combine actions, make it as easy as possible
3. **Clear Document Messaging** - Users must understand they should upload ONE comprehensive business document that explains everything about their business (business plan, pitch deck, company overview, strategy doc, etc.)
4. **AI Analysis with Visual Feedback** - Show AI "reading" documents and generating a personalized value proposition report automatically
5. **Use Google Gemini API** - Integrate with Google Gemini API for document analysis and report generation

### New User Flow (ULTRA-FRICTIONLESS - 3 Steps Max)

**Step 1: Upload + Contact (Combined) - THE ONLY INPUT STEP**

**Messaging (make this CRYSTAL CLEAR):**
- **Headline**: "Upload Your Business Document"
- **Subheadline**: "Share the document that best explains your business"
- **Examples**: "Business plan • Pitch deck • Company overview • Strategy document"
- **Helper text**: "The more comprehensive, the better we can understand your business and create personalized value"
- **Why it matters**: Make them understand we need ONE document that explains everything about their business - not multiple files, not partial info, but a comprehensive overview

**UI Elements:**
- **Single file upload** (one comprehensive doc is better than multiple)
- Large drag & drop zone with clear messaging
- File preview card (filename, type, size) when uploaded
- **Inline contact form** right below upload (same step, no separate page):
  - Name (required)
  - Email (required)
  - Company (optional - can be inferred from doc)
- **Auto-proceed** once file is uploaded AND name/email filled (no "Continue" button needed - just auto-trigger analysis)
- **Visual state**: Show checkmarks/indicators when each requirement is met

**Step 2: AI Analysis (Automatic)**
- **Auto-triggers** after Step 1 completion
- Animated "reading" indicators
- Progress feedback with status messages:
  - "Reading your business document..."
  - "Understanding your business context..."
  - "Identifying opportunities..."
  - "Creating your personalized value proposition..."
- Use Google Gemini API to:
  - Extract text from uploaded document
  - Analyze business context, challenges, opportunities
  - Generate personalized value proposition report
- **No user interaction needed** - just watch the magic happen

**Step 3: Report + Auto-Submit (Combined)**
- Display generated AI report immediately
- **Auto-submit in background** (don't wait for user confirmation)
- Show success message with report
- Option to download/email report
- Clear next steps (e.g., "We'll be in touch within 24 hours")

## Technical Specifications

### API Integration

**Google Gemini API Setup:**
- Use `@google/generative-ai` package
- API key should be stored in environment variable: `GOOGLE_GEMINI_API_KEY`
- Create new API route: `/api/analyze-documents` (POST)
  - Accepts: files (multipart/form-data), user info
  - Processes documents with Gemini
  - Returns: analysis results, value proposition report

**Document Processing:**
- Support file types: PDF, DOCX, DOC, TXT, MD
- Extract text content from documents
- Send to Gemini with prompt for analysis
- Generate structured value proposition report

**Gemini Prompt Template:**
```
You are an AI consultant analyzing a comprehensive business document to create a personalized value proposition for AI transformation.

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
[Document content here]

Format as JSON with these exact keys: context, challenges, opportunities, valueProposition, nextSteps
```

### Component Structure

Create new components in `src/components/`:

1. **DocumentUploadVisual.tsx**
   - **Prominent messaging**: "Upload your comprehensive business document"
   - **Clear examples**: "Business plan, pitch deck, company overview, strategy document, etc."
   - **Single file upload** (simpler than multiple)
   - Drag & drop zone (large, inviting)
   - File upload input
   - File preview card (show filename, type, size)
   - Remove/replace file functionality
   - File type validation (PDF, DOCX, DOC, TXT, MD)
   - File size limits (e.g., 20MB max - generous for comprehensive docs)
   - **Inline contact form** (name, email, optional company) - all on same step
   - **Auto-proceed** when file uploaded + name/email filled

2. **AIAnalysisVisual.tsx**
   - Animated "reading" indicators
   - Progress bar/steps
   - Status messages ("Reading documents...", "Analyzing content...", "Generating insights...")
   - Loading animations with brand colors

3. **ValuePropositionReport.tsx**
   - Display AI-generated report
   - Beautiful typography and layout
   - Sections: Context, Challenges, Opportunities, Value Prop, Next Steps
   - Download button
   - Email report option

### Updated BookPage Component

**New Step Flow (3 Steps Only):**
- Step 1: Document Upload + Contact Info (combined, new component)
- Step 2: AI Analysis (automatic, shows processing)
- Step 3: Report Display + Auto-Submit (combined, shows success)

**Key UX Principles:**
- **Auto-proceed** wherever possible (don't make users click "Next" if not needed)
- **Minimal fields** (only name + email required)
- **Clear messaging** about what document to upload
- **Visual feedback** at every step
- **No confirmation step** - auto-submit after report generation

**State Management:**
```typescript
interface BookFormData {
  document: File | null; // Single file only
  name?: string;
  email?: string;
  company?: string;
  aiReport?: {
    context: string;
    challenges: string[];
    opportunities: string[];
    valueProposition: string;
    nextSteps: string[];
  };
  isAnalyzing?: boolean;
  isComplete?: boolean;
}
```

### API Route: `/api/analyze-documents`

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body:
  - file: File (single file)
  - name: string
  - email: string
  - company?: string

**Response:**
```json
{
  "success": true,
  "report": {
    "context": "...",
    "challenges": ["...", "..."],
    "opportunities": ["...", "..."],
    "valueProposition": "...",
    "nextSteps": ["...", "..."]
  },
  "leadId": "uuid" // Return lead ID if auto-submitted
}
```

**Auto-Submit Logic:**
- After generating report, automatically create lead submission
- Store document reference, AI report, and contact info
- Return lead ID in response
- No separate submission step needed

**Implementation Notes:**
- Use `formidable` or `multer` for file handling
- Extract text from PDFs using `pdf-parse` or similar
- Extract text from DOCX using `mammoth` or similar
- Send extracted text to Gemini API
- Process Gemini response into structured format
- Store files temporarily (or upload to Supabase Storage)
- Return structured report

### Updated `/api/leads` Route

**Update POST handler to accept:**
- document_url: string (reference to uploaded document)
- ai_report: JSON object with report data
- service: always 'diagnostic' (hardcoded)
- name: string
- email: string
- company?: string

**Note:** The `/api/analyze-documents` route should handle both analysis AND lead creation in one call to minimize steps.

## Design Requirements

### Visual Style
- Maintain existing design system (radiance-gold accents, depth-base backgrounds)
- Use existing animation patterns (fade-in, slide-up)
- Magical/engaging feel for document upload
- Smooth transitions between steps
- Loading states should feel premium and engaging

### Document Upload UI
- **Large, inviting drop zone** with clear messaging
- **Prominent headline**: "Upload Your Business Document"
- **Subheadline**: "Share the document that best explains your business - business plan, pitch deck, company overview, or any comprehensive document"
- **Examples shown**: "Business plan • Pitch deck • Company overview • Strategy document"
- Animated border/glow effects on hover (radiance-gold)
- Single file preview card with icon, filename, size
- Inline contact form below upload (name, email, optional company)
- **Auto-proceed** when file + name + email are ready
- Clear visual feedback at every step

### AI Analysis UI
- Animated "reading" effect (scrolling text, highlighting)
- Progress steps with checkmarks
- Status messages that update dynamically
- Use brand colors (radiance-gold) for highlights
- Make it feel like AI is actually "thinking"

### Report Display UI
- Clean, readable typography
- Section dividers
- Highlighted key insights
- Professional but engaging layout
- Print-friendly styling

## Implementation Checklist

- [ ] Install dependencies: `@google/generative-ai`, `pdf-parse`, `mammoth`, `formidable`
- [ ] Create `DocumentUploadVisual.tsx` component
- [ ] Create `AIAnalysisVisual.tsx` component
- [ ] Create `ValuePropositionReport.tsx` component
- [ ] Update `Book.tsx` with new step flow
- [ ] Create `/api/analyze-documents` route
- [ ] Update `/api/leads` route to handle documents and AI report
- [ ] Add environment variable for `GOOGLE_GEMINI_API_KEY`
- [ ] Update progress indicator for 3 steps
- [ ] Add file validation and error handling
- [ ] Implement document text extraction
- [ ] Integrate Gemini API calls
- [ ] Format and display AI report
- [ ] Test end-to-end flow

## Environment Variables

Add to `.env.local`:
```
GOOGLE_GEMINI_API_KEY=your_api_key_here
```

## Error Handling

- File size/type validation
- API error handling (Gemini failures)
- Network error handling
- User-friendly error messages
- Retry mechanisms for failed uploads/analysis

## Performance Considerations

- Optimize file uploads (chunking for large files up to 20MB)
- Show progress for long-running AI analysis (can take 10-30 seconds)
- Stream progress updates if possible
- Cache document analysis results
- Consider background job processing for heavy analysis (but prefer real-time for better UX)

## Key Messaging Guidelines

**Document Upload Step:**
- Headline: "Upload Your Business Document"
- Subheadline: "Share the document that best explains your business"
- Examples: "Business plan • Pitch deck • Company overview • Strategy document"
- Helper text: "The more comprehensive, the better we can understand your business and create personalized value"
- CTA: "Upload Document" or auto-proceed when ready

**AI Analysis Step:**
- "Reading your business document..."
- "Understanding your business context..."
- "Identifying opportunities..."
- "Creating your personalized value proposition..."

**Report Step:**
- "Your Personalized Value Proposition"
- "We've analyzed your business and created a custom report"
- "We'll be in touch within 24 hours to discuss next steps"

## Security

- Validate file types server-side
- Sanitize file names
- Rate limit API calls
- Secure API key storage
- Validate user input

---

**Start by reading the existing Book.tsx file and related components to understand the current implementation, then build the new experience following the specifications above.**
