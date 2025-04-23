"use client";

import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import StatsGrid from "@/components/home/StatsGrid";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";

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

export default function Home() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome to JustFAB
          </h1>
          <div className="flex gap-4">
            <Button variant="outline">Connect Telegram</Button>
            <Button>Connect Wallet</Button>
          </div>
        </div>

        {/* Stats Grid */}
        <StatsGrid stats={mockStats} />

        {/* VIP Rewards */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            VIP Rewards
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[12, 13, 14, 15].map((level) => (
              <Card key={level} className="p-6 text-center">
                <div className="text-2xl font-bold text-orange-400 mb-2">
                  {level}
                </div>
                <p className="text-gray-600 mb-4">
                  Upgrade your base to level 2
                </p>
                <div className="flex justify-center gap-4 text-sm text-gray-500">
                  <span>🎮 50</span>
                  <span>🎮 50</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Welcome Missions */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Welcome Missions
          </h2>
          <Card className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Online Game For 3 Days
              </h3>
              <p className="text-gray-500">Rewards: Welcome Chest</p>
            </div>
            <Button>Claim</Button>
          </Card>
        </section>
      </div>
    </MainLayout>
  );
}
