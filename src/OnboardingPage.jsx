// src/OnboardingPage.jsx
import { useNavigate } from "react-router-dom";
import styles from "./OnboardingPage.module.css";

export default function OnboardingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    navigate("/auth");
  };

  return (
    <>
      <div className={styles.Background}></div>
      <div className={styles.Container}>
        <div className={styles.Card}>
          <div className={styles.Logo}>
            <img src="/robot-Luca.svg" alt="LUCA" />
            <h1>LUCA</h1>
          </div>
          <h2 className={styles.Title}>Your AI Academic Assistant</h2>
          <p className={styles.Subtitle}>
            Master Math, Science, Literature, Coding, and more with personalized AI tutoring.
          </p>
          <ul className={styles.Features}>
            <li>📚 Subject-specific explanations</li>
            <li>📄 Upload PDFs & documents</li>
            <li>💡 Step-by-step problem solving</li>
            <li>🔒 Secure & private conversations</li>
          </ul>
          <button onClick={handleGetStarted} className={styles.CtaButton}>
            Get Started
          </button>
          <p className={styles.Footer}>
            Already have an account?{" "}
            <button onClick={() => navigate("/auth")} className={styles.LinkButton}>
              Sign In
            </button>
          </p>
        </div>
      </div>
    </>
  );
}