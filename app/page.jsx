"use client";

export default function HomePage() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome</h1>

      <button onClick={() => (window.location.href = "/login")}>
        Login
      </button>

      <br /><br />

      <button onClick={() => (window.location.href = "/signup")}>
        Sign Up
      </button>
    </div>
  );
}