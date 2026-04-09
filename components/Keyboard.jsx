"use client";

import { useMemo, useState } from "react";
import styles from "../styles/Keyboard.module.css";

export default function Keyboard({ onAddChar, onBackspace, language }) {
  const [isUppercase, setIsUppercase] = useState(false);

  const englishLetterRows = useMemo(() => {
    const baseRows = [
      ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
      ["z", "x", "c", "v", "b", "n", "m"],
    ];

    if (isUppercase) {
      return baseRows.map((row) => row.map((char) => char.toUpperCase()));
    }

    return baseRows;
  }, [isUppercase]);

  const numberRow = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const symbolRow = [".", ",", "?", "!", "@", "#", "$", "%", "&", "*"];

  const hebrewRows = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["ק", "ר", "א", "ט", "ו", "ן", "ם", "פ"],
    ["ש", "ד", "ג", "כ", "ע", "י", "ח", "ל", "ך", "ף"],
    ["ז", "ס", "ב", "ה", "נ", "מ", "צ", "ת", "ץ"],
    [".", ",", "?", "!", "@", "#", "$", "%", "&", "*"],
  ];

  const emojiRows = [
    ["😀", "😂", "😍", "😎", "🥳", "😭", "😅", "🤔", "🙌", "👍"],
    ["❤️", "🔥", "✨", "🌸", "🌍", "⭐", "💡", "🎉", "💻", "📚"],
    ["🍕", "🍔", "☕", "🎵", "🎬", "⚽", "🏀", "🚗", "✈️", "🏠"],
  ];

  return (
    <div className={styles.keyboardContainer}>
      <div className={styles.keyboard}>
        {language === "EN" && (
          <>
            <div className={styles.keyboardRow}>
              {numberRow.map((char) => (
                <button
                  type="button"
                  key={char}
                  className={styles.keyBtn}
                  onClick={() => onAddChar(char)}
                >
                  {char}
                </button>
              ))}

              <button
                type="button"
                className={styles.backspaceBtn}
                onClick={onBackspace}
              >
                ⌫
              </button>
            </div>

            <div className={styles.keyboardRow}>
              {englishLetterRows[0].map((char) => (
                <button
                  type="button"
                  key={char}
                  className={styles.keyBtn}
                  onClick={() => onAddChar(char)}
                >
                  {char}
                </button>
              ))}
            </div>

            <div className={styles.keyboardRow}>
              {englishLetterRows[1].map((char) => (
                <button
                  type="button"
                  key={char}
                  className={styles.keyBtn}
                  onClick={() => onAddChar(char)}
                >
                  {char}
                </button>
              ))}
            </div>

            <div className={styles.keyboardRow}>
              <button
                type="button"
                className={styles.specialBtn}
                onClick={() => setIsUppercase((prev) => !prev)}
              >
                {isUppercase ? "ABC" : "abc"}
              </button>

              {englishLetterRows[2].map((char) => (
                <button
                  type="button"
                  key={char}
                  className={styles.keyBtn}
                  onClick={() => onAddChar(char)}
                >
                  {char}
                </button>
              ))}
            </div>

            <div className={styles.keyboardRow}>
              {symbolRow.map((char) => (
                <button
                  type="button"
                  key={char}
                  className={styles.keyBtn}
                  onClick={() => onAddChar(char)}
                >
                  {char}
                </button>
              ))}
            </div>
          </>
        )}

        {language === "HE" &&
          hebrewRows.map((row, rowIndex) => (
            <div className={styles.keyboardRow} key={rowIndex}>
              {row.map((char) => (
                <button
                  type="button"
                  key={`${rowIndex}-${char}`}
                  className={styles.keyBtn}
                  onClick={() => onAddChar(char)}
                >
                  {char}
                </button>
              ))}

              {rowIndex === 0 && (
                <button
                  type="button"
                  className={styles.backspaceBtn}
                  onClick={onBackspace}
                >
                  ⌫
                </button>
              )}
            </div>
          ))}

        {language === "EMOJI" && (
          <>
            {emojiRows.map((row, rowIndex) => (
              <div className={styles.keyboardRow} key={rowIndex}>
                {row.map((char) => (
                  <button
                    type="button"
                    key={`${rowIndex}-${char}`}
                    className={styles.keyBtn}
                    onClick={() => onAddChar(char)}
                  >
                    {char}
                  </button>
                ))}
              </div>
            ))}

            <div className={styles.keyboardRow}>
              <button
                type="button"
                className={styles.backspaceBtn}
                onClick={onBackspace}
              >
                ⌫
              </button>
            </div>
          </>
        )}

        <div className={styles.keyboardRow}>
          <button
            type="button"
            className={styles.spaceBtn}
            onClick={() => onAddChar(" ")}
          >
            Space
          </button>
        </div>
      </div>
    </div>
  );
}