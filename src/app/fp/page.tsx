"use client";

import { useAuth } from '@futureverse/auth-react';
import { CSSProperties, useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { UserSession } from '@futureverse/auth-react/auth';
import { useAuthUi } from '@futureverse/auth-ui';

export default function FPPage() {
  const { authClient } = useAuth();
  const [signInState, setSignInState] = useState<boolean | undefined>(
    undefined
  );

  const router = useRouter();

  useEffect(() => {
    const userStateChange = (user: UserSession | undefined) => {
      if (user) {
        setSignInState(true);
        router.push('/');
      }
      if (!user) {
        setSignInState(false);
      }
    };

    authClient.addUserStateListener(userStateChange);
    return () => {
      authClient.removeUserStateListener(userStateChange);
    };
  }, [authClient, router]);

  if (signInState === true) {
    return (
      <RowComponent showSpinner={true}>
        Redirecting, please wait...
      </RowComponent>
    );
  }

  if (signInState === false) {
    return (
      <RowComponent showSpinner={false}>
        <div>Not Authenticated - Please Log In...</div>
        <LogIn
          styles={{
            padding: ' 16px',
            fontWeight: '700',
            fontSize: '1.2rem',
          }}
        />
      </RowComponent>
    );
  }
  return <RowComponent showSpinner={true}>Authenticating...</RowComponent>;
}

const RowComponent = ({
  children,
  showSpinner,
}: {
  children: React.ReactNode;
  showSpinner: boolean;
}) => {
  return (
    <div className="row login-row">
      <div className="card login-card">
        <div className="inner">
          <div className="grid cols-1 login-grid" style={{}}>
            {showSpinner && <div className="spinner" />}
            <div style={{ textAlign: 'center' }}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LogIn = ({ styles }: { styles?: CSSProperties }) => {
  const { openLogin } = useAuthUi();

  return (
    <button onClick={() => openLogin()} className="green" style={styles}>
      Log In
    </button>
  );
};