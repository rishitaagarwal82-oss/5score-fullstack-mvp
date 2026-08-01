import "../App.css";

export default function Upgrades({ xp, onPurchase, onBack, purchased }) {
  const shopItems = [
    {
      id: "double_xp",
      name: "Double XP",
      description: "Earn 2x XP for every correct answer!",
      cost: 100,
      icon: "⚡"
    },
    {
      id: "streak_freeze",
      name: "Streak Freeze",
      description: "Protects your streak and shows a cool snowflake badge in your stats.",
      cost: 250,
      icon: "🧊"
    },
    {
      id: "pro_badge",
      name: "Pro Badge",
      description: "Get a premium 💎 Pro badge next to your name everywhere.",
      cost: 500,
      icon: "💎"
    },
    {
      id: "einstein_brain",
      name: "Einstein Brain",
      description: "Earn an extra +5 flat bonus XP on every correct answer!",
      cost: 300,
      icon: "🧠"
    },
    {
      id: "neon_glow",
      name: "Cyber Glow Theme",
      description: "Unlocks an incredible cybernetic neon theme with glowing borders and effects.",
      cost: 150,
      icon: "🌌"
    }
  ];

  return (
    <div className="homePage fadeIn">
      <div className="topbar">
        <button className="navBtn" onClick={onBack}>
          ← Back Home
        </button>
        <div className="hudItem">⭐ {xp} XP Available</div>
      </div>

      <div className="homeHeader">
        <h1 className="homeTitle">Upgrade Shop</h1>
        <p className="homeSub">Spend your hard-earned XP on powerful perks and custom styling</p>
      </div>

      <div className="homeGrid">
        {shopItems.map((item) => {
          const isOwned = purchased.includes(item.id);
          const canAfford = xp >= item.cost;

          return (
            <div key={item.id} className="homeCard pop" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div className="nodeRow">
                  <div className="node" style={{ background: isOwned ? "var(--secondary)" : "var(--success)" }}>
                    {item.icon}
                  </div>
                  <div className="subjectName">{item.name}</div>
                </div>
                <p style={{ color: "var(--text-muted)", marginBottom: "20px", fontSize: "0.95rem", lineHeight: "1.4" }}>
                  {item.description}
                </p>
              </div>
              <button
                className={`btn ${isOwned ? "secondary" : canAfford ? "success" : "ghost"} grow`}
                style={{ width: "100%", marginTop: "16px" }}
                disabled={isOwned || !canAfford}
                onClick={() => onPurchase(item)}
              >
                {isOwned ? "Owned" : `Buy for ${item.cost} XP`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
