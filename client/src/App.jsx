import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./Home";
import UploadResume from "./UploadResume";
import AnalysisResult from "./AnalysisResult";
import History from "./History";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

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
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
          <Route path="/upload" element={<UploadResume />} />
          <Route path="/results" element={<AnalysisResult />} />
          <Route path="/history" element={<History />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;
