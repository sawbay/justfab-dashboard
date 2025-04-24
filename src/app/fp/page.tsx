"use client";

import { useAuth } from '@futureverse/auth-react';
import { CSSProperties, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useAuthUi } from '@futureverse/auth-ui';
import { Page } from '@/components/Page';

export default function FPPage() {
  const { authClient, userSession } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (userSession) {
      router.push('/fp');
    }
  }, [authClient, userSession]);

  return <Page>
    {userSession ?
      <>
        <RowComponent showSpinner={true}>
          {JSON.stringify(userSession, null, 2)}
        </RowComponent>
      </>
      :
      <>
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
      </>
    }
  </Page>
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