import  { useRef } from "react";
import EmployeeDetails from "../EmployeeManagement/EmployeeDetails";
import FemaleDoctorImg from "../../../assets/img/femaleDoctor.png";

 function EmployeeModification({ setShowModal }) {
  const modalContainerRef = useRef();

  const dummyEmployeebeforeModification = {
    _id: "1",
    image: FemaleDoctorImg,
    firstname: "Amal",
    lastname: "Belhadj",
    sex: "Female",
    email: "amalbelhadj@example.com",
    phone: "123-456-7890",
    job: "Physician",
    dateofjoining: "2022-01-01",
    active: false,
  };

  const dummyEmployeeafterModification = {
    _id: "1",
    image: FemaleDoctorImg,
    firstname: "Amal",
    lastname: "Belhadj",
    sex: "Female",
    email: "amalbelhadj@example.com",
    phone: "123-456-7890",
    job: "Cardiologist",
    dateofjoining: "2022-01-01",
    active: false,
  };

  return (
    <div className="modalContainer">
      <div className="modalBox" ref={modalContainerRef}>
        <div className="modalHeader">
          <h2>Employee Before Modification</h2>
        </div>
        {/* <ImageUpload setImageURL={setImageURL}/> */}
        <div className="modalInner">
          <div className="row">
            <div className="col-md-6">
              <div className="container m-3 shadow">
                <EmployeeDetails empDetails={dummyEmployeebeforeModification} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="container m-3 shadow">
                <EmployeeDetails empDetails={dummyEmployeeafterModification} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default EmployeeModification