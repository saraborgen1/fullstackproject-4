"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/Auth.module.css";

type SavedFile = {
  id: string;
  name: string;
  content: string;
  updatedAt: string;
};

type SavedUser = {
  username: string;
  password: string;
  files: SavedFile[];
};

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const currentUser = sessionStorage.getItem("currentUser");
    if (currentUser) {
      router.replace("/editor");
    }
  }, [router]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const rawUsers = localStorage.getItem("users");
    const users: SavedUser[] = rawUsers ? JSON.parse(rawUsers) : [];

    const matchedUser = users.find(
      (user) =>
        user.username === username.trim() &&
        user.password === password.trim(),
    );

    if (!matchedUser) {
      setError("Invalid username or password");
      return;
    }

    sessionStorage.setItem("currentUser", matchedUser.username);
    router.push("/editor");
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login</h1>
        <p className={styles.subtitle}>Enter your account details to continue</p>

        <form className={styles.form} onSubmit={handleLogin}>
          <input
            className={styles.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className={styles.error}>{error}</p>}

          <button className={styles.primaryButton} type="submit">
            Login
          </button>
        </form>

        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => router.push("/signup")}
        >
          Create new account
        </button>
      </div>
    </main>
  );
}