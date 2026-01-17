# AI Readiness Diagnostic System

## Overview

The `/book` page has been redesigned as a frictionless diagnostic funnel that:
1. Collects website URL and contact information
2. Scrapes and analyzes the website
3. Detects tech stack (WordPress, Webflow, Next.js, etc.)
4. Generates AI readiness score and brief assessment
5. Shows capacity gap analysis
6. Allows booking a call to receive full reports

After booking, the system automatically generates:
- Full AI Readiness Diagnostic Report
- Detailed Capacity Gap Analysis  
- 3 HTML demo versions of their AI Super Intelligence System

All data is stored in the lead record for easy access by sales in the admin dashboard.

## Database Setup

Run the SQL migration to add diagnostic fields to the `lead_submissions` table:

```bash
# Connect to your Supabase database and run:
psql -h your-db-host -U postgres -d postgres -f supabase/diagnostic-schema.sql

# Or execute the SQL directly in Supabase SQL Editor
```

The migration adds these fields:
- `website_url` - The website URL provided
- `tech_stack` - Detected technology stack (JSONB)
- `website_story` - Extracted business story from website
- `readiness_score` - AI readiness score (0-100)
- `readiness_brief` - Brief readiness description
- `capacity_gap_analysis` - Capacity gap analysis
- `full_readiness_report` - Complete diagnostic report (generated after booking)
- `system_demo_links` - Array of 3 demo links (generated after booking)
- `booking_calendly_link` - Calendly booking link
- `booked_at` - Timestamp when call was booked

## Environment Variables

Make sure you have these environment variables set:

```env
GOOGLE_GEMINI_API_KEY=your-gemini-api-key
NEXT_PUBLIC_BOOKING_URL=https://calendly.com/your-link
```

## API Routes

### POST `/api/analyze-website`
Analyzes a website and generates readiness assessment.

**Request:**
```json
{
  "websiteUrl": "https://example.com",
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Example Corp",
  "phone": "+1 555-1234"
}
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "techStack": {
      "platform": "WordPress",
      "frameworks": ["React"],
      "hosting": "Vercel"
    },
    "websiteStory": "Business story extracted from website...",
    "readinessScore": 65,
    "readinessBrief": "Brief assessment...",
    "capacityGapBrief": "Capacity gaps identified..."
  },
  "leadId": "uuid"
}
```

### POST `/api/book-call`
Records a booking and triggers generation of full reports and demos.

**Request:**
```json
{
  "leadId": "uuid",
  "calendlyLink": "https://calendly.com/your-link"
}
```

**Response:**
```json
{
  "success": true
}
```

### GET `/api/demo/[leadId]/[version]`
Serves generated HTML demo files (versions 1-3).

## Flow

1. **User visits `/book`**
   - Enters website URL and contact info
   - System auto-proceeds when all fields are filled

2. **Website Analysis**
   - Scrapes website content
   - Detects tech stack
   - Extracts business story
   - Generates readiness score and briefs

3. **Readiness Report Display**
   - Shows readiness score (0-100)
   - Displays tech stack badges
   - Shows readiness brief
   - Shows capacity gap analysis
   - "Book Call" button

4. **After Booking**
   - Full readiness report generated
   - Detailed capacity gap analysis generated
   - 3 HTML demo versions generated
   - All stored in lead record
   - Lead status updated to "contacted"

5. **Admin Dashboard**
   - Leads list shows website URL and readiness score
   - Lead detail page shows all diagnostic data
   - Full reports and demo links accessible

## Admin Dashboard Features

### Leads List (`/admin/leads`)
- Shows website URL column
- Shows readiness score column
- Filterable and sortable

### Lead Detail (`/admin/leads/[id]`)
Shows comprehensive diagnostic information:
- Website URL and tech stack
- AI Readiness Assessment (score + brief)
- Capacity Gap Analysis
- Full Readiness Report (if generated)
- System Demo Links (if generated)
- Booking Information

## Tech Stack Detection

The system detects:
- **Platforms**: WordPress, Webflow, Next.js, Shopify, Squarespace, Wix
- **Frameworks**: React, Vue.js
- **Hosting**: Vercel, Netlify, Webflow, WordPress.com
- **Analytics**: Google Analytics

## Customization

### Calendly Integration
Update `NEXT_PUBLIC_BOOKING_URL` in your environment variables to point to your Calendly link.

### Demo Generation
The demo HTML is generated using AI (Gemini) and can be customized in:
- `src/app/api/book-call/route.ts` - `generateSystemDemo()` function
- `src/app/api/demo/[leadId]/[version]/route.ts` - `generateDemoHTML()` function

### Readiness Scoring
The scoring algorithm can be adjusted in:
- `src/app/api/analyze-website/route.ts` - `analyzeReadiness()` function

## Notes

- Website scraping uses Playwright (headless browser)
- AI analysis uses Google Gemini API
- Demos are generated on-the-fly when accessed (can be cached/stored in production)
- All diagnostic data is stored in Supabase `lead_submissions` table
