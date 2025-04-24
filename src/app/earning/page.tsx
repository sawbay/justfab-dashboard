"use client";

import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Button from "@/components/common/Button";
import { IoInformationCircleOutline } from "react-icons/io5";

export default function Earning() {
  // States for values that will come from API
  const [selectedStakePass, setSelectedStakePass] = useState("Stake Pass");
  const [amount, setAmount] = useState("2.0");
  const [treasuryBalance, setTreasuryBalance] = useState("2554");
  const [nextPayout, setNextPayout] = useState("0.1");
  const [totalEarnings, setTotalEarnings] = useState("0.7");
  const [stakedBalanceEDN, setStakedBalanceEDN] = useState("0");
  const [stakedBalanceSEDN, setStakedBalanceSEDN] = useState("0");
  const [walletAddress, setWalletAddress] = useState("0xcac2...658e");
  const [rebaseTime, setRebaseTime] = useState("3.1");
  const [rebasePercent, setRebasePercent] = useState("0.02");

  // Stats
  const [fiveDayRewards, setFiveDayRewards] = useState("0.27");
  const [akr, setAkr] = useState("22");
  const [index, setIndex] = useState("1.25");

  const handleAmountChange = (value: string) => {
    setAmount(value);
  };

  const handleMultiplier = (multiplier: number) => {
    const currentAmount = parseFloat(amount);
    setAmount((currentAmount * multiplier).toString());
  };

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-primary-dark mb-4 sm:mb-6">
          Staking
        </h1>

        <div className="rounded-xl p-6 border-2 border-primary">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Section */}
            <div className="lg:col-span-4 space-y-6 font-semibold">
              {/* Staking Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Staking</span>
                </div>
                <div className="relative">
                  <select
                    value={selectedStakePass}
                    onChange={(e) => setSelectedStakePass(e.target.value)}
                    className="w-full p-3 bg-[#fff3e8] rounded-2xl appearance-none font-semibold text-gray-600 border-2 border-primary outline-none"
                  >
                    <option value="Stake Pass">Stake Pass</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* T&Cs Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">T&Cs</span>
                  <IoInformationCircleOutline className="text-gray-400" />
                </div>
                <button className="text-gray-500 bg-[#fff3e8] px-4 py-2 rounded-2xl w-full text-left border-2 border-primary outline-none">
                  See T&Cs here
                </button>
              </div>

              {/* Amount Section */}
              <div className="space-y-4">
                <span className="text-gray-600 font-semibold">Amount</span>
                <div className="relative">
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className="w-full p-3 bg-[#fff3e8] text-gray-600 border-2 border-primary rounded-2xl pl-12 pr-12 text-center  focus:border-primary focus:outline-none"
                  />
                  <button
                    onClick={() =>
                      handleAmountChange((parseFloat(amount) - 1).toString())
                    }
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-600 px-2 border-2 border-primary rounded-2xl"
                  >
                    -
                  </button>
                  <button
                    onClick={() =>
                      handleAmountChange((parseFloat(amount) + 1).toString())
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 px-2 border-2 border-primary rounded-2xl"
                  >
                    +
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleMultiplier(2)}
                    className="px-4 py-1 rounded-2xl bg-[#fff3e8] text-gray-600 text-sm border-2 border-primary"
                  >
                    x2
                  </button>
                  <button
                    onClick={() => handleMultiplier(4)}
                    className="px-4 py-1 rounded-2xl bg-[#fff3e8] text-gray-600 text-sm border-2 border-primary"
                  >
                    x4
                  </button>
                  <button
                    onClick={() => handleMultiplier(10)}
                    className="px-4 py-1 rounded-2xl bg-[#fff3e8] text-gray-600 text-sm border-2 border-primary"
                  >
                    Max
                  </button>
                </div>
              </div>

              <Button className="w-full bg-gray-300 text-gray-600 cursor-not-allowed">
                Insufficient Balance
              </Button>

              <div className="bg-[#CD8E5F] text-white px-4 py-2 rounded-lg text-center">
                Pending 0
              </div>
            </div>

            {/* Middle Section */}
            <div className="lg:col-span-5 space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#fff3e8] p-4 rounded-lg border-2 border-primary relative">
                  <div className="text-gray-600 font-semibold mb-2">
                    Treasury Balance
                  </div>
                  <div className="flex justify-center">
                    <div className="text-green-500 text-2xl font-extrabold">
                      {treasuryBalance}
                    </div>
                  </div>
                  <div className="text-gray-500 text-sm absolute bottom-2 right-2">ETH</div>
                </div>
                <div className="bg-[#fff3e8] p-4 rounded-lg border-2 border-primary relative">
                  <div className="text-gray-600 font-semibold mb-2">
                    Next Pay Out
                  </div>
                  <div className="flex justify-center">
                    <div className="text-green-500 text-2xl font-extrabold">
                      {nextPayout}
                    </div>
                  </div>
                  <div className="text-gray-500 text-sm absolute bottom-2 right-2">ETH</div>
                </div>
                <div className="bg-[#fff3e8] p-4 rounded-lg border-2 border-primary relative">
                  <div className="text-gray-600 font-semibold mb-2">
                    Total Earnings
                  </div>
                  <div className="flex justify-center">
                    <div className="text-green-500 text-2xl font-extrabold">
                      {totalEarnings}
                    </div>
                  </div>
                  <div className="text-gray-500 text-sm absolute bottom-2 right-2">ETH</div>
                </div>
              </div>

              <div className="bg-[#fff3e8] p-4 rounded-lg">
                <div className="relative mb-4">
                  <select
                    className="w-full p-3 bg-[#fff3e8] font-semibold rounded-2xl appearance-none text-gray-600 border-2 border-primary outline-none text-center"
                    defaultValue="Ragnar Battle Pass"
                  >
                    <option value="Ragnar Battle Pass">
                      Ragnar Battle Pass
                    </option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                <div className="text-gray-600 mb-4 text-center font-bold">{walletAddress}</div>
                <hr className="border-t-2 border-gray-400 mb-4" />
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-gray-600 font-semibold">
                        5 Day Rewards
                      </span>
                      <IoInformationCircleOutline className="text-gray-400" />
                    </div>
                    <div className="text-gray-700 font-bold">
                      {fiveDayRewards}%
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-gray-600 font-semibold">AKR</span>
                      <IoInformationCircleOutline className="text-gray-400" />
                    </div>
                    <div className="text-gray-700 font-bold">{akr}%</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-gray-600 font-semibold">Index</span>
                      <IoInformationCircleOutline className="text-gray-400" />
                    </div>
                    <div className="text-gray-700 font-bold">{index} ETH</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-[#fff3e8] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600 font-semibold">
                    Staked Balances
                  </span>
                  <IoInformationCircleOutline className="text-gray-400" />
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-2xl font-extrabold">
                      {stakedBalanceEDN}
                    </div>
                    <div className="text-gray-500">EDN</div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold">
                      {stakedBalanceSEDN}
                    </div>
                    <div className="text-gray-500">sEDN</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#fff3e8] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600 font-semibold">Rebase</span>
                  <IoInformationCircleOutline className="text-gray-400" />
                </div>
                <div className="space-y-2">
                  <div className="text-gray-600 font-bold">
                    in {rebaseTime} hours
                  </div>
                  <div className="text-sm text-gray-500">
                    Approx. next rebase
                  </div>
                  <div className="text-gray-600 font-bold">
                    {rebasePercent}%
                  </div>
                  <div className="text-sm text-gray-500">Percent payout</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
