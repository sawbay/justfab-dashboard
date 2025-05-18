# Technical Design: Telegram Login & Connect Futurepass

## 1. Overview
This document describes the technical design and user flow for logging in with Telegram and connecting a Futurepass wallet, as implemented in the codebase. It covers frontend and backend logic, security, and UX considerations.

---

## 2. User Flow & Implementation

### Step 1: Telegram Login
- User clicks "Sign in with Telegram" (using `@telegram-auth/react`'s `LoginButton`).
- The app uses Telegram's login widget to authenticate the user.
- On success, the callback triggers `signIn("telegram-login", undefined, data)` from `next-auth`.
- The backend verifies the Telegram login signature and creates/updates the user in the database.
- User session is established via `next-auth` (cookie/JWT).

### Step 2: Connect Futurepass
- After Telegram login, user is prompted to connect their Futurepass wallet.
- User clicks "Connect Wallet" (using `@futureverse/auth-ui`).
- The app requests wallet signature to prove ownership.
- On success, the wallet session is available as `fpSession` from `@futureverse/auth-react`.
- If the user is logged in and their `futurepass` is not yet linked, the app POSTs to `/api/futurepass/link` with `{ telegramId, futurepass }`.
- The backend links the wallet address to the user's Telegram account.
- If linking is successful and the user hasn't received a welcome chest, the backend rewards the user with a key and a welcome chest (see `InventoryItemId` enum for canonical IDs).

---

## 3. Backend Logic

### Telegram Login
- Handled by `next-auth` with a custom provider for Telegram.
- Verifies Telegram login payload signature.
- Upserts user in database using Telegram ID.
- Issues session token (cookie/JWT).

### Connect Futurepass
- Endpoint: `POST /api/futurepass/link`
- Authenticates user session via `next-auth`.
- Validates wallet signature/ownership (handled by Futureverse SDK on frontend).
- Links wallet address to user in database.
- Checks if user already has a welcome chest in inventory:
  - If not, rewards both a key and a welcome chest (using `InventoryItemId` enum).
- Ensures idempotency and prevents race conditions (see inventory docs for details).

---

## 4. Security Considerations
- Always verify Telegram login signatures server-side.
- Ensure wallet connection uses secure signature verification.
- Prevent duplicate rewards by enforcing unique constraints and atomic operations.
- Rate limit login and connect endpoints to prevent abuse.
- Only allow users to link their own Telegram and wallet accounts (checked by comparing session user ID and request Telegram ID).

---

## 5. UX Considerations
- Provide clear feedback for login and wallet connection success/failure.
- Show loading indicators during authentication steps.
- Notify users of rewards (key, welcome chest) after successful linking.
- Prevent users from linking the same wallet to multiple Telegram accounts (if required by business logic).
- Display connected wallet address (shortened) and Telegram username in the UI.

---

## 6. Sequence Diagram

```
User → UI: Clicks "Sign in with Telegram"
UI → Telegram: Authenticate (via @telegram-auth/react)
Telegram → UI: Return user data
UI → next-auth: signIn("telegram-login", ...)
API → DB: Upsert user, issue session
User → UI: Clicks "Connect Wallet"
UI → Wallet: Request signature (via @futureverse/auth-ui)
UI → API: POST /api/futurepass/link
API → DB: Link wallet, check/reward inventory
API → UI: Return success, rewards
UI: Show notification
```

---

## 7. References
- [Telegram Login Documentation](https://core.telegram.org/widgets/login)
- [@telegram-auth/react](https://www.npmjs.com/package/@telegram-auth/react)
- [next-auth](https://next-auth.js.org/)
- [@futureverse/auth-ui](https://www.npmjs.com/package/@futureverse/auth-ui)
- [Futureverse/Futurepass Documentation](https://docs.futureverse.com/) 