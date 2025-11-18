import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OnboardingPage.module.css";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const next = () => setStep(step + 1);
  const start = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    navigate("/auth");
  };

  return (
    <>
      {/* 3D Background */}
      <div className={styles.Background3D}>
        <div className={`${styles.Cube} ${styles.FloatCube}`}></div>
        <div className={`${styles.Cube} ${styles.FloatCube}`}></div>
        <div className={`${styles.Cube} ${styles.FloatCube}`}></div>
        <div className={`${styles.Cube} ${styles.FloatCube}`}></div>
      </div>

      <div className={styles.Container}>
        <div className={`${styles.Card} ${styles.FadeSlide}`}>

          {/* Logo */}
          <div className={`${styles.Logo} ${styles.FadeSlide}`}>
            <img src="/robot-Luca.svg" alt="LUCA" />
            <h1>LUCA</h1>
          </div>

          {/* === STEP 1 — Intro Chat === */}
          {step === 1 && (
            <div className={styles.FadeSlide}>
              <div className={styles.ChatPreview}>
                <div className={`${styles.BotBubble} ${styles.Typewriter}`}>
                  Hi! I’m LUCA 🤖
                </div>
                <div className={`${styles.BotBubble} ${styles.Typewriter}`}>
                  I’m your personal AI learning assistant.
                </div>
                <div className={`${styles.BotBubble} ${styles.Typewriter}`}>
                  Let me help you study smarter — in Sinhala, Tamil, or English.
                </div>
              </div>

              <button
                className={`${styles.CtaButton} ${styles.Pulse}`}
                onClick={next}
              >
                Continue
              </button>
            </div>
          )}

          {/* === STEP 2 — What LUCA Does === */}
          {step === 2 && (
            <div className={styles.FadeSlide}>
              <h2 className={styles.Title}>Learn Anything. Anytime.</h2>

              <div className={styles.FeatureGrid}>
                <div className={`${styles.FeatureCard} ${styles.BounceIn}`}>
                  📘 <span>Ask questions from any subject</span>
                </div>
                <div className={`${styles.FeatureCard} ${styles.BounceIn}`}>
                  🧠 <span>Get step-by-step explanations</span>
                </div>
                <div className={`${styles.FeatureCard} ${styles.BounceIn}`}>
                  🌐 <span>Sinhala • Tamil • English</span>
                </div>
                <div className={`${styles.FeatureCard} ${styles.BounceIn}`}>
                  🎯 <span>Revision help for exams</span>
                </div>
              </div>

              <button
                className={`${styles.CtaButton} ${styles.Pulse}`}
                onClick={next}
              >
                Next
              </button>
            </div>
          )}

          {/* === STEP 3 — Study Tools === */}
          {step === 3 && (
            <div className={styles.FadeSlide}>
              <h2 className={styles.Title}>Your Study Tools</h2>

              <div className={styles.FeatureList}>
                <div className={`${styles.FeatureBubble} ${styles.SlideIn}`}>
                  📝 Save study notes
                </div>
                <div className={`${styles.FeatureBubble} ${styles.SlideIn}`}>
                  ⏱ Smart focus timer
                </div>
                <div className={`${styles.FeatureBubble} ${styles.SlideIn}`}>
                  📂 Organized sessions
                </div>
                <div className={`${styles.FeatureBubble} ${styles.SlideIn}`}>
                  ⚡ Fast AI answers
                </div>
              </div>

              <button
                className={`${styles.CtaButton} ${styles.Pulse}`}
                onClick={next}
              >
                Continue
              </button>
            </div>
          )}

          {/* === STEP 4 — Final Screen === */}
          {step === 4 && (
            <div className={styles.FadeSlide}>
              <h2 className={styles.Title}>Ready to Start Learning?</h2>

              <p className={styles.Subtext}>
                Join thousands of Sri Lankan students using LUCA to study smarter.
              </p>

              <button
                className={`${styles.StartButton} ${styles.Pulse}`}
                onClick={start}
              >
                Get Started
              </button>

              <p className={styles.Footer}>
                Already have an account?{" "}
                <button
                  className={styles.LinkButton}
                  onClick={() => navigate("/auth")}
                >
                  Log in
                </button>
              </p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
