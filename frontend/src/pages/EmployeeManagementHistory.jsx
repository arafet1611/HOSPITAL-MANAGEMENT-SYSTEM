import { useState } from "react";
import EmployeeChangeLog from "../components/HR/EmployeeManagementHistory/EmployeeChangeLog";
import EmployeeLogSearch from "../components/HR/EmployeeManagementHistory/EmployeeLogSearch";
import EmployeeUpdateLog from "../components/HR/EmployeeManagementHistory/EmployeeUpdateLog";

function EmployeeManagementHistory() {
  const [searchTerm, setSearchTerm] = useState({
    employeeName: "",
    startDate: null,
    endDate: null,
  });
  const handleFiltrer = (values) => {
    setSearchTerm(values);
  };

  return (
    <div className="container-fluid bg-light">
      <div className=" container bg-light pt-5 mt-5">
        <div className="row">
          <div className="col-md-7 ">
            <EmployeeLogSearch onFilter={handleFiltrer} />
             <EmployeeUpdateLog filters={searchTerm} /> 
          </div>
          <div className="col-md-5">
            <EmployeeChangeLog filters ={searchTerm}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeManagementHistory;