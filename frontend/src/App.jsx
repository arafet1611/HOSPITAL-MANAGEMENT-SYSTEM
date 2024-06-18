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
import PrimeAmountListing from "./components/HR/PrimeManagement/PrimeAmountListing";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import TableModelList from "./components/Secretary/GuardTable/TableModelList";
import EmployeeGaurdTable from "./components/Employee/EmployeeGaurdTable";
import EmployeeDemandeTable from "./components/Employee/EmployeeDemandeTable";
import PrivateRoute from "./PrivateRoute"; // Import the PrivateRoute component
import PublicRoute from "./PublicRoute";
function App() {
  return (
    <>
      <Router>
        <div className="app">
          <Topbar />
          <Navbar />
          <Sidebar />
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Home />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/forget-password"
              element={
                <PublicRoute>
                  <ForgetPassword />
                </PublicRoute>
              }
            />
            <Route path="/my-profile" element={<EmployeeProfile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route
              path="/employee/table-view"
              element={<EmployeeGaurdTable />}
            />
            <Route
              path="/employee/demande-list"
              element={<EmployeeDemandeTable />}
            />

            <Route
              path="/hr/dashboard"
              element={
                <PrivateRoute allowedRoles={["hr"]}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/secretary/dashboard"
              element={
                <PrivateRoute allowedRoles={["secretary"]}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/employee/dashboard"
              element={
                <PrivateRoute allowedRoles={["doctor"]}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/hr/employees-management"
              element={
                <PrivateRoute allowedRoles={["hr"]}>
                  <EmployeeManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/hr/employees-management-history"
              element={
                <PrivateRoute allowedRoles={["hr"]}>
                  <EmployeeManagementHistory />
                </PrivateRoute>
              }
            />
            <Route
              path="/hr/employees-request-management"
              element={
                <PrivateRoute allowedRoles={["hr"]}>
                  <EmployeeRequestMangement />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/service-management"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <ServiceManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/secretary/model-creation"
              element={
                <PrivateRoute allowedRoles={["secretary"]}>
                  <ColumnCreation />
                </PrivateRoute>
              }
            />
            <Route
              path="/secretary/table-entry"
              element={
                <PrivateRoute allowedRoles={["secretary"]}>
                  <TableEntry />
                </PrivateRoute>
              }
            />
            <Route
              path="/secretary/table-view"
              element={
                <PrivateRoute allowedRoles={["secretary"]}>
                  <TableView />
                </PrivateRoute>
              }
            />
            <Route
              path="/secretary/table-modify"
              element={
                <PrivateRoute allowedRoles={["secretary"]}>
                  <TableModify />
                </PrivateRoute>
              }
            />
            <Route
              path="/secretary/table-model-list"
              element={
                <PrivateRoute allowedRoles={["secretary"]}>
                  <TableModelList />
                </PrivateRoute>
              }
            />
            <Route
              path="/hr/vacation-management"
              element={
                <PrivateRoute allowedRoles={["hr"]}>
                  <VacationManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/hr/service-rosters"
              element={
                <PrivateRoute allowedRoles={["hr"]}>
                  <ServiceRosters />
                </PrivateRoute>
              }
            />
            <Route
              path="/hr/prime-management"
              element={
                <PrivateRoute allowedRoles={["hr"]}>
                  <PrimeManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/hr/prime-management/prime-list"
              element={
                <PrivateRoute allowedRoles={["hr"]}>
                  <PrimeAmountListing />
                </PrivateRoute>
              }
            />
          </Routes>
          <Footer />
          <ScrollToTopButton />
        </div>
      </Router>
    </>
  );
}

export default App;
