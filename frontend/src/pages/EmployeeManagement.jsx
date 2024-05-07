import { useState } from "react";
import EmployeeDetails from "../components/HR/EmployeeManagement/EmployeeDetails";
import EmployeesList from "../components/HR/EmployeeManagement/EmployeesList";
import FilderSideBar from "../components/FilderSideBar";


function EmployeeManagement() {
 
  const [employeeId, setEmployeeId] = useState(null);
  const [showFilterSidebar, setShowFilterSidebar] = useState(true);

  const hideEmployeeDetails = () => {
    if (employeeId) {
      setEmployeeId(null);
    }
  };
  const [searchTerm, setSearchTerm] = useState({
    job: "",
    service:"",
  });
  const handleFiltrer = (values) => {
    setSearchTerm(values);
  };

  const toggleFilterSidebar = () => {
    setShowFilterSidebar(!showFilterSidebar);
    setEmployeeId(null);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {employeeId ? (
          <>
            <div className="col-md-3">
              <EmployeeDetails
                empDetails={employeeId}
                onHide={() => setEmployeeId(null)}
              />
            </div>
            <div
              className={`col-md-${showFilterSidebar || employeeId ? 9 : 12}`}
              style={{ marginLeft: "-20px" }}
            >
              <button className="btn btn-light" onClick={toggleFilterSidebar}>
                {showFilterSidebar ? (
                  <i className="bi bi-layout-sidebar-inset"></i>
                ) : (
                  <i className="bi bi-layout-sidebar-inset-reverse "></i>
                )}
              </button>
              <EmployeesList
                setEmployeeId={setEmployeeId}
                filters={searchTerm}
                hideEmployeeDetails={hideEmployeeDetails}
              />
            </div>
          </>
        ) : (
          <>
            {showFilterSidebar && (
              <div className="col-md-3">
                <FilderSideBar onFilter={handleFiltrer} />
              </div>
            )}
            <div
              className={`col-md-${showFilterSidebar || employeeId ? 9 : 12}`}
              style={{ marginLeft: "-30px" }}
            >
              <button className="btn btn-light" onClick={toggleFilterSidebar}>
                {showFilterSidebar ? (
                  <i className="bi bi-layout-sidebar-inset"></i>
                ) : (
                  <i className="bi bi-layout-sidebar-inset-reverse "></i>
                )}
              </button>
              <EmployeesList
                setEmployeeId={setEmployeeId}
                filters={searchTerm}
                hideEmployeeDetails={hideEmployeeDetails}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EmployeeManagement;