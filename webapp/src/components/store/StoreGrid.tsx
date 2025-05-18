import React from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import { CommonChest } from "@/types";

interface StoreItemProps {
  item: CommonChest;
}

const StoreItem: React.FC<StoreItemProps> = ({ item }) => (
  <Card className="flex flex-col items-center p-6">
    <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center mb-4">
      <svg
        className="w-8 h-8 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 12H4"
        />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-1">{item.name}</h3>
    <p className="text-sm text-gray-500 mb-4">{item.description}</p>
    <div className="text-orange-500 font-medium mb-4">{item.price} $Root</div>
    <Button className="w-full">Buy now</Button>
  </Card>
);

interface StoreGridProps {
  items: CommonChest[];
  filterType: string;
}

const StoreGrid: React.FC<StoreGridProps> = ({ items, filterType }) => {
  const filteredItems =
    filterType === "All"
      ? items
      : items.filter((item) => item.name.includes(filterType));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredItems.map((item) => (
        <StoreItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default StoreGrid;
