import React, { useEffect, useState } from "react";
import EmployeeDetailsModif from "./EmployeeDetailsModif";
import FemaleDoctorImg from "../../../assets/img/femaleDoctor.png";

const EmployeeModification = ({ onClose, beforeDetails, afterDetails }) => {
  const [showModal, setShowModal] = useState(true);

  const dummyEmployeebeforeModification = {
    _id: "1",
    image: FemaleDoctorImg,
    firstname: "Amal",
    lastname: "Belhadj",
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
    email: "amalbelhadj@example.com",
    phone: "123-456-7890",
    job: "Cardiologist",
    dateofjoining: "2022-01-01",
    active: false,
  };

  return (
    <div className={`popup ${showModal ? "show" : ""}`}>
      <div className="popup-content">
        <EmployeeDetailsModif
          beforeDetails={dummyEmployeebeforeModification}
          afterDetails={dummyEmployeeafterModification}
          before={beforeDetails}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default EmployeeModification;