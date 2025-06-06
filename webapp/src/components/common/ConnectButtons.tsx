import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useAuthUi } from "@futureverse/auth-ui";
import { shortenAddress } from "@/utils/addressUtils";
import { useSession, signIn, signOut } from "next-auth/react";
import { LoginButton } from "@telegram-auth/react";
import { BOT_USERNAME } from "@/utils/env";
import { useAuth } from "@futureverse/auth-react";
import axios from "axios";
import { USERS_FUTUREPASS_LINK, USERS_GET } from "@/app/api/routes";
import { User } from "@/app/api/auth/[...nextauth]/options";
import { IMAGES } from "@/constants/images";

const ConnectButtons: React.FC<{}> = ({}) => {
  const { openLogin } = useAuthUi();
  const { userSession: fpSession, signOutPass } = useAuth();
  const { data: tgSession } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (fpSession && !user) {
      axios
        .get(USERS_GET, {
          params: {
            tgId: tgSession?.user?.id,
          },
        })
        .then((res) => {
          setUser(res.data.user);
        });
    }
  }, [fpSession, user]);

  useEffect(() => {
    if (fpSession && user && user.futurepass == null) {
      axios
        .post(USERS_FUTUREPASS_LINK, {
          telegramId: Number(tgSession?.user?.id),
          futurepass: fpSession.futurepass,
        })
        .then(() => {})
        .catch(console.error);
    }
  }, [fpSession, user]);

  const handleWalletConnect = () => {
    if (!fpSession) {
      openLogin();
    } else {
      signOutPass();
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

  return (
    <div className="flex gap-3 justify-end items-center">
      {tgSession ? (
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
          >
            {tgSession.user?.name}
          </Button>
        </>
      ) : (
        <LoginButton
          botUsername={BOT_USERNAME}
          buttonSize="large"
          cornerRadius={5}
          showAvatar={true}
          onAuthCallback={(data: any) => {
            signIn("telegram-login", undefined, data as any);
          }}
        />
      )}
    </div>
  );
};

export default ConnectButtons;
