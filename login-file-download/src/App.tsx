import "./App.css";

import React, { useEffect, useRef, useState } from "react"; // Tailwind CSS is already imported globally

// ======= CONFIGURABLE CONSTANTS =======
const HARDCODED_PASSWORD = "supersecret"; // <-- Change this as needed
const SESSION_KEY = "login-file-download-session-active";
const SESSION_TIMESTAMP_KEY = "login-file-download-session-timestamp";
const WAIT_TIME_SECONDS = 10; // 5 minutes
const SESSION_TIMEOUT_SECONDS = 10; // 10 minutes, auto unlock after this

import LoginForm from "./components/LoginForm";
import BusySplash from "./components/BusySplash";
import WaitPage from "./components/WaitPage";
import DownloadPage from "./components/DownloadPage";


// ======= MAIN APP =======

const App: React.FC = () => {
  const [stage, setStage] = useState<"login" | "busy" | "wait" | "download">(
    "login"
  );
  const [loginError, setLoginError] = useState<string | null>(null);
  const [waitSeconds, setWaitSeconds] = useState(WAIT_TIME_SECONDS);
  const timerRef = useRef<number | null>(null); // Use number for browser setInterval

  // Check session lock on mount
  useEffect(() => {
    const sessionActive = localStorage.getItem(SESSION_KEY);
    const sessionTimestamp = localStorage.getItem(SESSION_TIMESTAMP_KEY);
    if (sessionActive === "1" && sessionTimestamp) {
      // Check if session expired (auto-unlock after timeout)
      const now = Math.floor(Date.now() / 1000);
      const started = parseInt(sessionTimestamp, 10);
      if (now - started > SESSION_TIMEOUT_SECONDS) {
        localStorage.removeItem(SESSION_KEY);
        localStorage.removeItem(SESSION_TIMESTAMP_KEY);
        setStage("login");
      } else {
        setStage("busy");
      }
    } else {
      setStage("login");
    }
  }, []);

  // Timer for wait stage
  useEffect(() => {
    if (stage === "wait") {
      timerRef.current = window.setInterval(() => {
        setWaitSeconds((s) => {
          if (s <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setStage("download");
            return 0;
          }
          return s - 1;
        });
      }, 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [stage]);

  // Login handler
  const handleLogin = (pw: string) => {
    if (pw === HARDCODED_PASSWORD) {
      // Lock session
      localStorage.setItem(SESSION_KEY, "1");
      localStorage.setItem(
        SESSION_TIMESTAMP_KEY,
        String(Math.floor(Date.now() / 1000))
      );
      setLoginError(null);
      setStage("wait");
      setWaitSeconds(WAIT_TIME_SECONDS);
    } else {
      setLoginError("Incorrect password. Please try again.");
    }
  };

  // Session reset handler (for Nick)
  const handleReset = () => {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_TIMESTAMP_KEY);
    setStage("login");
    setLoginError(null);
  };

  // If session is locked while on login, show busy
  useEffect(() => {
    if (stage === "login") {
      const sessionActive = localStorage.getItem(SESSION_KEY);
      if (sessionActive === "1") {
        setStage("busy");
      }
    }
  }, [stage]);

  // When user leaves download page, unlock session
  useEffect(() => {
    if (stage === "download") {
      return () => {
        localStorage.removeItem(SESSION_KEY);
        localStorage.removeItem(SESSION_TIMESTAMP_KEY);
      };
    }
  }, [stage]);

  // No wrapper needed, each page is full screen
  if (stage === "login")
    return <LoginForm onLogin={handleLogin} error={loginError} />;
  if (stage === "busy") return <BusySplash onReset={handleReset} />;
  if (stage === "wait") return <WaitPage secondsLeft={waitSeconds} />;
  if (stage === "download") return <DownloadPage downloadUrl="https://example.com/generated-file.zip" />;
  return null;
};

export default App;
