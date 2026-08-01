import "../App.css";

export default function Team({ onBack }) {
  return (
    <div className="page fadeIn">
      <div className="container" style={{ maxWidth: "600px" }}>
        <div className="topbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button className="navBtn" onClick={onBack}>
            ← Back Home
          </button>
          <div className="progressText" style={{ fontSize: "1.1rem", fontWeight: "bold" }}>About Us</div>
          <div style={{ width: "90px" }}></div>
        </div>

        <div className="quizCard pop" style={{ textAlign: "center", padding: "40px 24px", marginTop: "24px" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "16px", background: "linear-gradient(135deg, #60a5fa, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block" }}>
            Meet Our Team
          </h1>
        </div>
      </div>
    </div>
  );
}
