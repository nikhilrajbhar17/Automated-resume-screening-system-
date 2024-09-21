import React, { useState } from "react";
import Auth from "./components/auth";
import { Buffer } from "buffer";
import process from "process";

import ResumeUpload from "./components/ResumeUpload";
import FetchResumeScore from "./components/FetchResumeScore";
window.Buffer = Buffer;
window.process = process;
function App() {
  const [token, setToken] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);

  return (
    <div className="App">
      {!token ? (
        <Auth setToken={setToken} />
      ) : (
        <>
          <ResumeUpload token={token} setAnalysisResult={setAnalysisResult} />
          <FetchResumeScore token={token}></FetchResumeScore>
        </>
      )}
    </div>
  );
}

export default App;
