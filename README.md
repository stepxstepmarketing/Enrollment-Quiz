# Enrollment System Assessment Quiz

A React-based lead generation quiz application that evaluates business enrollment systems using the CIRCLE methodology. Built for Step x Step Marketing.

## Features

- **Interactive 12-question assessment** evaluating 6 key areas (CIRCLE method)
- **Personalized results** with overall score and category breakdown
- **Custom recommendations** based on weakest areas
- **Lead capture** with CRM integration
- **Embedded booking calendar** for follow-up consultations
- **LocalStorage persistence** for page refresh handling

## CIRCLE Methodology

The assessment evaluates businesses across six critical enrollment phases:

| Phase | Focus |
|-------|-------|
| **Clarify** | Ideal student profile and brand messaging |
| **Invite** | Lead generation and landing pages |
| **Review** | Lead qualification and nurturing |
| **Convert** | Trial-to-enrollment conversion |
| **Loopback** | Follow-up with unconverted prospects |
| **Excite** | Retention and referral programs |

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/stepxstepmarketing/Enrollment-Quiz.git
   cd Enrollment-Quiz
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Edit `.env.local` with your values:
   ```env
   VITE_WEBHOOK_URL=your_webhook_url
   VITE_BOOKING_URL=your_booking_calendar_url
   VITE_FORM_EMBED_SCRIPT=your_form_embed_script_url
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_WEBHOOK_URL` | GoHighLevel webhook URL for lead submission |
| `VITE_BOOKING_URL` | Booking calendar widget base URL |
| `VITE_FORM_EMBED_SCRIPT` | External form embed script URL |

## Build

```bash
npm run build
```

The build output will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

## Webhook Payload Structure

When a lead submits the form, the following data is sent to the webhook:

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "businessName": "string",
  "overallScore": "number (0-100)",
  "level": "Foundation | Developing | Optimized",
  "categoryScores": {
    "Clarify": "number",
    "Invite": "number",
    "Review": "number",
    "Convert": "number",
    "Loopback": "number",
    "Excite": "number"
  },
  "scoresSummary": "string",
  "answers": "string (formatted quiz responses)",
  "submittedAt": "ISO 8601 timestamp"
}
```

## Scoring System

- **12 questions** total (2 per category)
- **4 options per question** (0-3 points each)
- **Maximum score**: 36 points (100%)
- **Scoring tiers**:
  - Foundation: < 40%
  - Developing: 40-69%
  - Optimized: 70%+

## Project Structure

```
enrollment-quiz/
├── components/
│   ├── WelcomeStep.tsx      # Landing/intro screen
│   ├── QuizStep.tsx         # Quiz question display
│   ├── LeadCaptureStep.tsx  # Lead form collection
│   └── ResultsStep.tsx      # Results & recommendations
├── App.tsx                  # Main application component
├── index.tsx                # React entry point
├── index.html               # HTML template
├── index.css                # Tailwind directives
├── types.ts                 # TypeScript interfaces
├── constants.ts             # Quiz questions & config
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
└── tsconfig.json            # TypeScript configuration
```

## Deployment

This app can be deployed to any static hosting platform:

- **Netlify**: Push to GitHub and connect to Netlify
- **Vercel**: Push to GitHub and import to Vercel
- **GitHub Pages**: Build and deploy the `dist` folder

For SPA routing support, ensure your hosting platform handles client-side routing (e.g., Netlify's `_redirects` file is included).

## License

MIT License - see [LICENSE](LICENSE) file for details.
