// src/OnboardingPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OnboardingPage.module.css";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const handleGetStarted = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    navigate("/auth");
  };

  // Chat intro autoplay
  useEffect(() => {
    const timeouts = [
      setTimeout(() => setStep(1), 600),
      setTimeout(() => setStep(2), 1500),
    ];
    return () => timeouts.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <>
      {/* 3D Animated Background */}
      <div className={styles.Background3D}>
        <div className={styles.Cube}></div>
        <div className={styles.Cube}></div>
        <div className={styles.Cube}></div>
        <div className={styles.Cube}></div>
      </div>

      <div className={styles.Container}>
        <div className={styles.Card}>

          {/* Logo */}
          <div className={styles.Logo}>
            <img src="/robot-Luca.svg" alt="LUCA" />
            <h1>LUCA</h1>
          </div>

          {/* Chat intro */}
          <div className={styles.ChatPreview}>
            {step >= 1 && (
              <div className={styles.BotBubble}>Hey, I’m LUCA 🤖</div>
            )}
            {step >= 2 && (
              <div className={styles.BotBubble}>
                Your personal AI learning companion.
              </div>
            )}

            {step < 2 && (
              <div className={styles.TypingBubble}>
                <div className={styles.Dot}></div>
                <div className={styles.Dot}></div>
                <div className={styles.Dot}></div>
              </div>
            )}
          </div>

          {/* Modern Square Links */}
          <div className={styles.LinksGrid}>
            <button className={styles.SquareLink}>📘 Study</button>
            <button className={styles.SquareLink}>🧠 Practice</button>
            <button className={styles.SquareLink}>📤 Import</button>
            <button className={styles.SquareLink}>⚙️ Tools</button>
          </div>

          {/* CTA */}
          <button onClick={handleGetStarted} className={styles.CtaButton}>
            Start Learning
          </button>

          <p className={styles.Footer}>
            Already have an account?{" "}
            <button
              onClick={() => navigate("/auth")}
              className={styles.LinkButton}
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
