"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FPLoginCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = Object.fromEntries(params.entries());
    console.log("Params:", data);
    router.push("/fp");
  }, [router]);

  return <></>;
}
