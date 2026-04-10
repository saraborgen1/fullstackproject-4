"use client";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/DocumentTabs.module.css";

export default function DocumentTabs({
  documents,
  currentIndex,
  onSelectDocument,
}) {
  const itemWidth = 150;
  const gap = 40;

  const viewportRef = useRef(null);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (viewportRef.current) {
        setViewportWidth(viewportRef.current.clientWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const maxIndex = documents.length - 1;

  // הרוחב הכולל של הרשימה
  const totalListWidth =
    documents.length * itemWidth + Math.max(0, documents.length - 1) * gap;

  // המרכז של הפריט הפעיל בתוך הרשימה
  const activeItemCenter =
    currentIndex * (itemWidth + gap) + itemWidth / 2;

  // מיקום ההזזה הרצוי כדי שהפריט הפעיל יהיה במרכז ה-viewport
  const desiredOffset = viewportWidth / 2 - activeItemCenter;

  // גבולות חוקיים להזזה
  const minOffset = Math.min(0, viewportWidth - totalListWidth);
  const maxOffset = 0;

  // clamp
  const offset = Math.max(minOffset, Math.min(desiredOffset, maxOffset));

  const handlePrev = () => {
    if (currentIndex <= 0) return;
    onSelectDocument(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex >= maxIndex) return;
    onSelectDocument(currentIndex + 1);
  };

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.arrow}
        onClick={handlePrev}
        disabled={currentIndex === 0}
      >
        ◀
      </button>

      <div ref={viewportRef} className={styles.viewport}>
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
                index === currentIndex ? styles.active : styles.inactive
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
        type="button"
        className={styles.arrow}
        onClick={handleNext}
        disabled={currentIndex === maxIndex}
      >
        ▶
      </button>
    </div>
  );
}