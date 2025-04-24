"use client";

import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { IoMicOutline } from "react-icons/io5";

export default function Prediction() {
  const [selectedOption, setSelectedOption] = useState<"Yes" | "No" | null>(
    null
  );
  const [amount, setAmount] = useState("");

  const predictions = [
    {
      id: 1,
      timeLeft: "2h 15m",
      question: "Will BTC close above $70K todays ?",
      pool: "12,500",
      yesPercentage: 62,
      noPercentage: 38,
    },
    {
      id: 2,
      timeLeft: "2h 15m",
      question: "Will BTC close above $70K todays ?",
      pool: "12,500",
      yesPercentage: 62,
      noPercentage: 38,
    },
    {
      id: 3,
      timeLeft: "2h 15m",
      question: "Will BTC close above $70K todays ?",
      pool: "12,500",
      yesPercentage: 62,
      noPercentage: 38,
    },
    {
      id: 4,
      timeLeft: "2h 15m",
      question: "Will BTC close above $70K todays ?",
      pool: "12,500",
      yesPercentage: 62,
      noPercentage: 38,
    },
    {
      id: 5,
      timeLeft: "2h 15m",
      question: "Will BTC close above $70K todays ?",
      pool: "12,500",
      yesPercentage: 62,
      noPercentage: 38,
    },
  ];

  const handlePredict = (id: number) => {
    // Handle prediction logic here
    console.log("Predicting for id:", id);
  };

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-primary-dark mb-4 sm:mb-6">
          Prediction
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {predictions.map((prediction) => (
            <div
              key={prediction.id}
              className="rounded-xl p-4 sm:p-6 border-2 border-primary bg-white"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#fff3e8] rounded-full flex items-center justify-center">
                  <IoMicOutline className="text-xl sm:text-2xl text-primary" />
                </div>
              </div>
              <span className="text-sm sm:text-base text-gray-600 font-medium">
                Close in {prediction.timeLeft}
              </span>

              <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-3 mt-3 line-clamp-2">
                {prediction.question}
              </h3>

              <div className="text-sm sm:text-base text-gray-600 font-medium mb-4">
                <div className="flex flex-wrap gap-2 justify-between">
                  <span>Pool: {prediction.pool} $Root</span>
                  <div className="flex gap-2">
                    <span>Yes: {prediction.yesPercentage}%</span>
                    <span>No: {prediction.noPercentage}%</span>
                  </div>
                </div>
              </div>

              {prediction.id === 1 ? (
                <>
                  <div className="flex flex-col sm:flex-row gap-2 mb-4">
                    <input
                      type="text"
                      placeholder="Input Number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full p-2 bg-[#fff3e8] text-gray-600 border-2 border-primary rounded-xl text-center focus:outline-none text-sm sm:text-base"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedOption("No")}
                        className={`px-3 py-2 rounded-xl border-2 text-sm sm:text-base flex items-center justify-center ${
                          selectedOption === "No"
                            ? "bg-primary text-white"
                            : "border-primary text-gray-600 hover:bg-primary/10"
                        }`}
                      >
                        No
                      </button>
                      <button
                        onClick={() => setSelectedOption("Yes")}
                        className={`px-3 py-2 rounded-xl border-2 text-sm sm:text-base flex items-center justify-center ${
                          selectedOption === "Yes"
                            ? "bg-primary text-white"
                            : "border-primary text-gray-600 hover:bg-primary/10"
                        }`}
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePredict(prediction.id)}
                    className="w-full py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors text-sm sm:text-base"
                  >
                    Predict
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handlePredict(prediction.id)}
                  className="w-full py-2 bg-[#fff3e8] text-gray-600 rounded-xl border-2 border-primary hover:bg-primary hover:text-white transition-colors text-sm sm:text-base"
                >
                  Predict
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
