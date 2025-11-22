import { useEffect, useMemo, useState } from "react";
import styles from "./UserMenu.module.css";

const STORAGE_KEY = "study_tools_notebook_v1";

const COLORS = [
  { key: "purple", value: "#7b5cff" },
  { key: "blue", value: "#3f8cff" },
  { key: "green", value: "#36c98b" },
  { key: "yellow", value: "#f4c84b" },
  { key: "pink", value: "#ff7acb" },
];

export default function Notebook({
  onBack,
  autoSaveNotes,
  quickNoteDraft,
  setQuickNoteDraft,
}) {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState(quickNoteDraft || "");
  const [category, setCategory] = useState("General");
  const [tagsInput, setTagsInput] = useState("");
  const [color, setColor] = useState("purple");

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const [usePrivate, setUsePrivate] = useState(false);
  const [privatePassword, setPrivatePassword] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setNotes(parsed.notes || []);
        setUsePrivate(!!parsed.usePrivate);
      }
    } catch (err) {
      console.error("Failed to load notes", err);
    }
  }, []);

  useEffect(() => {
    if (!autoSaveNotes) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ notes, usePrivate })
      );
    } catch (err) {
      console.error("Failed to save notes", err);
    }
  }, [notes, usePrivate, autoSaveNotes]);

  useEffect(() => {
    if (quickNoteDraft) {
      setText(quickNoteDraft);
    }
  }, [quickNoteDraft]);

  const categories = useMemo(() => {
    const set = new Set(["General"]);
    notes.forEach((n) => set.add(n.category || "General"));
    return Array.from(set);
  }, [notes]);

  const addNote = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const newNote = {
      id: Date.now(),
      text: trimmed,
      category: category || "General",
      tags,
      color,
      pinned: false,
      private: usePrivate && !!privatePassword,
      createdAt: new Date().toISOString(),
    };

    setNotes((prev) => [newNote, ...prev]);
    setText("");
    setTagsInput("");
    setQuickNoteDraft && setQuickNoteDraft("");
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const togglePin = (id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
    );
  };

  const visibleNotes = useMemo(() => {
    return notes
      .filter((n) => {
        if (n.private && !unlocked) return false;
        if (filterCategory !== "All" && n.category !== filterCategory)
          return false;
        if (!search.trim()) return true;
        const query = search.toLowerCase();
        return (
          n.text.toLowerCase().includes(query) ||
          (n.tags || []).some((t) =>
            t.toLowerCase().includes(query)
          )
        );
      })
      .sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return (b.createdAt || "").localeCompare(a.createdAt || "");
      });
  }, [notes, filterCategory, search, unlocked]);

  const handleUnlock = () => {
    if (!privatePassword) return;
    if (inputPassword === privatePassword) {
      setUnlocked(true);
    } else {
      alert("Wrong pin. Try again.");
      setUnlocked(false);
    }
  };

  return (
    <div className={styles.ToolPanel}>
      <div className={styles.ToolHeader}>
        <button onClick={onBack} className={styles.BackButton}>
          ←
        </button>
        <h3>Notebook & Notes</h3>
      </div>

      <div className={styles.GlassCard}>
        <div className={styles.NotebookHeader}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your note..."
            className={`${styles.ToolTextarea} ${styles.FutureInput}`}
          />

          <div className={styles.NotebookRow}>
            <input
              className={styles.NotebookSmallInput}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category (e.g., Maths / Revision)"
            />
            <input
              className={styles.NotebookSmallInput}
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Tags (comma separated)"
            />
          </div>

          <div className={styles.NotebookRow}>
            <select
              className={styles.NotebookSelect}
              value={color}
              onChange={(e) => setColor(e.target.value)}
            >
              {COLORS.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.key.charAt(0).toUpperCase() + c.key.slice(1)} note
                </option>
              ))}
            </select>

            <div className={styles.SettingToggle}>
              <span>Private note</span>
              <input
                type="checkbox"
                checked={usePrivate}
                onChange={() => setUsePrivate((prev) => !prev)}
              />
            </div>
          </div>

          {usePrivate && (
            <div className={styles.NotebookRow}>
              <input
                type="password"
                className={styles.NotebookSmallInput}
                placeholder="Set / remember a PIN for private notes"
                value={privatePassword}
                onChange={(e) => setPrivatePassword(e.target.value)}
              />
            </div>
          )}
        </div>

        <button className={styles.ToolButton} onClick={addNote}>
          Add Note
        </button>

        <div className={styles.NotebookFilters}>
          <input
            className={styles.NotebookSearch}
            placeholder="Search text or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className={styles.NotebookSelect}
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {usePrivate && (
          <div className={styles.NotebookRow}>
            <input
              type="password"
              className={styles.NotebookSmallInput}
              placeholder="Enter PIN to view private notes"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
            />
            <button className={styles.ToolButton} onClick={handleUnlock}>
              Unlock
            </button>
          </div>
        )}

        <div className={styles.NotesList}>
          {visibleNotes.length === 0 && (
            <p className={styles.ToolHint}>
              No notes yet. Start by writing one above.
            </p>
          )}

          {visibleNotes.map((note) => {
            const colorHex =
              COLORS.find((c) => c.key === note.color)?.value ||
              "#7b5cff";

            return (
              <div key={note.id} className={styles.NoteItem}>
                <div className={styles.NoteItemMain}>
                  <div className={styles.NoteTopRow}>
                    <div className={styles.NoteText}>
                      <span>{note.text}</span>
                    </div>
                    <div>
                      <button
                        className={`${styles.PinButton} ${
                          note.pinned ? "" : styles.PinButtonInactive
                        }`}
                        onClick={() => togglePin(note.id)}
                        title="Pin / Unpin"
                      >
                        📌
                      </button>
                      <span
                        className={styles.ColorDot}
                        style={{ backgroundColor: colorHex }}
                      />
                      <button
                        onClick={() => deleteNote(note.id)}
                        className={styles.DeleteButton}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  <div className={styles.NoteMetaRow}>
                    <div>
                      <span>{note.category}</span>
                      {note.private && (
                        <span className={styles.PrivateBadge}>
                          Private
                        </span>
                      )}
                    </div>
                    <div>
                      {(note.tags || []).map((tag) => (
                        <span className={styles.TagPill} key={tag}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
