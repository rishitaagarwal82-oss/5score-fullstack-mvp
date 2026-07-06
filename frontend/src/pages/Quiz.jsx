import { useEffect, useState } from "react";
import "../App.css";
import { getQuestions, getFRQ } from "../api/quiz";

export default function Quiz({ subject, mode, onExit, onCorrect }) {
  const [questions, setQuestions] = useState(null);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [locked, setLocked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data =
          mode === "frq"
            ? await getFRQ(subject)
            : await getQuestions(subject);

        setQuestions(Array.isArray(data) ? data : []);
        setIndex(0);
        setScore(0);
        setSelected("");
        setLocked(false);
        setIsCorrect(null);
      } catch (err) {
        console.error(err);
        setQuestions([]);
      }
    }

    load();
  }, [subject, mode]);

  // =====================
  // LOADING
  // =====================
  if (questions === null) {
    return (
      <div className="loadingScreen">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // =====================
  // EMPTY STATE
  // =====================
  if (!questions.length) {
    return (
      <div className="emptyState">
        <h2>No questions found</h2>
        <button className="btn primary" onClick={onExit}>
          🏠 Back Home
        </button>
      </div>
    );
  }

  const q = questions[index];

  // =====================
  // SUBMIT
  // =====================
  function submit() {
    if (locked) return;

    const correct = selected === q.correct_answer;

    setIsCorrect(correct);
    setLocked(true);

    if (correct) {
      setScore((s) => s + 1);
      if (onCorrect) onCorrect();
    }
  }

  // =====================
  // NEXT
  // =====================
  function nextQuestion() {
    setIndex((i) => i + 1);
    setSelected("");
    setLocked(false);
    setIsCorrect(null);
  }

  // =====================
  // FINISH
  // =====================
  if (!q) {
    return (
      <div className="finishScreen fadeIn">
        <div className="finishCard pop">
          <h1>🎉 Completed</h1>

          <div className="finalScore">
            {score} / {questions.length}
          </div>

          <button className="btn success" onClick={onExit}>
            🏠 Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page fadeIn">
      <div className="container">

        {/* TOP BAR */}
        <div className="topbar">
          <button className="navBtn" onClick={onExit}>
            ← Home
          </button>

          <div className="progressText">
            {subject} • {mode.toUpperCase()}
          </div>

          <div className="scorePill">⭐ {score}</div>
        </div>

        {/* QUIZ CARD */}
        <div className="quizCard pop">

          <h2>{q.question}</h2>

          {/* MCQ */}
          {mode === "mcq" && (
            <div className="options">
              {["A", "B", "C", "D"].map((l) => (
                <button
                  key={l}
                  className={`optionBtn ${
                    selected === l ? "selected" : ""
                  } ${locked && q.correct_answer === l ? "correct" : ""}`}
                  onClick={() => !locked && setSelected(l)}
                >
                  {q["choice_" + l.toLowerCase()]}
                </button>
              ))}
            </div>
          )}

          {/* FRQ */}
          {mode === "frq" && (
            <textarea
              className="frqBox"
              placeholder="Type your answer..."
              onChange={(e) => setSelected(e.target.value)}
            />
          )}

          {/* SUBMIT / FEEDBACK */}
          {!locked ? (
            <button
              className="btn primary authBtn"
              style={{ width: '100%', marginTop: '24px' }}
              disabled={!selected}
              onClick={submit}
            >
              Submit →
            </button>
          ) : (
            <div className={`feedbackBox ${isCorrect ? "good" : "bad"}`}>

              <div className="resultText">
                {isCorrect ? "🎉 Correct!" : "❌ Incorrect"}
              </div>

              <div className="authButtons">
                <button className="btn primary authBtn" onClick={nextQuestion}>
                  Continue →
                </button>

                <button className="btn secondary authBtn" onClick={onExit}>
                  🏠 Home
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}