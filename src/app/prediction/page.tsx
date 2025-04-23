"use client";

import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";

const mockPredictionData = {
  currentPool: 75000,
  timeLeft: "04:32",
  upPool: 45000,
  downPool: 30000,
  currentPrice: 1.245,
  priceChange: "+2.5%",
  lastRounds: [
    { id: 1, result: "up", payout: 1.5 },
    { id: 2, result: "down", payout: 1.8 },
    { id: 3, result: "up", payout: 1.3 },
  ],
};

export default function Prediction() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Price Prediction
            </h1>
            <p className="text-gray-600">
              Predict price movements to win rewards
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline">Nguyen Hung</Button>
            <Button>Wallet Connect</Button>
          </div>
        </div>

        {/* Current Round */}
        <Card className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Current Round
            </h2>
            <div className="text-4xl font-bold text-orange-500">
              {mockPredictionData.currentPool.toLocaleString()} $ROOT
            </div>
            <div className="text-gray-600 mt-2">Total Prize Pool</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-gray-600 mb-1">Time Left</div>
              <div className="text-2xl font-semibold text-gray-900">
                {mockPredictionData.timeLeft}
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 mb-1">Current Price</div>
              <div className="text-2xl font-semibold text-gray-900">
                ${mockPredictionData.currentPrice}
                <span className="text-green-500 text-lg ml-2">
                  {mockPredictionData.priceChange}
                </span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 mb-1">Your Position</div>
              <div className="text-2xl font-semibold text-gray-900">
                100 $ROOT (UP)
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="bg-green-50 p-6">
              <div className="text-center mb-4">
                <div className="text-green-600 font-medium">UP</div>
                <div className="text-2xl font-bold text-gray-900">
                  {mockPredictionData.upPool.toLocaleString()} $ROOT
                </div>
                <div className="text-sm text-gray-500">2.1x Payout</div>
              </div>
              <Button className="w-full bg-green-500 hover:bg-green-600">
                Enter UP
              </Button>
            </Card>

            <Card className="bg-red-50 p-6">
              <div className="text-center mb-4">
                <div className="text-red-600 font-medium">DOWN</div>
                <div className="text-2xl font-bold text-gray-900">
                  {mockPredictionData.downPool.toLocaleString()} $ROOT
                </div>
                <div className="text-sm text-gray-500">1.8x Payout</div>
              </div>
              <Button className="w-full bg-red-500 hover:bg-red-600">
                Enter DOWN
              </Button>
            </Card>
          </div>
        </Card>

        {/* Previous Rounds */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Previous Rounds
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {mockPredictionData.lastRounds.map((round) => (
              <Card key={round.id} className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-gray-600">Round #{round.id}</div>
                  <div
                    className={`font-medium ${
                      round.result === "up" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {round.result.toUpperCase()}
                  </div>
                </div>
                <div className="text-lg font-medium text-gray-900">
                  {round.payout}x Payout
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
