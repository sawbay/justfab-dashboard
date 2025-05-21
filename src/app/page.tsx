"use client";

import React, { useEffect, useMemo, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import StatsGrid from "@/components/home/StatsGrid";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import VIPRewardCard from "@/components/home/VIPRewardCard";
import { VIPReward } from "@/types";
import { useAuth } from "@futureverse/auth-react";
import { useTrnApi } from "@futureverse/transact-react";
import { useTransactQuery } from "@/hooks/useTransactQuery";
import { useQuery } from "@tanstack/react-query";
import { getBalance } from "@/utils/sdk";
import Image from "next/image";
import { IMAGES } from "@/constants/images";

const mockStats = {
  level: 24,
  status: "ACTIVE",
  fabBalance: 1248,
  rootBalance: 85.72,
  treasureChests: 3,
  auraKey: 7,
  playedToday: "2 hrs played today",
  yesterdayStats: "+122 yesterday",
  usdValue: "~ $214.30 USD",
  unlocksIn: "1 unlocks in 2h",
  usedFor: "Used for rare quests",
};

const mockVIPRewards: VIPReward[] = [
  {
    level: 12,
    isCompleted: true,
    isLocked: false,
    rewards: { game: 50, token: 50 },
    description: "Upgrade your base to level 2",
  },
  {
    level: 13,
    isCompleted: true,
    isLocked: false,
    rewards: { game: 50, token: 50 },
    description: "Upgrade your base to level 2",
  },
  {
    level: 14,
    isCompleted: false,
    isLocked: false,
    rewards: { game: 50, token: 50 },
    description: "Upgrade your base to level 2",
  },
  {
    level: 15,
    isCompleted: false,
    isLocked: true,
    rewards: { game: 50, token: 50 },
    description: "Upgrade your base to level 2",
  },
  {
    level: 16,
    isCompleted: false,
    isLocked: true,
    rewards: { game: 50, token: 50 },
    description: "Upgrade your base to level 2",
  },
  {
    level: 17,
    isCompleted: false,
    isLocked: true,
    rewards: { game: 50, token: 50 },
    description: "Upgrade your base to level 2",
  },
  {
    level: 18,
    isCompleted: false,
    isLocked: true,
    rewards: { game: 50, token: 50 },
    description: "Upgrade your base to level 2",
  },
];

const statsCards = [
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

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(mockVIPRewards.length / itemsPerPage);
  // const queryBuilder = new RootQueryBuilder(api, walletAddress);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const visibleRewards = mockVIPRewards.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const { authClient, userSession } = useAuth();
  useEffect(() => {
    if (userSession) {
      console.log(userSession);
    }
  }, [authClient, userSession]);

  const { trnApi } = useTrnApi();
  const transactionQuery = useTransactQuery();
  const accountToCheck = useMemo(() => {
    if (!userSession) {
      return "";
    }
    return userSession.futurepass;
  }, [userSession]);

  const rootBalanceOnTrn = useQuery({
    queryKey: ["balance", "futurepass", accountToCheck, 1],
    queryFn: async () =>
      getBalance(transactionQuery, accountToCheck as string, 1),
    enabled:
      !!trnApi &&
      !!userSession &&
      !!accountToCheck &&
      accountToCheck !== "" &&
      !!transactionQuery,
  });

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex justify-between gap-2 px-2">
          {statsCards.map((item, idx) => (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center justify-center mx-1"
            >
              <div
                className="relative w-full h-36 flex flex-col items-center justify-center"
                style={{
                  backgroundImage: `url(${IMAGES.bgCard})`,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="text-sm font-bold text-[#7B3F00]">
                  {item.label}
                </div>
                <div className={`text-2xl font-bold ${item.color || ""} my-1`}>
                  {item.value}
                </div>
                {item.sub && (
                  <div className="text-xs text-[#7B3F00]">{item.sub}</div>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* VIP Rewards */}
        <section>
          <div className="flex items-center gap-3 mb-4 mx-4">
            <h2 className="text-3xl font-bold text-[#585858] font-[dynapuff]">
              Vip Rewards
            </h2>
          </div>
          <div className="relative mx-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 p-2 bg-transparent"
            >
              <span className="text-[#E08B3A] text-4xl">&#60;</span>
            </button>
            <div className="grid grid-cols-5 gap-6">
              {(() => {
                const items: (VIPReward | null)[] = visibleRewards.slice(0, 5);
                while (items.length < 5) items.push(null);
                return items.map((reward, idx) =>
                  reward ? (
                    <div
                      key={idx}
                      className="relative flex flex-col items-center justify-between h-full"
                      style={{
                        backgroundImage: `url(${IMAGES.bgReward})`,
                        backgroundSize: "100% 100%",
                        backgroundRepeat: "no-repeat",
                        minHeight: 280,
                      }}
                    >
                      <div className="w-full flex flex-col items-center pt-4">
                        <div className="text-xl font-bold text-[#B97A1A] font-[dynapuff]">
                          Day 1
                        </div>
                      </div>
                      <div className="w-full flex flex-col items-center gap-2 pb-4">
                        <div className="text-center px-4 text-[#7B3F00] text-lg font-semibold">
                          Điểm danh đăng nhập lần đầu
                        </div>
                        <div className="flex justify-center gap-4 text-[#7B3F00] text-xs">
                          <span className="flex items-center gap-1">
                            <Image
                              src={IMAGES.chest}
                              alt="coin"
                              width={18}
                              height={18}
                            />
                            1
                          </span>
                          <span className="flex items-center gap-1">
                            <Image
                              src={IMAGES.chest}
                              alt="chest"
                              width={18}
                              height={18}
                            />
                            1
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={idx} />
                  )
                );
              })()}
            </div>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 p-2 bg-transparent"
            >
              <span className="text-[#E08B3A] text-4xl">&#62;</span>
            </button>
          </div>
        </section>
        {/* Welcome Missions */}
        <section>
          <h2 className="text-3xl font-bold text-[#585858] font-[dynapuff]">
            Welcome Missions
          </h2>
          <div className="mt-4">
            <div
              className="relative w-full h-40"
              style={{
                backgroundImage: `url(${IMAGES.bgMission})`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                minHeight: 90,
              }}
            >
              <div className="flex justify-between items-center h-full pl-16 py-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#444]">
                    Online Game For 3 Days
                  </h3>
                  <p className="text-[#7B3F00] text-lg font-semibold">
                    Reward: Welcome Chest
                  </p>
                </div>
                <Button size="xl" className="mr-32">
                  Claim
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
