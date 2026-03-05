# Ecoyaan Checkout Flow

A simplified checkout flow built with **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS v4** — inspired by the [Ecoyaan](https://ecoyaan.com) platform.

## 🌿 Features

- **3-Step Checkout**: Cart → Shipping Address → Payment Confirmation → Success
- **Server-Side Rendering**: Cart data is fetched at request time using Next.js Server Components with `cache: "no-store"`
- **Form Validation**: Client-side validation for email format, 10-digit phone, 6-digit PIN code, and required fields
- **State Management**: React Context API persists cart data and shipping address across checkout steps
- **Responsive Design**: Mobile-first layout that scales gracefully to desktop
- **Mock API**: Next.js API route (`/api/cart`) simulates a backend data source

## 🏗️ Architecture

```
app/
├── api/cart/route.ts        # Mock API endpoint (GET)
├── page.tsx                 # Home — Server Component fetching cart via SSR
├── shipping/page.tsx        # Shipping address form with validation
├── payment/page.tsx         # Order review & simulated payment
├── success/page.tsx         # Order confirmation page
├── layout.tsx               # Root layout with CheckoutProvider
└── globals.css              # Tailwind + custom animations
components/
└── CartPage.tsx             # Client component for the cart UI
lib/
├── types.ts                 # Shared TypeScript interfaces
└── CheckoutContext.tsx      # React Context for checkout state
```

### SSR Strategy

The home page (`app/page.tsx`) is a **Server Component** that fetches data from `/api/cart` using `fetch` with `cache: "no-store"`, ensuring fresh data on every request. The fetched data is passed as props to the `CartPage` client component, which seeds the React Context on mount.

### State Management

A lightweight **React Context** (`CheckoutContext`) holds the `cartData` and `shippingAddress` so data persists across page navigations without external libraries. Helper methods (`getSubtotal`, `getGrandTotal`) compute derived values.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

| Layer      | Technology              |
| ---------- | ----------------------- |
| Framework  | Next.js 16 (App Router) |
| UI Library | React 19                |
| Styling    | Tailwind CSS v4         |
| Language   | TypeScript 5            |
| State      | React Context API       |

## 📝 Design Decisions

1. **App Router over Pages Router** — Leverages React Server Components for zero-JS SSR of the cart page, reducing client bundle size.
2. **Context API over Redux/Zustand** — The checkout state is simple (cart + address); Context avoids unnecessary dependency overhead for this MVP.
3. **Inline validation with blur triggers** — Provides immediate feedback without waiting for form submission, improving UX.
4. **Inter font** — Clean, modern typeface that aligns with a premium eco-brand aesthetic.
