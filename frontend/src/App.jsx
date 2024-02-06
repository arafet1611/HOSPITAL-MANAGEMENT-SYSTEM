import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import Home from "./pages/Home";
import Login from './pages/Login';
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import EmployeeManagement from "./pages/EmployeeManagement";
import EmployeeManagementHistory from "./pages/EmployeeManagementHistory";
import EmployeeRequestMangement from "./pages/EmployeeRequestMangement";
function App() {
  return (
    <>
      <Router>
        <div className="app">
          <Topbar />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/employees-management" element={<EmployeeManagement />} />
            <Route path="/employees-management-history" element={<EmployeeManagementHistory />} />
            <Route path="/employees-request-management" element={<EmployeeRequestMangement />} />
          </Routes>
          <Footer />
          <ScrollToTopButton />

        </div>
      </Router>
    </>
  );
}

export default App;
