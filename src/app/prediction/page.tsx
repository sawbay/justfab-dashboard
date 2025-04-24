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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {predictions.map((prediction) => (
            <div
              key={prediction.id}
              className="rounded-xl p-6 border-2 border-primary"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[#fff3e8] rounded-full flex items-center justify-center">
                  <IoMicOutline className="text-2xl text-primary" />
                </div>
              </div>
              <span className="text-gray-600 font-medium">
                Close in {prediction.timeLeft}
              </span>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-4">
                {prediction.question}
              </h3>

              <div className="text-gray-600 font-medium mb-4">
                Pool: {prediction.pool} $Root | Yes: {prediction.yesPercentage}%
                | No: {prediction.noPercentage}%
              </div>

              {prediction.id === 1 ? (
                <>
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      placeholder="Input Number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="flex-1 p-2 bg-[#fff3e8] text-gray-600 border-2 border-primary rounded-2xl text-center focus:outline-none"
                    />
                    <button
                      onClick={() => setSelectedOption("No")}
                      className={`px-4 py-2 rounded-2xl border-2 ${
                        selectedOption === "No"
                          ? "bg-primary text-white"
                          : "border-primary text-gray-600"
                      }`}
                    >
                      No
                    </button>
                    <button
                      onClick={() => setSelectedOption("Yes")}
                      className={`px-4 py-2 rounded-2xl border-2 ${
                        selectedOption === "Yes"
                          ? "bg-primary text-white"
                          : "border-primary text-gray-600"
                      }`}
                    >
                      Yes
                    </button>
                  </div>
                  <button
                    onClick={() => handlePredict(prediction.id)}
                    className="w-full py-2 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-colors"
                  >
                    Predict
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handlePredict(prediction.id)}
                  className="w-full py-2 bg-[#fff3e8] text-gray-600 rounded-2xl border-2 border-primary hover:bg-primary hover:text-white transition-colors"
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
