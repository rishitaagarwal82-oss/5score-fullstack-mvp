import "../App.css";

export default function Leaderboard({ onBack }) {
  const leaders = [
    { name: "AlphaScholar", xp: 1250, level: 25, badge: "💎" },
    { name: "AP_Overlord", xp: 980, level: 20, badge: "💎" },
    { name: "Newtonian", xp: 750, level: 15, badge: "" },
    { name: "BioGenius", xp: 520, level: 11, badge: "" },
    { name: "CalcWizard", xp: 480, level: 10, badge: "" },
  ];

  return (
    <div className="page fadeIn">
      <div className="container" style={{ maxWidth: "600px" }}>
        <div className="topbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button className="navBtn" onClick={onBack}>
            ← Back Home
          </button>
          <div className="progressText" style={{ fontSize: "1.1rem", fontWeight: "bold" }}>Leaderboard</div>
          <div style={{ width: "90px" }}></div>
        </div>

        <div className="quizCard pop" style={{ marginTop: "40px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "32px", fontSize: "1.8rem" }}>🏆 Top Scholars</h2>
          <div className="leaderboardList" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {leaders.map((leader, i) => (
              <div key={leader.name} className="leaderRow" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "rgba(255, 255, 255, 0.03)", borderRadius: "14px", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div className="leaderRank" style={{ width: "32px", height: "32px", background: i === 0 ? "gold" : i === 1 ? "silver" : i === 2 ? "#cd7f32" : "rgba(255,255,255,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyCentent: "center", justifyContent: "center", fontWeight: "bold", color: i < 3 ? "#0f172a" : "white" }}>
                    {i + 1}
                  </div>
                  <div className="leaderName" style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                    {leader.name} {leader.badge}
                  </div>
                </div>
                <div className="leaderXP" style={{ color: "var(--text-muted)", fontWeight: "500" }}>
                  {leader.xp} XP (Lvl {leader.level})
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
