import { useState } from "react";
import styles from "./Features.module.css";

const subjects = [
  "Math",
  "Science",
  "English",
  "History",
  "Sinhala",
  "Tamil",
  "Coding"
];

// Default suggestions (when no subject is selected)
const defaultSuggestions = [
   "Write a simple Python program to add two numbers",
  "පරිච්ඡේදයක් ලියන්න — මගේ පාසල",
  "What is HTML used for?",
  "இலக்கணத்தில் வினைச்சொல் என்றால் என்ன?"
  
];

// Subject-wise dynamic suggestions (Sri Lankan school style)
const subjectSuggestions = {
  Math: [
    "Solve a Grade 10 algebra question",
    "Explain Pythagoras theorem",
    "Find the area of a circle",
    "Simplify this expression"
  ],
  Science: [
    "Explain Newton’s laws of motion",
    "What is photosynthesis?",
    "Describe the human digestive system",
    "Explain energy transformation"
  ],
  English: [
    "Summarize 'The Village by the Sea'",
    "Write a short essay on friendship",
    "Explain a metaphor with an example",
    "Who is the main character in Macbeth?"
  ],
  History: [
    "Who was King Dutugemunu?",
    "Explain the importance of Anuradhapura Kingdom",
    "What was the Kandyan Convention?",
    "Describe the British colonial period in Sri Lanka"
  ],
  Sinhala: [
    "සිංහල නාම පද කියන්න",
    "සිංහල කවි විභාගය කියන්න",
    "සිංහල වාක්‍ය ව්‍යුහය විස්තර කරන්න",
    "සිංහල සාහිත්‍යයෙන් කෙටි රචනාවක් ලියන්න"
  ],
  Tamil: [
    "தமிழ் இலக்கணம் விளக்கவும்",
    "சங்க இலக்கியம் பற்றி கூறவும்",
    "ஒரு சிறு கட்டுரை எழுதவும்",
    "தமிழ் கவிதை பொருள் கூறவும்"
  ],
  Coding: [
    "Explain what a function is in Python",
    "Write a simple HTML page",
    "Explain loops with an example",
    "What is a variable in programming?"
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
        <span className={styles.TryLabel}>Try:</span>
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
