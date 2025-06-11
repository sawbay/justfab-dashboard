"use client";

import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";
import Button from "@/components/common/Button";
import { useAppwrite } from "@/components/providers/AppwriteProvider";
import { ItemType } from "@/types/item_types";

const filterTypes = [
  { id: 0, name: "ALL" },
  { id: 1, name: ItemType.CHEST as string },
  { id: 2, name: ItemType.AURA_KEY as string },
  { id: 3, name: ItemType.GOLD_BAG as string },
  { id: 4, name: ItemType.FOOD_BAG as string },
  { id: 5, name: ItemType.ENERGY_BAG as string },
];

export default function Collection() {
  const { user, fetchInventory, backendService } = useAppwrite();
  const [activeFilter, setActiveFilter] = useState(0);
  const [itemCount, setItemCount] = useState(12); // State for item count
  const [inventory, setInventory] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const itemTypes = activeFilter === 0 ?
        Object.values(ItemType) :
        [filterTypes.find((filter) => filter.id === activeFilter)?.name as ItemType];

      fetchInventory({ used: false, itemTypes: itemTypes }).then((inventory) => {
        setItemCount(inventory.total);
        const docs = inventory.documents.map((doc) => {
          return {
            id: doc.$id,
            type: doc.itemType,
            owner: 1,
            image: "/icons/microphone.svg",
          };
        });
        setInventory(docs);
      });
    }
  }, [user, activeFilter]);

  const isOpenable = (item: any) => {
    return item.type === ItemType.CHEST;
  }

  const openChest = async (item: any) => {
    try {
      const data = await backendService!.openChest(item.id);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-primary-dark mb-4 sm:mb-6">
          Collection Vault
        </h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <span className="text-gray-600 font-bold">Filter By:</span>
            <div className="flex flex-wrap gap-2">
              {filterTypes.map((filter) => (
                <Button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`${activeFilter === filter.id
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

        {/* Collection Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {inventory.map((item, index) => (
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
              <p className="text-gray-500 mb-4">Owner: {item.owner}</p>
              {isOpenable(item) && <Button onClick={() => openChest(item)} className="w-full py-2 px-4 rounded-lg border border-[#FF9F5A] text-[#FF9F5A] hover:bg-[#FF9F5A] hover:text-white transition-all">
                Open
              </Button>}
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
