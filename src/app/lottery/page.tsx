"use client";

import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";

export default function Lottery() {
  // States for lottery data
  const [prizePool, setPrizePool] = useState("858,049");
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [amount, setAmount] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 2,
    minutes: 2,
    seconds: 2,
  });
  const [ticketData, setTicketData] = useState({
    totalCost: 0,
    yourTickets: 2,
  });

  // Update timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle amount change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      // Only allow numbers and decimal point
      setAmount(value);
      setTicketData((prev) => ({
        ...prev,
        totalCost: Number(value) || 0,
      }));
    }
  };

  // Handle max amount
  const handleMaxAmount = () => {
    const maxAmount = 1000; // This should come from your actual max balance
    setAmount(maxAmount.toString());
    setTicketData((prev) => ({
      ...prev,
      totalCost: maxAmount,
    }));
  };

  const handleNumberSelect = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const generateNumbers = () => {
    const numbers = [];
    for (let i = 1; i <= 100; i++) {
      numbers.push(i);
    }
    return numbers;
  };

  const isNumberSold = (number: number) => {
    // Mock data - replace with actual logic
    return [93].includes(number);
  };

  const isNumberReady = (number: number) => {
    // Mock data - replace with actual logic
    return [93].includes(number);
  };

  const handlePlayLottery = () => {
    console.log("Playing lottery...");
    // Add your lottery logic here
  };

  const handleBuyTicket = () => {
    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    if (selectedNumbers.length === 0) {
      alert("Please select at least one number");
      return;
    }
    console.log("Buying ticket with:", {
      amount,
      selectedNumbers,
    });
    // Add your buy ticket logic here
  };

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-primary-dark mb-4 sm:mb-6">
          Lottery
        </h1>

        <div className="bg-[#FFF8F1] rounded-xl p-6 relative">
          <div className="flex justify-between items-start bg-[#FFE8C8] p-4 font-medium rounded-xl">
            <div>
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-primary mb-2">Lottery Prize Pool</div>
                  <div className="text-4xl font-bold text-gray-800">
                    $ {prizePool}
                  </div>
                </div>
                <div className="flex gap-4 border-2 border-primary rounded-lg p-4 bg-[#FFF3E8] shadow-[0_0_10px_rgba(205,142,95,0.2)]">
                  <div className="text-center">
                    <div className="border-2 border-primary rounded-lg p-3 mb-1 text-xl font-semibold min-w-[48px] text-primary bg-[#FFF8F1] shadow-sm">
                      {timeLeft.days}
                    </div>
                    <div className="text-sm text-gray-600">Days</div>
                  </div>
                  <div className="text-center">
                    <div className="border-2 border-primary rounded-lg p-3 mb-1 text-xl font-semibold min-w-[48px] text-primary bg-[#FFF8F1] shadow-sm">
                      {timeLeft.hours}
                    </div>
                    <div className="text-sm text-gray-600">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="border-2 border-primary rounded-lg p-3 mb-1 text-xl font-semibold min-w-[48px] text-primary bg-[#FFF8F1] shadow-sm">
                      {timeLeft.minutes}
                    </div>
                    <div className="text-sm text-gray-600">Minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="border-2 border-primary rounded-lg p-3 mb-1 text-xl font-semibold min-w-[48px] text-primary bg-[#FFF8F1] shadow-sm">
                      {timeLeft.seconds}
                    </div>
                    <div className="text-sm text-gray-600">Seconds</div>
                  </div>
                </div>
              </div>
              <button
                onClick={handlePlayLottery}
                className="bg-[#CD8E5F] text-white px-6 py-2 rounded-lg hover:bg-[#CD8E5F]/90 transition-colors mt-4"
              >
                Play Lottery
              </button>
            </div>

            <div className="absolute right-6 top-1/2 -translate-y-1/2">
              <Image
                src="/images/lottery-bag.png"
                alt="Lottery Bag"
                width={150}
                height={150}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Left Section - Ticket Selection */}
          <div className="rounded-xl p-6 bg-[#FFE8C8] font-medium">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                $
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Select Ticket Amount
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Choose the number of tickets you&apos;d like and select your
              numbers below
            </p>

            <div className="space-y-4">
              <div>
                <div className="text-gray-600 mb-2">Staking</div>
                <div className="relative">
                  <input
                    type="text"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="Inter Amount"
                    className="w-full p-3 pr-16 bg-[#FFF8F1] border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    onClick={handleMaxAmount}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 rounded text-sm text-gray-600"
                  >
                    MAX
                  </button>
                </div>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Total Cost</span>
                <span>${ticketData.totalCost}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Your have:</span>
                <span>{ticketData.yourTickets} Ticket</span>
              </div>

              <button
                onClick={handleBuyTicket}
                className="w-full bg-[#CD8E5F] text-white py-3 rounded-lg hover:bg-[#CD8E5F]/90 transition-colors"
              >
                Buy ticket
              </button>
            </div>
          </div>

          {/* Right Section - Number Selection */}
          <div className="bg-[#FFF8F1] rounded-xl p-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Select Your Numbers
            </h2>
            <p className="text-gray-600 mb-6">
              Stay eligible to win every week as long as your tickets remain
              staked
            </p>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Choose numbers
              </h3>
              <div className="grid grid-cols-10 gap-2">
                {generateNumbers().map((number) => (
                  <button
                    key={number}
                    onClick={() => handleNumberSelect(number)}
                    disabled={isNumberSold(number)}
                    className={`
                      w-10 h-10 rounded-lg flex items-center justify-center text-sm border-2 border-primary bg-[#FFF8F1] text-primary
                      ${
                        isNumberSold(number)
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : selectedNumbers.includes(number)
                          ? "bg-[#CD8E5F] text-white"
                          : "hover:bg-[#CD8E5F]/10"
                      }
                    `}
                  >
                    {number}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-200 rounded"></div>
                <span className="text-gray-600">SOLD</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#FFE4CC] rounded"></div>
                <span className="text-gray-600">READY</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#CD8E5F] rounded"></div>
                <span className="text-gray-600">YOU CHOOSE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
