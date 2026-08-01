import { useState, useEffect } from "react";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Upgrades from "./pages/Upgrades";
import Leaderboard from "./pages/Leaderboard";
import Team from "./pages/Team";
import API from "./api/api";
import "./App.css";

export default function App() {
  const [stage, setStage] = useState("auth"); // auth | home | quiz | upgrades | leaderboard | team
  const [appLoading, setAppLoading] = useState(true);

  const [subject, setSubject] = useState("AP Biology");
  const [mode, setMode] = useState("mcq");

  const [xp, setXp] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);

  const [user, setUser] = useState(null);
  const [purchasedUpgrades, setPurchasedUpgrades] = useState([]);

  // Restore authenticated session on mount
  useEffect(() => {
    async function restoreSession() {
      const token = localStorage.getItem("token");
      if (!token) {
        setAppLoading(false);
        return;
      }

      try {
        const res = await API.get("/auth/me");
        const userData = res.data;

        setUser(userData);
        setXp(userData.xp);
        setTotalScore(userData.total_score);
        setStreak(userData.streak);
        setLevel(userData.level);
        setPurchasedUpgrades(userData.purchased_upgrades || []);
        setStage("home");
      } catch (err) {
        console.error("Session restoration failed:", err);
        // Clean stale token
        localStorage.removeItem("token");
      } finally {
        setAppLoading(false);
      }
    }

    restoreSession();
  }, []);

  // Sync Cyber Glow (neon_glow) theme with document.body dynamically
  useEffect(() => {
    if (purchasedUpgrades.includes("neon_glow")) {
      document.body.classList.add("neon-theme");
    } else {
      document.body.classList.remove("neon-theme");
    }
  }, [purchasedUpgrades]);

  // Sync state to backend SQLite helper
  async function syncProgress(currXp, currScore, currStreak, currLevel, currUpgrades) {
    try {
      await API.post("/auth/sync", {
        xp: currXp,
        total_score: currScore,
        streak: currStreak,
        level: currLevel,
        purchased_upgrades: currUpgrades
      });
    } catch (err) {
      console.error("Failed to sync progress with SQLite backend:", err);
    }
  }

  function handleAuthSuccess(verifiedUser, token) {
    setUser(verifiedUser);
    setXp(verifiedUser.xp);
    setTotalScore(verifiedUser.total_score);
    setStreak(verifiedUser.streak);
    setLevel(verifiedUser.level);
    setPurchasedUpgrades(verifiedUser.purchased_upgrades || []);
    setStage("home");
  }

  function addXP(amount) {
    setTotalScore((prevScore) => {
      const nextScore = prevScore + 1;

      // Apply purchased upgrades effects
      let multiplier = 1;
      if (purchasedUpgrades.includes("double_xp")) {
        multiplier = 2;
      }

      let flatBonus = 0;
      if (purchasedUpgrades.includes("einstein_brain")) {
        flatBonus = 5;
      }

      const addedXP = (amount * multiplier) + flatBonus;

      setXp((prevXp) => {
        const nextXp = prevXp + addedXP;

        // Dynamic level formula: 50 XP per level
        let nextLevel = level;
        if (nextXp >= nextLevel * 50) {
          nextLevel = Math.floor(nextXp / 50) + 1;
          setLevel(nextLevel);
        }

        // Fire background synchronization to server SQLite
        syncProgress(nextXp, nextScore, streak, nextLevel, purchasedUpgrades);
        return nextXp;
      });

      return nextScore;
    });
  }

  function startQuiz(s, m) {
    setSubject(s);
    setMode(m);
    setStage("quiz");

    setStreak((st) => {
      const nextStreak = st + 1;
      syncProgress(xp, totalScore, nextStreak, level, purchasedUpgrades);
      return nextStreak;
    });
  }

  function goHome() {
    setStage("home");
  }

  async function handleLogout() {
    try {
      await API.post("/auth/logout");
    } catch (err) {
      console.warn("Logout request failed:", err);
    } finally {
      localStorage.removeItem("token");
      setStage("auth");
      setUser(null);
      setXp(0);
      setTotalScore(0);
      setStreak(0);
      setLevel(1);
      setPurchasedUpgrades([]);
    }
  }

  async function handlePurchase(item) {
    if (xp >= item.cost && !purchasedUpgrades.includes(item.id)) {
      const nextXP = xp - item.cost;
      const nextUpgrades = [...purchasedUpgrades, item.id];

      setXp(nextXP);
      setPurchasedUpgrades(nextUpgrades);

      // Instantly sync upgrades with SQLite backend
      await syncProgress(nextXP, totalScore, streak, level, nextUpgrades);
    }
  }

  if (appLoading) {
    return (
      <div className="loadingScreen">
        <div className="spinner"></div>
        <p style={{ marginTop: "16px", letterSpacing: "1px", textTransform: "uppercase", fontSize: "0.8rem" }}>Securing connection...</p>
      </div>
    );
  }

  if (stage === "auth") {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  if (stage === "home") {
    const userWithUpgrades = user ? { ...user, purchased: purchasedUpgrades } : null;
    return (
      <Home
        onStart={startQuiz}
        xp={xp}
        streak={streak}
        level={level}
        score={totalScore}
        onLogout={handleLogout}
        onUpgrades={() => setStage("upgrades")}
        onLeaderboard={() => setStage("leaderboard")}
        onTeam={() => setStage("team")}
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

  if (stage === "leaderboard") {
    return <Leaderboard onBack={goHome} />;
  }

  if (stage === "team") {
    return <Team onBack={goHome} />;
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
