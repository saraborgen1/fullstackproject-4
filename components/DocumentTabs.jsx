"use client";
import styles from "../styles/DocumentTabs.module.css";

export default function DocumentTabs({
  documents,
  currentIndex,
  onSelectDocument,
}) {
    const itemWidth = 150;
    const gap = 40;
    const viewportWidth = 900;

    const offset =
    viewportWidth / 2 -
    currentIndex * (itemWidth + gap) -
    itemWidth / 2;

    return (
    <div className={styles.wrapper}>
        
        <button
        className={styles.arrow}
        onClick={() => onSelectDocument((i) => Math.max(i - 1, 0))}
        >
        ◀
        </button>

        <div className={styles.viewport}>
        <ul
            className={styles.list}
            style={{
            gap: `${gap}px`,
            transform: `translateX(${offset}px)`,
            }}
        >
            {documents.map((doc, index) => (
            <li
                key={doc.id}
                onClick={() => onSelectDocument(index)}
                className={`${styles.item} ${
                index === currentIndex
                    ? styles.active
                    : styles.inactive
                }`}
            >
                <div className={styles.title}>
                {doc.name || `Doc ${index + 1}`}
                </div>
            </li>
            ))}
        </ul>
        </div>

        <button
        className={styles.arrow}
        onClick={() =>
            onSelectDocument((i) =>
            Math.min(i + 1, documents.length - 1)
            )
        }
        >
        ▶
        </button>
    </div>
    );
}