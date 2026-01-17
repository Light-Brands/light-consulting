# AI Go/No-Go Assessment - Configuration

## Configuration Location

All assessment configuration is centralized in:

```
src/lib/constants.ts  →  ASSESSMENT_CONFIG
src/lib/constants.ts  →  ASSESSMENT_INTAKE_QUESTIONS
src/lib/constants.ts  →  ASSESSMENT_DISQUALIFIERS
src/lib/stripe.ts     →  ASSESSMENT_PRICE
```

---

## ASSESSMENT_CONFIG

Main configuration object for the assessment system.

```typescript
// src/lib/constants.ts

export const ASSESSMENT_CONFIG = {
  // Pricing
  price: 5000, // $5,000 fixed fee

  // Branding
  name: 'AI Go/No-Go Assessment™',
  tagline: 'A clear yes/no decision on whether AI makes sense for your business right now.',
  description: 'We sell judgment, not AI. A "no" verdict constitutes successful completion.',

  // Stage Labels (for progress indicator)
  stageLabels: {
    qualify: 'Qualify',
    book: 'Book',
    educate: 'Learn',
    confirm: 'Confirm',
    commit: 'Commit',
    intake: 'Intake',
    status: 'Status',
  } as const,

  // VSL Configuration
  vsl: {
    url: 'https://www.youtube.com/embed/placeholder', // Replace with actual VSL
    minimumWatchPercentage: 90,
    estimatedDuration: '15 minutes',
  },

  // Calendar Configuration (LeadConnector/GHL)
  calendar: {
    url: 'https://api.leadconnectorhq.com/widget/booking/Wk1pAr8Wz4PNCUjrVJtZ',
    provider: 'leadconnector',
  },

  // Verdicts
  verdicts: {
    GO: {
      label: 'GO',
      description: 'AI makes sense for your business right now. Proceed with confidence.',
      color: 'growth-emerald',
    },
    CONDITIONAL_GO: {
      label: 'CONDITIONAL GO',
      description: 'AI could work, but specific conditions must be met first.',
      color: 'radiance-gold',
    },
    NO_GO: {
      label: 'NO-GO',
      description: 'AI is not the right move for your business at this time. This is a successful outcome.',
      color: 'text-muted',
    },
  },
};
```

### Customization Options

| Setting | Current Value | Description |
|---------|---------------|-------------|
| `price` | 5000 | Assessment price in dollars |
| `name` | AI Go/No-Go Assessment™ | Product name shown in UI |
| `vsl.url` | YouTube placeholder | VSL video embed URL |
| `vsl.minimumWatchPercentage` | 90 | Required watch % to proceed |
| `calendar.url` | LeadConnector URL | Booking calendar widget |

---

## ASSESSMENT_INTAKE_QUESTIONS

Configuration for the 13 intake questions.

```typescript
export const ASSESSMENT_INTAKE_QUESTIONS = [
  {
    id: 'business_overview',
    question: 'Describe your business in 2-3 sentences. What do you do and who do you serve?',
    type: 'textarea' as const,
    required: true,
    helpText: 'Be specific about your core offering and target market.',
  },
  {
    id: 'decision_codification',
    question: 'What are the top 3 decisions you make repeatedly in your business?',
    type: 'textarea' as const,
    required: true,
    helpText: 'Think about decisions that happen daily or weekly that follow patterns.',
  },
  // ... 11 more questions
];
```

### Question Types

| Type | HTML Element | Use Case |
|------|--------------|----------|
| `text` | `<input type="text">` | Short answers |
| `textarea` | `<textarea>` | Long-form responses |
| `select` | `<select>` | Predefined options |

### Question Structure

```typescript
interface AssessmentIntakeQuestion {
  id: string;           // Unique identifier (snake_case)
  question: string;     // Question text shown to user
  type: 'text' | 'textarea' | 'select';
  options?: string[];   // Required for type='select'
  required: boolean;    // Validation requirement
  helpText?: string;    // Guidance shown below question
}
```

### Adding a New Question

```typescript
// Add to ASSESSMENT_INTAKE_QUESTIONS array
{
  id: 'new_question_id',
  question: 'Your question text here?',
  type: 'textarea',
  required: true,
  helpText: 'Helpful context for the user.',
},
```

---

## ASSESSMENT_DISQUALIFIERS

Messaging for self-qualification section.

```typescript
export const ASSESSMENT_DISQUALIFIERS = {
  notFor: [
    'AI beginners who need education on what AI can do',
    'Tool shoppers looking for software recommendations',
    'Implementation seekers expecting hands-on help',
    '"How do I use AI?" buyers wanting tutorials',
    'Businesses with no traction or revenue',
    'Those seeking discounts or payment plans',
  ],
  idealFor: [
    'Decision-makers who can invest $5,000 independently',
    'Those who accept fixed pricing without negotiation',
    'People open to hearing "no" as a valid outcome',
    'Businesses with real traction and proven demand',
    'Leaders who value expert judgment over cheap opinions',
  ],
};
```

### Customizing Messages

These messages appear in the qualification stage and serve as:
1. **Filtering mechanism** - Discourages unqualified leads
2. **Expectation setting** - Clarifies what the service IS and ISN'T
3. **Pricing justification** - Reinforces the $5,000 value proposition

---

## Environment Variables

### Required

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxx

# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
```

### Optional

```bash
# App URL (for Stripe redirects)
NEXTAUTH_URL=https://yourdomain.com
```

---

## Calendar Integration

### LeadConnector/GHL Setup

The calendar widget is embedded via iframe:

```typescript
// In ASSESSMENT_CONFIG
calendar: {
  url: 'https://api.leadconnectorhq.com/widget/booking/Wk1pAr8Wz4PNCUjrVJtZ',
  provider: 'leadconnector',
},
```

### Switching Calendar Providers

To use a different calendar (e.g., Calendly):

1. Update the URL in `ASSESSMENT_CONFIG.calendar.url`
2. Update event listener in `AssessmentBookStage.tsx`:

```typescript
// For Calendly
const handleBookingEvent = (e: MessageEvent) => {
  if (e.data.event === 'calendly.event_scheduled') {
    const payload = e.data.payload;
    onBookingComplete(
      payload.event?.uri,
      new Date(payload.event?.start_time)
    );
    onContinue();
  }
};
```

---

## VSL Configuration

### Current Setup

```typescript
vsl: {
  url: 'https://www.youtube.com/embed/placeholder',
  minimumWatchPercentage: 90,
  estimatedDuration: '15 minutes',
},
```

### Supported Video Platforms

| Platform | URL Format | Notes |
|----------|------------|-------|
| YouTube | `https://www.youtube.com/embed/{VIDEO_ID}` | Recommended |
| Vimeo | `https://player.vimeo.com/video/{VIDEO_ID}` | Good alternative |
| Wistia | `https://fast.wistia.net/embed/iframe/{VIDEO_ID}` | Enterprise option |

### Progress Tracking Note

Currently, progress tracking is **simulated** for development. For production:

1. Integrate with video player API (YouTube IFrame API, Vimeo Player SDK)
2. Track actual playback progress
3. Detect seeking/skipping to ensure genuine viewing

---

## Stripe Configuration

### Price Configuration

```typescript
// src/lib/stripe.ts
export const ASSESSMENT_PRICE = 5000; // $5,000
```

### Webhook Events to Monitor

Configure these events in Stripe Dashboard → Webhooks:

```
checkout.session.completed
checkout.session.expired
payment_intent.succeeded
payment_intent.payment_failed
```

### Webhook Endpoint

```
https://yourdomain.com/api/stripe/webhook
```

---

## Database Schema Updates

If you need to add fields to the assessment, update:

1. **Database table** (Supabase migrations)
2. **TypeScript types** (`src/types/database.ts`)
3. **API routes** (handle new fields)
4. **UI components** (display/collect new data)

### Example: Adding a Field

```sql
-- Supabase migration
ALTER TABLE assessment_submissions
ADD COLUMN new_field TEXT;
```

```typescript
// src/types/database.ts
export interface AssessmentSubmission {
  // ... existing fields
  new_field?: string;
}
```

---

## Mobile Optimization

All stage components are mobile-optimized with:

| Feature | Implementation |
|---------|----------------|
| Touch targets | `min-h-[44px]` minimum button height |
| Sticky navigation | Sticky bottom bar on mobile |
| Responsive text | `text-sm sm:text-base` scaling |
| Form inputs | `py-3.5 sm:py-3` comfortable touch input |
| Checkboxes | `w-6 h-6` large touch checkboxes |

### Breakpoints Used

```css
sm: 640px   /* Small screens and up */
md: 768px   /* Medium screens and up */
lg: 1024px  /* Large screens and up */
```

---

## Deployment Checklist

Before going live:

- [ ] Replace VSL placeholder URL with actual video
- [ ] Verify LeadConnector calendar is configured
- [ ] Set up Stripe webhook endpoint
- [ ] Configure all environment variables
- [ ] Create `assessment_submissions` table in Supabase
- [ ] Test complete flow end-to-end
- [ ] Verify mobile responsiveness
- [ ] Set up email notifications (optional)
