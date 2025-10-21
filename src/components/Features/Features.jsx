import { useState } from "react";
import styles from "./Features.module.css";

const subjects = [
  "Math", "Physics", "Chemistry", "Biology",
  "History", "Literature", "Coding", "Philosophy"
];

// Default suggestions (when no subject is selected)
const defaultSuggestions = [
  "Explain quantum entanglement",
  "Solve this equation",
  "Summarize Hamlet",
  "How does photosynthesis work?"
];

// Subject-wise dynamic suggestions (Sri Lankan school style)
const subjectSuggestions = {
  Math: [
    "Solve a Grade 11 algebra question",
    "Explain Pythagoras theorem",
    "Find the area of a circle",
    "Simplify this expression"
  ],
  Physics: [
    "Explain Newton’s laws of motion",
    "What is Ohm’s Law?",
    "Describe the concept of energy conservation",
    "How does gravity affect motion?"
  ],
  Chemistry: [
    "Explain the periodic table trends",
    "What is an acid and a base?",
    "Describe chemical bonding",
    "Write a balanced chemical equation"
  ],
  Biology: [
    "Explain photosynthesis",
    "What is cell division?",
    "Describe the human respiratory system",
    "How do plants reproduce?"
  ],
  History: [
    "Who was King Dutugemunu?",
    "Explain the significance of Anuradhapura Kingdom",
    "Describe the Kotte period",
    "What happened during the Kandyan Convention?"
  ],
  Literature: [
    "Summarize 'The Village by the Sea'",
    "Who is the protagonist in 'Romeo and Juliet'?",
    "Explain the theme of friendship in 'The Merchant of Venice'",
    "Analyze a Sri Lankan short story"
  ],
  Coding: [
    "Explain what a function is in Python",
    "Write a simple HTML page",
    "What is a variable in programming?",
    "Explain loops with an example"
  ],
  Philosophy: [
    "What is ethics?",
    "Explain Aristotle’s theory of virtue",
    "What is meant by existentialism?",
    "Describe Buddhist philosophy on suffering"
  ]
};

export default function Features({ onSubjectSelect }) {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const suggestions = selectedSubject
    ? subjectSuggestions[selectedSubject] || defaultSuggestions
    : defaultSuggestions;

  return (
    <div className={styles.Features}>
      <div className={styles.Subjects}>
        {subjects.map((subject) => (
          <button
            key={subject}
            className={`${styles.SubjectTag} ${
              selectedSubject === subject ? styles.Active : ""
            }`}
            onClick={() => {
              setSelectedSubject(subject);
              onSubjectSelect(`Help me with ${subject}`);
            }}
            title={`Ask about ${subject}`}
          >
            {subject}
          </button>
        ))}
      </div>

      <div className={styles.Suggestions}>
        <span>Try: </span>
        {suggestions.map((s, i) => (
          <button
            key={i}
            className={styles.Suggestion}
            onClick={() => onSubjectSelect(s)}
          >
            “{s}”
          </button>
        ))}
      </div>
    </div>
  );
}
