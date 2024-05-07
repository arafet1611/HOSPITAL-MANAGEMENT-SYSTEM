// import EmployeeModificationRequest from "../components/EmployeesMangement/EmployeeRequests/EmployeeModificationRequest";
import EmployeeLeaveFilters from "../components/HR/EmployeeRequests/EmployeeLeaveFilters";
import EmployeeLeaveRequests from "../components/HR/EmployeeRequests/EmployeeLeaveRequests";
import RequestsTabs from "../components/HR/EmployeeRequests/RequestsTabs";
import  { useState } from "react";
function EmployeeRequestMangement() {
  const [filterValues, setFilterValues] = useState({
    service: "",
    fromDate: "",
    toDate: "",
  });
  const handleFilter = (values) => {
    
    setFilterValues(values);
  };

  return (
    <div className="container py-5">
      <RequestsTabs />
      {/* <EmployeeModificationRequest />  */}
      <EmployeeLeaveFilters onFilter={handleFilter}/>
      <EmployeeLeaveRequests filters={filterValues}/>
    </div>
  );
}

export default EmployeeRequestMangement;