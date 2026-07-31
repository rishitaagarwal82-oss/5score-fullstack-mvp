import { useEffect, useState } from "react";
import "../App.css";
import { getSubjects } from "../api/quiz";

export default function Home({
  onStart,
  xp = 0,
  streak = 0,
  level = 1,
  score = 0,
  onLogout,
  onUpgrades,
  onLeaderboard,
  onTeam,
  user
}) {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getSubjects();
      setSubjects(data);
    }
    load();
  }, []);

  const xpToNextLevel = level * 50;
  const currentLevelXP = xp % 50;
  const progressPercent = Math.min(100, Math.round((currentLevelXP / 50) * 100));

  return (
    <div className="homePage fadeIn">

      {/* HEADER HUD */}
      <div className="hudBar pop">
        <div className="hudGroup">
          <div className="hudItem">🔥 {streak}</div>
          <div className="hudItem">⭐ {xp} XP</div>
          <div className="hudItem">🏆 {score} Score</div>
          <div className="hudItem">🧠 Lvl {level}</div>
        </div>

        <div className="hudGroup">
          <button className="btn primary" onClick={onUpgrades}>
            🚀 Upgrades
          </button>

          <button className="btn ghost" onClick={onLogout}>
            Exit
          </button>
        </div>
      </div>

      {/* TITLE & HERO */}
      <div className="homeHeader">
        <h1 className="homeTitle">
          Welcome back, {user?.name || "Scholar"}{user?.purchased?.includes("pro_badge") || user?.pro ? " 💎" : ""}
        </h1>
        <p className="homeSub">Ready to continue your learning path?</p>
      </div>

      {/* PROGRESS / DASHBOARD AREA BELOW HEADER */}
      <div className="quizCard pop" style={{ marginBottom: "40px", padding: "24px", background: "rgba(30, 41, 59, 0.4)", backdropFilter: "blur(10px)" }}>
        <h3 style={{ marginTop: 0, marginBottom: "12px", fontSize: "1.1rem", color: "var(--text-main)" }}>📚 Your Learning Progress</h3>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "8px" }}>
          <span>Level {level}</span>
          <span>{currentLevelXP} / 50 XP to Level {level + 1}</span>
        </div>
        <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.08)", borderRadius: "4px", overflow: "hidden" }}>
          <div style={{ width: `${progressPercent}%`, height: "100%", background: "linear-gradient(90deg, var(--primary), var(--success))", transition: "width 0.4s ease" }}></div>
        </div>
      </div>

      {/* SUBJECT CARDS */}
      <h2 style={{ marginBottom: "24px", fontSize: "1.6rem" }}>🎯 Practice Courses</h2>
      <div className="homeGrid">

        {subjects.map((s, i) => (
          <div key={s} className="homeCard pop">

            <div className="nodeRow">
              <div className="node">{i + 1}</div>
              <div className="subjectName">{s}</div>
            </div>

            <div className="buttonRow">

              <button
                className="btn primary grow"
                onClick={() => onStart(s, "mcq")}
              >
                🧠 MCQ
              </button>

              <button
                className="btn success grow"
                onClick={() => onStart(s, "frq")}
              >
                ✍️ FRQ
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* BOTTOM DASHBOARD SECTION */}
      <h2 style={{ marginTop: "56px", marginBottom: "24px", fontSize: "1.6rem" }}>📊 Your Dashboard Hub</h2>
      <div className="homeGrid" style={{ marginBottom: "56px" }}>

        {/* 1. Progress Card */}
        <div className="homeCard pop" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ marginTop: 0, color: "var(--primary)" }}>📈 Overall Stats</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)" }}>Level:</span>
                <span style={{ fontWeight: "bold" }}>{level}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)" }}>Total XP:</span>
                <span style={{ fontWeight: "bold" }}>{xp} XP</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)" }}>Streak:</span>
                <span style={{ fontWeight: "bold" }}>🔥 {streak} days</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)" }}>Total Score:</span>
                <span style={{ fontWeight: "bold" }}>🏆 {score} correct</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Upgrade Shop Card */}
        <div className="homeCard pop" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ marginTop: 0, color: "var(--success)" }}>🚀 Upgrade Shop</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", margin: "14px 0" }}>
              Spend your earned XP to buy multipliers, streak freezes, and shiny badges.
            </p>
          </div>
          <button className="btn success" style={{ width: "100%", marginTop: "16px" }} onClick={onUpgrades}>
            Visit Shop
          </button>
        </div>

        {/* 3. Leaderboard Card */}
        <div className="homeCard pop" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ marginTop: 0, color: "#eab308" }}>🏆 Leaderboard</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", margin: "14px 0" }}>
              See how you compare against top scholars and AP wizards on 5score!
            </p>
          </div>
          <button className="btn primary" style={{ width: "100%", background: "#eab308", hoverBackground: "#ca8a04", border: "none", color: "#0f172a", marginTop: "16px" }} onClick={onLeaderboard}>
            View Rankings
          </button>
        </div>

      </div>

      {/* MOTIVATIONAL / CONTINUE LEARNING CARD */}
      <div className="quizCard pop" style={{ background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(34, 197, 94, 0.15))", border: "1px solid rgba(255,255,255,0.1)", padding: "32px", textAlign: "center", marginBottom: "64px" }}>
        <h3 style={{ fontSize: "1.4rem", margin: "0 0 8px 0" }}>💡 Did You Know?</h3>
        <p style={{ color: "var(--text-main)", fontSize: "1.05rem", maxWidth: "600px", margin: "0 auto 20px" }}>
          "Consistent practice is the key to scoring a 5 on your AP Exams. Just 15 minutes of practice every day builds solid cognitive retention!"
        </p>
        <button className="btn primary" onClick={() => onStart(subjects[0] || "AP Biology", "mcq")}>
          ⚡ Fast Start: Practice {subjects[0] || "AP Biology"}
        </button>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "24px", textAlign: "center" }}>
        <button className="btn ghost" style={{ fontSize: "0.9rem", padding: "8px 16px" }} onClick={onTeam}>
          👥 Meet Our Team
        </button>
      </footer>

    </div>
  );
}
