import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import UploadResume from "./UploadResume";
import AnalysisResult from "./AnalysisResult";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadResume />} />
        <Route path="/results" element={<AnalysisResult />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
