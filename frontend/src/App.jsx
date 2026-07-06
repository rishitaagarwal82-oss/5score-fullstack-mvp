import { useState } from "react";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import "./App.css";

export default function App() {
  const [stage, setStage] = useState("auth"); // auth | home | quiz

  const [subject, setSubject] = useState("AP Biology");
  const [mode, setMode] = useState("mcq");

  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);

  // ⭐ NEW: auth + user
  const [user, setUser] = useState(null); // {name, provider}
  const [isGuest, setIsGuest] = useState(false);

  function addXP(amount) {
    if (isGuest) return; // ⭐ guest = no XP

    setXp((prev) => {
      const newXP = prev + amount;
      if (newXP >= level * 50) setLevel((l) => l + 1);
      return newXP;
    });
  }

  function startQuiz(s, m) {
    setSubject(s);
    setMode(m);
    setStage("quiz");

    if (!isGuest) setStreak((st) => st + 1);
  }

  function goHome() {
    setStage("home");
  }

  function goAuth() {
    setStage("auth");
    setUser(null);
    setIsGuest(false);
    setXp(0);
    setStreak(0);
    setLevel(1);
  }

  // ⭐ UPDATED AUTH HANDLING
  function handleGoogleLogin() {
    setUser({ name: "Rishita", provider: "google" }); // later replace w real OAuth
    setIsGuest(false);
    setStage("home");
  }

  function handleGuest() {
    setUser({ name: "Guest", provider: "guest" });
    setIsGuest(true);
    setStage("home");
  }

  if (stage === "auth") {
    return (
      <Auth
        onGoogle={handleGoogleLogin}
        onGuest={handleGuest}
      />
    );
  }

  if (stage === "home") {
    return (
      <Home
        onStart={startQuiz}
        xp={isGuest ? "—" : xp}
        streak={isGuest ? "—" : streak}
        level={isGuest ? "—" : level}
        onLogout={goAuth}
        user={user}
      />
    );
  }

  if (stage === "quiz") {
    return (
      <Quiz
        subject={subject}
        mode={mode}
        onExit={goHome}
        onCorrect={() => addXP(10)}
      />
    );
  }

  return null;
}
