# Life Force Calculator - Requirements

## Overview

A web app that calculates the true cost of purchases in "life hours" - accounting for all time your job consumes, not just desk hours.

## Core Concept

Most people calculate affordability using their stated hourly wage. But your job costs more than just at-work hours. The commute, getting ready, decompressing, after-hours emails - all of it is traded for that paycheck.

**Formula:**
```
True Hourly Rate = Annual Take-Home Pay / Total Annual Life Hours Consumed by Work
Life Hours Cost = Item Price / True Hourly Rate
```

## User Flow

### Step 1: Work Details Input

**Two input paths (toggle between them):**

**Path A: Annual Salary**
- Annual salary (gross)
- Estimated tax rate (to calculate take-home)

**Path B: Hourly Rate**
- Hourly rate (what you actually take home per hour worked)

**Both paths require:**
- Hours at work per week
- Commute time per week (round trip)
- Getting ready time per week (work-specific prep)
- After-hours work time per week (emails, calls, travel)

### Step 2: Item Input
- Item description (what are you buying?)
- Item price

### Step 3: Result Display
- Life hours cost (prominent)
- Breakdown into relatable units:
  - Work days
  - Full work weeks
  - Early mornings waking up
- True hourly rate display

## Technical Requirements

- Single HTML file with inline CSS and JavaScript
- No framework dependencies
- No data persistence (fresh start each session)
- Single page with show/hide steps
- Mobile-friendly responsive layout

## Design Specifications

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Luster White | #F4F1EC | Background |
| Shoji White | #E6DFD3 | Cards, input backgrounds |
| Hazy Blue | #BCC8CC | Borders, dividers |
| Washed Black | #1F262A | Primary text |
| Caught Red-Handed | #BE4236 | Primary buttons, life hours emphasis |
| Teal Blue | #347899 | Secondary elements, accents |

### UI Guidelines
- Clean, minimal design
- Large typography for life hours result
- Step indicator showing progress
- Mobile-first responsive layout

## Verification

**Test Path A (Annual Salary):**
- $80,000 salary, 30% tax rate
- 40 hours/week at work
- 5 hours/week commute
- 5 hours/week getting ready
- 2 hours/week after-hours work
- Expected true hourly rate: ~$20.75/hour
- $500 item should show ~24 life hours

**Test Path B (Hourly Rate):**
- $25/hour take-home
- Same time inputs as above
- Verify calculation adjusts correctly
