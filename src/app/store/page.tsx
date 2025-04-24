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
  { id: 5, name: "Sale Off" },
];

// Mock data for store items
const storeItems = Array(12).fill({
  id: Math.random().toString(),
  type: "Common Chest",
  description: "A simple wooden chest containing common items and resources",
  price: "5,000 $Root",
  image: "/icons/microphone.svg",
});

export default function Store() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [itemCount, setItemCount] = useState(12);
  const [rootBalance, setRootBalance] = useState("85.72");
  const [usdBalance, setUsdBalance] = useState("$234.30 USD");

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-primary-dark mb-2">
              Game Store
            </h1>
            <p className="text-gray-600 font-semibold">
              Spend your $Root to gear up!
            </p>
          </div>
          <div className="w-full sm:w-auto bg-[#fff3e8] rounded-lg px-4 py-2 border border-[#ffdcb7] flex items-center gap-3">
            <span className="text-gray-600 font-semibold text-base">
              $ROOT Balance
            </span>
            <span className="text-[#22c55e] font-bold text-xl">
              {rootBalance}
            </span>
            <span className="text-gray-500 text-xs">~{usdBalance}</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <span className="text-gray-600 font-bold">Filter By:</span>
            <div className="flex flex-wrap gap-2">
              {filterTypes.map((filter) => (
                <Button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.name)}
                  className={`${
                    activeFilter === filter.name
                      ? "bg-[#ffe8c8] text-[#FF9F5A] border border-[#FF9F5A] hover:text-[#FF9F5A]"
                      : "border border-gray-200 hover:bg-[#ffe8c8] hover:text-[#FF9F5A]"
                  }`}
                >
                  {filter.name}
                </Button>
              ))}
            </div>
          </div>
          <span className="ml-0 sm:ml-auto text-gray-600 font-bold">
            {itemCount} Items
          </span>
        </div>

        {/* Store Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {storeItems.map((item, index) => (
            <div
              key={index}
              className="rounded-xl p-4 sm:p-6 flex flex-col items-center border-2 border-primary"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#FF9F5A] rounded-full flex items-center justify-center mb-4">
                <Image
                  src={item.image}
                  alt="Item icon"
                  width={32}
                  height={32}
                  className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                />
              </div>
              <h3 className="text-base sm:text-lg font-medium mb-2 text-gray-700">
                {item.type}
              </h3>
              <p className="text-gray-500 mb-2 text-center text-sm">
                {item.description}
              </p>
              <p className="text-[#FF9F5A] font-bold mb-4">{item.price}</p>
              <Button className="w-full py-2 px-4 rounded-lg border border-[#FF9F5A] text-[#FF9F5A] hover:bg-[#FF9F5A] hover:text-white transition-all">
                Buy now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
