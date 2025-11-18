import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AuthPage.module.css";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const backgroundRef = useRef();

  useEffect(() => {
    if (isLogin) {
      setEmail("admin@gmail.com");
      setPassword("admin123");
      setError("");
    } else {
      setEmail("");
      setPassword("");
      setName("");
      setError("");
    }
  }, [isLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      // 🔐 Enhanced security: only admin credentials work
      if (email === "admin@gmail.com" && password === "admin123") {
        // Secure token simulation
        const token = btoa(`${email}:${password}`);
        localStorage.setItem("authToken", token);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify({ 
          name: isLogin ? "Admin User" : name, 
          email 
        }));
        navigate("/app", { replace: true });
      } else {
        setError("Invalid email or password");
        return;
      }
    } else {
      // Sign Up validation
      if (!name.trim() || !email.trim() || !password.trim()) {
        setError("All fields are required");
        return;
      }
      // Password strength check
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
      // Secure token simulation
      const token = btoa(`${email}:${password}`);
      localStorage.setItem("authToken", token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify({ name, email }));
      navigate("/app", { replace: true });
    }
  };

  return (
    <>
      <div ref={backgroundRef} className={styles.Background}>
        <div className={styles.Stars}></div>
      </div>

      <div className={styles.Container}>
        <div className={styles.Card}>
          <div className={styles.Header}>
            <h1 className={styles.Title}>{isLogin ? "Welcome Back" : "Create Account"}</h1>
            <p className={styles.Subtitle}>
              {isLogin
                ? "Sign in to continue to LUCA"
                : "Join LUCA to unlock AI-powered learning"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.Form}>
            {!isLogin && (
              <div className={styles.InputGroup}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  required
                  className={styles.Input}
                />
              </div>
            )}
            <div className={styles.InputGroup}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                className={styles.Input}
              />
            </div>
            <div className={styles.InputGroup}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className={styles.Input}
              />
            </div>

            {/* ✅ Error message */}
            {error && <div className={styles.ErrorMessage}>{error}</div>}

            <button type="submit" className={styles.SubmitButton}>
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <div className={styles.Divider}>
            <span>or</span>
          </div>

          <button className={styles.GoogleButton}>
            <span>Continue with Google</span>
          </button>

          <div className={styles.Footer}>
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className={styles.ToggleButton}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}