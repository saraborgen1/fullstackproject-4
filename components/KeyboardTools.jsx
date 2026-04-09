"use client";

import styles from "../styles/KeyboardTools.module.css";

export default function KeyboardTools({ language, setLanguage }) {
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={`${styles.toolButton} ${
          language === "EN" ? styles.active : ""
        }`}
        onClick={() => setLanguage("EN")}
      >
        English
      </button>

      <button
        type="button"
        className={`${styles.toolButton} ${
          language === "HE" ? styles.active : ""
        }`}
        onClick={() => setLanguage("HE")}
      >
        עברית
      </button>

      <button
        type="button"
        className={`${styles.toolButton} ${
          language === "EMOJI" ? styles.active : ""
        }`}
        onClick={() => setLanguage("EMOJI")}
      >
        Emoji
      </button>
    </div>
  );
}