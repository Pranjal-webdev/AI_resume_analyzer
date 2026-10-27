import "./ScoreBreakdown.css";

function ScoreBreakdown({ analysis }) {
  if (!analysis) {
    return null;
  }

  const score = Math.min(
    100,
    Math.max(0, Number(analysis.score) || 0)
  );

  const matchedSkills = Array.isArray(analysis.matchedSkills)
    ? analysis.matchedSkills
    : [];

  const missingSkills = Array.isArray(analysis.missingSkills)
    ? analysis.missingSkills
    : [];

  const suggestions = Array.isArray(analysis.suggestions)
    ? analysis.suggestions
    : [];

  const totalSkills = matchedSkills.length + missingSkills.length;

  const matchPercentage =
    totalSkills > 0
      ? Math.round((matchedSkills.length / totalSkills) * 100)
      : 0;

  return (
    <section className="score-breakdown">
      <h2>Score Breakdown</h2>
      <p className="breakdown-subtitle">
        See how your resume compares with the job requirements.
      </p>

      <div className="breakdown-grid">
        <div className="breakdown-card">
          <h3>Overall Match</h3>
          <div className="breakdown-value">{score}%</div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${score}%` }}
            ></div>
          </div>
        </div>

        <div className="breakdown-card">
          <h3>Matched Skills</h3>
          <div className="breakdown-value">
            {matchedSkills.length}
          </div>
          <p>Skills identified in your resume</p>
        </div>

        <div className="breakdown-card">
          <h3>Missing Skills</h3>
          <div className="breakdown-value">
            {missingSkills.length}
          </div>
          <p>Skills to review for this role</p>
        </div>

        <div className="breakdown-card">
          <h3>Skill Match Ratio</h3>
          <div className="breakdown-value">
            {matchPercentage}%
          </div>
          <p>Based on skills identified by the AI</p>
        </div>
      </div>

      <div className="breakdown-card breakdown-list">
        <h3>Skills to Improve</h3>

        {missingSkills.length > 0 ? (
          <ul>
            {missingSkills.map((skill, index) => (
              <li key={`${skill}-${index}`}>{skill}</li>
            ))}
          </ul>
        ) : (
          <p>No missing skills were identified.</p>
        )}
      </div>

      <div className="breakdown-card breakdown-list">
        <h3>Recommended Actions</h3>

        {suggestions.length > 0 ? (
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        ) : (
          <p>No recommendations are available.</p>
        )}
      </div>
    </section>
  );
}

export default ScoreBreakdown;
