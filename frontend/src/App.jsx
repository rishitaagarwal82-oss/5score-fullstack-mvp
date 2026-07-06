import { useState } from "react";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Upgrades from "./pages/Upgrades";
import "./App.css";

export default function App() {
  const [stage, setStage] = useState("auth"); // auth | home | quiz | upgrades

  const [subject, setSubject] = useState("AP Biology");
  const [mode, setMode] = useState("mcq");

  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);

  // ⭐ NEW: auth + user
  const [user, setUser] = useState(null); // {name, provider}
  const [isGuest, setIsGuest] = useState(false);
  const [purchasedUpgrades, setPurchasedUpgrades] = useState([]);

  function addXP(amount) {
    if (isGuest) return; // ⭐ guest = no XP

    let multiplier = 1;
    if (purchasedUpgrades.includes("double_xp")) {
      multiplier = 2;
    }

    setXp((prev) => {
      const newXP = prev + amount * multiplier;
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
    // Simulate OAuth delay
    setTimeout(() => {
      setUser({ name: "Rishita", provider: "google" });
      setIsGuest(false);
      setStage("home");
    }, 1500);
  }

  function handleGuest() {
    setUser({ name: "Guest", provider: "guest" });
    setIsGuest(true);
    setStage("home");
  }

  function handlePurchase(item) {
    if (xp >= item.cost) {
      setXp((prev) => prev - item.cost);
      setPurchasedUpgrades((prev) => [...prev, item.id]);
    }
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
    const userWithUpgrades = user ? { ...user, purchased: purchasedUpgrades } : null;
    return (
      <Home
        onStart={startQuiz}
        xp={isGuest ? "—" : xp}
        streak={isGuest ? "—" : streak}
        level={isGuest ? "—" : level}
        onLogout={goAuth}
        onUpgrades={() => setStage("upgrades")}
        user={userWithUpgrades}
      />
    );
  }

  if (stage === "upgrades") {
    return (
      <Upgrades
        xp={xp}
        purchased={purchasedUpgrades}
        onPurchase={handlePurchase}
        onBack={goHome}
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
