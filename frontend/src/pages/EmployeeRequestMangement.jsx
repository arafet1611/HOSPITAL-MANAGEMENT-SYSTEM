import EmployeeLeaveFilters from "../components/HR/EmployeeRequests/EmployeeLeaveFilters";
import EmployeeLeaveRequests from "../components/HR/EmployeeRequests/EmployeeLeaveRequests";
import RequestsTabs from "../components/HR/EmployeeRequests/RequestsTabs";
import EmployeePermutationRequests from "../components/HR/EmployeeRequests/EmployeePermutationRequests";
import { useState } from "react";

function EmployeeRequestManagement() {
  const [selectedTab, setSelectedTab] = useState("leaveRequests");
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
      <RequestsTabs setSelectedTab={setSelectedTab} />
      <EmployeeLeaveFilters onFilter={handleFilter} />
      {selectedTab === "leaveRequests" ? (
        <EmployeeLeaveRequests filters={filterValues} />
      ) : selectedTab === "permutationRequests" ? (
        <EmployeePermutationRequests filters={filterValues} />
      ) : null}
    </div>
  );
}

export default EmployeeRequestManagement;
