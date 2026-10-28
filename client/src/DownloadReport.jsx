
import jsPDF from "jspdf";

function DownloadReport({ analysis, fileName }) {
  const downloadReport = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(20);
    pdf.text("AI Resume Analysis Report", 20, 20);

    pdf.setFontSize(12);
    pdf.text(`Resume: ${fileName || "Resume"}`, 20, 35);
    pdf.text(`Resume Score: ${analysis.score}/100`, 20, 45);

    let y = 60;

    pdf.setFontSize(14);
    pdf.text("Matched Skills", 20, y);
    y += 10;

    pdf.setFontSize(11);

    (analysis.matchedSkills || []).forEach((skill) => {
      if (y > 270) {
        pdf.addPage();
        y = 20;
      }

      pdf.text(`- ${skill}`, 25, y);
      y += 7;
    });

    y += 8;
    pdf.setFontSize(14);
    pdf.text("Missing Skills", 20, y);
    y += 10;

    pdf.setFontSize(11);

    (analysis.missingSkills || []).forEach((skill) => {
      if (y > 270) {
        pdf.addPage();
        y = 20;
      }

      pdf.text(`- ${skill}`, 25, y);
      y += 7;
    });

    y += 8;
    pdf.setFontSize(14);
    pdf.text("Suggestions", 20, y);
    y += 10;

    pdf.setFontSize(11);

    (analysis.suggestions || []).forEach((suggestion, index) => {
      const lines = pdf.splitTextToSize(
        `${index + 1}. ${suggestion}`,
        165
      );

      if (y + lines.length * 7 > 280) {
        pdf.addPage();
        y = 20;
      }

      pdf.text(lines, 20, y);
      y += lines.length * 7 + 4;
    });

    pdf.save("resume-analysis-report.pdf");
  };

  return (
    <button
      className="download-report-btn"
      onClick={downloadReport}
    >
      Download PDF Report
    </button>
  );
}

export default DownloadReport;
