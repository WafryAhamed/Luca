import { useState, useEffect } from "react";
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

  // Auto-fade-in chat bubbles on Step 1
  useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => {
        const bubbles = document.querySelectorAll(`.${styles.BotBubble}`);
        bubbles.forEach((bubble, index) => {
          setTimeout(() => {
            bubble.style.opacity = "1";
            bubble.style.transform = "translateY(0)";
          }, index * 600);
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <>
      {/* === CLEAN GALAXY BACKGROUND — NO ANIMATIONS === */}
      <div className={styles.Background3D}>
        {/* Only keep subtle floating cubes — calm & minimal */}
        <div className={`${styles.Cube} ${styles.FloatCube}`}></div>
        <div className={`${styles.Cube} ${styles.FloatCube}`}></div>
        <div className={`${styles.Cube} ${styles.FloatCube}`}></div>
        <div className={`${styles.Cube} ${styles.FloatCube}`}></div>
      </div>

      <div className={styles.Container}>
        <div className={`${styles.Card} ${styles.FadeSlide}`}>

          {/* === LOGO === */}
          <div className={`${styles.Logo} ${styles.FadeSlide}`}>
            <img src="/robot-Luca.svg" alt="LUCA" />
            <h1>LUCA</h1>
          </div>

          {/* === STEP 1 — INTRO CHAT === */}
          {step === 1 && (
            <div className={styles.FadeSlide}>
              <div className={styles.ChatPreview}>
                <div className={`${styles.BotBubble} ${styles.Typewriter}`}>
                  Hello! I’m LUCA 🤖
                </div>
                <div className={`${styles.BotBubble} ${styles.Typewriter}`}>
                  Your AI academic assistant for Math, Science, History, Coding, and more.
                </div>
                <div className={`${styles.BotBubble} ${styles.Typewriter}`}>
                  Ask me anything — in Sinhala, Tamil, or English. Let’s get started!
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

          {/* === STEP 2 — FEATURES === */}
          {step === 2 && (
            <div className={styles.FadeSlide}>
              <h2 className={styles.Title}>Ask Anything. Learn Everything.</h2>

              <div className={styles.FeatureGrid}>
                <div className={`${styles.FeatureCard} ${styles.BounceIn}`}>
                  📘 <span>Math • Science • History • Coding</span>
                </div>
                <div className={`${styles.FeatureCard} ${styles.BounceIn}`}>
                  🧠 <span>Step-by-step explanations & examples</span>
                </div>
                <div className={`${styles.FeatureCard} ${styles.BounceIn}`}>
                  🌐 <span>Sinhala • Tamil • English support</span>
                </div>
                <div className={`${styles.FeatureCard} ${styles.BounceIn}`}>
                  🎯 <span>Exam prep, essays, revision sheets</span>
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

          {/* === STEP 3 — TOOLS === */}
          {step === 3 && (
            <div className={styles.FadeSlide}>
              <h2 className={styles.Title}>Your Study Toolkit</h2>

              <div className={styles.FeatureList}>
                <div className={`${styles.FeatureBubble} ${styles.SlideIn}`}>
                  ⏱ Focus Timer & Stopwatch
                </div>
                <div className={`${styles.FeatureBubble} ${styles.SlideIn}`}>
                  📝 Notes Saver & Session Organizer
                </div>
                <div className={`${styles.FeatureBubble} ${styles.SlideIn}`}>
                  🔍 Search & Save Past Chats
                </div>
                <div className={`${styles.FeatureBubble} ${styles.SlideIn}`}>
                  💡 Instant AI Answers — Any Subject
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

          {/* === STEP 4 — CTA === */}
          {step === 4 && (
            <div className={styles.FadeSlide}>
              <h2 className={styles.Title}>Ready to Start Learning?</h2>

              <p className={styles.Subtext}>
                Join thousands of Sri Lankan students using LUCA to ace exams, write essays, and master coding — one question at a time.
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