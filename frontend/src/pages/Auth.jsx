import "../App.css";

export default function Auth({ onContinue }) {
  return (
    <div className="authPage">

      <div className="authCard pop">

        <div className="logoBig">🎓 5score</div>

        <p className="tagline">
          Learn faster. Compete smarter.
        </p>

        <div className="authButtons">

          <button className="btn primary authBtn" onClick={onContinue}>
            Continue with Google
          </button>

          <button className="btn ghost authBtn" onClick={onContinue}>
            Continue as Guest
          </button>

        </div>

        <div className="smallText">
          No account required to start
        </div>

      </div>

    </div>
  );
}