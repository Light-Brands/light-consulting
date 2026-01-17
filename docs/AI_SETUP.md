# AI Document Analysis Setup Guide

The `/book` page now includes AI-powered document analysis that generates personalized value propositions for potential clients.

## 🚀 Quick Setup

### 1. Get Your Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2. Configure Environment Variables

Create a `.env.local` file in the project root (or copy from `.env.local.example`):

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add your API key:

```env
GOOGLE_GEMINI_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_BOOKING_URL=https://your-calendly-url.com
```

### 3. Restart Your Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## 📋 How It Works

### User Experience

1. **Upload Document** - User uploads a comprehensive business document (PDF, DOCX, TXT, MD)
2. **Fill Info** - User provides name, email, and optionally company name
3. **Generate Report** - Click "Generate My AI Report" button
4. **AI Analysis** - Google Gemini analyzes the document (~20-30 seconds)
5. **View Report** - Personalized value proposition report is displayed
6. **Book a Call** - Prominent "Book a Call" button links to your calendar

### What the AI Analyzes

The AI reads the document and generates:

- **Business Context** - Industry, model, current state
- **Key Challenges** - Problems and bottlenecks identified
- **AI Opportunities** - Where AI can create leverage
- **Value Proposition** - Personalized transformation roadmap
- **Next Steps** - Actionable recommendations

### Backend Flow

1. Document uploaded → Text extracted (PDF, DOCX, etc.)
2. Text sent to Gemini API with strategic prompt
3. AI response parsed into structured report
4. Lead automatically saved to database
5. Report displayed to user

## 🔧 Technical Details

### API Route

`/api/analyze-documents` (POST)

**Request:**
- FormData with: `file`, `name`, `email`, `company` (optional)

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
  "leadId": "uuid"
}
```

### Dependencies

The following packages are already installed:
- `@google/generative-ai` - Gemini AI SDK
- `pdf-parse` - PDF text extraction
- `mammoth` - DOCX text extraction

### File Size Limits

- Maximum file size: 20MB
- Minimum content: 100 characters
- Supported formats: PDF, DOCX, DOC, TXT, MD

## 🎨 Customization

### Modify the AI Prompt

Edit the prompt in `/src/app/api/analyze-documents/route.ts` (line 116) to change how the AI analyzes documents.

### Adjust the Report Display

Edit `/src/components/ValuePropositionReport.tsx` to customize how the report is displayed to users.

### Change Booking URL

Update `NEXT_PUBLIC_BOOKING_URL` in `.env.local` with your Calendly, Cal.com, or other booking calendar URL.

## 🐛 Troubleshooting

### Error: "AI analysis service is not configured"

**Solution:** Add your Gemini API key to `.env.local` and restart the dev server.

### Error: "Failed to extract text from document"

**Solution:** Ensure the document is in a supported format (PDF, DOCX, TXT, MD) and not corrupted.

### Button not showing after upload

**Solution:** Check browser console for errors. Make sure all fields (document, name, email) are filled.

### Analysis takes too long

**Solution:** This is normal for large documents. The analysis typically takes 20-30 seconds. Progress is shown with animated indicators.

## 📝 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_GEMINI_API_KEY` | ✅ Yes | API key from Google AI Studio |
| `NEXT_PUBLIC_BOOKING_URL` | ⚠️ Recommended | Calendar booking URL (Calendly, Cal.com, etc.) |
| `NEXT_PUBLIC_SUPABASE_URL` | ❌ No | For production lead storage |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ❌ No | For production lead storage |
| `SUPABASE_SERVICE_ROLE_KEY` | ❌ No | For production lead storage |

## 🚦 Testing

1. Go to `http://localhost:3000/book`
2. Upload a business document (try the `LIGHTWORKER-MARKET-ANALYSIS-2026.md` file in `/docs`)
3. Fill in your name and email
4. Click "Generate My AI Report"
5. Wait for the analysis (~20-30 seconds)
6. View the generated report
7. Click "Book a Call" to test the calendar integration

## 🔒 Security Notes

- Never commit `.env.local` to version control (it's in `.gitignore`)
- API keys should be kept secret
- The Gemini API key has usage quotas - monitor your usage
- Consider rate limiting in production

## 💰 Costs

Google Gemini API pricing:
- Free tier: 15 requests per minute
- After free tier: ~$0.002 per 1K characters

For typical business documents (5-10K characters), costs are minimal during development.
