import { useEffect, useState } from "react";
import API from "../api/api";
import "../App.css";

export default function Auth({ onAuthSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const GOOGLE_CLIENT_ID = "651804252340-rmhgrbc1apu1v560mrq4fuqvi288gdv0.apps.googleusercontent.com";

  useEffect(() => {
    // If Google GIS client is already available, render directly
    if (window.google?.accounts?.id) {
      renderGoogleButton();
      return;
    }

    // Load Google GIS Client script dynamically
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      renderGoogleButton();
    };
    script.onerror = () => {
      setError("Failed to load Google Sign-In SDK. Please reload the page.");
    };
    document.head.appendChild(script);

    return () => {
      // Keep script loaded to avoid hot-reload issues in development
    };
  }, []);

  const renderGoogleButton = () => {
    try {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleCredentialResponse,
          auto_select: false,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("google-signin-btn"),
          {
            theme: "filled_blue",
            size: "large",
            shape: "pill",
            width: 280,
            text: "continue_with",
          }
        );
      }
    } catch (err) {
      console.error("Error rendering Google login button:", err);
    }
  };

  const handleGoogleCredentialResponse = async (response) => {
    setLoading(true);
    setError("");
    try {
      const res = await API.post("/auth/google", {
        id_token: response.credential,
      });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      onAuthSuccess(user, token);
    } catch (err) {
      console.error("Backend Google verification error:", err);
      setError(
        err.response?.data?.detail || "Google authentication failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.post("/auth/guest");
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      onAuthSuccess(user, token);
    } catch (err) {
      console.error("Backend Guest login error:", err);
      setError("Could not launch Guest mode. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authPage">
      <div className="authCard pop">
        <div className="logoBig">5score</div>
        <p className="tagline">Learn faster. Compete smarter.</p>

        {error && <div className="authError">{error}</div>}

        <div className="authButtons" style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px" }}>
              <div className="spinner"></div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "10px" }}>Authenticating securely...</p>
            </div>
          ) : (
            <>
              {/* Google Button Container */}
              <div id="google-signin-btn" style={{ minHeight: "50px" }}></div>

              <div className="dividerRow" style={{ display: "flex", alignItems: "center", width: "100%", margin: "10px 0", color: "var(--text-muted)", gap: "10px" }}>
                <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }}></div>
                <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px" }}>or</span>
                <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }}></div>
              </div>

              {/* Guest Button */}
              <button
                className="btn primary authBtn"
                style={{
                  width: "280px",
                  borderRadius: "50px",
                  fontSize: "1rem",
                  padding: "12px 24px",
                  display: "flex",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, var(--primary), #1e40af)"
                }}
                onClick={handleGuestLogin}
              >
                Start Learning as Guest →
              </button>
            </>
          )}
        </div>

        <div className="smallText">
          Unlock achievements, ranks, and permanent storage by signing in.
        </div>
      </div>
    </div>
  );
}
