# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run lint         # Run ESLint
npm run prettier     # Check code formatting
npm run prettier:fix # Fix code formatting
```

## Architecture Overview

Paramail is a Next.js AI email assistant that helps users analyze, translate, and compose emails. The app is primarily targeted at Korean users who need to handle English emails.

### Project Structure

- **`src/pages/`** - Next.js pages and API routes (uses `.page.ts/.page.tsx` extension convention)
  - `api/generate/` - OpenAI GPT-3.5 email analysis and generation
  - `api/translate.page.ts` - Google Translate API wrapper (EN→KO)
  - `api/credits/` - Credit management (consume, charge via Stripe)
  - `api/webhooks/stripe.page.ts` - Stripe payment webhooks
  - `app/` - Protected app pages (main dashboard, settings)
  - `auth/` - Authentication pages (login/signup)
- **`src/components/`** - Shared UI components
- **`src/hooks/`** - Custom React hooks for state and API logic
- **`src/lib/`** - External service clients (Supabase, Stripe)
- **`src/utils/`** - Utility functions

### Key Custom Hooks

- **`useAnalysis`** - Email analysis with debouncing, parses AI response using `_^` delimiters
- **`useEmailCreation`** - Email generation (reply or new), handles credit consumption
- **`useTranslation`** - Google Translate wrapper for EN→KO translation
- **`useUser`** - Global user context with real-time Supabase subscription for credit updates

### Data Flow

1. User input → Custom hook → API route → External service (OpenAI/Google/Supabase)
2. Response → Hook state → Component render
3. Auto-triggered: `/api/credits/consume` + `/api/usage-log`

### Main User Flows

- **Reply Flow** (`ReplyFlow.tsx`): Multi-step wizard - input English email → translate → analyze (summary, actions, suggested replies) → generate English reply
- **New Email Flow** (`NewMailFlow.tsx`): Two-step - input Korean brief → generate English email

### External Services

- **Supabase**: Auth (email/password, OAuth), database (`profiles` table), real-time subscriptions
- **OpenAI**: GPT-3.5-turbo for email analysis and generation (prompts in `api/generate/promptData.ts`)
- **Google Cloud Translate**: EN→KO translation
- **Stripe**: Credit package purchases (100 or 500 credits)

### Credit System

- 1 credit per translation+analysis, 1 credit per email generation
- Stored in Supabase `profiles.credit` column
- Real-time sync via Supabase subscriptions

## Configuration Notes

- **Page extensions**: Custom `.page.ts/.page.tsx` convention (configured in `next.config.js`)
- **Path alias**: `@/*` maps to `./src/*`
- **SVG imports**: Handled as React components via @svgr/webpack
- **Environment**: Uses `isDevEnv` utility; dev vs production Stripe/OpenAI keys

## AI Prompt Structure

Prompts in `/api/generate/promptData.ts` use few-shot learning with structured output:

- Analysis returns summary, action points, and answer suggestions separated by `_^` delimiters
- Low temperature (0.1) for consistent outputs
