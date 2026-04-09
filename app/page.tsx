"use client";

import { useRef, useState } from "react";
import TextDisplay from "../components/TextDisplay";
import Keyboard from "../components/Keyboard";
import KeyboardTools from "../components/KeyboardTools";
import styles from "../styles/Page.module.css";

export default function Page() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("EN");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleAddChar = (char: string) => {
    const textarea = textareaRef.current;

    if (!textarea) {
      setText((prev) => prev + char);
      return;
    }

    textarea.focus();

    const start = textarea.selectionStart ?? text.length;
    const end = textarea.selectionEnd ?? text.length;

    const newText = text.slice(0, start) + char + text.slice(end);
    setText(newText);

    requestAnimationFrame(() => {
      const newCursor = start + char.length;
      textarea.focus();
      textarea.setSelectionRange(newCursor, newCursor);
    });
  };

  const handleBackspace = () => {
    const textarea = textareaRef.current;

    if (!textarea) {
      setText((prev) => prev.slice(0, -1));
      return;
    }

    textarea.focus();

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;

    if (start !== end) {
      const newText = text.slice(0, start) + text.slice(end);
      setText(newText);

      requestAnimationFrame(() => {
        textarea.focus();
        textarea.setSelectionRange(start, start);
      });
      return;
    }

    if (start === 0) return;

    const newText = text.slice(0, start - 1) + text.slice(start);
    setText(newText);

    requestAnimationFrame(() => {
      const newCursor = start - 1;
      textarea.focus();
      textarea.setSelectionRange(newCursor, newCursor);
    });
  };

  return (
    <main className={styles.page}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Visual Text Editor</h1>

        <TextDisplay
          text={text}
          setText={setText}
          textareaRef={textareaRef}
        />

        <KeyboardTools language={language} setLanguage={setLanguage} />

        <Keyboard
          onAddChar={handleAddChar}
          onBackspace={handleBackspace}
          language={language}
        />
      </div>
    </main>
  );
}