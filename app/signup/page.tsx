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

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const currentUser = sessionStorage.getItem("currentUser");
    if (currentUser) {
      router.replace("/editor");
    }
  }, [router]);

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setError("Username and password are required");
      return;
    }

    if (trimmedPassword !== confirmPassword.trim()) {
      setError("Passwords do not match");
      return;
    }

    const rawUsers = localStorage.getItem("users");
    const users: SavedUser[] = rawUsers ? JSON.parse(rawUsers) : [];

    const userExists = users.some((user) => user.username === trimmedUsername);

    if (userExists) {
      setError("This username already exists");
      return;
    }

    const newUser: SavedUser = {
      username: trimmedUsername,
      password: trimmedPassword,
      files: [],
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    sessionStorage.setItem("currentUser", trimmedUsername);

    router.push("/editor");
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sign Up</h1>
        <p className={styles.subtitle}>Create your account to start editing</p>

        <form className={styles.form} onSubmit={handleSignup}>
          <input
            className={styles.input}
            type="text"
            placeholder="Choose username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className={styles.input}
            type="password"
            placeholder="Choose password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className={styles.input}
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className={styles.error}>{error}</p>}

          <button className={styles.primaryButton} type="submit">
            Sign Up
          </button>
        </form>

        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => router.push("/login")}
        >
          Back to login
        </button>
      </div>
    </main>
  );
}