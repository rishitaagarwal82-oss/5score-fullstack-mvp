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

      {/* TITLE */}
      <div className="homeHeader">
        <h1 className="homeTitle">
          Welcome back, {user?.name || "Scholar"}{user?.purchased?.includes("pro_badge") || user?.pro ? " 💎" : ""}
        </h1>
        <p className="homeSub">Ready to continue your {user?.provider === 'google' ? 'Google-synced ' : ''}learning path?</p>
      </div>

      {/* SUBJECT CARDS */}
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

    </div>
  );
}