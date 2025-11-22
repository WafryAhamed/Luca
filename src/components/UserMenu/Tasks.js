import { useEffect, useState } from "react";
import styles from "./UserMenu.module.css";

const STORAGE_KEY = "study_tools_tasks";

export default function Tasks({ onBack }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [dailyReset, setDailyReset] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const today = new Date().toDateString();
        if (parsed.date !== today && parsed.dailyReset) {
          setTasks([]);
        } else {
          setTasks(parsed.tasks || []);
        }
        setDailyReset(!!parsed.dailyReset);
      }
    } catch (err) {
      console.error("Failed to load tasks", err);
    }
  }, []);

  useEffect(() => {
    const today = new Date().toDateString();
    const payload = { tasks, dailyReset, date: today };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.error("Failed to save tasks", err);
    }
  }, [tasks, dailyReset]);

  const addTask = () => {
    const trimmed = newTask.trim();
    if (!trimmed) return;
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: trimmed,
        completed: false,
      },
    ]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className={styles.ToolPanel}>
      <div className={styles.ToolHeader}>
        <button onClick={onBack} className={styles.BackButton}>
          ←
        </button>
        <h3>Task Checklist</h3>
      </div>

      <div className={styles.GlassCard}>
        <div className={styles.TaskInputRow}>
          <input
            className={styles.TaskInput}
            placeholder="Add a small study task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button className={styles.ToolButton} onClick={addTask}>
            Add
          </button>
        </div>

        <div className={styles.SettingToggle}>
          <span>Daily reset (clear tasks each day)</span>
          <input
            type="checkbox"
            checked={dailyReset}
            onChange={() => setDailyReset((prev) => !prev)}
          />
        </div>

        <div className={styles.TaskList}>
          {tasks.length === 0 && (
            <p className={styles.ToolHint}>No tasks yet. Add one to start.</p>
          )}

          {tasks.map((task) => (
            <div key={task.id} className={styles.TaskItem}>
              <div className={styles.TaskLeft}>
                <div
                  className={styles.TaskCheckbox}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? "✓" : ""}
                </div>
                <span
                  className={
                    task.completed
                      ? styles.TaskTitleCompleted
                      : styles.TaskTitleActive
                  }
                >
                  {task.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.TaskMeta}>
          Completed: {completedCount} / {tasks.length || 0}
        </div>
      </div>
    </div>
  );
}
