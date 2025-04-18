"use client";

import { useAuthUi } from '@futureverse/auth-ui';

export default function FPLoginPage() {
  const { openLogin } = useAuthUi();

  return <>
    <button onClick={() => openLogin()}>Login</button>
  </>
}
