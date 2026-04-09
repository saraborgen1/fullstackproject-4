"use client";

import { useRef, useState } from "react";
import TextDisplay from "../components/TextDisplay";
import Keyboard from "../components/Keyboard";
import KeyboardTools from "../components/KeyboardTools";
import TextStyleTools from "../components/TextStyleTools";
import styles from "../styles/Page.module.css";

export default function Page() {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [language, setLanguage] = useState("EN");

  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleAddChar = (char: string) => {
    focusEditor();
    document.execCommand("insertText", false, char);
  };

  const handleBackspace = () => {
    focusEditor();
    const selection = window.getSelection();

    if (selection && !selection.isCollapsed) {
      document.execCommand("delete", false);
      return;
    }

    document.execCommand("delete", false);
  };

  const applyAlignment = (direction: "left" | "center" | "right") => {
    focusEditor();

    if (direction === "left") {
      document.execCommand("justifyLeft");
    } else if (direction === "center") {
      document.execCommand("justifyCenter");
    } else {
      document.execCommand("justifyRight");
    }
  };

  const applyFontName = (fontName: string) => {
    focusEditor();
    document.execCommand("fontName", false, fontName);
  };

  const applyFontColor = (color: string) => {
    focusEditor();
    document.execCommand("foreColor", false, color);
  };

  const applyUnderline = () => {
    focusEditor();
    document.execCommand("underline");
  };

  const applyFontSize = (size: string) => {
    focusEditor();

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    if (selection.isCollapsed) {
      const span = document.createElement("span");
      span.style.fontSize = size;
      span.innerHTML = "&#8203;";
      range.insertNode(span);

      const newRange = document.createRange();
      newRange.setStart(span.firstChild || span, 1);
      newRange.collapse(true);

      selection.removeAllRanges();
      selection.addRange(newRange);
      focusEditor();
      return;
    }

    const contents = range.extractContents();
    const span = document.createElement("span");
    span.style.fontSize = size;
    span.appendChild(contents);
    range.insertNode(span);

    selection.removeAllRanges();
  };

  return (
    <main className={styles.page}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Visual Text Editor</h1>

        <TextDisplay editorRef={editorRef} />

        <KeyboardTools language={language} setLanguage={setLanguage} />

        <div className={styles.bottomArea}>
          <Keyboard
            onAddChar={handleAddChar}
            onBackspace={handleBackspace}
            language={language}
          />

          <TextStyleTools
            onAlign={applyAlignment}
            onFontSize={applyFontSize}
            onFontName={applyFontName}
            onFontColor={applyFontColor}
            onUnderline={applyUnderline}
          />
        </div>
      </div>
    </main>
  );
}