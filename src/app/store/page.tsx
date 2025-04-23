"use client";

import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import StoreGrid from "@/components/store/StoreGrid";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import ConnectButtons from "@/components/common/ConnectButtons";

const mockItems = Array(12)
  .fill(null)
  .map((_, index) => ({
    id: `store-item-${index}`,
    name: "Common Chest",
    owner: 3,
    description: "A simple wooden chest containing common items and resources",
    price: 5000,
  }));

const filterTypes = [
  "All",
  "Treasure Chests",
  "Aura Keys",
  "Gold Bags",
  "Sale Off",
];

export default function Store() {
  const [filterType, setFilterType] = useState("All");

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Balance Card */}
        <Card className="inline-flex gap-2 items-center px-6">
          <span className="text-gray-700">$ROOT Balance</span>
          <span className="text-orange-500 font-medium">85.72</span>
          <span className="text-gray-500">~ $214.30 USD</span>
        </Card>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <div className="text-gray-600 mr-2 flex items-center">Filter By:</div>
          {filterTypes.map((type) => (
            <Button
              key={type}
              variant={filterType === type ? "primary" : "outline"}
              onClick={() => setFilterType(type)}
            >
              {type}
            </Button>
          ))}
          <div className="ml-auto text-gray-600">12 Items</div>
        </div>

        {/* Store Grid */}
        <StoreGrid items={mockItems} filterType={filterType} />
      </div>
    </MainLayout>
  );
}
