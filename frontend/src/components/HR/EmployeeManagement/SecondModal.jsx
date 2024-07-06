import {  useRef, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import { useMutation } from "@apollo/client";
import {
  setShowSecondModal,
  setShowModal,
} from "../../../redux/PopupModel/modalSlice";
import { CREATE_DOCTOR } from "../../../graphql/mutations/doctorMutation";
import { CREATE_NURSE } from "../../../graphql/mutations/nurseMutation";
import { CREATE_TECHNICIAN } from "../../../graphql/mutations/technicianMutation";
import { CREATE_WORKER } from "../../../graphql/mutations/workerMutation";
import {CREATE_SECRETAIRY} from "../../../graphQl/mutations/secretairyMutation";
import {CREATE_HR} from "../../../graphQl/mutations/hrMutation";
function SecondModal({ employeeId, jobPosition,  serviceId}) {
  const [createDoctor, { loading }] = useMutation(CREATE_DOCTOR);
  const [createNurse] = useMutation(CREATE_NURSE);
  const [createTechnician] = useMutation(CREATE_TECHNICIAN);
  const [createWorker] = useMutation(CREATE_WORKER);
  const [createSecretairy] = useMutation(CREATE_SECRETAIRY);
  const [createHr] = useMutation(CREATE_HR)
  const modalContainerRef = useRef(null);
  const showSecondModal = useSelector((state) => state.modal.showSecondModal);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        modalContainerRef.current &&
        !modalContainerRef.current.contains(event.target) &&
        event.target.tagName.toLowerCase() !== "input" &&
        event.target.tagName.toLowerCase() !== "select" &&
        event.target.tagName.toLowerCase() !== "option" &&
        event.target.tagName.toLowerCase() !== "button"
      ) {
        dispatch(setShowSecondModal(false));
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setShowSecondModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const form = e.target;
    const formData = new FormData(form);
    const inputData = {
      Type: formData.get("Type"),
      categorie: formData.get("categorie"),
      responsabilite: formData.get("responsabilite"),
    };
    const inputData1 = {
      responsabilite: formData.get("responsabilite"),
    };
    try {
      if (jobPosition === "nurse") {
        await createNurse({
          variables: { employeeID: employeeId, nurseInput: inputData },
        });
      } else if (jobPosition === "doctor") {
        await createDoctor({
          variables: { employeeID: employeeId, doctorInput: inputData },
        });
        window.location.replace("/hr/employees-management");
      } else if (jobPosition === "Technician") {
        await createTechnician({
          variables: { employeeID: employeeId, technicianInput: inputData },
        });
      } else if (jobPosition === "worker") {
        await createWorker({
          variables: { employeeID: employeeId, workerInput: inputData },
        });
      } else if (jobPosition === "secretary") {
        await createSecretairy({
          variables: {
            serviceID: serviceId,
            employeeID: employeeId,
            secretairyInput: inputData1,
          },
        });
      } else if (jobPosition === "hr") {
        await createHr({
          variables: {
            employeeID: employeeId,
            hrInput: inputData1,
          },
        });
      }
  
      form.reset();
  
      dispatch(setShowSecondModal(false));
      dispatch(setShowModal(false));
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  return (
    <Modal
      show={showSecondModal}
      onHide={() => dispatch(setShowSecondModal(false))}
    >
      <Toaster />
      <Modal.Header closeButton>
        <Modal.Title> Detail : {jobPosition}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div ref={modalContainerRef}>
            <div className="input-box">
              <label htmlFor="">Grade</label>
              <input type="text" name="Type" id="Type" />
            </div>
            <div className="input-box">
              <label htmlFor="">specialiter</label>
              <input type="text" name="categorie" id="categorie" />
            </div>
            <div className="input-box">
              <label htmlFor="">Responsabilite</label>
              <textarea
                type="text"
                className="form-control"
                name="responsabilite"
                id="responsabilite"
              ></textarea>
            </div>
          </div>
          <Modal.Footer>
            <button className="btn btn-primary" type="submit">
              {loading ? "Saving..." : "Save Details"}
            </button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default SecondModal;
