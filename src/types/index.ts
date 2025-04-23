export interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

export interface UserStats {
  level: number;
  status: string;
  fabBalance: number;
  rootBalance: number;
  treasureChests: number;
  auraKey: number;
  playedToday: string;
  yesterdayStats: string;
  usdValue: string;
  unlocksIn: string;
  usedFor: string;
}

export interface CommonChest {
  id: string;
  name: string;
  owner: number;
  description?: string;
  price?: number;
}

export interface StakingInfo {
  treasuryBalance: number;
  nextPayout: number;
  totalEarnings: number;
  currency: string;
  stakedBalances: {
    edn: number;
    sedn: number;
  };
  rebaseInfo: {
    time: string;
    percent: string;
  };
}
