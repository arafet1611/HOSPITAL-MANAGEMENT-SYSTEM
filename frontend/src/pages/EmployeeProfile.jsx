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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userString = localStorage.getItem("userInfo");
    const parsedUser = JSON.parse(userString);
    setUser(parsedUser);

    if (parsedUser) {
      const fetchEmployeeData = async (job) => {
        try {
          const response = await axios.get(`http://localhost:5000/api/employee/${job}/getEmployeeById`, {
            headers: {
              authorization: `Bearer ${parsedUser.token}`,
            },
          });
          setEmployeeData(response.data.employeeData);
        } catch (error) {
          console.error("Error fetching employee data:", error);
        }
      };

      fetchEmployeeData(parsedUser.job);
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const isDoctor = user.job === "doctor";
  const columnClass = `col-md-${isDoctor ? 4 : 8}`;

  return (
    <div className="container-fluid">
      <div className="container mt-2">
        <div className="row">
          <div className={columnClass}>
            {employeeData ? <EmployeeDetails empDetails={employeeData} /> : <div>Loading...</div>}
          </div>
          <div className={columnClass}>
            {employeeData ? <EmployeeRole empRole={employeeData} /> : <div>Loading...</div>}
            <EmployeeTeamList />
          </div>
          {isDoctor && (
            <div className="col-md-4">
              <EmployeeGaurdIndicator />
              <EmployeeDemandeList />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeProfile;