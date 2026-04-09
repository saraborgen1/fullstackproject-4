import styles from "../styles/TextDisplay.module.css";

export default function TextDisplay({ editorRef }) {
  return (
    <div className={styles.container}>

      <div
        ref={editorRef}
        className={styles.editor}
        contentEditable
        suppressContentEditableWarning={true}
        data-placeholder="You can type here..."
      />
    </div>
  );
}