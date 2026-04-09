"use client";

import styles from "../styles/TextStyleTools.module.css";

export default function TextStyleTools({
  currentStyle,
  onAlign,
  onFontSize,
  onFontName,
  onFontColor,
  onUnderline,
}) {
  return (
    <div className={styles.toolsRow}>
      <div className={styles.toolGroup}>
        <select
          value={currentStyle.align}
          onChange={(e) => onAlign(e.target.value)}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>

      <div className={styles.toolGroup}>
        <select
          value={currentStyle.fontSize}
          onChange={(e) => onFontSize(e.target.value)}
        >
          <option value="8px">8px</option>
          <option value="10px">10px</option>
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
          <option value="28px">28px</option>
          <option value="32px">32px</option>
          <option value="40px">40px</option>
          <option value="50px">50px</option>
          <option value="60px">60px</option>
          <option value="70px">70px</option>
          <option value="80px">80px</option>
          <option value="90px">90px</option>
          <option value="100px">100px</option>
        </select>
      </div>

      <div className={styles.toolGroup}>
        <select
          value={currentStyle.fontFamily}
          onChange={(e) => onFontName(e.target.value)}
        >
          <option value="Arial" style={{ fontFamily: "Arial" }}>
            Arial (Classic)
          </option>
          <option value="Verdana" style={{ fontFamily: "Verdana" }}>
            Verdana (Wide)
          </option>
          <option value="Trebuchet MS" style={{ fontFamily: "Trebuchet MS" }}>
            Trebuchet MS
          </option>
          <option
            value="Times New Roman"
            style={{ fontFamily: "Times New Roman" }}
          >
            Times New Roman
          </option>
          <option value="Georgia" style={{ fontFamily: "Georgia" }}>
            Georgia (Elegant)
          </option>
          <option value="Garamond" style={{ fontFamily: "Garamond" }}>
            Garamond (Book Style)
          </option>
          <option value="Courier New" style={{ fontFamily: "Courier New" }}>
            Courier New (Typewriter)
          </option>
          <option
            value="'Brush Script MT', cursive"
            style={{ fontFamily: "'Brush Script MT', cursive" }}
          >
            Brush Script (Handwritten)
          </option>
          <option
            value="Comic Sans MS"
            style={{ fontFamily: "Comic Sans MS" }}
          >
            Comic Sans (Playful)
          </option>
          <option value="Impact" style={{ fontFamily: "Impact" }}>
            Impact (Bold/Heavy)
          </option>
        </select>
      </div>

      <div className={styles.toolGroup}>
        <input
          type="color"
          value={currentStyle.color}
          onChange={(e) => onFontColor(e.target.value)}
        />
      </div>

      <div className={styles.toolGroup}>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={onUnderline}
        >
          {currentStyle.underline ? "Remove Underline" : "Underline"}
        </button>
      </div>
    </div>
  );
}