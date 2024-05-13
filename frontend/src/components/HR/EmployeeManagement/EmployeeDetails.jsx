import  { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setNavbarSticky } from "../../../redux/navbar/NavbarSlice";
import EditModelPopup from "./EditEmployeeDetailsModal";

const EmployeeDetails = ({ empDetails, onHide }) => {
  const [employeeId, setEmployeeId] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const dispatch = useDispatch();
  
  const handleEdit = async () => {
    setIsEditMode(true);
    
    setEmployeeId(empDetails.id);
    dispatch(setNavbarSticky(false));
  };
  const stopEdit = () => {
    setIsEditMode(false);
    setEmployeeId("");
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
              <img
                src={`http://localhost:5000/uploads/${empDetails.image}`}
                width={200}
                height={200}
                alt="Employee"
                className="rounded-circle mb-3"
              />
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
            <Button variant="danger">Delete</Button>
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
