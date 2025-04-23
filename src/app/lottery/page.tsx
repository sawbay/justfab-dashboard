"use client";

import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import ConnectButtons from "@/components/common/ConnectButtons";

const mockLotteryData = {
  currentPrize: 125000,
  ticketPrice: 100,
  timeLeft: "23:45:12",
  yourTickets: 5,
  totalTickets: 1248,
  lastWinner: "0x1234...5678",
  lastPrize: 98500,
};

export default function Lottery() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lottery</h1>
            <p className="text-gray-600">Try your luck to win big prizes!</p>
          </div>
          <ConnectButtons />
        </div>

        {/* Current Round */}
        <Card className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Current Prize Pool
            </h2>
            <div className="text-4xl font-bold text-orange-500">
              {mockLotteryData.currentPrize.toLocaleString()} $ROOT
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-gray-600 mb-1">Time Left</div>
              <div className="text-2xl font-semibold text-gray-900">
                {mockLotteryData.timeLeft}
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 mb-1">Your Tickets</div>
              <div className="text-2xl font-semibold text-gray-900">
                {mockLotteryData.yourTickets}
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 mb-1">Total Tickets</div>
              <div className="text-2xl font-semibold text-gray-900">
                {mockLotteryData.totalTickets}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Buy 1 Ticket ({mockLotteryData.ticketPrice} $ROOT)
            </Button>
            <Button variant="outline" size="lg">
              Buy Multiple Tickets
            </Button>
          </div>
        </Card>

        {/* Previous Round */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Previous Round
          </h2>
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-gray-600 mb-1">Winner</div>
                <div className="text-lg font-medium text-gray-900">
                  {mockLotteryData.lastWinner}
                </div>
              </div>
              <div>
                <div className="text-gray-600 mb-1">Prize</div>
                <div className="text-lg font-medium text-orange-500">
                  {mockLotteryData.lastPrize.toLocaleString()} $ROOT
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Your History */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Your Ticket History
          </h2>
          <Card className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Round
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Tickets
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[1, 2, 3].map((round) => (
                  <tr key={round}>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      Round #{round}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      3 Tickets
                    </td>
                    <td className="px-6 py-4 text-sm text-red-500">No Win</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </section>
      </div>
    </MainLayout>
  );
}
