import React from "react";
import Card from "../common/Card";
import { VIPReward } from "@/types";

interface VIPRewardCardProps {
  reward: VIPReward;
}

const VIPRewardCard: React.FC<VIPRewardCardProps> = ({ reward }) => {
  return (
    <Card
      className={`p-6 text-center relative ${
        reward.isCompleted ? "bg-secondary/10" : "bg-background-light"
      }`}
    >
      {/* Level Circle */}
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4
        ${reward.isCompleted ? "bg-secondary/50" : "bg-primary"}`}
      >
        <span className="text-xl font-bold text-white">{reward.level}</span>
      </div>

      {/* Completion Check */}
      {reward.isCompleted && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Description */}
      <p
        className={`text-sm mb-4 ${
          reward.isCompleted ? "text-secondary/50" : "text-secondary-dark"
        }`}
      >
        {reward.description}
      </p>

      {/* Rewards */}
      <div className="flex justify-center gap-4 text-sm">
        <div
          className={`flex items-center gap-1 ${
            reward.isCompleted ? "text-secondary/50" : "text-primary-dark"
          }`}
        >
          <span>🎮</span>
          <span>{reward.rewards.game}</span>
        </div>
        <div
          className={`flex items-center gap-1 ${
            reward.isCompleted ? "text-secondary/50" : "text-primary-dark"
          }`}
        >
          <span>🎮</span>
          <span>{reward.rewards.token}</span>
        </div>
      </div>
    </Card>
  );
};

export default VIPRewardCard;
