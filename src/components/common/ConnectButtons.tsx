import React from "react";
import Button from "./Button";
import { useAuthUi } from "@futureverse/auth-ui";
import { shortenAddress } from "@/utils/addressUtils";

interface ConnectButtonsProps {
  telegramName?: string;
  walletAddress?: string;
}

const ConnectButtons: React.FC<ConnectButtonsProps> = ({
  telegramName = "",
  walletAddress = "",
}) => {
  const { openLogin } = useAuthUi();

  const handleTelegramConnect = () => {
    // TODO: Implement Telegram connection logic
    console.log("Connecting to Telegram...");
  };

  const handleWalletConnect = () => {
    if (!walletAddress) {
      openLogin();
    }
  };

  return (
    <div className="flex gap-3">
      <Button
        className="bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white transition-colors"
        onClick={handleTelegramConnect}
      >
        {telegramName ? telegramName : "Connect Telegram"}
      </Button>
      <Button
        className="bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white transition-colors"
        onClick={() => handleWalletConnect()}
      >
        {walletAddress ? `${shortenAddress(walletAddress)}` : "Connect Wallet"}
      </Button>
    </div>
  );
};

export default ConnectButtons;
