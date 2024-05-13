import axios from "axios";
import { useEffect, useState } from "react";
import EmployeeDetails from "../components/Employee/EmployeeDetails";
import EmployeeRole from "../components/Employee/EmployeeRole";
import EmployeeTeamList from "../components/Employee/EmployeeTeamList";
import EmployeeGaurdIndicator from "../components/Employee/EmployeeGaurdIndicator";
import EmployeeDemandeList from "../components/Employee/EmployeeDemandeList";
import EmployeeRequestList from "../components/Employee/EmployeeRequestList";

function EmployeeProfile() {
  const [employeeData, setEmployeeData] = useState(null);
  useEffect(() => {
    const userString = localStorage.getItem("userInfo");
    const user = JSON.parse(userString);
      
    const fetchEmployeeData = async (job) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employee/${job}/getEmployeeById`, {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        });
        setEmployeeData(response.data.employeeData);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData(user.job);
  }, []);


  return (
    <div className="container-fluid">
      <div className=" container  mt-2">
        <div className="row">
          <div className="col-md-4 ">
          {employeeData ? ( <EmployeeDetails empDetails={employeeData } />) : ( <div></div>)}
          </div>
          <div className="col-md-4 ">
           {employeeData ? <EmployeeRole  empRole={employeeData }/> : ( <div></div>)} 
            <EmployeeTeamList />
          </div>
          <div className="col-md-4 ">
            <EmployeeGaurdIndicator />
            <EmployeeDemandeList />
            <EmployeeRequestList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProfile;
