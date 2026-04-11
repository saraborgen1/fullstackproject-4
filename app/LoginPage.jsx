"use client";

import styles from "../styles/Auth.module.css";

export default function LoginPage() {
  const handleLogin = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = (formData.get("username") || "").toString().trim();
    const password = (formData.get("password") || "").toString().trim();

    const errorElement = document.getElementById("login-error");
    if (errorElement) errorElement.textContent = "";

    const rawUsers = localStorage.getItem("users");
    const users = rawUsers ? JSON.parse(rawUsers) : [];

    const matchedUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (!matchedUser) {
      if (errorElement) {
        errorElement.textContent = "Invalid username or password";
      }
      return;
    }

    sessionStorage.setItem("currentUser", matchedUser.username);
    window.location.href = "/editor";
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login</h1>

        <form className={styles.form} onSubmit={handleLogin}>
          <input
            name="username"
            placeholder="Username"
            className={styles.input}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className={styles.input}
          />

          <p id="login-error" className={styles.error}></p>

          <button className={styles.primaryButton}>Login</button>
        </form>

        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => (window.location.href = "/signup")}
        >
          Create new account
        </button>
      </div>
    </main>
  );
}