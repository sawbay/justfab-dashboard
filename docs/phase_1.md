# Phase 1 Webapp Specification

## Overview
A website for users to store chests, keys, items, and perform on-chain actions.

**Main Pages:**
- Home
- Inventory
- Store
- FABPASS

---

## Home

### Features
- **Sign In:** Connect wallet via Metamask, Futurepass, or WalletConnect
- **Connect with Telegram**
- **Dashboard Display:**
  - $FAB Balance (with Claim button)
  - $ROOT Balance (with Claim button)
  - Treasure Chest
  - Aura Key
- **Mission Section:**
  - Separate session, layout similar to previous UI

#### Token Balances
- **$FAB Balance:**
  - Fetched from user's dashboard balance
  - $FAB must be withdrawn from the game to the dashboard before being withdrawn on-chain to the wallet
- **$ROOT Balance:**
  - Fetched from user's dashboard balance

#### Token Sources
- Withdrawn from game
- Chest opening
- Mission rewards (optional)
- Deposit (optional)

#### Admin: Mission System
- Create mission chains (parent → child order)
- **Mission Chain:** Name
- **Mission Types:**
  - **Dashboard:**
    - Open chest
    - Buy key/NFT
    - Hold token/NFT/item (dashboard balance)
    - Earn token/NFT/item (since start of play)
    - Earn token/NFT/item (since mission start)
    - Earn token/NFT/item (from game/chest)
  - **In-game:**
    - Total login days
    - Consecutive logins
    - Play slot machine (number of spins)
    - Own gold
    - Own item (quantity)
    - Own specific item
    - Equip item
    - Power level
    - Earn gold (since start of play)
    - Earn gold (since mission start)
    - Earn $FAB (since start of play)
    - Earn $FAB (since mission start)
  - **On-chain:**
    - Deposit token/NFT (optional)
    - Withdraw token/NFT
    - Hold token/NFT (wallet)
    - Stake token/NFT
- **Mission Rewards:**
  - $FAB
  - $ROOT
  - Item (dashboard)
  - Chest
  - Key

---

## Inventory

### Filters
- All
- Chest
- Key
- In-game
- NFT
- Token voucher

### Item Grid
- Image
- Name
- Quantity
- "Use" button (if item is interactive)

### Pop-ups
- **Item Info:** Name, image, description (triggered by click or hover)
- **Use Item:** Name, image, quantity input, increment/decrement buttons, max button, "Use" button
- **Notifications:**
  - Success: Item used successfully, item received
  - Failure: Item use failed, condition not met

### Animations/Effects
- Success animation for item use
- Special frame/effect for rare item acquisition

### Inventory Help
- "?" icon
- Hover to show tooltip with explanations

---

## Store
*To be detailed in future phases.*

---

## FABPASS
*To be detailed in future phases.* 