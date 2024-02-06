// import EmployeeModificationRequest from "../components/EmployeesMangement/EmployeeRequests/EmployeeModificationRequest";
 import EmployeeLeaveRequests from "../components/HR/EmployeeRequests/EmployeeLeaveRequests";
 import RequestsTabs from "../components/HR/EmployeeRequests/RequestsTabs";
function EmployeeRequestMangement() {
  return (
    <div className="container py-5">
      <RequestsTabs />
       {/* <EmployeeModificationRequest />  */}
       <EmployeeLeaveRequests /> 
    </div>
  )
}

export default EmployeeRequestMangement