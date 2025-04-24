"use client";

import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";
import Button from "@/components/common/Button";

// Mock data for filters
const filterTypes = [
  { id: 1, name: "All" },
  { id: 2, name: "Treasure Chests" },
  { id: 3, name: "Aura Keys" },
  { id: 4, name: "Gold Bags" },
];

// Mock data for collection items
const collectionItems = Array(12).fill({
  id: Math.random().toString(),
  type: "Common Chest",
  owner: 3,
  image: "/icons/microphone.svg", // You'll need to add this icon
});

export default function Collection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [itemCount, setItemCount] = useState(12); // State for item count

  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-primary-dark mb-6">
          Collection Vault
        </h1>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-gray-600 font-bold">Filter By:</span>
          <div className="flex gap-2">
            {filterTypes.map((filter) => (
              <Button
                key={filter.id}
                onClick={() => setActiveFilter(filter.name)}
                className={`${
                  activeFilter === filter.name
                    ? "bg-[#ffe8c8] text-[#FF9F5A] border border-[#FF9F5A] hover:text-[#FF9F5A]"
                    : "bg-white border border-gray-200 hover:bg-[#ffe8c8] hover:text-[#FF9F5A]"
                }`}
              >
                {filter.name}
              </Button>
            ))}
          </div>
          <span className="ml-auto text-gray-600 font-bold">
            {itemCount} Items
          </span>
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {collectionItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 flex flex-col items-center border border-gray-100"
            >
              <div className="w-24 h-24 bg-[#FF9F5A] rounded-full flex items-center justify-center mb-4">
                <Image
                  src={item.image}
                  alt="Chest icon"
                  width={40}
                  height={40}
                  className="text-white"
                />
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-700">
                {item.type}
              </h3>
              <p className="text-gray-500 mb-4">Owner: {item.owner}</p>
              <Button className="w-full py-2 px-4 rounded-lg border border-[#FF9F5A] text-[#FF9F5A] hover:bg-[#FF9F5A] hover:text-white transition-all">
                Open
              </Button>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
