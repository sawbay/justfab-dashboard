import React from "react";
import Card from "../common/Card";
import { UserStats } from "@/types";

interface StatItemProps {
  label: string;
  value: string | number;
  subValue?: string;
  valueColor?: string;
}

const StatItem: React.FC<StatItemProps> = ({
  label,
  value,
  subValue,
  valueColor = "text-primary",
}) => (
  <Card className="flex flex-col gap-1">
    <div className="text-sm text-secondary">{label}</div>
    <div className={`text-xl font-semibold ${valueColor}`}>{value}</div>
    {subValue && <div className="text-sm text-secondary">{subValue}</div>}
  </Card>
);

interface StatsGridProps {
  stats: UserStats;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <StatItem label="Level" value={stats.level} valueColor="text-primary" />
      <StatItem
        label="Status"
        value={stats.status}
        subValue={stats.playedToday}
        valueColor="text-green-500"
      />
      <StatItem
        label="$FAB Balance"
        value={stats.fabBalance}
        subValue={stats.yesterdayStats}
        valueColor="text-primary-light"
      />
      <StatItem
        label="$ROOT Balance"
        value={stats.rootBalance}
        subValue={stats.usdValue}
        valueColor="text-primary-light"
      />
      <StatItem
        label="Treasure Chests"
        value={stats.treasureChests}
        subValue={stats.unlocksIn}
        valueColor="text-primary"
      />
      <StatItem
        label="Aura Key"
        value={stats.auraKey}
        subValue={stats.usedFor}
        valueColor="text-primary"
      />
    </div>
  );
};

export default StatsGrid;
