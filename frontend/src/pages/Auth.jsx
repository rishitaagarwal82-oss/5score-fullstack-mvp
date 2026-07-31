import "../App.css";

export default function Auth({ onGuest }) {
  return (
    <div className="authPage">

      <div className="authCard pop">

        <div className="logoBig">5score</div>

        <p className="tagline">
          Learn faster. Compete smarter.
        </p>

        <div className="authButtons">
          <button className="btn primary authBtn" style={{ padding: '16px 32px', fontSize: '1.1rem' }} onClick={onGuest}>
            Start Learning →
          </button>
        </div>

        <div className="smallText">
          No account required to start
        </div>

      </div>

    </div>
  );
}