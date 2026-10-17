import "./AnalysisResult.css";

function AnalysisResult() {
  const matchedSkills = [
    "JavaScript",
    "React",
    "HTML",
    "CSS",
    "Git",
  ];

  const missingSkills = [
    "TypeScript",
    "Testing",
    "Next.js",
  ];

  const suggestions = [
    "Add measurable achievements to your work experience.",
    "Include keywords from the job description in your resume.",
    "Highlight your projects and the technologies you used.",
  ];

  return (
    <div className="result-page">
      <div className="result-heading">
        <span className="result-tag">AI RESUME ANALYZER</span>
        <h1>Your Resume Analysis</h1>
        <p>
          Review your resume score, skills match, and
          suggestions to improve your profile.
        </p>
      </div>

      <div className="result-container">
        <div className="score-card">
          <div className="score-circle">
            <div>
              <h2>85</h2>
              <span>/100</span>
            </div>
          </div>

          <h3>Good Resume Score!</h3>
          <p>
            Your resume has a good foundation.
            A few improvements can make it stronger.
          </p>
        </div>

        <div className="result-card">
          <h2>Skills Analysis</h2>
          <p className="result-description">
            Skills identified in your resume and
            skills you may need to add.
          </p>

          <div className="skills-section">
            <h3>✓ Matched Skills</h3>

            <div className="skill-list">
              {matchedSkills.map((skill) => (
                <span className="matched-skill" key={skill}>
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="skills-section">
            <h3>＋ Skills to Improve</h3>

            <div className="skill-list">
              {missingSkills.map((skill) => (
                <span className="missing-skill" key={skill}>
                  + {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="result-card suggestions-card">
          <h2>AI Improvement Suggestions</h2>
          <p className="result-description">
            Follow these suggestions to improve your resume.
          </p>

          <div className="suggestion-list">
            {suggestions.map((suggestion, index) => (
              <div className="suggestion-item" key={suggestion}>
                <span className="suggestion-number">
                  {index + 1}
                </span>

                <p>{suggestion}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="result-actions">
          <button
            className="back-btn"
            onClick={() => window.history.back()}
          >
            ← Back
          </button>

          <button
            className="download-btn"
            onClick={() => window.print()}
          >
            Print Report ↓
          </button>
        </div>
      </div>

      <p className="demo-note">
        Demo report — scores and suggestions are sample data.
      </p>
    </div>
  );
}

export default AnalysisResult;
