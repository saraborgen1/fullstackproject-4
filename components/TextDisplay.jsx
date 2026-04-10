"use client";

import styles from "../styles/TextDisplay.module.css";

export default function TextDisplay({
  editorRef,
  onSaveSelection,
  setActiveInput,
}) {
  return (
    <div className={styles.container}>
      <div
        ref={editorRef}
        className={styles.editor}
        contentEditable
        dir="auto"
        suppressContentEditableWarning={true}
        data-placeholder="You can type here..."
        onMouseDown={() => setActiveInput("editor")}
        onClick={() => setActiveInput("editor")}
        onMouseUp={onSaveSelection}
        onKeyUp={onSaveSelection}
      />
    </div>
  );
}