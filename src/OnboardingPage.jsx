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
      {/* Deep, Calm Galaxy Background — Static, No Animation */}
      <div className={styles.Background}>
        <div className={styles.BackgroundGradient}></div>
      </div>

      <div className={styles.Container}>
        <div className={`${styles.Card} ${styles.FadeSlide}`}>

          {/* Logo — Centered, Subtle Glow */}
          <div className={`${styles.Logo} ${styles.FadeSlide}`}>
            <div className={styles.LogoContainer}>
              <img src="/robot-Luca.svg" alt="LUCA" />
            </div>
            <h1 className={styles.LogoText}>LUCA</h1>
          </div>

          {/* === STEP 1 — Quiet, Human Chat Introduction === */}
          {step === 1 && (
            <div className={styles.StepContainer}>
              <div className={styles.ChatPreview}>
                <div className={`${styles.BotBubble} ${styles.Typewriter}`}>
                  Hi! I’m LUCA 🤖
                </div>
                <div className={`${styles.BotBubble} ${styles.Typewriter}`}>
                  Your personal AI learning assistant.
                </div>
                <div className={`${styles.BotBubble} ${styles.Typewriter}`}>
                  Study smarter — in Sinhala, Tamil, or English.
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

          {/* === STEP 2 — Clean Feature Grid === */}
          {step === 2 && (
            <div className={styles.StepContainer}>
              <h2 className={styles.Title}>Learn Anything. Anytime.</h2>
              <p className={styles.Subtitle}>Powered by advanced AI</p>

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

          {/* === STEP 3 — Minimalist Tool List === */}
          {step === 3 && (
            <div className={styles.StepContainer}>
              <h2 className={styles.Title}>Your Study Tools</h2>
              <p className={styles.Subtitle}>Designed for focus, not distraction</p>

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

          {/* === STEP 4 — Premium Final CTA === */}
          {step === 4 && (
            <div className={styles.StepContainer}>
              <h2 className={styles.Title}>Ready to Start Learning?</h2>
              <p className={styles.Subtext}>
                Join thousands of Sri Lankan students using LUCA to study smarter.
              </p>

              <button
                className={`${styles.StartButton} ${styles.Pulse}`}
                onClick={start}
              >
                Get Started Free
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