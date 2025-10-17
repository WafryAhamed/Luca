import styles from "./Features.module.css";

const subjects = [
  "Math", "Physics", "Chemistry", "Biology",
  "History", "Literature", "Coding", "Philosophy"
];

const suggestions = [
  "Explain quantum entanglement",
  "Solve this equation",
  "Summarize Hamlet",
  "How does photosynthesis work?"
];

export default function Features({ onSubjectSelect }) {
  return (
    <div className={styles.Features}>
      <div className={styles.Subjects}>
        {subjects.map((subject) => (
          <button
            key={subject}
            className={styles.SubjectTag}
            onClick={() => onSubjectSelect(`Help me with ${subject}`)}
            title={`Ask about ${subject}`}
          >
            {subject}
          </button>
        ))}
      </div>
      <div className={styles.Suggestions}>
        <span>Try: </span>
        {suggestions.map((s, i) => (
          <button key={i} className={styles.Suggestion} onClick={() => onSubjectSelect(s)}>
            “{s}”
          </button>
        ))}
      </div>
    </div>
  );
}