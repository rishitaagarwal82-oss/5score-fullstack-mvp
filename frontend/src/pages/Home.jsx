import "../App.css";

export default function Home({
  onStart,
  xp = 0,
  streak = 0,
  level = 1,
  onLogout
}) {
  const subjects = [
    "AP Biology",
    "AP Chemistry",
    "AP Calc",
    "AP Stats"
  ];

  return (
    <div className="homePage fadeIn">

      {/* HEADER HUD */}
      <div className="hudBar pop">

        <div className="hudItem">🔥 {streak}</div>
        <div className="hudItem">⭐ {xp} XP</div>
        <div className="hudItem">🧠 Lvl {level}</div>

        <button className="btn secondary" onClick={onLogout}>
          Exit
        </button>

      </div>

      {/* TITLE */}
      <div className="homeHeader">
        <h1 className="homeTitle">Learning Path</h1>
        <p className="homeSub">Pick a subject to continue</p>
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