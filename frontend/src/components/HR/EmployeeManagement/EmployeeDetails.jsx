import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setNavbarSticky } from "../../../redux/navbar/NavbarSlice";
import EditModelPopup from "./EditEmployeeDetailsModal";
import { UPDATE_EMPLOYEE_STATUS } from "../../../graphql/mutations/employeeMutation";
import maleDoctor from "../../../assets/img/maleDoctor.png";
import femaleDoctor from "../../../assets/img/femaleDoctor.png";
import { useMutation } from "@apollo/client";
const EmployeeDetails = ({ empDetails, onHide }) => {
  const [employeeId, setEmployeeId] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isActive, setIsActive] = useState(empDetails.isActive);
  const dispatch = useDispatch();
  const [updateEmployeeStatus] = useMutation(UPDATE_EMPLOYEE_STATUS);
  const handleEdit = async () => {
    setIsEditMode(true);

    setEmployeeId(empDetails.id);
    dispatch(setNavbarSticky(false));
  };
  const stopEdit = () => {
    setIsEditMode(false);
    setEmployeeId("");
  };
  const toggleActiveStatus = async () => {
    try {
      await updateEmployeeStatus({
        variables: { ID: empDetails.id, isActive: !isActive },
      });
      setIsActive((prevIsActive) => !prevIsActive);
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du statut de l'employé",
        error
      );
    }
  };
  return (
    <>
      {!isEditMode && (
        <Modal show={true} onHide={onHide} centered>
          <Modal.Header closeButton>
            <Modal.Title>Full Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex align-items-center justify-content-center">
            <div className="employeeDetail container text-center">
            { empDetails.image ?( <img
                src={`http://localhost:5000/uploads/${empDetails.image}`}
                width={200}
                height={200}
                alt="Employee"
                className="rounded-circle mb-3"
              />) : (<img
                src={empDetails.sex === "male" ? maleDoctor : femaleDoctor}
                alt="Default Doctor"
                width={200}
                height={200}       
                className="rounded-circle mb-3"
                />)}
              <h3 className="mb-2">
                {empDetails.firstname} {empDetails.lastname}
              </h3>
              <p className="mb-2">{empDetails.email}</p>
              <p className="mb-2">{empDetails.phone}</p>
              <p className="mb-2">{empDetails.job}</p>
              <p className="mb-0 font-weight-bold">
                {empDetails.dateofjoining}
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                handleEdit();
              }}
            >
              Edit
            </Button>
            <Button
              variant={isActive ? "danger" : "success"}
              onClick={toggleActiveStatus}
            >
              {isActive ? "Deactivate" : "Activate"}
            </Button>{" "}
          </Modal.Footer>
        </Modal>
      )}
      {isEditMode && (
        <EditModelPopup
          // EditMode={isEditMode}
          employee={employeeId}
          stopEdit={stopEdit}
          empDetails={empDetails}
        />
      )}
    </>
  );
};

export default EmployeeDetails;
