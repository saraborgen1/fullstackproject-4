"use client";
import { useRef } from "react";
import styles from "../styles/DocumentTabs.module.css";

export default function DocumentTabs({
  documents,
  currentIndex,
  onSelectDocument,
}) {
  const itemWidth = 150;
  const gap = 40;
  const viewportRef = useRef(null);
  const itemRefs = useRef([]);
  const maxIndex = documents.length - 1;

  const scrollToDocument = (index) => {
    const item = itemRefs.current[index];
    if (!item) return;

    item.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const handlePrev = () => {
    if (currentIndex <= 0) return;
    const newIndex = currentIndex - 1;
    onSelectDocument(newIndex);
    requestAnimationFrame(() => scrollToDocument(newIndex));
  };

  const handleNext = () => {
    if (currentIndex >= maxIndex) return;
    const newIndex = currentIndex + 1;
    onSelectDocument(newIndex);
    requestAnimationFrame(() => scrollToDocument(newIndex));
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
          }}
        >
          {documents.map((doc, index) => (
            <li
              key={doc.id}
              ref={(el) => {
                itemRefs.current[index] = el;

                if (el && index === currentIndex) {
                  requestAnimationFrame(() => {
                    el.scrollIntoView({
                      behavior: "smooth",
                      inline: "center",
                      block: "nearest",
                    });
                  });
                }
              }}
              onClick={() => {
                onSelectDocument(index);
                requestAnimationFrame(() => scrollToDocument(index));
              }}
              className={`${styles.item} ${index === currentIndex ? styles.active : styles.inactive
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