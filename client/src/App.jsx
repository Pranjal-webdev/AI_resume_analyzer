import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import UploadResume from "./UploadResume";
import AnalysisResult from "./AnalysisResult";
import History from "./History";
import Login from "./Login";
import Register from "./Register";

function LoginPage() {
    const navigate = useNavigate();

    return (
        <Login
            onRegister={() => navigate("/register")}
        />
    );
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadResume />} />
        <Route path="/results" element={<AnalysisResult />} />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
