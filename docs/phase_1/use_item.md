# Technical Design: "Use" Item in Inventory

## 1. Data Model

### Item Schema (Backend)
- `id`: Unique identifier
- `name`: String
- `type`: Enum (e.g., chest, key, nft, consumable, etc.)
- `quantity`: Integer
- `description`: String
- `imageUrl`: String
- `isUsable`: Boolean
- `useAction`: Enum or reference (e.g., "open_chest", "consume", "activate_buff", etc.)
- `useConditions`: Object (e.g., min quantity, cooldown, etc.)

### User Inventory
- `userId`
- `items`: Array of Item references with quantity

---

## 2. Frontend Flow

### Inventory Grid
- Each item card shows image, name, quantity, and a "Use" button if `isUsable` is true.

### Use Item Modal/Popup
- Triggered by clicking "Use" on an item.
- Shows:
  - Item image, name, description
  - Quantity selector (with increment, decrement, max)
  - "Use" button (disabled if conditions not met)
- On submit, calls backend API.

### Feedback
- Success: Animation, updated inventory, notification
- Failure: Error message (e.g., not enough quantity, cooldown, etc.)

---

## 3. API Design

### Endpoint
`POST /api/inventory/use-item`

### Request
```json
{
  "userId": "string",
  "itemId": "string",
  "quantity": 1
}
```

### Response
- Success: Updated inventory, rewards (if any), success message
- Failure: Error code/message

---

## 4. Backend Logic

1. **Validate Request**
   - Check user authentication
   - Check item exists in user inventory and is usable
   - Check quantity and use conditions

2. **Process Use Action**
   - Deduct item quantity
   - Trigger action (e.g., open chest → add rewards, consume potion → apply effect)
   - Log usage for audit/history

3. **Return Result**
   - Updated inventory
   - Any new items/rewards
   - Status message

---

## 5. Extensibility

- **Action Handlers:**  
  Use a strategy pattern or action registry for different item types (e.g., `useAction: "open_chest"` calls `openChestHandler`).
- **Conditions:**  
  Store use conditions in item metadata for flexible rule checks.
- **Effects/Rewards:**  
  Modular reward system to handle different outcomes (new items, buffs, etc.).

---

## 6. Security & Integrity

- All "use" logic must be server-side to prevent cheating.
- Consider rate limiting and audit logs.
- For on-chain items, trigger blockchain transactions as needed and handle async confirmation.

---

## 7. Sample Sequence Diagram

```
User → UI: Clicks "Use" on item
UI → API: POST /api/inventory/use-item
API → DB: Validate & process use
API → (optional) Blockchain: Execute on-chain action
API → UI: Return result (success/failure, rewards)
UI: Show animation/notification, update inventory
```

---

## Summary Table

| Layer      | Responsibility                                  |
|------------|-------------------------------------------------|
| Frontend   | UI, modal, input validation, feedback           |
| API        | Auth, validation, action dispatch, response     |
| Backend    | Inventory update, action logic, reward handling |
| Blockchain | (If needed) On-chain item use                   |