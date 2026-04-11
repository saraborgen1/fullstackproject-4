"use client";

import styles from "../styles/Auth.module.css";

export default function SignupPage() {
  const handleSignup = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const username = (formData.get("username") || "").toString().trim();
    const password = (formData.get("password") || "").toString().trim();
    const confirmPassword = (formData.get("confirmPassword") || "")
      .toString()
      .trim();

    const errorElement = document.getElementById("signup-error");
    if (errorElement) {
      errorElement.textContent = "";
    }

    if (!username || !password) {
      if (errorElement) {
        errorElement.textContent = "Username and password are required";
      }
      return;
    }

    if (password !== confirmPassword) {
      if (errorElement) {
        errorElement.textContent = "Passwords do not match";
      }
      return;
    }

    const rawUsers = localStorage.getItem("users");
    const users = rawUsers ? JSON.parse(rawUsers) : [];

    const userExists = users.some((user) => user.username === username);

    if (userExists) {
      if (errorElement) {
        errorElement.textContent = "This username already exists";
      }
      return;
    }

    const newUser = {
      username: username,
      password: password,
      files: [],
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    sessionStorage.setItem("currentUser", username);
    window.location.href = "/editor";
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
            name="username"
            placeholder="Choose username"
          />

          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="Choose password"
          />

          <input
            className={styles.input}
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
          />

          <p id="signup-error" className={styles.error}></p>

          <button className={styles.primaryButton} type="submit">
            Sign Up
          </button>
        </form>

        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          Back to login
        </button>
      </div>
    </main>
  );
}