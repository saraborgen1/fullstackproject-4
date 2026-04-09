"use client";

import styles from "../styles/TextStyleTools.module.css";

export default function TextStyleTools({
  onAlign,
  onFontSize,
  onFontName,
  onFontColor,
  onUnderline,
}) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Text Tools</h3>

      <div className={styles.group}>
        <label className={styles.label}>Align</label>
        <div className={styles.buttonRow}>
          <button type="button" onClick={() => onAlign("left")}>
            Left
          </button>
          <button type="button" onClick={() => onAlign("center")}>
            Center
          </button>
          <button type="button" onClick={() => onAlign("right")}>
            Right
          </button>
        </div>
      </div>

      <div className={styles.group}>
        <label className={styles.label}>Font Size</label>
        <select onChange={(e) => onFontSize(e.target.value)} defaultValue="">
          <option value="" disabled>
            Select size
          </option>
          <option value="16px">16px</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
          <option value="28px">28px</option>
          <option value="32px">32px</option>
        </select>
      </div>

      <div className={styles.group}>
        <label className={styles.label}>Font Family</label>
        <select onChange={(e) => onFontName(e.target.value)} defaultValue="">
          <option value="" disabled>
            Select font
          </option>
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
        </select>
      </div>

      <div className={styles.group}>
        <label className={styles.label}>Font Color</label>
        <input
          type="color"
          onChange={(e) => onFontColor(e.target.value)}
          defaultValue="#000000"
        />
      </div>

      <div className={styles.group}>
        <label className={styles.label}>Decoration</label>
        <button type="button" onClick={onUnderline}>
          Underline
        </button>
      </div>
    </div>
  );
}