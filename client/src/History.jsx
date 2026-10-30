import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function History() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const savedHistory = JSON.parse(
      localStorage.getItem("resumeHistory") || "[]"
    );

    setHistory(savedHistory);
  }, []);

  const deleteAnalysis = (id) => {
    const updatedHistory = history.filter(
      (item) => item.id !== id
    );

    setHistory(updatedHistory);

    localStorage.setItem(
      "resumeHistory",
      JSON.stringify(updatedHistory)
    );
  };

  const clearHistory = () => {
    localStorage.removeItem("resumeHistory");
    setHistory([]);
  };

  const filteredHistory = history.filter((item) =>
    item.fileName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="result-container">
      <h1>Analysis History</h1>

      <input
        type="text"
        placeholder="Search resume by filename..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredHistory.length === 0 ? (
        <p>No matching analyses found.</p>
      ) : (
        filteredHistory.map((item) => (
          <div className="result-card" key={item.id}>
            <h3>{item.fileName}</h3>

            <p>Resume Score: {item.score}%</p>
            <p>{item.date}</p>

            <button
              onClick={() =>
                navigate("/results", { state: item })
              }
            >
              View Analysis
            </button>

            <button onClick={() => deleteAnalysis(item.id)}>
              Delete
            </button>
          </div>
        ))
      )}


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
