"use client";

import { useAuthUi } from '@futureverse/auth-ui';

export default function FPLoginPage() {
    const { openLogin, closeLogin, isLoginOpen } = useAuthUi();

    return <button onClick={() => openLogin()}>Login</button>;
}
