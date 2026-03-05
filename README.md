# Expense Manager — React Frontend Assessment

A multi-subsidiary expense tracking application built with Next.js, React, Redux Toolkit, and Ant Design. Organizations can manage multiple subsidiaries, each recording expenses in their own currency, with consolidated reporting in the base currency.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **State Management:** Redux Toolkit
- **UI Library:** Ant Design
- **Styling:** Tailwind CSS v4
- **Currency API:** [open.er-api.com](https://open.er-api.com)

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## How to Use

### 1. Create an Organization
On the home screen, enter your organization name and select a base currency (e.g. USD). This is the currency all expenses will be consolidated into on the dashboard.

### 2. Add Subsidiaries
Navigate to **Subsidiaries** from the header. Click **Add Subsidiary** and provide a name and default currency (e.g. INR, AED, EUR).

### 3. Access a Subsidiary
Click **View Expenses →** next to any subsidiary. You will be prompted for a password.

> **Default subsidiary password:** `sub@1234`

### 4. Manage Expenses
Inside a subsidiary, you can:
- **Add** a new expense — the live exchange rate is fetched at the time of creation and stored with the expense
- **Edit** an existing expense — updates name, category, amount, date, and notes without recalculating the exchange rate

### 5. Dashboard
The dashboard shows:
- Total consolidated expenses in the base currency
- Per-subsidiary expense totals in their own currency
- Expense breakdown by category in the base currency

---

## Architecture Decisions

### State Management — Redux Toolkit
All application state (organization, subsidiaries, expenses) is managed via Redux Toolkit with separate slices. Business logic such as currency conversion and category aggregation is kept in `utils/currencyUtils.ts`, separate from UI components.

### LocalStorage Persistence
State is persisted to `localStorage` via `store.subscribe()` and rehydrated on page load using `loadState()`. This means data survives page refreshes without a backend.

### Exchange Rate Handling
Exchange rates are fetched live from `open.er-api.com` when an expense is created, and stored on the expense record itself. Editing an expense does **not** re-fetch or recalculate the rate — preserving the historical rate at the time of entry, as required.

### Subsidiary Login Simulation
Each subsidiary is protected by a simple password prompt before accessing its expenses. The default password is `sub@1234` and is documented here for assessment purposes.

### Project Structure

```
app/
  page.tsx                  # Organization setup (home)
  dashboard/page.tsx        # Organization dashboard
  subsidiaries/page.tsx     # Subsidiary list
  expenses/[subsidiaryId]/  # Expense management per subsidiary
components/
  AppLayout.tsx             # Shared header + layout
  AddSubsidiaryModal.tsx    # Create subsidiary
  SubsidiaryLoginModal.tsx  # Login simulation
  AddExpenseModal.tsx       # Add / edit expense
features/
  organization/             # Redux slice
  subsidiaries/             # Redux slice
  expenses/                 # Redux slice
services/
  exchangeRateService.ts    # Exchange rate API
utils/
  currencyUtils.ts          # Conversion + aggregation logic
  storage.ts                # LocalStorage helpers
store/
  store.ts                  # Redux store configuration
```

---

## Notes

- No backend or database is required — all data is stored in `localStorage`
- The exchange rate API is public and free with no key required
- If the exchange rate API is unavailable, the app falls back to a rate of `1` and shows an error in the modal
