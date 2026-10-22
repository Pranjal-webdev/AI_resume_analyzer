import { useLocation, useNavigate } from "react-router-dom";
import "./AnalysisResult.css";

function AnalysisResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const { resumeText, fileName, jobDescription } = location.state || {};

  if (!resumeText) {
    return (
      <div className="result-container">
        <h2>No Resume Data Found</h2>
        <p>Please upload your resume first.</p>
        <button onClick={() => navigate("/upload")}>
          Upload Resume
        </button>
      </div>
    );
  }
  

  return (
    <div className="result-container">
      <h1>Resume Analysis</h1>

      <div className="result-card">
        <h2>Uploaded Resume</h2>
        <p>
          <strong>File Name:</strong> {fileName}
        </p>
      </div>

      <div className="result-card">
        <h2>Job Description</h2>
        <p>{jobDescription}</p>
      </div>

      <div className="result-card">
        <h2>Extracted Resume Text</h2>
        <div className="resume-text">
          {resumeText}
        </div>
      </div>

      <button onClick={() => navigate("/upload")}>
        Analyze Another Resume
      </button>
    </div>
  );
}

export default AnalysisResult;
