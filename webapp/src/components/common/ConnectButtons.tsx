import React, { useEffect } from "react";
import Button from "./Button";
import { useAuthUi } from "@futureverse/auth-ui";
import { shortenAddress } from "@/utils/address";
import { LoginButton } from "@telegram-auth/react";
import { BOT_USERNAME } from "@/utils/env";
import { useAuth } from "@futureverse/auth-react";
import axios from "axios";
import { USERS_FUTUREPASS_LINK, USERS_TELEGRAM_LOGIN } from "@/app/api/routes";
import { IMAGES } from "@/constants/images";
import { useAppwrite } from "@/hooks/useAppwrite";
import { fireEvent, WorkerEventType } from "@/utils/worker_events";

const ConnectButtons: React.FC<{}> = ({ }) => {
  const { openLogin } = useAuthUi();
  const { userSession: fpSession, signOutPass } = useAuth();
  const { client, account, logoutSession, user, telegramAuthenticated, linkFuturepass } = useAppwrite();

  useEffect(() => {
    // if (fpSession && !user) {
    //   axios
    //     .get(USERS_GET, {
    //       params: {
    //         tgId: tgSession?.user?.id,
    //       },
    //     })
    //     .then((res) => {
    //       setUser(res.data.user);
    //     });
    // }
  }, [fpSession, user]);

  useEffect(() => {
    if (fpSession && user) {
      linkFP(fpSession.futurepass);
    }
  }, [fpSession, user]);

  const linkFP = async (futurepass: string) => {
    await linkFuturepass(futurepass);
    await fireEvent({
      etype: WorkerEventType.REWARD_WELCOME_CHEST,
      payload: {
        userId: user!.$id,
      }
    });
  }

  const handleWalletConnect = () => {
    if (!fpSession) {
      openLogin();
    } else {
      // signOutPass();
      linkFuturepass(fpSession.futurepass);
    }
  };

  const buttonStyle = {
    backgroundImage: `url(${IMAGES.bgButton})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    border: "none",
    boxShadow: "none",
    color: "#fff",
    fontWeight: 700,
    fontSize: "18px",
    padding: "10px 28px",
    minWidth: 160,
    minHeight: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "DynaPuff",
  };

  const handleTelegramLogin = async (data: any) => {
    const response = await axios.post(USERS_TELEGRAM_LOGIN, { data });
    if (response.data.success) {
      const { userId, secret } = response.data.data;
      await telegramAuthenticated(userId, secret);
      const user = await account!.get();
      console.log(user);
    }
  };

  return (
    <div className="flex gap-3 justify-end items-center">
      {user ? (
        <>
          <Button
            style={buttonStyle}
            className="!bg-transparent !border-none !shadow-none"
            onClick={() => handleWalletConnect()}
          >
            {fpSession?.futurepass
              ? `${shortenAddress(fpSession?.futurepass)}`
              : "Connect Wallet"}
          </Button>
          <Button
            style={buttonStyle}
            className="!bg-transparent !border-none !shadow-none"
            onClick={() => logoutSession()}
          >
            {user.name}
          </Button>
        </>
      ) : (
        <LoginButton
          botUsername={BOT_USERNAME}
          buttonSize="large"
          cornerRadius={5}
          showAvatar={true}
          onAuthCallback={(data: any) => {
            handleTelegramLogin(data);
          }}
        />
      )}
    </div>
  );
};

export default ConnectButtons;
