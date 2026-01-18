---
tags: [webapp, PRD]
date modified: 2026-01-18
---

# PRD: Life Force Calculator

## Introduction

A web app that reveals the true cost of purchases measured in "life hours" - the actual time your job consumes, not just desk hours. Most people calculate affordability using their stated hourly wage. But your job costs more than working hours. The commute, getting ready, decompressing, after-hours emails - all of it is traded for that paycheck.

This calculator shows users the real trade-off: how many hours of their life they're exchanging for any purchase.

**Core Formula:**

```
True Hourly Rate = Annual Take-Home Pay / Total Annual Life Hours Consumed by Work
Life Hours Cost = Item Price / True Hourly Rate
```

## Goals

- Help users understand the true time-cost of purchases beyond simple wage calculations
- Account for all job-related time: commute, prep, after-hours work
- Provide results in relatable units (days, weeks, early mornings)
- Deliver a frictionless, single-page experience with no signup or data storage
- Work seamlessly on mobile devices

## User Stories

### US-001: Select income input method

**Description:** As a user, I want to choose between entering my annual salary or hourly rate so I can use whichever I know.

**Acceptance Criteria:**
- [ ] Toggle switch between "Annual Salary" and "Hourly Rate" paths
- [ ] Switching clears previously entered income data
- [ ] Default selection is Annual Salary
- [ ] Typecheck passes
- [ ] Verify in browser

---

### US-002: Enter annual salary details

**Description:** As a user with a salaried job, I want to enter my gross salary and tax rate so the app can calculate my take-home pay.

**Acceptance Criteria:**
- [ ] Input field for annual salary (numeric, currency formatted)
- [ ] Input field for estimated tax rate (percentage, 0-100)
- [ ] Inline validation: salary must be positive number
- [ ] Inline validation: tax rate must be 0-100
- [ ] Helpful error messages appear below invalid fields
- [ ] Typecheck passes
- [ ] Verify in browser

---

### US-003: Enter hourly rate details

**Description:** As a user paid hourly, I want to enter my take-home hourly rate directly.

**Acceptance Criteria:**
- [ ] Input field for hourly rate (numeric, currency formatted)
- [ ] Inline validation: rate must be positive number
- [ ] Helpful error message for invalid input
- [ ] Typecheck passes
- [ ] Verify in browser

---

### US-004: Enter time commitment details

**Description:** As a user, I want to enter all the time my job consumes weekly so I get an accurate life-hours calculation.

**Acceptance Criteria:**
- [ ] Input for hours at work per week (required)
- [ ] Input for commute time per week - round trip (required)
- [ ] Input for getting-ready time per week (required)
- [ ] Input for after-hours work time per week (required)
- [ ] All inputs validate as non-negative numbers
- [ ] Inline validation with helpful error messages
- [ ] Typecheck passes
- [ ] Verify in browser

---

### US-005: Enter item details

**Description:** As a user, I want to enter what I'm considering buying and its price.

**Acceptance Criteria:**
- [ ] Text input for item description (optional but encouraged)
- [ ] Numeric input for item price (required, positive number)
- [ ] Inline validation for price field
- [ ] Typecheck passes
- [ ] Verify in browser

---

### US-006: View life hours result

**Description:** As a user, I want to see how many life hours a purchase costs, displayed prominently with context.

**Acceptance Criteria:**
- [ ] Life hours cost displayed as primary result (large typography)
- [ ] Breakdown shows equivalent in:
  - Work days (based on user's total daily hours)
  - Full work weeks
  - Early mornings waking up
- [ ] True hourly rate displayed for reference
- [ ] Item description shown in result context
- [ ] Typecheck passes
- [ ] Verify in browser

---

### US-007: Navigate through steps

**Description:** As a user, I want to progress through input steps clearly and go back to edit previous entries.

**Acceptance Criteria:**
- [ ] Step indicator shows current position (Step 1, 2, 3)
- [ ] "Next" button advances to next step when inputs valid
- [ ] "Back" button returns to previous step with data preserved
- [ ] Cannot advance with invalid inputs (button disabled or shows validation)
- [ ] Typecheck passes
- [ ] Verify in browser

---

### US-008: Calculate new item

**Description:** As a user viewing results, I want to quickly calculate a different item without re-entering my work details.

**Acceptance Criteria:**
- [ ] "Calculate Another" button on results screen
- [ ] Returns to item input step (Step 2)
- [ ] Work details from Step 1 preserved
- [ ] Typecheck passes
- [ ] Verify in browser

---

### US-009: Start fresh

**Description:** As a user, I want to reset everything and start over with new work details.

**Acceptance Criteria:**
- [ ] "Start Over" button available on results screen
- [ ] Clears all inputs and returns to Step 1
- [ ] Typecheck passes
- [ ] Verify in browser

### US-010: UI Improvements

Description: As a user, I want to be able to toggle between a light mode and dark mode for display purposes.

Acceptance Criteria:

- [ ] Toggle exists on page for user to choose between dark mode and light mode ➕ 2026-01-18
- [ ] Page respects system settings for dark mode and light mode
- [ ] Verify in browser

## Functional Requirements

- FR-1: Toggle between Annual Salary and Hourly Rate input paths
- FR-2: Annual Salary path collects: gross salary, estimated tax rate
- FR-3: Hourly Rate path collects: take-home hourly rate
- FR-4: Both paths collect: work hours/week, commute hours/week, prep hours/week, after-hours work/week
- FR-5: Item input collects: description (optional), price (required)
- FR-6: Calculate True Hourly Rate = (Annual Salary × (1 - Tax Rate)) / (Total Weekly Hours × 52)
- FR-7: Calculate Life Hours Cost = Item Price / True Hourly Rate
- FR-8: Display results in life hours, work days, work weeks, and early mornings
- FR-9: All numeric inputs validate inline with helpful error messages
- FR-10: Step indicator reflects current position in flow
- FR-11: Navigation buttons enable forward/backward movement through steps
- FR-12: "Calculate Another" preserves work details, clears item input
- FR-13: "Start Over" clears all data and returns to Step 1

## Non-Goals (Out of Scope)

- Saving or comparing multiple purchase scenarios
- Multiple currency support
- Sharing results via link or social media
- User accounts or data persistence
- Tax calculation beyond simple percentage estimate
- Location-based tax suggestions
- Integration with payroll or financial services

## Design Considerations

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Luster White | #F4F1EC | Page background |
| Shoji White | #E6DFD3 | Cards, input backgrounds |
| Hazy Blue | #BCC8CC | Borders, dividers |
| Washed Black | #1F262A | Primary text |
| Caught Red-Handed | #BE4236 | Primary buttons, life hours emphasis |
| Teal Blue | #347899 | Secondary elements, links, accents |

### UI Guidelines

- Clean, minimal design with generous whitespace
- Large typography for life hours result (primary focus)
- Step indicator showing 1-2-3 progress
- Mobile-first responsive layout
- Input labels above fields
- Error messages in red below invalid fields
- Buttons full-width on mobile, auto-width on desktop
- Dark mode & light mode toggle for page on right

## Technical Considerations

- Single HTML file with inline CSS and JavaScript
- No external framework dependencies
- No data persistence (fresh start each session)
- Single page with show/hide sections (no routing)
- Mobile-friendly responsive layout using CSS media queries
- Form validation using native HTML5 attributes + JavaScript

## Success Metrics

- User can complete full calculation in under 60 seconds
- All inputs validate with clear, helpful error messages
- Results display within 100ms of clicking calculate
- Layout renders correctly on mobile (320px) through desktop (1440px)
- Verification test cases pass (see below)
- User can toggle between light mode and dark mode

## Verification Test Cases

### Test Case 1: Annual Salary Path

**Inputs:**
- $80,000 salary, 30% tax rate
- 40 hours/week at work
- 5 hours/week commute
- 5 hours/week getting ready
- 2 hours/week after-hours work
- Item: $500

**Expected:**
- Take-home: $56,000/year
- Total weekly hours: 52 hours
- Annual hours: 2,704 hours
- True hourly rate: ~$20.71/hour
- Life hours cost: ~24.1 hours

### Test Case 2: Hourly Rate Path

**Inputs:**
- $25/hour take-home
- Same time inputs as above
- Item: $500

**Expected:**
- True hourly rate adjusted for total hours: ~$19.23/hour
- Life hours cost: ~26 hours

## Open Questions

- Should we show a comparison to "naive" hourly rate to emphasize the difference?
- Any specific copy/messaging for the result screen to maximize impact?
- Should validation prevent unrealistic inputs (e.g., 200 hours/week)?
