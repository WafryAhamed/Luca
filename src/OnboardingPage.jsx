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

  // Feature fade-in animation for step 2
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
      {/* === BACKGROUND === */}
      <div className={styles.Background3D}>
        <div className={`${styles.Cube}`}></div>
        <div className={`${styles.Cube}`}></div>
        <div className={`${styles.Cube}`}></div>
        <div className={`${styles.Cube}`}></div>
      </div>

      <div className={styles.Container}>
        <div className={`${styles.Card} ${styles.FadeSlide}`}>

          {/* --------------------------------------------------------
             STEP 1
          ---------------------------------------------------------*/}
          {step === 1 && (
            <div className={styles.FadeSlide}>
              
              <img src="/images/page1.png" width="350" height="280" />

              <h2 className={styles.Title}>Stop stressing. Start understanding.</h2>

              <p className={styles.Subtext}>
                Tired of endless re-reading? LUCA simplifies every concept so you learn once and remember forever.
              </p>

              <button
                className={`${styles.CtaButton} ${styles.Pulse}`}
                onClick={next}
              >
                Next
              </button>
            </div>
          )}

          {/* --------------------------------------------------------
             STEP 2
          ---------------------------------------------------------*/}
          {step === 2 && (
            <div className={styles.FadeSlide}>
              
              <img src="/images/page2.png" width="400" height="336" />

              <h2 className={styles.Title}>All your study tools - in one place.</h2>

              <div className={styles.FeatureList}>
                <div className={`${styles.FeatureItem} ${styles.SlideIn}`}>
                  📚 Ask anything - Math, Science, English, Coding etc.
                </div>

                <div className={`${styles.FeatureItem} ${styles.SlideIn}`}>
                  💬 Save your chats - like a personal study notebook
                </div>

                <div className={`${styles.FeatureItem} ${styles.SlideIn}`}>
                  ⏰ Built-in focus timer to boost productivity
                </div>

                <div className={`${styles.FeatureItem} ${styles.SlideIn}`}>
                  🌏 Sinhala, Tamil & English — learn in your language
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

          {/* --------------------------------------------------------
             STEP 3
          ---------------------------------------------------------*/}
          {step === 3 && (
            <div className={styles.FadeSlide}>
              
              <img src="/images/page3.png" width="450" height="279" />

              <h2 className={styles.Title}>Begin your learning with LUCA.</h2>

              <p className={styles.Subtext}>
                You’re not alone. Thousands of students like you already use LUCA to feel confident, calm and in control — even before exams.
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
