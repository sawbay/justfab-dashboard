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
        </div>

        {/* Current Round */}
        <section>
          <h2 className="text-xl font-semibold text-primary-dark mb-4">
            Current Round
          </h2>
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-secondary-dark mb-4">
                  Prize Pool
                </h3>
                <div className="text-3xl font-bold text-primary mb-2">
                  12,345 $FAB
                </div>
                <p className="text-secondary">Ends in 23h 45m 12s</p>
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-medium text-secondary-dark mb-4">
                    Your Tickets
                  </h3>
                  <div className="text-2xl font-bold text-primary mb-2">
                    5 Tickets
                  </div>
                  <p className="text-secondary">Win chance: 0.05%</p>
                </div>
                <Button className="w-full md:w-auto">Buy Tickets</Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Previous Rounds */}
        <section>
          <h2 className="text-xl font-semibold text-primary-dark mb-4">
            Previous Rounds
          </h2>
          <Card className="divide-y">
            {[1, 2, 3].map((round) => (
              <div
                key={round}
                className="p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-medium text-secondary-dark">
                    Round #{round}
                  </h3>
                  <p className="text-sm text-secondary">Drawn 2 days ago</p>
                </div>
                <div className="text-right">
                  <div className="font-medium text-primary">10,000 $FAB</div>
                  <div className="text-sm text-secondary">3 Winners</div>
                </div>
              </div>
            ))}
          </Card>
        </section>

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
