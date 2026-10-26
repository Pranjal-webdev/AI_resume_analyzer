import { useState } from "react";
import "./UploadResume.css";
import { useNavigate } from "react-router-dom";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (selectedFile && selectedFile.type !== "application/pdf") {
      setError("Please select a PDF file.");
      setFile(null);
      e.target.value = "";
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("Resume must be smaller than 5 MB.");
      setFile(null);
      e.target.value = "";
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!file) {
      setError("Please upload your resume first.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please enter the job description.");
      return;
    }

    setLoading(true);

    try {

      const formData = new FormData();
      formData.append("resume", file);

      const uploadResponse = await fetch(
        "http://localhost:5000/api/resume/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(
          uploadData.message || "Resume upload failed."
        );
      }

      // Step 2: Send resume text to Gemini AI
      const analysisResponse = await fetch(
        "http://localhost:5000/api/resume/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resumeText: uploadData.text,
            jobDescription: jobDescription,
          }),
        }
      );

      const analysisData = await analysisResponse.json();

      if (!analysisResponse.ok) {
        throw new Error(
          analysisData.message || "Resume analysis failed."
        );
      }

      // Step 3: Open results page with actual AI results
      navigate("/results", {
        state: {
          resumeText: uploadData.text,
          fileName: uploadData.fileName,
          jobDescription: jobDescription,
          analysis: analysisData,
        },
      });
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the server. Check your backend."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
  return <AnalysisLoader />;
}

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
              disabled={loading}
            />
          </label>

          {file && (
            <button
              type="button"
              className="remove-file"
              onClick={() => setFile(null)}
              disabled={loading}
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
            disabled={loading}
          />
        </div>

        {error && <p className="upload-error">{error}</p>}

        <button
          type="submit"
          className="analyze-btn"
          disabled={loading}
        >
          {loading ? "Uploading Resume..." : "Analyze My Resume →"}
        </button>

        <p className="privacy-note">
          Your PDF is sent to your backend for text extraction.
        </p>
      </form>
    </div>
  );
}

export default UploadResume;
