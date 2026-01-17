# AI Go/No-Go Assessment System

> A comprehensive documentation of the AI Go/No-Go Assessment funnel implementation for Light Brand Consulting.

## Documentation Index

| Document | Description |
|----------|-------------|
| [Overview](./01-overview.md) | System overview, business logic, and strategy |
| [Architecture](./02-architecture.md) | Technical architecture, file structure, and data flow |
| [User Flow](./03-user-flow.md) | Stage-by-stage user journey with diagrams |
| [API Reference](./04-api-reference.md) | API endpoints, request/response formats |
| [Configuration](./05-configuration.md) | Configuration options and customization |

## Quick Start

Access the assessment at: `/assessment`

## Key Features

- **7-Stage Funnel**: Qualify → Book → Educate → Confirm → Commit → Intake → Status
- **$5,000 Fixed Fee**: No discounts, no payment plans
- **LeadConnector Integration**: Group calendar for assessment agents
- **Stripe Payments**: Secure checkout with webhook handling
- **Mobile-First Design**: Touch-optimized with sticky navigation
- **VSL Gate**: 90% watch requirement before payment

## Tech Stack

- **Frontend**: Next.js 16 with React, Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe Checkout
- **Calendar**: LeadConnector/GHL Widget
- **Video**: Embedded VSL with progress tracking
