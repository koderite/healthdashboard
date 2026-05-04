# HealthDashboard - Patient Medical Dashboard

A React-based medical dashboard application for viewing patient information, diagnosis history, vital signs, diagnostic lists, and lab results.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Recharts** - Data visualization (blood pressure charts)
- **React Query (@tanstack/react-query)** - Data fetching
- **Axios** - HTTP client
- **Radix UI** - UI component primitives

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx         # Main layout container
│   │   ├── TopNavigation.tsx     # Header with logo, nav, profile
│   │   ├── PatientListPanel.tsx   # Left panel - patient list
│   │   └── PatientProfilePanel.tsx # Right panel - patient details
│   ├── sections/
│   │   ├── DiagnosisHistory.tsx  # Blood pressure chart
│   │   ├── VitalSignsCards.tsx    # 3 vital sign cards
│   │   ├── DiagnosticList.tsx     # Diagnostic table
│   │   └── LabResults.tsx         # Lab results list
│   ├── shared/
│   │   ├── SectionCard.tsx        # Reusable card wrapper
│   │   ├── VitalSignCard.tsx      # Individual vital sign card
│   │   ├── StatusPill.tsx          # Status badge
│   │   └── InfoRow.tsx            # Icon + label + value row
│   └── ui/                        # shadcn/ui components
├── hooks/
│   └── usePatients.ts            # React Query hook for API
├── lib/
│   ├── api.ts                     # Axios API client
│   ├── utils.ts                   # Utility functions
│   └── ui.ts                      # UI constants (deprecated)
├── assets/                       # SVG icons and images
└── index.css                     # Global styles & design tokens
```

## Features

### API Integration
- Fetches patient data from Coalition Technologies API
- Uses React Query for data fetching with caching
- Basic Auth authentication (`coalition:skills-test`)
- Endpoint: `https://fedskillstest.coalitiontechnologies.workers.dev`

### UI Components
- **Patient List** - Shows all patients, highlights active patient (Jessica Taylor)
- **Patient Profile** - Avatar, personal info, contact details, insurance
- **Diagnosis History** - Blood pressure chart with systolic/diastolic lines
- **Vital Signs** - Respiratory rate, temperature, heart rate cards
- **Diagnostic List** - Table with problem, description, status
- **Lab Results** - Scrollable list with download icons

### Styling
- Custom CSS classes in `index.css`
- Design tokens (colors, fonts, spacing) defined in CSS variables
- Reusable component classes for consistency
- Custom scrollbar styling

### Animations
- Page load stagger animations with Framer Motion
- Smooth transitions on patient selection
- Card hover effects

## Design System

### Typography
- Font: Manrope
- Heading: 24px bold (extrabold 800)
- Subtitle: 24px extrabold
- Body: 14px regular
- Body Emphasized: 14px bold

### Colors
- Primary: `#01F0D0` (teal)
- Navy: `#072635` (text color)
- Page Background: `#F6F7F8`
- Card Background: `#FFFFFF`
- Chart Systolic: `#C26EB4` / `#E66FD2`
- Chart Diastolic: `#7E6CAB` / `#8C6FE6`

## API Response Format

```json
{
  "name": "Jessica Taylor",
  "gender": "Female",
  "age": 28,
  "profile_picture": "https://...",
  "date_of_birth": "1996-08-23",
  "phone_number": "(415) 555-1234",
  "emergency_contact": "(415) 555-5678",
  "insurance_type": "Sunrise Health Assurance",
  "diagnosis_history": [...],
  "diagnostic_list": [...],
  "lab_results": [...]
}
```

## Notes

- Only Jessica Taylor's data is populated in the main content area
- Patient list shows all patients from API
- Scrollbar styling is consistent across all scrollable elements
- Console logs API response for debugging (remove in production)