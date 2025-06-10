export enum ItemType {
  AURA_KEY = "AURA_KEY",
  CHEST = "CHEST",
  GOLD_BAG = "GOLD_BAG",
  FOOD_BAG = "FOOD_BAG",
  ENERGY_BAG = "ENERGY_BAG",
}

export type RewardType = RatioRewardType | MilestoneRewardType;

export enum RatioRewardType {
  ROOT_1 = "1 $ROOT",
  ROOT_10 = "10 $ROOT",
  ROOT_50 = "50 $ROOT",
  FAB_1 = "1 $FAB",
  FAB_10 = "10 $FAB",
  FAB_50 = "50 $FAB",
  FAB_100 = "100 $FAB",
  GOLD_BAG = "Gold Bag",
  FOOD_BAG = "Food Bag",
  ENERGY_BAG = "Energy Bag",
}

export enum MilestoneRewardType {
  ROOT_70 = "70 $ROOT",
  ROOT_100 = "100 $ROOT",
  ROOT_500 = "500 $ROOT",
  ROOT_1000 = "1000 $ROOT",
  CHEST_2 = "2 Chest",
  KEY_1 = "1 Key",
  KEYS_2 = "2 Keys",
  KEYS_3 = "3 Keys",
}
