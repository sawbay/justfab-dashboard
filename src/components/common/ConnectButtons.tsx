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

const ConnectButtons: React.FC<{}> = ({ }) => {
  const { openLogin } = useAuthUi();
  const { userSession: fpSession, signOutPass } = useAuth();
  const { data: tgSession } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (fpSession) {
      axios.get(USERS_GET, {
        params: {
          tgId: tgSession?.user?.id,
        },
      }).then((res) => {
        setUser(res.data.user);
        console.log(res.data.user);
      });
    }
  }, [fpSession]);

  useEffect(() => {
    if (fpSession && user && user.futurepass == null) {
      axios.post(USERS_FUTUREPASS_LINK, {
        telegramId: Number(tgSession?.user?.id),
        futurepass: fpSession.futurepass,
      }).then(() => { })
        .catch(console.error)
    }
  }, [fpSession, user]);

  const handleWalletConnect = () => {
    if (!fpSession) {
      openLogin();
    } else {
      signOutPass();
    }
  };

  return (
    <div className="flex gap-3">
      {tgSession ?
        <>
          <Button
            className="bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white transition-colors"
            onClick={() => handleWalletConnect()}
          >
            {fpSession?.futurepass
              ? `${shortenAddress(fpSession?.futurepass)}`
              : "Connect Wallet"}
          </Button>
          <Button
            className="bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white transition-colors"
          >{tgSession.user?.name}
          </Button>
        </>
        :
        <LoginButton
          botUsername={BOT_USERNAME}
          buttonSize="large" // "large" | "medium" | "small"
          cornerRadius={5} // 0 - 20
          showAvatar={true}
          onAuthCallback={(data: any) => {
            signIn("telegram-login", undefined, data as any);
          }}
        />
      }
    </div>
  );
};

export default ConnectButtons;
