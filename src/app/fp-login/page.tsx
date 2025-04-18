"use client";

import { useAuth } from '@futureverse/auth-react';
import { useAuthUi } from '@futureverse/auth-ui';

export default function FPLoginPage() {
  const { userSession } = useAuth();
  const { openLogin } = useAuthUi();

  function signOutPass() {
    throw new Error('Function not implemented.');
  }

  return <>
    {userSession ? (
      <>
        <div className="row">User EOA: {userSession.eoa}</div>
        <div className="row">User Chain ID: {userSession.chainId}</div>
        <div className="row">User Custodian: {userSession.custodian}</div>
        <div className="row">User Futurepass: {userSession.futurepass}</div>
        <button
          onClick={() => {
            signOutPass();
          }}
          className="green"
        >
          Log Out
        </button>
      </>
    ) : (
      <button onClick={() => openLogin()}>Login</button>
    )}
  </>
}
