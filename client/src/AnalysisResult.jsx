import { useLocation, useNavigate } from "react-router-dom";
import "./AnalysisResult.css";
import DownloadReport from "./DownloadReport";
import ScoreBreakdown from "./ScoreBreakdown";

function AnalysisResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const { resumeText, fileName, jobDescription, analysis } = location.state || {};

  if (!analysis) {
    return (
      <div className="result-container">
        <h2>No Analysis Found</h2>
        <p>Please upload your resume and analyze it first.</p>

        <button onClick={() => navigate("/upload")}>
          Upload Resume
        </button>
      </div>
    );
  }

  const {
    score,
    matchedSkills = [],
    missingSkills = [],
    suggestions = [],
  } = analysis;

  return (
    <div className="result-container">
      <h1>Resume Analysis Results</h1>

      <p className="result-file">
        Analyzed file: <strong>{fileName}</strong>
      </p>

      <div className="result-card score-card">
        <h2>Resume Match Score</h2>

        <div className="score-circle">
          <span>{score}%</span>
        </div>

        <p>
          Your resume matches approximately {score}% of the job
          requirements.
        </p>
      </div>

      <div className="result-card">
        <h2>Matched Skills</h2>

        {matchedSkills.length > 0 ? (
          <div className="skills-list">
            {matchedSkills.map((skill, index) => (
              <span className="skill-tag matched" key={index}>
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p>No matched skills were identified.</p>
        )}
      </div>

      <ScoreBreakdown analysis={analysis} />

      <div className="result-card">
        <h2>Missing Skills</h2>

        {missingSkills.length > 0 ? (
          <div className="skills-list">
            {missingSkills.map((skill, index) => (
              <span className="skill-tag missing" key={index}>
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p>No missing skills were identified.</p>
        )}
      </div>

      <div className="result-card">
        <h2>Improvement Suggestions</h2>

        {suggestions.length > 0 ? (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        ) : (
          <p>No suggestions available.</p>
        )}
      </div>

      <details className="result-card">
        <summary>View Extracted Resume Text</summary>
        <div className="resume-text">
          {resumeText}
        </div>
      </details>

      <details className="result-card">
        <summary>View Job Description</summary>
        <p>{jobDescription}</p>
      </details>

      <DownloadReport
        analysis={analysis}
        fileName={fileName}
      />

      <button onClick={() => navigate("/upload")}>
        Analyze Another Resume
      </button>
    </div>
  );
}

export default AnalysisResult;
