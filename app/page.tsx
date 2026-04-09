"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const currentUser = sessionStorage.getItem("currentUser");

    if (currentUser) {
      router.replace("/editor");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return null;
}