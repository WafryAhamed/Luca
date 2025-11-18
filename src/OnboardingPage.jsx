// src/OnboardingPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OnboardingPage.module.css";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 → 2 → 3

  const handleNext = () => setStep(step + 1);

  const handleStart = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    navigate("/auth");
  };

  return (
    <>
      {/* 3D Background */}
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

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div className={styles.ChatPreview}>
                <div className={styles.BotBubble}>Hey, I'm LUCA 🤖</div>
                <div className={styles.BotBubble}>
                  I’m here to help you learn faster and smarter.
                </div>
              </div>

              <button className={styles.CtaButton} onClick={handleNext}>
                Next
              </button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div className={styles.ChatPreview}>
                <div className={styles.BotBubble}>
                  I can help you study anything, explain concepts,
                  and guide you step-by-step.
                </div>
              </div>

              <button className={styles.CtaButton} onClick={handleNext}>
                Next
              </button>
            </>
          )}

          {/* STEP 3 — Telegram style */}
          {step === 3 && (
            <>
              <div className={styles.FeatureList}>
                <div className={`${styles.FeatureBubble} ${styles.SlideIn}`}>
                  📘 Learn
                </div>
                <div className={`${styles.FeatureBubble} ${styles.SlideIn}`}>
                  🧠 Practice
                </div>
                <div className={`${styles.FeatureBubble} ${styles.SlideIn}`}>
                  📤 Upload
                </div>
                <div className={`${styles.FeatureBubble} ${styles.SlideIn}`}>
                  ⚙️ Tools
                </div>
              </div>

              <button className={styles.CtaButton} onClick={handleStart}>
                Start
              </button>

              <p className={styles.Footer}>
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/auth")}
                  className={styles.LinkButton}
                >
                  Log in
                </button>
              </p>
            </>
          )}

        </div>
      </div>
    </>
  );
}
