import React from "react";
import Button from "./Button";

interface ConnectButtonsProps {
  telegramName?: string;
  walletAddress?: string;
}

const ConnectButtons: React.FC<ConnectButtonsProps> = ({
  telegramName = "",
  walletAddress = "",
}) => {
  const handleTelegramConnect = () => {
    // TODO: Implement Telegram connection logic
    console.log("Connecting to Telegram...");
  };

  const handleWalletConnect = () => {
    // TODO: Implement wallet connection logic
    console.log("Connecting wallet...");
  };

  return (
    <div className="flex gap-4">
      <Button variant="outline" onClick={handleTelegramConnect}>
        {telegramName || "Connect Telegram"}
      </Button>
      <Button onClick={handleWalletConnect}>
        {walletAddress ? `Wallet Connect ${walletAddress}` : "Connect Wallet"}
      </Button>
    </div>
  );
};

export default ConnectButtons;
