import React from "react";
import Card from "../common/Card";
import { VIPReward } from "@/types";

interface VIPRewardCardProps {
  reward: VIPReward;
}

const VIPRewardCard: React.FC<VIPRewardCardProps> = ({ reward }) => {
  // Determine if this is the next task (not completed and not locked)
  const isNextTask = !reward.isCompleted && !reward.isLocked;

  return (
    <Card
      className={`p-4 text-center relative h-[180px] max-w-[160px] mx-auto flex flex-col justify-between border ${
        reward.isCompleted
          ? "bg-secondary/10 border-secondary/20"
          : isNextTask
          ? "bg-primary/5 border-primary"
          : "bg-background-light border-primary/20"
      } rounded-lg`}
    >
      {/* Level Circle */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3
        ${
          reward.isCompleted
            ? "bg-secondary/50"
            : isNextTask
            ? "bg-primary"
            : "bg-primary/50"
        }`}
      >
        <span className="text-lg font-bold text-white">{reward.level}</span>
      </div>

      {/* Completion Check */}
      {reward.isCompleted && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
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
        className={`text-xs mb-3 ${
          reward.isCompleted
            ? "text-secondary/50"
            : isNextTask
            ? "text-primary-dark font-medium"
            : "text-secondary-dark"
        }`}
      >
        {reward.description}
      </p>

      {/* Rewards */}
      <div className="flex justify-center gap-3 text-xs">
        <div
          className={`flex items-center gap-1 ${
            reward.isCompleted
              ? "text-secondary/50"
              : isNextTask
              ? "text-primary-dark font-medium"
              : "text-primary-dark"
          }`}
        >
          <span>🎮</span>
          <span>{reward.rewards.game}</span>
        </div>
        <div
          className={`flex items-center gap-1 ${
            reward.isCompleted
              ? "text-secondary/50"
              : isNextTask
              ? "text-primary-dark font-medium"
              : "text-primary-dark"
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
