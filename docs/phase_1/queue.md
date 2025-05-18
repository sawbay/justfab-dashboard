# Technical Design: Event-Driven Queue for Business Logic

## 1. Overview
This document describes the event-driven, queue-based architecture for processing core business logic in the system. Instead of handling business logic directly in Next.js API routes, we offload processing to a queue and dedicated workers. Next.js only fires events and queries state as needed.

---

## 2. Motivation & Benefits
- **Separation of Concerns:** API routes remain lightweight, focusing on authentication, validation, and event firing.
- **Scalability:** Heavy or slow business logic is processed asynchronously by workers, allowing the web layer to remain responsive.
- **Reliability:** Retries and dead-letter queues can be used for failed jobs.
- **Extensibility:** New business logic can be added as new event types and worker handlers.

---

## 3. Event Types & Business Logic

### a. Reward Inventory Item (e.g., Key, Welcome Chest)
- **When:** After successful actions such as connecting Futurepass (see `connect.md`).
- **How:**
  1. Next.js API fires a `reward_inventory_item` event to the queue, including user ID and item IDs to reward.
  2. Worker processes the event:
     - Checks if the user already has the item (idempotency).
     - If not, creates the inventory item(s) in the database.
     - Handles race conditions and duplicate prevention at the DB level.
  3. API can query inventory state to show updated items to the user.

### b. Use Item
- **When:** User triggers an action to use an item (see `use_item.md`).
- **How:**
  1. Next.js API fires a `use_item` event to the queue, including user ID, item ID, and quantity.
  2. Worker processes the event:
     - Validates item ownership, quantity, and use conditions.
     - Deducts item(s) from inventory.
     - Triggers any side effects (e.g., rewards, on-chain actions).
     - Logs the action for audit/history.
  3. API can query inventory and effect state to show results to the user.

---

## 4. System Architecture

- **Next.js API:**
  - Receives user requests, authenticates, validates, and fires events to the queue.
  - Does not process main business logic directly.
  - Provides endpoints to query current state (inventory, rewards, etc.).

- **Queue (e.g., Redis, RabbitMQ, SQS):**
  - Receives events from API.
  - Ensures reliable delivery and supports retries.

- **Worker(s):**
  - Listens to the queue for events.
  - Processes business logic for each event type.
  - Updates the database and triggers side effects.

- **Database:**
  - Source of truth for inventory, user state, and logs.

---

## 5. Security & Reliability
- All sensitive logic and state changes are handled in workers, not in the web layer.
- Workers must validate all event data and user permissions.
- Use unique constraints and atomic DB operations to prevent duplication and race conditions.
- Implement retries and dead-letter queues for failed jobs.
- Log all actions for audit and debugging.

---

## 6. Extensibility
- Add new event types for new business logic (e.g., mission rewards, store purchases).
- Add new worker handlers as needed.
- Can scale workers horizontally for high throughput.

---

## 7. Example Event Payloads

### Reward Inventory Item
```json
{
  "type": "reward_inventory_item",
  "userId": "...",
  "items": ["welcome_chest", "key"]
}
```

### Use Item
```json
{
  "type": "use_item",
  "userId": "...",
  "itemId": "...",
  "quantity": 1
}
```

---

## 8. Sequence Diagram

```
User → Next.js API: Action (e.g., connect wallet, use item)
Next.js API → Queue: Fire event (reward_inventory_item or use_item)
Queue → Worker: Deliver event
Worker → DB: Process business logic, update state
User → Next.js API: Query state (e.g., inventory)
Next.js API → DB: Fetch state
Next.js API → User: Return updated state
``` 