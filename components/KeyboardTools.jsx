"use client";

import styles from "../styles/KeyboardTools.module.css";

export default function KeyboardTools({
  language,
  setLanguage,
  onDeleteAll,
  onUndo,
  onSave,
  onSaveAs,
  onNewFile,
  onCloseFile,
  onDeleteCurrentDocument,
  onReopenDocument,
  closedDocuments,
  searchTerm,
  setSearchTerm,
  setActiveInput,
}) {
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={`${styles.toolButton} ${
          language === "EN" ? styles.active : ""
        }`}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setLanguage("EN")}
      >
        English
      </button>

      <button
        type="button"
        className={`${styles.toolButton} ${
          language === "HE" ? styles.active : ""
        }`}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setLanguage("HE")}
      >
        עברית
      </button>

      <button
        type="button"
        className={`${styles.toolButton} ${
          language === "EMOJI" ? styles.active : ""
        }`}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setLanguage("EMOJI")}
      >
        Emoji
      </button>

      <button
        type="button"
        className={styles.toolButton}
        onMouseDown={(e) => e.preventDefault()}
        onClick={onDeleteAll}
      >
        Clear
      </button>

      <button
        type="button"
        className={styles.toolButton}
        onMouseDown={(e) => e.preventDefault()}
        onClick={onUndo}
      >
        Undo
      </button>

      <button
        type="button"
        className={styles.toolButton}
        onMouseDown={(e) => e.preventDefault()}
        onClick={onSave}
      >
        Save
      </button>

      <button
        type="button"
        className={styles.toolButton}
        onMouseDown={(e) => e.preventDefault()}
        onClick={onSaveAs}
      >
        Save As
      </button>

      <button
        type="button"
        className={styles.toolButton}
        onMouseDown={(e) => e.preventDefault()}
        onClick={onNewFile}
      >
        New
      </button>

      <button
        type="button"
        className={styles.toolButton}
        onMouseDown={(e) => e.preventDefault()}
        onClick={onDeleteCurrentDocument}
      >
        Delete
      </button>

      <button
        type="button"
        className={styles.toolButton}
        onMouseDown={(e) => e.preventDefault()}
        onClick={onCloseFile}
      >
        Close
      </button>

      <select
        onChange={(e) => {
          if (!e.target.value) return;
          onReopenDocument(Number(e.target.value));
        }}
      >
        <option value="">Reopen...</option>
        {closedDocuments.map((doc) => (
          <option key={doc.id} value={doc.id}>
            {doc.name || "Untitled"}
          </option>
        ))}
      </select>

      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search..."
        value={searchTerm}
        onFocus={() => setActiveInput("search")}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}