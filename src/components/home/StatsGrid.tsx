import React from "react";
import Card from "../common/Card";
import { UserStats } from "@/types";

interface StatItemProps {
  label: string;
  value: string | number;
  subValue?: string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, subValue }) => (
  <Card className="flex flex-col gap-1">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-xl font-semibold text-gray-900">{value}</div>
    {subValue && <div className="text-sm text-gray-500">{subValue}</div>}
  </Card>
);

interface StatsGridProps {
  stats: UserStats;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <StatItem label="Level" value={stats.level} />
      <StatItem
        label="Status"
        value={stats.status}
        subValue={stats.playedToday}
      />
      <StatItem
        label="$FAB Balance"
        value={stats.fabBalance}
        subValue={stats.yesterdayStats}
      />
      <StatItem
        label="$ROOT Balance"
        value={stats.rootBalance}
        subValue={stats.usdValue}
      />
      <StatItem
        label="Treasure Chests"
        value={stats.treasureChests}
        subValue={stats.unlocksIn}
      />
      <StatItem
        label="Aura Key"
        value={stats.auraKey}
        subValue={stats.usedFor}
      />
    </div>
  );
};

export default StatsGrid;
