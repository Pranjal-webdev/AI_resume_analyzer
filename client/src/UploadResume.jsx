import { useState } from "react";
import "./UploadResume.css";
import { useNavigate } from "react-router-dom";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      e.target.value = "";
      return;
    }

    setFile(selectedFile || null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload your resume first.");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please enter the job description.");
      return;
    }

    navigate("/results");
  };

  return (
    <div className="upload-page">
      <div className="upload-heading">
        <span className="upload-tag">AI RESUME ANALYZER</span>
        <h1>Analyze Your Resume</h1>
        <p>
          Upload your resume and add a job description to discover
          how well your profile matches your dream job.
        </p>
      </div>

      <form className="upload-form" onSubmit={handleSubmit}>
        <div className="upload-section">
          <h2>Upload Your Resume</h2>
          <p>Choose your resume in PDF format (maximum 5 MB).</p>

          <label className="drop-area">
            <div className="upload-icon">↑</div>

            <h3>
              {file ? file.name : "Choose your resume"}
            </h3>

            <p>
              {file
                ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                : "Click here to browse PDF files"}
            </p>

            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
            />
          </label>

          {file && (
            <button
              type="button"
              className="remove-file"
              onClick={() => setFile(null)}
            >
              Remove file
            </button>
          )}
        </div>

        <div className="job-section">
          <label htmlFor="jobDescription">
            Job Description
          </label>

          <p>
            Paste the job description you want your resume
            to be compared against.
          </p>

          <textarea
            id="jobDescription"
            placeholder="Example: We are looking for a React developer with JavaScript, HTML, CSS, REST API and Git experience..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={7}
          />
        </div>

        <button type="submit" className="analyze-btn">
          Analyze My Resume →
        </button>

        <p className="privacy-note">
          🔒 Your resume is used for analysis once the backend is connected.
        </p>
      </form>
    </div>
  );
}

export default UploadResume;
