
function ShareReport({ analysis, fileName }) {
  const shareReport = async () => {
    const shareText = `
AI Resume Analysis Report

Resume: ${fileName || "Resume"}
Match Score: ${analysis.score}%

Matched Skills:
${(analysis.matchedSkills || []).join(", ")}

Missing Skills:
${(analysis.missingSkills || []).join(", ")}

Suggestions:
${(analysis.suggestions || []).join("\n")}
    `;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Resume Analysis Report",
          text: shareText,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        alert("Report copied to clipboard!");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        alert("Unable to share report.");
      }
    }
  };

  return (
    <button
      className="share-report-btn"
      onClick={shareReport}
    >
      Share Analysis
    </button>
  );
}

export default ShareReport;
