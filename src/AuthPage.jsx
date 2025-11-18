import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AuthPage.module.css";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New field
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // New field
  const [rememberMe, setRememberMe] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    if (isLogin && emailRef.current) {
      emailRef.current.focus();
    }
  }, [isLogin]);

  useEffect(() => {
    if (isLocked && lockoutTime > 0) {
      const timer = setTimeout(() => {
        setLockoutTime(lockoutTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isLocked && lockoutTime === 0) {
      setIsLocked(false);
      setLoginAttempts(0);
    }
  }, [isLocked, lockoutTime]);

  const validatePassword = (pwd) => {
    if (pwd.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (!/[A-Z]/.test(pwd)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(pwd)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/\d/.test(pwd)) {
      return "Password must contain at least one number";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
      return "Password must contain at least one special character";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (isLocked) {
      setError(`Account is locked. Try again in ${lockoutTime} seconds.`);
      setIsLoading(false);
      return;
    }

    if (isLogin) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (email === "admin@gmail.com" && password === "admin123") {
        const token = btoa(`${email}:${password}`);
        localStorage.setItem("authToken", token);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify({ 
          name: "Admin User", 
          email 
        }));
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("rememberMe");
        }
        setLoginAttempts(0);
        navigate("/app", { replace: true });
      } else {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        if (newAttempts >= 3) {
          setIsLocked(true);
          setLockoutTime(30);
        }
        setError("Invalid email or password");
      }
    } else {
      if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
        setError("All fields are required");
        setIsLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setIsLoading(false);
        return;
      }

      const passwordError = validatePassword(password);
      if (passwordError) {
        setError(passwordError);
        setIsLoading(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const token = btoa(`${email}:${password}`);
      localStorage.setItem("authToken", token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify({ name, email }));
      navigate("/app", { replace: true });
    }
    setIsLoading(false);
  };

  const handleForgotPassword = () => {
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }
    // Simulate password reset
    alert(`Password reset instructions sent to ${email}`);
    setError("");
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      const token = btoa(`google_user@luca.ai:google123`);
      localStorage.setItem("authToken", token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify({ 
        name: "Google User", 
        email: "google_user@luca.ai" 
      }));
      setIsLoading(false);
      navigate("/app", { replace: true });
    }, 1200);
  };

  const handleGitHubLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      const token = btoa(`github_user@luca.ai:github123`);
      localStorage.setItem("authToken", token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify({ 
        name: "GitHub User", 
        email: "github_user@luca.ai" 
      }));
      setIsLoading(false);
      navigate("/app", { replace: true });
    }, 1200);
  };

  const handleAppleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      const token = btoa(`apple_user@luca.ai:apple123`);
      localStorage.setItem("authToken", token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify({ 
        name: "Apple User", 
        email: "apple_user@luca.ai" 
      }));
      setIsLoading(false);
      navigate("/app", { replace: true });
    }, 1200);
  };

  const handleMicrosoftLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      const token = btoa(`microsoft_user@luca.ai:microsoft123`);
      localStorage.setItem("authToken", token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify({ 
        name: "Microsoft User", 
        email: "microsoft_user@luca.ai" 
      }));
      setIsLoading(false);
      navigate("/app", { replace: true });
    }, 1200);
  };

  return (
    <>
      <div className={styles.Background}>
        <div className={styles.CyberGrid}></div>
        <div className={styles.EnergyPulse}></div>
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
                ref={emailRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                className={styles.Input}
              />
            </div>
            
            {/* Password field */}
            <div className={styles.InputGroup}>
              <div className={styles.PasswordContainer}>
                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className={styles.Input}
                />
                <button
                  type="button"
                  className={styles.TogglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁" : "👁‍voy"}
                </button>
              </div>
            </div>

            {/* Confirm Password field - only for registration */}
            {!isLogin && (
              <div className={styles.InputGroup}>
                <div className={styles.PasswordContainer}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                    className={styles.Input}
                  />
                  <button
                    type="button"
                    className={styles.TogglePassword}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "👁" : "👁‍voy"}
                  </button>
                </div>
              </div>
            )}

            {isLogin && (
              <div className={styles.RememberMe}>
                <label className={styles.CheckboxLabel}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className={styles.Checkbox}
                  />
                  <span className={styles.Checkmark}></span>
                  Remember me
                </label>
                <button
                  type="button"
                  className={styles.ForgotPassword}
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* ✅ Error message */}
            {error && <div className={styles.ErrorMessage}>{error}</div>}

            <button 
              type="submit" 
              className={styles.SubmitButton}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : (isLogin ? "Sign In" : "Sign Up")}
            </button>
          </form>

          <div className={styles.Divider}>
            <span>or</span>
          </div>

          {/* Social Login Buttons */}
          <div className={styles.SocialButtons}>
            <button 
              className={styles.SocialButton}
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <div className={styles.SocialContent}>
                <div className={styles.GoogleIcon}>G</div>
                <span>Continue with Google</span>
              </div>
            </button>

            <button 
              className={styles.SocialButton}
              onClick={handleGitHubLogin}
              disabled={isLoading}
            >
              <div className={styles.SocialContent}>
                <div className={styles.GitHubIcon}>GH</div>
                <span>Continue with GitHub</span>
              </div>
            </button>

            <button 
              className={styles.SocialButton}
              onClick={handleAppleLogin}
              disabled={isLoading}
            >
              <div className={styles.SocialContent}>
                <div className={styles.AppleIcon}>A</div>
                <span>Continue with Apple</span>
              </div>
            </button>

            <button 
              className={styles.SocialButton}
              onClick={handleMicrosoftLogin}
              disabled={isLoading}
            >
              <div className={styles.SocialContent}>
                <div className={styles.MicrosoftIcon}>M</div>
                <span>Continue with Microsoft</span>
              </div>
            </button>
          </div>

          <div className={styles.Footer}>
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setConfirmPassword(""); // Clear confirm password on toggle
              }}
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