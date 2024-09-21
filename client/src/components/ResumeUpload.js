import React, { useState } from "react";
import axios from "axios";

const ResumeUpload = ({ token, setAnalysisResult }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  console.log("toek " + token);
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Resume uploaded successfully");
      setAnalysisResult(res.data.analysis);
    } catch (err) {
      setMessage("Upload failed");
    }
  };

  return (
    <div>
      <h2>Upload Resume</h2>
      <input
        type="file"
        name="resume"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload} disabled={!file}>
        Upload
      </button>
      <p>{message}</p>
    </div>
  );
};

export default ResumeUpload;
