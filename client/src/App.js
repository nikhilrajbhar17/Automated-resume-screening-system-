import React, { useState, useEffect } from "react";
import Auth from "./components/auth";
import { Buffer } from "buffer";
import process from "process";

import ResumeUpload from "./components/ResumeUpload";
import FetchResumeScore from "./components/FetchResumeScore";

window.Buffer = Buffer;
window.process = process;

function getTokenFromCookies() {
  const name = "token=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}

function App() {
  const [token, setToken] = useState(getTokenFromCookies() || "");
  const [analysisResult, setAnalysisResult] = useState(null);

  useEffect(() => {
    // Check for token in cookies on page load or token change
    const cookieToken = getTokenFromCookies();
    if (!cookieToken) {
      setToken(""); // Clear token if it doesn't exist in cookies
    }
  }, [token]);

  return (
    <div className="App">
      {!token ? (
        <Auth setToken={setToken} />
      ) : (
        <>
          <ResumeUpload token={token} setAnalysisResult={setAnalysisResult} />
          <FetchResumeScore token={token} />
        </>
      )}
    </div>
  );
}

export default App;
