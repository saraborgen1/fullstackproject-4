"use client";

import { useEffect, useRef, useState } from "react";
import TextDisplay from "../../components/TextDisplay";
import Keyboard from "../../components/Keyboard";
import KeyboardTools from "../../components/KeyboardTools";
import TextStyleTools from "../../components/TextStyleTools";
import styles from "../../styles/Page.module.css";
import DocumentTabs from "../../components/DocumentTabs";

type SavedFile = {
  id: string;
  name: string;
  content: string;
  updatedAt: string;
};
type SavedUser = {
  username: string;
  files: SavedFile[];
};

export default function Page() {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const savedRangeRef = useRef<Range | null>(null);
  const [language, setLanguage] = useState("EN");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeInput, setActiveInput] = useState<"editor" | "search">("editor");
  const [history, setHistory] = useState<string[]>([]);
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "",
      content: "",
      history: [""],
    },
  ]);

  const [closedDocuments, setClosedDocuments] = useState<
    {
      id: number;
      name: string;
      content: string;
      history: string[];
    }[]
  >([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStyle, setCurrentStyle] = useState({
    align: "left",
    fontSize: "14px",
    fontFamily: "Arial",
    color: "#000000",
    underline: false,
  });

  const activeDocument = documents[currentIndex];
  const activeFileName = activeDocument?.name ?? "";
  useEffect(() => {
    if (!editorRef.current) return;

    editorRef.current.innerHTML = activeDocument?.content ?? "";
    setHistory(activeDocument?.history ?? [""]);
  }, [currentIndex, activeDocument?.id]);

  const focusEditor = () => {
    setActiveInput("editor");

    if (!editorRef.current) return;

    editorRef.current.focus();

    const selection = window.getSelection();
    if (!selection) return;

    if (
      savedRangeRef.current &&
      editorRef.current.contains(savedRangeRef.current.startContainer)
    ) {
      selection.removeAllRanges();
      selection.addRange(savedRangeRef.current);
    } else {
      placeCaretAtEnd();
    }
  };

  const saveHistory = () => {
    if (!editorRef.current) return;

    const currentContent = editorRef.current.innerHTML;

    setDocuments((prev) =>
      prev.map((doc, index) => {
        if (index !== currentIndex) return doc;

        const currentHistory = doc.history ?? [""];

        if (currentHistory[currentHistory.length - 1] === currentContent) {
          return {
            ...doc,
            content: currentContent,
          };
        }

        const updatedHistory = [...currentHistory, currentContent].slice(-30);

        return {
          ...doc,
          content: currentContent,
          history: updatedHistory,
        };
      })
    );

    setHistory((prev) => {
      if (prev[prev.length - 1] === currentContent) return prev;
      return [...prev, currentContent].slice(-30);
    });
  };

  const handleAddChar = (char: string) => {
    if (activeInput === "search") {
      setSearchTerm((prev) => prev + char);
      return;
    }

    focusEditor();

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    range.deleteContents();

    const span = document.createElement("span");
    span.textContent = char;
    span.style.fontSize = currentStyle.fontSize;
    span.style.fontFamily = currentStyle.fontFamily;
    span.style.color = currentStyle.color;
    span.style.textDecoration = currentStyle.underline ? "underline" : "none";

    range.insertNode(span);

    const newRange = document.createRange();
    newRange.setStartAfter(span);
    newRange.collapse(true);

    selection.removeAllRanges();
    selection.addRange(newRange);

    savedRangeRef.current = newRange.cloneRange();
    saveHistory();
  };

  const handleBackspace = () => {
    if (activeInput === "search") {
      setSearchTerm((prev) => prev.slice(0, -1));
      return;
    }
    focusEditor();
    document.execCommand("delete", false);
    saveSelection();
    saveHistory();
  };

  const handleDeleteAll = () => {
    if (!editorRef.current) return;

    editorRef.current.innerHTML = "";

    setDocuments((prev) =>
      prev.map((doc, index) =>
        index === currentIndex
          ? {
              ...doc,
              content: "",
              history: [...(doc.history ?? [""]), ""].slice(-30),
            }
          : doc
      )
    );

    setHistory((prev) => [...prev, ""].slice(-30));
    focusEditor();
  };

  const handleUndo = () => {
    if (!editorRef.current) return;

    const activeHistory = activeDocument?.history ?? [""];

    if (activeHistory.length < 2) return;

    const newHistory = [...activeHistory];
    newHistory.pop();
    const previousContent = newHistory[newHistory.length - 1] || "";

    editorRef.current.innerHTML = previousContent;

    setDocuments((prev) =>
      prev.map((doc, index) =>
        index === currentIndex
          ? {
              ...doc,
              content: previousContent,
              history: newHistory,
            }
          : doc
      )
    );

    setHistory(newHistory);
    focusEditor();
  };

  const applyAlignment = (direction: string) => {
    setCurrentStyle((prev) => ({ ...prev, align: direction }));
    focusEditor();

    if (direction === "left") {
      document.execCommand("justifyLeft");
    } else if (direction === "center") {
      document.execCommand("justifyCenter");
    } else if (direction === "right") {
      document.execCommand("justifyRight");
    }

    saveSelection();
    saveHistory();
  };

  const applyFontName = (fontName: string) => {
    setCurrentStyle((prev) => ({ ...prev, fontFamily: fontName }));
    focusEditor();

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    if (!selection.isCollapsed) {
      document.execCommand("fontName", false, fontName);
      saveSelection();
      saveHistory();
    }
  };

  const applyFontColor = (color: string) => {
    setCurrentStyle((prev) => ({ ...prev, color }));
    focusEditor();

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    if (!selection.isCollapsed) {
      document.execCommand("foreColor", false, color);
      saveSelection();
      saveHistory();
    }
  };

  const applyUnderline = () => {
    setCurrentStyle((prev) => ({
      ...prev,
      underline: !prev.underline,
    }));

    focusEditor();

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    if (!selection.isCollapsed) {
      document.execCommand("underline");
      saveSelection();
      saveHistory();
    }
  };

  const applyFontSize = (size: string) => {
    setCurrentStyle((prev) => ({ ...prev, fontSize: size }));
    focusEditor();

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    if (selection.isCollapsed) return;

    const range = selection.getRangeAt(0);
    const contents = range.extractContents();

    const span = document.createElement("span");
    span.style.fontSize = size;
    span.appendChild(contents);
    range.insertNode(span);

    const newRange = document.createRange();
    newRange.selectNodeContents(span);
    newRange.collapse(false);

    selection.removeAllRanges();
    selection.addRange(newRange);

    savedRangeRef.current = newRange.cloneRange();
    saveHistory();
  };

  const getCurrentUsername = () => {
    const username = sessionStorage.getItem("currentUser");
    if (!username) {
      alert("No current user found in sessionStorage");
      return null;
    }
    return username;
  };

  const getUsersFromStorage = (): SavedUser[] => {
    const raw = localStorage.getItem("users");
    if (!raw) return [];

    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  };

  const saveUsersToStorage = (users: SavedUser[]) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const saveFileForUser = (fileName: string) => {
    const username = getCurrentUsername();
    if (!username || !editorRef.current) return;

    const content = editorRef.current.innerHTML;

    const users = getUsersFromStorage();
    const userIndex = users.findIndex((user) => user.username === username);

    const newFile: SavedFile = {
      id: crypto.randomUUID(),
      name: fileName,
      content,
      updatedAt: new Date().toISOString(),
    };

    if (userIndex === -1) {
      users.push({
        username,
        files: [newFile],
      });
      saveUsersToStorage(users);
      alert(`File "${fileName}" saved successfully`);
      return;
    }

    const existingFileIndex = users[userIndex].files.findIndex(
      (file) => file.name === fileName,
    );

    if (existingFileIndex !== -1) {
      users[userIndex].files[existingFileIndex] = {
        ...users[userIndex].files[existingFileIndex],
        content,
        updatedAt: new Date().toISOString(),
      };
    } else {
      users[userIndex].files.push(newFile);
    }

    saveUsersToStorage(users);
    alert(`File "${fileName}" saved successfully`);
  };

  const handleSave = () => {
    if (!activeFileName) {
      handleSaveAs();
      return;
    }

    saveFileForUser(activeFileName);
  };

  const handleSaveAs = () => {
    const fileName = prompt("Enter file name:");
    if (!fileName || !fileName.trim()) return;

    const trimmedFileName = fileName.trim();
    
    setDocuments((prev) =>
      prev.map((doc, index) =>
        index === currentIndex
          ? { ...doc, name: trimmedFileName }
          : doc
      )
    );

    saveFileForUser(trimmedFileName);
  };

  const handleNewFile = () => {
   const newDocument = {
      id: Date.now(),
      name: "",
      content: "",
      history: [""],
    };

    setDocuments((prev) => [...prev, newDocument]);
    setCurrentIndex(documents.length);
    setSearchTerm("");
    setHistory([""]);
  };

  const handleCloseFile = () => {
    syncCurrentEditorToDocument();
    if (!editorRef.current) return;

    const currentContent = editorRef.current.innerHTML;
    let finalFileName = activeFileName;

    if (documents.length === 1) {
      alert("You must keep at least one document open");
      return;
    }

    const shouldSave = confirm("Do you want to save this file before closing?");

    if (shouldSave) {
      if (!activeFileName) {
        const fileName = prompt("Enter file name:");
        if (!fileName || !fileName.trim()) return;

        const trimmedFileName = fileName.trim();
        finalFileName = trimmedFileName;

        setDocuments((prev) =>
          prev.map((doc, index) =>
            index === currentIndex
              ? { ...doc, name: trimmedFileName }
              : doc
          )
        );

        saveFileForUser(trimmedFileName);
      } else {
        finalFileName = activeFileName;
        saveFileForUser(activeFileName);
      }
    }

    const currentDoc = documents[currentIndex];
    const closedDoc = {
      ...currentDoc,
      name: finalFileName,
      content: currentContent,
    };

    setClosedDocuments((prev) => [...prev, closedDoc]);
    setDocuments((prev) => prev.filter((_, index) => index !== currentIndex));
    setCurrentIndex((prev) => {
      if (prev > 0) return prev - 1;
      return 0;
    });

    setSearchTerm("");
    setHistory([""]);
  };

  const syncCurrentEditorToDocument = () => {
    if (!editorRef.current) return;

    const currentContent = editorRef.current.innerHTML;

    setDocuments((prev) =>
      prev.map((doc, index) =>
        index === currentIndex
          ? {
              ...doc,
              content: currentContent,
            }
          : doc
      )
    );
  };

  const handleSelectDocument = (index: number) => {
    syncCurrentEditorToDocument();
    setCurrentIndex(index);
  };

  const handleReopenDocument = (docId: number) => {
    syncCurrentEditorToDocument();

    const docToReopen = closedDocuments.find((doc) => doc.id === docId);

    if (!docToReopen) return;

    setDocuments((prev) => [...prev, docToReopen]);

    setClosedDocuments((prev) =>
      prev.filter((doc) => doc.id !== docId)
    );

    setCurrentIndex(documents.length);
    setSearchTerm("");
  };

  const rgbToHex = (rgb: string) => {
    const result = rgb.match(/\d+/g);

    if (!result || result.length < 3) return "#000000";

    const r = parseInt(result[0], 10).toString(16).padStart(2, "0");
    const g = parseInt(result[1], 10).toString(16).padStart(2, "0");
    const b = parseInt(result[2], 10).toString(16).padStart(2, "0");

    return `#${r}${g}${b}`;
  };

  const normalizeFontFamily = (fontFamily: string) => {
    const cleanFont = fontFamily.replace(/['"]/g, "").toLowerCase();

    if (cleanFont.includes("arial")) return "Arial";
    if (cleanFont.includes("verdana")) return "Verdana";
    if (cleanFont.includes("trebuchet ms")) return "Trebuchet MS";
    if (cleanFont.includes("times new roman")) return "Times New Roman";
    if (cleanFont.includes("georgia")) return "Georgia";
    if (cleanFont.includes("garamond")) return "Garamond";
    if (cleanFont.includes("courier new")) return "Courier New";
    if (cleanFont.includes("brush script mt"))
      return "'Brush Script MT', cursive";
    if (cleanFont.includes("comic sans ms")) return "Comic Sans MS";
    if (cleanFont.includes("impact")) return "Impact";

    return "Arial";
  };

  const updateStyleFromSelection = () => {
    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0 || !editorRef.current) return;

    let node: Node | null = selection.anchorNode;

    if (!node) return;

    if (node.nodeType === Node.TEXT_NODE) {
      node = node.parentNode;
    }

    if (!(node instanceof HTMLElement)) return;
    if (!editorRef.current.contains(node)) return;

    const computedStyle = window.getComputedStyle(node);

    setCurrentStyle((prev) => ({
      ...prev,
      align:
        computedStyle.textAlign === "start" || !computedStyle.textAlign
          ? "left"
          : computedStyle.textAlign,
      fontSize: computedStyle.fontSize || prev.fontSize,
      fontFamily: normalizeFontFamily(computedStyle.fontFamily),
      color: rgbToHex(computedStyle.color),
      underline: computedStyle.textDecorationLine.includes("underline"),
    }));
  };

  const saveSelection = () => {
    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0 || !editorRef.current) return;

    const range = selection.getRangeAt(0);

    if (
      editorRef.current.contains(range.startContainer) &&
      editorRef.current.contains(range.endContainer)
    ) {
      savedRangeRef.current = range.cloneRange();
      updateStyleFromSelection();
    }
  };

  const placeCaretAtEnd = () => {
    if (!editorRef.current) return;

    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(editorRef.current);
    range.collapse(false);

    selection?.removeAllRanges();
    selection?.addRange(range);

    savedRangeRef.current = range.cloneRange();
  };

  return (
    <main className={styles.page}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Visual Text Editor</h1>

        <DocumentTabs
          documents={documents}
          currentIndex={currentIndex}
          onSelectDocument={handleSelectDocument}
        />

        <TextDisplay
          editorRef={editorRef}
          onSaveSelection={saveSelection}
          searchTerm={searchTerm}
          setActiveInput={setActiveInput}
        />

        <KeyboardTools
          language={language}
          setLanguage={setLanguage}
          onDeleteAll={handleDeleteAll}
          onUndo={handleUndo}
          onSave={handleSave}
          onSaveAs={handleSaveAs}
          onNewFile={handleNewFile}
          onCloseFile={handleCloseFile}
          onReopenDocument={handleReopenDocument}
          closedDocuments={closedDocuments}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setActiveInput={setActiveInput}
        />

        <div className={styles.keyboardArea}>
          <Keyboard
            onAddChar={handleAddChar}
            onBackspace={handleBackspace}
            language={language}
          />
          <TextStyleTools
            currentStyle={currentStyle}
            onAlign={applyAlignment}
            onFontSize={applyFontSize}
            onFontName={applyFontName}
            onFontColor={applyFontColor}
            onUnderline={applyUnderline}
          />
        </div>
      </div>
    </main>
  );
}
