import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function History() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedHistory = JSON.parse(
      localStorage.getItem("resumeHistory") || "[]"
    );

    setHistory(savedHistory);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("resumeHistory");
    setHistory([]);
  };

  return (
    <div className="result-container">
      <h1>Analysis History</h1>

      {history.length === 0 ? (
        <p>No previous analyses found.</p>
      ) : (
        <>
          {history.map((item) => (
            <div className="result-card" key={item.id}>
              <h3>{item.fileName}</h3>
              <p>Score: {item.score}%</p>
              <p>{item.date}</p>

              <button
                onClick={() =>
                  navigate("/results", { state: item })
                }
              >
                View Analysis
              </button>
            </div>
          ))}

          <button onClick={clearHistory}>
            Clear History
          </button>
        </>
      )}

      <button onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}

export default History;
