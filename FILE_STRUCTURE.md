# OneWinq Project Structure

This repository is a full-stack web application that exposes a landing page, pricing/product purchase flow, dashboard, admin tooling, and API layer for OneWinq NFC card workflows.

## 1) Root-level entries

- `backend/` — Express API, MongoDB models, middleware, API routes, and payment service configuration.
- `frontend/` — Vite + React user-facing interface.
- `package.json` — optional root package manifest for workspace scripts and tooling.
- `promoteAdmin.js` and `scratch_test_db.js` — local maintenance or database testing scripts.

## 2) Backend architecture

```text
backend/
  server.js                Express entrypoint and global middleware
  package.json             API dependencies and scripts
  vercel.json              Vercel serverless deployment configuration
  config/
    db.js                  MongoDB connection setup
    razorpay.js            Razorpay SDK bootstrap and environment guard
  middleware/
    adminMiddleware.js     Admin access checks
    authMiddleware.js      JWT auth middleware
  models/
    Analytics.js           Analytics documents
    Card.js                Card/product entity model
    Connection.js          Contact/connection model
    Order.js               Order lifecycle model, including Razorpay IDs
    Profile.js             User profile model
    User.js                Auth/user identity model
  routes/
    admin.js               Admin operations
    analytics.js           analytics endpoints
    auth.js                Auth endpoints
    card.js                Card-related APIs
    order.js               Pricing/order/payment API, including Razorpay endpoints
    profile.js             Profile endpoints
  services/
    razorpayService.js     Server-side Razorpay order creation and signature verification
  uploads/                 Static upload storage
```

## 3) Frontend architecture

```text
frontend/
  index.html              HTML shell
  package.json            Vite/React dependency and build scripts
  vite.config.js          Vite configuration
  public/
    manifest.json         PWA manifest
    sw.js                 Service worker
  src/
    App.css               App-level styling
    App.jsx               App router and route composition
    main.jsx              React entrypoint
    index.css             Global design tokens/styles
    assets/                images and static assets
    components/
      Footer.jsx
      FreeThemesShowcase.jsx
      LetsConnectSection.jsx
      Logo.jsx
      Navbar.jsx
      NovaTemplate.jsx
      ObsidianTemplate.jsx
      ScrollToTop.jsx
      TemplateCardRenderer.jsx
    context/
      AuthContext.jsx     Auth/global API context
      PWAContext.jsx      PWA enablement context
    data/
      templatesData.js    Template metadata used by the UI
    pages/
      Admin/              admin dashboards
      Auth/               login/signup/password pages
      Dashboard/          authenticated account pages
      Landing/
        Contact.jsx
        Features.jsx
        Home.jsx
        Pricing.jsx     Pricing, plan selection, and card checkout modal
```

## 4) Pricing checkout integration

The pricing experience is centered around the landing pricing screen in `frontend/src/pages/Landing/Pricing.jsx`.

Key flow:

1. A card/product is selected from the landing pricing page.
2. The selected product sets `productType` values such as `pro_plan`, `essential_card`, `signature_card`, `metal_card`, and `founder_edition_card`.
3. The Pricing modal collects customer information and calls `createBackendRazorpayOrder()` from the frontend Razorpay utility.
4. The backend API route `/api/orders/create-payment-order` validates the requested product and server-side price, then creates a Razorpay order through the SDK.
5. The Razorpay Checkout popup is opened by the frontend utility.
6. On success, the frontend sends the Razorpay response payload to `/api/orders/verify-payment`.
7. The backend verifies the signature using the Razorpay key secret and writes status changes to MongoDB via the Order model.

## 5) Payment and security considerations

- Pricing/product amounts are defined on the server in `backend/routes/order.js` to avoid trusting a user-supplied frontend price.
- Razorpay credentials are initialized in `backend/config/razorpay.js` and consumed through `backend/services/razorpayService.js`.
- Checkout callbacks are verified server-side using a SHA-256 HMAC over `orderId|paymentId`.
- Webhook payload verification is done with `x-razorpay-signature` and the raw request body in `backend/server.js`.
