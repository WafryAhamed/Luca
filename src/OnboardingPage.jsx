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

  // Auto-fade-in for Step 2 bullet points
  useEffect(() => {
    if (step === 2) {
      const items = document.querySelectorAll(`.${styles.FeatureItem}`);
      items.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateX(0)";
        }, index * 300);
      });
    }
  }, [step]);

  return (
    <>
      {/* === CLEAN GALAXY BACKGROUND — NO ANIMATIONS === */}
      <div className={styles.Background3D}>
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

          {/* === STEP 1 — “Study Smarter, Not Harder” === */}
          {step === 1 && (
            <div className={styles.FadeSlide}>
              {/* 50x50 Image */}
              <div className={styles.IconPlaceholder}>
                <img src="/images/icon-brain.png" alt="Brain" width="50" height="50" />
              </div>

              <h2 className={styles.Title}>Stop cramming. Start remembering.</h2>
              <p className={styles.Subtext}>
                Tired of reading the same thing over and over… and still forgetting?  
                LUCA explains things simply — so you understand once, and remember for good.
              </p>

              <button
                className={`${styles.CtaButton} ${styles.Pulse}`}
                onClick={next}
              >
                Next
              </button>
            </div>
          )}

          {/* === STEP 2 — “Your Study Toolkit, in One Place” === */}
          {step === 2 && (
            <div className={styles.FadeSlide}>
              {/* 50x50 Image */}
              <div className={styles.IconPlaceholder}>
                <img src="/images/icon-toolkit.png" alt="Toolkit" width="50" height="50" />
              </div>

              <h2 className={styles.Title}>All your study tools — in one place.</h2>

              <div className={styles.FeatureList}>
                <div className={`${styles.FeatureItem} ${styles.SlideIn}`}>
                  📚 Ask anything — Math, Science, English, History
                </div>
                <div className={`${styles.FeatureItem} ${styles.SlideIn}`}>
                  💬 Save your chats — like a personal study notebook
                </div>
                <div className={`${styles.FeatureItem} ${styles.SlideIn}`}>
                  ⏰ Use the timer — focus for 25 mins, then take a break
                </div>
                <div className={`${styles.FeatureItem} ${styles.SlideIn}`}>
                  🌏 Works in Sinhala, Tamil & English — no language barrier
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

          {/* === STEP 3 — “Ready to Begin?” === */}
          {step === 3 && (
            <div className={styles.FadeSlide}>
              {/* 50x50 Image */}
              <div className={styles.IconPlaceholder}>
                <img src="/images/icon-rocket.png" alt="Start" width="50" height="50" />
              </div>

              <h2 className={styles.Title}>Your study journey starts here.</h2>

              <p className={styles.Subtext}>
                You’re not alone. Thousands of students like you are already using LUCA to feel confident, calm, and in control — even before exams.
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