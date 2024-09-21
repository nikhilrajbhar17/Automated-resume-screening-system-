import React, { useState } from "react";
import axios from "axios";

const FetchResumeScore = ({ token }) => {
  const [resumeScore, setResumeScore] = useState(null);
  const [message, setMessage] = useState("");
  console.log("toek at fronted " + token);
  const fetchResumeScore = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/result/score", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in headers
        },
      });
      setResumeScore(res.data.resumeScore);
      setMessage("Resume score fetched successfully.");
    } catch (error) {
      setMessage("Failed to fetch resume score.");
    }
  };

  return (
    <div>
      <h2>Resume Score</h2>
      <button onClick={fetchResumeScore}>Get Resume Score</button>
      {resumeScore !== null && <p>Resume Score: {resumeScore}</p>}
      <p>{message}</p>
    </div>
  );
};

export default FetchResumeScore;
