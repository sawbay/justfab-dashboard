"use client";

import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import CollectionGrid from "@/components/collection/CollectionGrid";
import Button from "@/components/common/Button";
import ConnectButtons from "@/components/common/ConnectButtons";

const mockItems = Array(12)
  .fill(null)
  .map((_, index) => ({
    id: `chest-${index}`,
    name: "Common Chest",
    owner: 3,
    description: "A simple wooden chest containing common items and resources",
  }));

const filterTypes = ["All", "Treasure Chests", "Aura Keys", "Gold Bags"];

export default function Collection() {
  const [filterType, setFilterType] = useState("All");

  return (
    <MainLayout>
      <div className="space-y-8">
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

        {/* Collection Grid */}
        <CollectionGrid items={mockItems} filterType={filterType} />
      </div>
    </MainLayout>
  );
}
