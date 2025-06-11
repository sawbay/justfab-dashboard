"use client";

import React, { useEffect, useMemo, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import StatsGrid from "@/components/home/StatsGrid";
import Button from "@/components/common/Button";
import { VIPReward } from "@/types";
import { useAuth } from "@futureverse/auth-react";
import { useTrnApi } from "@futureverse/transact-react";
import { useTransactQuery } from "@/core/hooks/useTransactQuery";
import { useQuery } from "@tanstack/react-query";
import { getBalance } from "@/utils/trn_sdk";
import Image from "next/image";
import { IMAGES } from "@/utils/images";
import ComingSoon from "@/components/common/ComingSoon";
import { useAppwrite } from "@/components/providers/AppwriteProvider";

const mockVIPRewards: VIPReward[] = [
  {
    level: 1,
    isCompleted: false,
    isLocked: false,
    rewards: { game: 50, token: 50 },
    description: "Login for the first time",
  },
];

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [showComingSoon, setShowComingSoon] = useState(false);
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

  const { userSession } = useAuth();
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

  const { userDetail, treasureChestTotal, auraKeyTotal } = useAppwrite();

  return (
    <MainLayout>
      {showComingSoon && (
        <ComingSoon onClose={() => setShowComingSoon(false)} />
      )}
      <div className="space-y-6 sm:space-y-8">
        <StatsGrid
          fabBalance={userDetail?.fabBalance || 0}
          fabBalanceInGame={0}
          rootBalance={userDetail?.rootBalance || 0}
          rootBalanceOnChain={Number(rootBalanceOnTrn.data ?? 0)}
          treasureChests={treasureChestTotal}
          auraKeys={auraKeyTotal}
        />

        {/* VIP Rewards */}
        <section className="px-2 sm:px-4">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-[dynapuff]">
              VIP Rewards
            </h2>
          </div>
          <div className="relative">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="absolute -left-8 sm:-left-12 top-1/2 -translate-y-1/2 z-10 p-2 bg-transparent"
            >
              <span className="text-white text-3xl sm:text-4xl">&#60;</span>
            </button>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
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
                        opacity: reward.isLocked ? 0.5 : 1,
                      }}
                    >
                      <div className="w-full flex flex-col items-center pt-4">
                        <div className="text-lg sm:text-xl font-bold text-[#B97A1A] font-[dynapuff]">
                          Level {reward.level}
                        </div>
                        {reward.isCompleted && (
                          <div className="text-sm text-green-600 font-semibold mt-1">
                            Completed
                          </div>
                        )}
                      </div>
                      <div className="w-full flex flex-col items-center gap-2 pb-4">
                        <div className="text-center px-2 sm:px-4 text-[#7B3F00] text-base sm:text-lg font-semibold">
                          {reward.description}
                        </div>
                        <div className="flex justify-center gap-4 text-[#7B3F00] text-xs">
                          <span className="flex items-center gap-1">
                            <Image
                              src={IMAGES.chest}
                              alt="game"
                              width={16}
                              height={16}
                              className="sm:w-[18px] sm:h-[18px]"
                            />
                            {reward.rewards.game}
                          </span>
                          <span className="flex items-center gap-1">
                            <Image
                              src={IMAGES.key}
                              alt="token"
                              width={16}
                              height={16}
                              className="sm:w-[18px] sm:h-[18px]"
                            />
                            {reward.rewards.token}
                          </span>
                        </div>
                        {/* {!reward.isLocked && !reward.isCompleted && (
                          <Button
                            size="sm"
                            className="mt-2"
                            onClick={() => setShowComingSoon(true)}
                          >
                            Claim
                          </Button>
                        )} */}
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
              className="absolute -right-8 sm:-right-12 top-1/2 -translate-y-1/2 z-10 p-2 bg-transparent"
            >
              <span className="text-white text-3xl sm:text-4xl">&#62;</span>
            </button>
          </div>
        </section>

        {/* Welcome Missions */}
        {/* <section className="px-2 sm:px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-[dynapuff]">
            Welcome Missions
          </h2>
          <div className="mt-4">
            <div
              className="relative w-full h-32 sm:h-40"
              style={{
                backgroundImage: `url(${IMAGES.bgMission})`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-center h-full px-4 sm:px-16 py-4 gap-4 sm:gap-0">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#444]">
                    Online Game For 3 Days
                  </h3>
                  <p className="text-[#7B3F00] text-base sm:text-lg font-semibold">
                    Reward: Welcome Chest
                  </p>
                </div>
                <Button
                  size="xl"
                  className="sm:mr-8 lg:mr-32"
                  onClick={() => setShowComingSoon(true)}
                >
                  Claim
                </Button>
              </div>
            </div>
          </div>
        </section> */}
      </div>
    </MainLayout>
  );
}
