import { useState } from "react";
import "../App.css";

export default function Auth({ onGoogle, onGuest }) {
  const [loading, setLoading] = useState(false);

  const handleGoogle = () => {
    setLoading(true);
    onGoogle();
  };

  return (
    <div className="authPage">

      <div className="authCard pop">

        <div className="logoBig">5score</div>

        <p className="tagline">
          AP Exam practice, Written by real AP students.
        </p>

        {loading ? (
          <div className="loadingState">
            <div className="spinner"></div>
            <p>Connecting to Google...</p>
          </div>
        ) : (
          <div className="authButtons">
            <button className="btn googleBtn authBtn" onClick={handleGoogle}>
              <span className="gIcon">G</span> Continue with Google
            </button>

            <button className="btn ghost authBtn" onClick={onGuest}>
              Continue as Guest
            </button>
          </div>
        )}

        <div className="smallText">
          No account required to start
        </div>

      </div>

    </div>
  );
}