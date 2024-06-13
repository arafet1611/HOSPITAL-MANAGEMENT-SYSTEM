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
import ColumnCreation from "./components/Secretary/GuardTable/ColumnCreation";
import TableEntry from "./components/Secretary/GuardTable/TableEntry";
import TableView from "./components/Secretary/GuardTable/TableView";
import TableModify from "./components/Secretary/GuardTable/TableModify";
import VacationManagement from "./pages/VacationManagement";
import ServiceRosters from "./pages/ServiceRosters";
import ForgetPassword from "./pages/ForgetPassword";
import Notifications from "./pages/Notifications";
import PrimeManagement from "./pages/PrimeManagement";
import PrimeAmountListing from "./components/HR/PrimeManagement/PrimeAmountListing" ;
import Sidebar from "./components/Sidebar";
import Dashboard from './pages/Dashboard';
import TableModelList from "./components/Secretary/GuardTable/TableModelList";
function App() {
  return (
    <>
      <Router>
        <div className="app">
          <Topbar />
          <Navbar />
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hr/dashboard" element={<Dashboard />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/secretary/dashboard" element={<Dashboard />} />
            <Route path="/employee/dashboard" element={<Dashboard />} />

            <Route path="/login" element={<Login />} />
             <Route
              path="/hr/employees-management"
              element={<EmployeeManagement />}
            /> 
            <Route
              path="/hr/employees-management-history"
              element={<EmployeeManagementHistory />}
            />
            <Route
              path="/hr/employees-request-management"
              element={<EmployeeRequestMangement />}
            />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/my-profile" element={<EmployeeProfile />} />
            <Route path="/admin/service-management" element={<ServiceManagement />} />
            <Route path="/secretary/model-creation/" element={<ColumnCreation />} />
            <Route path="/secretary/table-entry/:serviceName" element={<TableEntry />} />
            <Route path="/secretary/table-view" element={<TableView />} />
            <Route path="/secretary/table-modify/:serviceName" element={<TableModify />} />
            <Route path="/secretary/table-model-list" element={<TableModelList />} />
            <Route path="/admin/vacation-management" element={<VacationManagement />}/>
            <Route path="/hr/service-rosters" element={<ServiceRosters />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/hr/prime-management" element={<PrimeManagement />} />
            <Route path="/hr/prime-management/prime-list" element={<PrimeAmountListing />} />
          </Routes>
          <Footer />
          <ScrollToTopButton />
        </div>
      </Router>
    </>
  );
}

export default App;
