import React from "react";

const Dashboard = ({ analysisResult }) => {
  return (
    <div>
      <h2>Resume Analysis Result</h2>
      {analysisResult ? (
        <div>
          <p>
            <strong>Analysis Score:</strong> {analysisResult.score}
          </p>
          <p>
            <strong>Feedback:</strong> {analysisResult.feedback}
          </p>
        </div>
      ) : (
        <p>No analysis data available yet.</p>
      )}
    </div>
  );
};

export default Dashboard;
