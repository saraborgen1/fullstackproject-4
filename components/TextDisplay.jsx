import styles from "../styles/TextDisplay.module.css";

export default function TextDisplay({ text, setText, textareaRef }) {
  return (
    <div className={styles.container}>
      <textarea
        ref={textareaRef}
        className={styles.box}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your text will appear here..."
      />
    </div>
  );
}