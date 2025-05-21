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
        {/* Banner + Connect Buttons */}
        {/* <div className="relative flex items-center justify-between px-8 py-2 mt-2 mb-4">
          <Image
            src="/justfap/banner.png"
            alt="banner"
            width={900}
            height={80}
            className="w-full h-20 object-contain"
          />
          <div className="absolute right-12 top-1/2 -translate-y-1/2 flex gap-4">
            <Button className="bg-[#C96B2B] border-4 border-[#7B3F00] text-white font-bold shadow-md px-6 py-2 rounded-xl text-lg hover:bg-[#E08B3A]">
              Connect Telegram
            </Button>
            <Button className="bg-[#C96B2B] border-4 border-[#7B3F00] text-white font-bold shadow-md px-6 py-2 rounded-xl text-lg hover:bg-[#E08B3A]">
              Connect Wallet
            </Button>
          </div>
        </div> */}
        {/* Stats Grid Custom */}
        <div className="flex justify-between gap-2 px-2">
          {[
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
              value: (
                <span className="text-green-600">{mockStats.rootBalance}</span>
              ),
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
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center justify-center mx-1"
            >
              <div
                className="relative w-full h-20 flex flex-col items-center justify-center"
                style={{
                  backgroundImage: "url(/justfap/wood-frame.png)",
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="text-xs font-bold text-[#7B3F00] mt-1">
                  {item.label}
                </div>
                <div className={`text-2xl font-bold ${item.color || ""}`}>
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
          <h2 className="text-3xl font-bold text-[#444] mb-4 mx-4 font-[LuckiestGuy]">
            Vip Rewards
          </h2>
          <div className="relative mx-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 bg-transparent"
            >
              <span className="text-[#E08B3A] text-3xl">&#60;</span>
            </button>
            <div className="grid grid-cols-5 gap-4">
              {(() => {
                const items: (VIPReward | null)[] = visibleRewards.slice(0, 5);
                while (items.length < 5) items.push(null);
                return items.map((reward, idx) =>
                  reward ? (
                    <div
                      key={idx}
                      className="relative flex flex-col items-center"
                      style={{
                        backgroundImage: "url(/justfap/vip-card.png)",
                        backgroundSize: "100% 100%",
                        backgroundRepeat: "no-repeat",
                        minHeight: 220,
                      }}
                    >
                      <div className="w-full flex flex-col items-center pt-2">
                        <div className="text-xl font-bold text-[#B97A1A] mb-1">
                          Day 1
                        </div>
                        <Image
                          src="/justfap/vip-mole.png"
                          alt="vip"
                          width={90}
                          height={90}
                          className="mb-1"
                        />
                        <div className="bg-[#FFF4D0] rounded-b-xl w-full text-center py-2 px-1 text-[#7B3F00] text-sm font-semibold border-t-2 border-[#B97A1A]">
                          Điểm danh đăng nhập lần đầu
                        </div>
                        <div className="flex justify-center gap-4 mt-1 text-[#7B3F00] text-xs">
                          <span className="flex items-center gap-1">
                            <Image
                              src="/justfap/coin.png"
                              alt="coin"
                              width={18}
                              height={18}
                            />
                            1
                          </span>
                          <span className="flex items-center gap-1">
                            <Image
                              src="/justfap/chest.png"
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
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 bg-transparent"
            >
              <span className="text-[#E08B3A] text-3xl">&#62;</span>
            </button>
          </div>
        </section>
        {/* Welcome Missions */}
        <section>
          <h2 className="text-3xl font-bold text-[#444] mb-4 mx-4 font-[LuckiestGuy]">
            Welcome Missions
          </h2>
          <div className="mx-4">
            <div
              className="relative w-full"
              style={{
                backgroundImage: "url(/justfap/scroll-mission.png)",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                minHeight: 90,
              }}
            >
              <div className="flex justify-between items-center px-8 py-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#444]">
                    Online Game For 3 Days
                  </h3>
                  <p className="text-[#7B3F00] text-lg font-semibold">
                    Reward: Welcome Chest
                  </p>
                </div>
                <Button className="bg-[#C96B2B] border-4 border-[#7B3F00] text-white font-bold shadow-md px-8 py-3 rounded-xl text-xl hover:bg-[#E08B3A]">
                  claim
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
