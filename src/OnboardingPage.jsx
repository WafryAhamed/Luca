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

  // Auto-play animated onboarding messages
  useEffect(() => {
    const timeouts = [
      setTimeout(() => setStep(1), 600),
      setTimeout(() => setStep(2), 1600),
      setTimeout(() => setStep(3), 2600),
    ];
    return () => timeouts.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <>
      <div className={styles.Background}>
        <div className={styles.Gradient1}></div>
        <div className={styles.Gradient2}></div>
        <div className={styles.Stars}></div>
      </div>

      <div className={styles.Container}>
        <div className={styles.Card}>

          {/* App Header */}
          <div className={styles.Logo}>
            <img src="/robot-Luca.svg" alt="LUCA" />
            <h1>LUCA</h1>
          </div>

          {/* Animated conversation-style intro */}
          <div className={styles.ChatPreview}>
            {step >= 1 && (
              <div className={styles.BotBubble}>Hi! I'm LUCA 🤖</div>
            )}
            {step >= 2 && (
              <div className={styles.BotBubble}>I'm here to help you learn smarter.</div>
            )}
            {step >= 3 && (
              <div className={styles.BotBubble}>
                Want to see what I can do? 👇
              </div>
            )}

            {step < 3 && (
              <div className={styles.TypingBubble}>
                <div className={styles.Dot}></div>
                <div className={styles.Dot}></div>
                <div className={styles.Dot}></div>
              </div>
            )}
          </div>

          {/* Modern sliding features */}
          <div className={styles.FeatureSlider}>
            <div className={styles.FeatureItem}>
              <span>📚</span>
              <p>Master Math, Science, Literature & more</p>
            </div>

            <div className={styles.FeatureItem}>
              <span>📄</span>
              <p>Upload PDFs, notes & assignments</p>
            </div>

            <div className={styles.FeatureItem}>
              <span>💡</span>
              <p>AI step-by-step problem solving</p>
            </div>

            <div className={styles.FeatureItem}>
              <span>⚡</span>
              <p>Instant explanations in your style</p>
            </div>

            <div className={styles.FeatureItem}>
              <span>🔒</span>
              <p>Private & secure academic workspace</p>
            </div>
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
