"use client";

import { useAuth } from '@futureverse/auth-react';
import { useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function FPPage() {
  const { userSession, signOutPass } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (userSession) {
      console.log('User session:', userSession);
    } else {
      router.push("/fp/login");
    }
  }, [userSession]);

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
      <></>
    )}
  </>
}
