import "../App.css";

export default function Team({ onBack }) {
  return (
    <div className="page fadeIn">
      <div className="container" style={{ maxWidth: "800px" }}>
        <div className="topbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button className="navBtn" onClick={onBack}>
            ← Back Home
          </button>
          <div className="progressText" style={{ fontSize: "1.1rem", fontWeight: "bold" }}>About Us</div>
          <div style={{ width: "90px" }}></div>
        </div>

        <div className="quizCard pop" style={{ textAlign: "center", padding: "60px 40px", marginTop: "40px" }}>
          <h1 style={{ fontSize: "3rem", marginBottom: "24px", background: "linear-gradient(135deg, #60a5fa, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Meet Our Team</h1>
        </div>
      </div>
    </div>
  );
}
