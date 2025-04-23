"use client";

import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import ConnectButtons from "@/components/common/ConnectButtons";
import { StakingInfo } from "@/types";

const mockStakingInfo: StakingInfo = {
  treasuryBalance: 1248576,
  nextPayout: 72,
  totalEarnings: 4521,
  currency: "$ROOT",
  stakedBalances: {
    edn: 1000,
    sedn: 500,
  },
  rebaseInfo: {
    time: "12:00 UTC",
    percent: "+0.3825%",
  },
};

export default function Earning() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Earning Dashboard
            </h1>
            <p className="text-gray-600">Stake your tokens to earn rewards</p>
          </div>
          <ConnectButtons />
        </div>

        {/* Earnings Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium text-secondary-dark mb-2">
              Total Earnings
            </h3>
            <div className="text-2xl font-bold text-primary">
              {mockStakingInfo.totalEarnings} {mockStakingInfo.currency}
            </div>
            <p className="text-secondary text-sm">+$123.45 this week</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium text-secondary-dark mb-2">
              Available to Claim
            </h3>
            <div className="text-2xl font-bold text-primary">$567.89</div>
            <p className="text-secondary text-sm">Next claim in 2h 30m</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium text-secondary-dark mb-2">
              Staking Rewards
            </h3>
            <div className="text-2xl font-bold text-primary">$345.67</div>
            <p className="text-secondary text-sm">12% APR</p>
          </Card>
        </div>

        {/* Recent Earnings */}
        <section>
          <h2 className="text-xl font-semibold text-primary-dark mb-4">
            Recent Earnings
          </h2>
          <Card className="divide-y">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-secondary-dark">
                    Daily Mission Reward
                  </h3>
                  <p className="text-sm text-secondary">Completed 3 missions</p>
                </div>
                <div className="text-right">
                  <div className="font-medium text-primary">+50 $FAB</div>
                  <div className="text-sm text-secondary">2 hours ago</div>
                </div>
              </div>
            ))}
          </Card>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-6">
            <h3 className="text-gray-600 mb-2">Treasury Balance</h3>
            <div className="text-2xl font-bold text-gray-900">
              {mockStakingInfo.treasuryBalance.toLocaleString()}{" "}
              {mockStakingInfo.currency}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-gray-600 mb-2">Next Payout</h3>
            <div className="text-2xl font-bold text-gray-900">
              {mockStakingInfo.nextPayout} Hours
            </div>
          </Card>
        </div>

        {/* Staking Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Your Staked Balances
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">EDN</h3>
                <span className="text-2xl font-bold text-gray-900">
                  {mockStakingInfo.stakedBalances.edn}
                </span>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">Stake</Button>
                <Button variant="outline" className="flex-1">
                  Unstake
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">sEDN</h3>
                <span className="text-2xl font-bold text-gray-900">
                  {mockStakingInfo.stakedBalances.sedn}
                </span>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">Stake</Button>
                <Button variant="outline" className="flex-1">
                  Unstake
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Rebase Info */}
        <Card className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Next Rebase</h3>
              <p className="text-gray-600">{mockStakingInfo.rebaseInfo.time}</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-medium text-green-500">
                {mockStakingInfo.rebaseInfo.percent}
              </div>
              <p className="text-gray-600">APY</p>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
