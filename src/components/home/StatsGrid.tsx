import React from "react";
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
  <div className="bg-white rounded-t-xl border border-primary border-b-4 p-4 text-center">
    <div className="text-xs text-primary">{label}</div>
    <div
      className={`text-lg font-bold ${valueColor} drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]`}
    >
      {value}
    </div>
    {subValue && <div className="text-xs text-primary/70">{subValue}</div>}
  </div>
);

interface StatsGridProps {
  stats: UserStats;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className="px-4 pb-2">
      <div className="container mx-auto">
        <div className="bg-[#FFF4EA] border border-primary/20 rounded-xl px-6 py-4 mx-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <StatItem label="Level" value={stats.level} />
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
            />
            <StatItem
              label="$ROOT Balance"
              value={stats.rootBalance}
              subValue={stats.usdValue}
              valueColor="text-green-500"
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
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;
