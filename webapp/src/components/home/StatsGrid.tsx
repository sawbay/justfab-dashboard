import React, { useEffect, useState } from "react";
import { IMAGES } from "@/utils/images";
import { useAppwrite } from "@/core/hooks/useAppwrite";
interface StatsGridProps { }

const mockStats = {
  level: 0,
  status: "",
  fabBalance: 0,
  rootBalance: 0,
  treasureChests: 0,
  auraKey: 0,
  playedToday: "0 hrs played today",
  yesterdayStats: "+0 yesterday",
  usdValue: "~ $0 USD",
  unlocksIn: "1 unlocks in 2h",
  usedFor: "Used for rare quests",
};

const mockStatsCards = [
  {
    label: "Level",
    value: mockStats.level,
    sub: null,
    color: "text-[#E08B3A]",
  },
  {
    label: "Status",
    value: <span className="text-green-600 font-bold">● ACTIVE</span>,
    sub: mockStats.playedToday,
  },
  {
    label: "$FAB Balance",
    value: mockStats.fabBalance,
    sub: mockStats.yesterdayStats,
  },
  {
    label: "$ROOT Balance",
    value: <span className="text-green-600">{mockStats.rootBalance}</span>,
    sub: mockStats.usdValue,
  },
  {
    label: "Treasure Chests",
    value: mockStats.treasureChests,
    sub: mockStats.unlocksIn,
  },
  {
    label: "Aura Key",
    value: mockStats.auraKey,
    sub: mockStats.usedFor,
  },
];

const StatsGrid: React.FC<StatsGridProps> = ({ }) => {
  const { user, treasureChestTotal, auraKeyTotal } = useAppwrite();
  const [statsCards, setStatsCards] = useState<any[]>(mockStatsCards);

  useEffect(() => {
    setStatsCards([
      {
        label: "Level",
        value: mockStats.level,
        sub: null,
        color: "text-[#E08B3A]",
      },
      {
        label: "Status",
        value: <span className="text-green-600 font-bold">● ACTIVE</span>,
        sub: mockStats.playedToday,
      },
      {
        label: "$FAB Balance",
        value: mockStats.fabBalance,
        sub: mockStats.yesterdayStats,
      },
      {
        label: "$ROOT Balance",
        value: <span className="text-green-600">{mockStats.rootBalance}</span>,
        sub: mockStats.usdValue,
      },
      {
        label: "Treasure Chests",
        value: treasureChestTotal,
        sub: "",
      },
      {
        label: "Aura Key",
        value: auraKeyTotal,
        sub: "",
      },
    ]);
  }, [treasureChestTotal, auraKeyTotal]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
      {statsCards.map((item, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center justify-center"
        >
          <div
            className="relative w-full h-28 sm:h-36 flex flex-col items-center justify-center"
            style={{
              backgroundImage: `url(${IMAGES.bgCard})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="text-xs sm:text-sm font-bold text-[#7B3F00]">
              {item.label}
            </div>
            <div
              className={`text-lg sm:text-2xl font-bold ${item.color || ""
                } my-1`}
            >
              {item.value}
            </div>
            {item.sub && (
              <div className="text-[10px] sm:text-xs text-[#7B3F00]">
                {item.sub}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
