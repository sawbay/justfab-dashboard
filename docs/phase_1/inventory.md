# Technical Design: Inventory Feature

## 1. Data Model

### Item Schema
- `id`: Unique identifier
- `name`: String
- `type`: Enum (chest, key, in-game, nft, token voucher, etc.)
- `quantity`: Integer
- `description`: String
- `imageUrl`: String
- `isUsable`: Boolean
- `rarity`: Enum (common, rare, epic, etc.)
- `attributes`: Object (custom item properties)

### User Inventory
- `userId`: String
- `items`: Array of Item references with quantity

---

## 2. Frontend/UI Design

### Inventory Page
- **Filters:**
  - All, Chest, Key, In-game, NFT, Token voucher
- **Item Grid:**
  - Card for each item: image, name, quantity, rarity indicator, "Use" button (if usable)
- **Pop-ups/Modals:**
  - Item Info: name, image, description (on click/hover)
  - Use Item: quantity selector, use button, feedback
  - Help Tooltip: "?" icon, shows inventory usage guide
- **Animations/Effects:**
  - Success animation for item use
  - Special effect for rare item acquisition

---

## 3. API Design

### Endpoints
- `GET /api/inventory` — Get user's inventory, supports filtering via query parameters
- `POST /api/inventory/use-item` — Use an item (see use_item.md)
- `POST /api/inventory/claim` — Claim new items/rewards

#### Filtering Example
To filter inventory by type (e.g., only chests):
```
GET /api/inventory?type=chest
```
Multiple filters can be supported as query parameters (e.g., `type`, `rarity`, etc.):
```
GET /api/inventory?type=key&rarity=epic
```

#### Example: Get Inventory
Request:
```
GET /api/inventory?userId=string&type=chest
```
Response:
```json
{
  "items": [
    { "itemId": "string", "name": "string", "type": "chest", "quantity": 2, ... }
  ]
}
```

---

## 4. Backend Logic

- **Fetch Inventory:**
  - Retrieve all items for user, apply filters from query params if provided
- **Use Item:**
  - See use_item.md for details
- **Claim Items:**
  - Add new items to inventory, update quantities
- **Update Inventory:**
  - Handle item addition, removal, and updates atomically
- **Audit/History:**
  - Log all inventory changes for traceability

---

## 5. Extensibility

- **Item Types:**
  - Easily add new item types and attributes
- **Filters:**
  - Add new filter categories as needed (handled via query params)
- **Actions:**
  - Support new item actions (e.g., trade, upgrade) via modular handlers

---

## 6. Security & Integrity

- All inventory changes must be server-side
- Validate all actions (use, claim, etc.)
- Prevent duplication/cheating via atomic DB operations
- Rate limit sensitive actions
- For on-chain items, sync with blockchain state as needed

---

## 7. Sequence Diagram (Typical Use)

```
User → UI: Loads Inventory Page
UI → API: GET /api/inventory?type=chest
API → DB: Fetch user items with filter
API → UI: Return item list
UI: Render inventory grid
User: Interacts with items (view, use, claim)
```

---

## Summary Table

| Layer      | Responsibility                                  |
|------------|-------------------------------------------------|
| Frontend   | UI, filters, modals, feedback                   |
| API        | Auth, validation, inventory endpoints           |
| Backend    | Inventory CRUD, action logic, audit/history     |
| Blockchain | (If needed) On-chain item sync                  |

</rewritten_file> 