"use client";

import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";

export default function Prediction() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Active Round */}
        <section>
          <h2 className="text-xl font-semibold text-primary-dark mb-4">
            Active Round
          </h2>
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-secondary-dark mb-4">
                  $FAB Price
                </h3>
                <div className="text-3xl font-bold text-primary mb-2">
                  $2.45
                </div>
                <p className="text-secondary">Last updated 5 mins ago</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-secondary-dark mb-4">
                  Prize Pool
                </h3>
                <div className="text-3xl font-bold text-primary mb-2">
                  5,678 $FAB
                </div>
                <p className="text-secondary">Locked</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button className="w-full bg-green-500 hover:bg-green-600">
                Enter UP
              </Button>
              <Button className="w-full bg-red-500 hover:bg-red-600">
                Enter DOWN
              </Button>
            </div>
          </Card>
        </section>

        {/* Your Predictions */}
        <section>
          <h2 className="text-xl font-semibold text-primary-dark mb-4">
            Your Predictions
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
                  <p className="text-sm text-secondary">Entered UP at $2.35</p>
                </div>
                <div className="text-right">
                  <div className="font-medium text-green-500">+125 $FAB</div>
                  <div className="text-sm text-secondary">Won</div>
                </div>
              </div>
            ))}
          </Card>
        </section>
      </div>
    </MainLayout>
  );
}
