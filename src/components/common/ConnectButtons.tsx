import React, { useEffect } from "react";
import Button from "./Button";
import { useAuthUi } from "@futureverse/auth-ui";
import { shortenAddress } from "@/utils/addressUtils";
import { useSession, signIn, signOut } from "next-auth/react";
import { LoginButton } from "@telegram-auth/react";
import { BOT_USERNAME } from "@/utils/env";
import { useAuth } from "@futureverse/auth-react";
import axios from "axios";

const ConnectButtons: React.FC<{}> = ({ }) => {
  const { openLogin } = useAuthUi();
  const { userSession: fpSession, signOutPass } = useAuth();
  const { data: tgSession } = useSession();

  const [linking, setLinking] = React.useState(false);
  const [linked, setLinked] = React.useState(false);

  useEffect(() => {
    if (tgSession && fpSession?.futurepass && !linking && !linked) {
      setLinking(true);
      axios.post("/api/linkfp", {
        telegramId: tgSession.user?.id,
        futurepass: fpSession.futurepass,
      })
        .then(() => setLinked(true))
        .catch(console.error)
        .finally(() => setLinking(false));
    }
  }, [tgSession, fpSession?.futurepass, linking, linked]);

  const handleWalletConnect = () => {
    if (!fpSession) {
      openLogin();
    } else {
      signOutPass();
      setLinked(false);
    }
  };

  return (
    <div className="flex gap-3">
      {tgSession ?
        <>
          <Button
            className="bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white transition-colors"
            onClick={() => {
              signOut();
              setLinked(false);
            }}
          >{tgSession.user?.name}
          </Button>
          <Button
            className="bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white transition-colors"
            onClick={() => handleWalletConnect()}
            disabled={linking}
          >
            {fpSession?.futurepass
              ? `${shortenAddress(fpSession?.futurepass)}`
              : "Connect Wallet"}
          </Button>
        </>
        :
        <LoginButton
          botUsername={BOT_USERNAME}
          onAuthCallback={(data: any) => {
            signIn("telegram-login", undefined, data as any);
          }}
        />
      }
    </div>
  );
};

export default ConnectButtons;
