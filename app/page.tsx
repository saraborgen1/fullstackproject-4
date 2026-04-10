"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const currentUser = sessionStorage.getItem("currentUser");

  if (typeof window !== "undefined") {
    if (currentUser) {
      router.replace("/editor");
    } else {
      router.replace("/login");
    }
  }

  return null;
}