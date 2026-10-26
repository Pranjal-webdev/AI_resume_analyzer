import "./AnalysisLoader.css";

function AnalysisLoader() {
    
  return (

    <div className="analysis-loader">
      <div className="loader-spinner"></div>

      <h2>Analyzing Your Resume</h2>

      <p>
        Our AI is comparing your resume with the job description.
      </p>

      <div className="analysis-steps">
        <div className="analysis-step">
          <span className="step-dot"></span>
          Extracting resume details
        </div>

        <div className="analysis-step">
          <span className="step-dot"></span>
          Matching skills with job requirements
        </div>

        <div className="analysis-step">
          <span className="step-dot"></span>
          Preparing improvement suggestions
        </div>
      </div>

      <p className="loader-note">
        This may take a few seconds. Please don't refresh the page.
      </p>
    </div>
  );
}

export default AnalysisLoader;
