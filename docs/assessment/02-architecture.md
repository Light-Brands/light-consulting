# AI Go/No-Go Assessment - Architecture

## System Architecture

```mermaid
graph TB
    subgraph Client["Client (Browser)"]
        UI[Assessment UI]
        State[React State]
    end

    subgraph NextJS["Next.js App"]
        Page["/assessment page"]
        API1["/api/assessment/create"]
        API2["/api/assessment/checkout"]
        API3["/api/assessment/intake"]
        API4["/api/assessment/status"]
        Webhook["/api/stripe/webhook"]
    end

    subgraph External["External Services"]
        Stripe[Stripe Checkout]
        Calendar[LeadConnector Calendar]
        Supabase[(Supabase DB)]
    end

    UI --> Page
    Page --> State
    State --> API1
    State --> API2
    State --> API3
    State --> API4

    API1 --> Supabase
    API2 --> Stripe
    API3 --> Supabase
    API4 --> Supabase

    Stripe --> Webhook
    Webhook --> Supabase

    UI --> Calendar

    style Stripe fill:#635bff,color:#fff
    style Supabase fill:#3ecf8e,color:#fff
    style Calendar fill:#ff6b35,color:#fff
```

## File Structure

```
src/
├── app/
│   ├── assessment/
│   │   └── page.tsx                    # Route entry point
│   └── api/
│       ├── assessment/
│       │   ├── create/route.ts         # Create new assessment
│       │   ├── checkout/route.ts       # Stripe checkout session
│       │   ├── intake/route.ts         # Submit intake responses
│       │   └── status/route.ts         # Get assessment status
│       └── stripe/
│           └── webhook/route.ts        # Stripe webhook handler
│
├── page-components/
│   └── Assessment.tsx                  # Main page component
│
├── components/
│   └── assessment/
│       ├── index.ts                    # Barrel exports
│       ├── AssessmentQualifyStage.tsx  # Stage 2: Qualification
│       ├── AssessmentBookStage.tsx     # Stage 3: Calendar booking
│       ├── AssessmentEducateStage.tsx  # Stage 4: VSL viewing
│       ├── AssessmentConfirmStage.tsx  # Stage 5: Confirmation
│       ├── AssessmentCommitStage.tsx   # Stage 6: Payment
│       ├── AssessmentIntakeStage.tsx   # Stage 7: Questionnaire
│       └── AssessmentStatusStage.tsx   # Stages 8-10: Status/Verdict
│
├── lib/
│   ├── constants.ts                    # ASSESSMENT_CONFIG, INTAKE_QUESTIONS
│   └── stripe.ts                       # createAssessmentCheckout helper
│
└── types/
    ├── index.ts                        # AssessmentFormData, AssessmentStage
    └── database.ts                     # AssessmentSubmission types
```

## Data Flow

### Stage Progression

```mermaid
sequenceDiagram
    participant U as User
    participant UI as Assessment UI
    participant API as API Routes
    participant DB as Supabase
    participant S as Stripe
    participant C as Calendar

    Note over U,C: Stage 2: QUALIFY
    U->>UI: Fill form + checkboxes
    UI->>API: POST /assessment/create
    API->>DB: Insert assessment_submission
    DB-->>API: Return assessment_id
    API-->>UI: assessment_id

    Note over U,C: Stage 3: BOOK
    U->>C: Select time slot
    C-->>UI: postMessage (booking confirmed)
    UI->>UI: Store booking info in state

    Note over U,C: Stage 4: EDUCATE
    U->>UI: Watch VSL (90% required)
    UI->>UI: Track progress locally

    Note over U,C: Stage 5: CONFIRM
    U->>UI: Review details
    UI->>UI: Proceed to payment

    Note over U,C: Stage 6: COMMIT
    U->>UI: Click "Pay $5,000"
    UI->>API: POST /assessment/checkout
    API->>S: Create checkout session
    S-->>API: Return checkout_url
    API->>DB: Store session_id
    API-->>UI: checkout_url
    UI->>S: Redirect to Stripe
    U->>S: Complete payment
    S->>API: Webhook: checkout.session.completed
    API->>DB: Update payment_completed = true

    Note over U,C: Stage 7: INTAKE
    U->>UI: Fill questionnaire + Loom URL
    UI->>API: POST /assessment/intake
    API->>DB: Store responses
    API-->>UI: Success

    Note over U,C: Status Display
    UI->>API: GET /assessment/status
    API->>DB: Fetch assessment
    DB-->>API: Assessment data
    API-->>UI: Status + verdict (if delivered)
```

## Database Schema

### assessment_submissions Table

```mermaid
erDiagram
    assessment_submissions {
        uuid id PK
        string email
        string name
        string company
        string phone

        enum stage "qualify|book|educate|confirm|commit|intake|status"

        boolean vsl_completed
        int vsl_watch_percentage

        string booking_id
        timestamp booked_slot

        string payment_session_id
        string payment_checkout_url
        boolean payment_completed
        timestamp payment_completed_at
        string payment_intent_id

        jsonb intake_responses
        string loom_video_url
        timestamp intake_submitted_at

        enum verdict "GO|CONDITIONAL_GO|NO_GO"
        timestamp verdict_delivered_at
        string verdict_report_url

        timestamp created_at
        timestamp updated_at
    }
```

### TypeScript Types

```typescript
// Assessment Stages
type AssessmentStage =
  | 'qualify'   // Landing/self-qualification
  | 'book'      // Calendar booking
  | 'educate'   // VSL video viewing
  | 'confirm'   // Booking confirmation
  | 'commit'    // Payment ($5,000)
  | 'intake'    // Questionnaire + Loom
  | 'status';   // Assessment status/confirmation

// Verdict Types
type AssessmentVerdict = 'GO' | 'CONDITIONAL_GO' | 'NO_GO' | null;

// Form Data (Client State)
interface AssessmentFormData {
  // Contact info
  name?: string;
  email?: string;
  company?: string;
  phone?: string;

  // Qualification
  isDecisionMaker?: boolean;
  acceptsFixedPricing?: boolean;
  openToNegativeVerdict?: boolean;

  // VSL tracking
  vslStartedAt?: Date;
  vslCompletedAt?: Date;
  vslWatchPercentage?: number;

  // Booking
  bookingId?: string;
  bookedSlot?: Date;
  bookingConfirmed?: boolean;

  // Payment
  paymentSessionId?: string;
  paymentCompleted?: boolean;
  paymentCompletedAt?: Date;

  // Intake
  intakeResponses?: Record<string, string>;
  loomVideoUrl?: string;
  intakeSubmittedAt?: Date;

  // Assessment
  assessmentId?: string;
  verdict?: AssessmentVerdict;
  verdictDeliveredAt?: Date;
}
```

## Component Architecture

```mermaid
graph TD
    subgraph Page["Assessment Page"]
        AP[Assessment.tsx]
    end

    subgraph Stages["Stage Components"]
        S1[QualifyStage]
        S2[BookStage]
        S3[EducateStage]
        S4[ConfirmStage]
        S5[CommitStage]
        S6[IntakeStage]
        S7[StatusStage]
    end

    subgraph Shared["Shared Components"]
        BTN[Button]
        SEC[Section]
        CON[Container]
        PRG[BookProgressVisual]
    end

    AP --> S1
    AP --> S2
    AP --> S3
    AP --> S4
    AP --> S5
    AP --> S6
    AP --> S7

    S1 --> BTN
    S2 --> BTN
    S3 --> BTN
    S4 --> BTN
    S5 --> BTN
    S6 --> BTN
    S7 --> BTN

    AP --> SEC
    AP --> CON
    AP --> PRG
```

## State Management

The assessment uses React's built-in state management with `useState` and `useCallback`:

```mermaid
stateDiagram-v2
    [*] --> qualify
    qualify --> book: Submit qualification
    book --> educate: Complete booking
    educate --> confirm: Watch 90% VSL
    confirm --> commit: Confirm details
    commit --> intake: Payment complete
    intake --> status: Submit intake
    status --> [*]: View verdict
```

### State Updates

| Action | State Change | Side Effect |
|--------|-------------|-------------|
| Submit Qualify | `stage: 'book'`, store contact info | POST /assessment/create |
| Complete Booking | `stage: 'educate'`, store booking info | - |
| Watch VSL | `stage: 'confirm'`, store watch % | - |
| Confirm | `stage: 'commit'` | - |
| Pay | `stage: 'intake'` | POST /assessment/checkout → Stripe |
| Submit Intake | `stage: 'status'` | POST /assessment/intake |

## Security Considerations

1. **Payment Security**: All payments processed via Stripe Checkout (PCI compliant)
2. **Webhook Verification**: Stripe webhook signatures verified before processing
3. **Database Access**: Supabase admin client used server-side only
4. **Type Safety**: TypeScript types enforce data integrity
5. **Input Validation**: Server-side validation on all API routes
