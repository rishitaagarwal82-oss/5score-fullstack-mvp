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
      description: "Keep your streak even if you miss a day.",
      cost: 250,
      icon: "🧊"
    },
    {
      id: "pro_badge",
      name: "Pro Badge",
      description: "A shiny badge next to your name.",
      cost: 500,
      icon: "💎"
    }
  ];

  return (
    <div className="homePage fadeIn">
      <div className="topbar">
        <button className="navBtn" onClick={onBack}>
          ← Back
        </button>
        <div className="hudItem">⭐ {xp} XP Available</div>
      </div>

      <div className="homeHeader">
        <h1 className="homeTitle">Upgrade Shop</h1>
        <p className="homeSub">Spend your hard-earned XP on powerful perks</p>
      </div>

      <div className="homeGrid">
        {shopItems.map((item) => {
          const isOwned = purchased.includes(item.id);
          const canAfford = xp >= item.cost;

          return (
            <div key={item.id} className="homeCard pop">
              <div className="nodeRow">
                <div className="node" style={{ background: "var(--success)" }}>
                  {item.icon}
                </div>
                <div className="subjectName">{item.name}</div>
              </div>
              <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
                {item.description}
              </p>
              <button
                className={`btn ${isOwned ? "secondary" : "success"} grow`}
                style={{ width: "100%" }}
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
