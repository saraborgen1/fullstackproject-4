"use client";

import { useEffect } from "react";
import styles from "../styles/TextDisplay.module.css";

export default function TextDisplay({
  editorRef,
  onSaveSelection,
  searchTerm,
  setActiveInput,
}) {
  useEffect(() => {
    if (!editorRef?.current) return;

    const editor = editorRef.current;

    const removeHighlights = () => {
      const marks = Array.from(editor.querySelectorAll("mark"));

      marks.forEach((mark) => {
        const parent = mark.parentNode;
        if (!parent) return;

        while (mark.firstChild) {
          parent.insertBefore(mark.firstChild, mark);
        }

        parent.removeChild(mark);
        parent.normalize();
      });
    };

    removeHighlights();

    const trimmedSearch = searchTerm.trim();
    if (!trimmedSearch) return;

    const textNodes = [];
    const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT);

    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue && node.nodeValue.length > 0) {
        textNodes.push(node);
      }
    }

    if (textNodes.length === 0) return;

    let fullText = "";
    const map = [];

    textNodes.forEach((textNode) => {
      const text = textNode.nodeValue || "";

      for (let i = 0; i < text.length; i++) {
        map.push({
          node: textNode,
          offset: i,
        });
      }

      fullText += text;
    });

    if (!fullText) return;

    const escaped = trimmedSearch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escaped, "gi");
    const matches = [];

    let match;
    while ((match = regex.exec(fullText)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
      });

      if (match[0].length === 0) {
        regex.lastIndex++;
      }
    }

    if (matches.length === 0) return;

    for (let i = matches.length - 1; i >= 0; i--) {
      const { start, end } = matches[i];

      const startInfo = map[start];
      const endInfo = map[end - 1];

      if (!startInfo || !endInfo) continue;

      const range = document.createRange();
      range.setStart(startInfo.node, startInfo.offset);
      range.setEnd(endInfo.node, endInfo.offset + 1);

      const mark = document.createElement("mark");

      try {
        range.surroundContents(mark);
      } catch {
        const contents = range.extractContents();
        mark.appendChild(contents);
        range.insertNode(mark);
      }
    }
  }, [searchTerm, editorRef]);

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