import { Link } from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <div className="home">
      <nav className="navbar">
        <h2 className="logo">ResumeAI</h2>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <Link to="/upload" className="nav-btn">
            Get Started
          </Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <span className="tag">AI-Powered Resume Analyzer</span>

          <h1>
            Build a Resume That
            <span> Gets You Hired</span>
          </h1>

          <p>
            Analyze your resume with AI, discover missing skills,
            improve your content, and get ready for your dream job.
          </p>

          <div className="hero-buttons">
            <Link to="/upload" className="primary-btn">
              Analyze My Resume →
            </Link>

            <a href="#features" className="secondary-btn">
              Explore Features
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <h3>AI-Powered</h3>
              <p>Smart Analysis</p>
            </div>

            <div>
              <h3>ATS Ready</h3>
              <p>Keyword Insights</p>
            </div>

            <div>
              <h3>Instant</h3>
              <p>Feedback</p>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="resume-card">
            <div className="resume-header">
              <div className="avatar">JD</div>
              <div>
                <h3>John Doe</h3>
                <p>Software Developer</p>
              </div>
              <span className="check">✓</span>
            </div>

            <div className="resume-line long"></div>
            <div className="resume-line medium"></div>

            <h4>Skills Match</h4>

            <div className="progress-bg">
              <div className="progress-fill"></div>
            </div>

            <div className="score-row">
              <span>Resume Score</span>
              <strong>85/100</strong>
            </div>

            <div className="suggestion">
              <span>✦</span>
              <div>
                <strong>AI Suggestion</strong>
                <p>Add measurable achievements to improve your resume.</p>
              </div>
            </div>
          </div>

          <div className="floating-badge">
            ✨ Smart Resume Insights
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="section-heading">
          <span className="tag">WHAT YOU GET</span>
          <h2>Everything You Need to Stand Out</h2>
          <p>Improve your resume with intelligent insights.</p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">📄</div>
            <h3>Resume Analysis</h3>
            <p>
              Get detailed feedback on your resume's content,
              structure, and overall quality.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>ATS Score</h3>
            <p>
              Understand how well your resume matches a job
              description and its important keywords.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Improvement Tips</h3>
            <p>
              Discover missing skills and get actionable
              suggestions to make your resume stronger.
            </p>
          </div>
        </div>
      </section>

      <section className="how-it-works" id="how-it-works">
        <span className="tag">SIMPLE PROCESS</span>
        <h2>How It Works</h2>

        <div className="steps">
          <div>
            <span>01</span>
            <h3>Upload Resume</h3>
            <p>Upload your resume in PDF format.</p>
          </div>

          <div>
            <span>02</span>
            <h3>AI Analysis</h3>
            <p>Let AI review your resume and job match.</p>
          </div>

          <div>
            <span>03</span>
            <h3>Improve & Apply</h3>
            <p>Use the insights to prepare for your next opportunity.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <h3>ResumeAI</h3>
        <p>Make your next career move with confidence.</p>
        <p>© 2026 ResumeAI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
