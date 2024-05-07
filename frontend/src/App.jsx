import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import EmployeeManagement from "./pages/EmployeeManagement";
import EmployeeManagementHistory from "./pages/EmployeeManagementHistory";
import EmployeeRequestMangement from "./pages/EmployeeRequestMangement";
import EmployeeProfile from "./pages/EmployeeProfile";
import ServiceManagement from "./pages/ServiceManagement";
import ColumnCreation from "./components/HR/GuardTable/ColumnCreation";
import TableEntry from "./components/HR/GuardTable/TableEntry";
import TableView from "./components/HR/GuardTable/TableView";
import TableModify from "./components/HR/GuardTable/TableModify";
import VacationManagement from "./pages/VacationManagement";
import ServiceRosters from "./pages/ServiceRosters";
import ForgetPassword from "./pages/ForgetPassword";
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
             <Route
              path="/employees-management"
              element={<EmployeeManagement />}
            /> 
            <Route
              path="/employees-management-history"
              element={<EmployeeManagementHistory />}
            />
            <Route
              path="/employees-request-management"
              element={<EmployeeRequestMangement />}
            />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/my-profile" element={<EmployeeProfile />} />
            <Route path="/service-management" element={<ServiceManagement />} />
            <Route path="/hr" element={<ColumnCreation />} />
            <Route path="/hr/table-entry" element={<TableEntry />} />
            <Route path="/hr/table-view" element={<TableView />} />
            <Route path="/hr/table-modify/:serviceName" element={<TableModify />} />
            <Route path="/vacation-management" element={<VacationManagement />}/>
            <Route path="/service-rosters" element={<ServiceRosters />} />
          </Routes>
          <Footer />
          <ScrollToTopButton />
        </div>
      </Router>
    </>
  );
}

export default App;
