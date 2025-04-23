"use client";

import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import StatsGrid from "@/components/home/StatsGrid";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import ConnectButtons from "@/components/common/ConnectButtons";
import VIPRewardCard from "@/components/home/VIPRewardCard";
import { VIPReward } from "@/types";

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
];

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(mockVIPRewards.length / itemsPerPage);

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

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-primary">
            Welcome to JustFAB
          </h1>
          <ConnectButtons />
        </div>

        {/* Stats Grid */}
        <StatsGrid stats={mockStats} />

        {/* VIP Rewards */}
        <section>
          <h2 className="text-xl font-semibold text-primary-dark mb-4">
            VIP Rewards
          </h2>
          <div className="relative">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden">
              {visibleRewards.map((reward) => (
                <VIPRewardCard key={reward.level} reward={reward} />
              ))}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </section>

        {/* Welcome Missions */}
        <section>
          <h2 className="text-xl font-semibold text-primary-dark mb-4">
            Welcome Missions
          </h2>
          <Card className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-secondary-dark">
                  Online Game For 3 Days
                </h3>
                <p className="text-secondary">Rewards: Welcome Chest</p>
              </div>
              <Button className="bg-primary hover:bg-primary-light">
                Claim
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </MainLayout>
  );
}
