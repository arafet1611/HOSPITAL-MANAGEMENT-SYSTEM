import EmployeeDemandeList from "../components/Employee/EmployeeDemandeList";
import EmployeeDetails from "../components/Employee/EmployeeDetails";
import EmployeeGaurdIndicator from "../components/Employee/EmployeeGaurdIndicator";
import EmployeeRequestList from "../components/Employee/EmployeeRequestList";
import EmployeeRole from "../components/Employee/EmployeeRole";
import EmployeeTeamList from "../components/Employee/EmployeeTeamList";
import maleDoctor from "../assets/img/maleDoctor.png";
function EmployeeProfile() {
  const dummyEmployee = {
    _id: "1",
    image: maleDoctor,
    firstname: "Amal",
    lastname: "Belhadj",
    sex: "Female",
    email: "amalbelhadj@example.com",
    phone: "123-456-7890",
    service: "Cardiologue",
    dateofjoining: "2022-01-01",
    active: false,
  };
  return (
    <div className="container-fluid">
      <div className=" container  mt-2">
        <div className="row">
          <div className="col-md-4 ">
            <EmployeeDetails empDetails={dummyEmployee} />
          </div>
          <div className="col-md-4 ">
            <EmployeeRole />
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
