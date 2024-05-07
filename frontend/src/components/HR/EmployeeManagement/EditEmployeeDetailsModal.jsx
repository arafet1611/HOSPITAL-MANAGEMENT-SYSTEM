import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { toast, Toaster } from "react-hot-toast";
import { UPDATE_EMPLOYEE } from "../../../graphql/mutations/employeeMutation";

import { setShowSecondModal } from "../../../redux/PopupModel/modalSlice";
import { setNavbarSticky } from "../../../redux/navbar/NavbarSlice";
import SecondModal from "./SecondModal";
import "./EmployeeModelPopup.css";

const EditModelPopup = ({  stopEdit, empDetails }) => {
  // const { loading, data } = useQuery(GET_EMPLOYEE, {
  //   variables: { ID: employee },
  // });
  

  // console.log("employee", data);
  const [editEmployee, { loading }] = useMutation(UPDATE_EMPLOYEE);
  const modalContainerRef = useRef(null);
  const [linkEnabled, setLinkEnabled] = useState(false);
  const dispatch = useDispatch();
  const showSecondModal = useSelector((state) => state.modal.showSecondModal);
  const [employeeId, setEmployeeId] = useState(null);
  const [jobPosition, setJobPostion] = useState("");
  const [image, setImage] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    console.log("File", file);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const employeeData = {
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      sex: formData.get("sex"),
      job: formData.get("job"),
    };
    console.log(formData);
    try {
      await editEmployee({
        variables: {
          ID: empDetails.id.toString(),
          employeeInput: employeeData,
        },
      });
      e.target.reset();
      toast.success("employee edited succesufuly");
      setLinkEnabled(true);
    } catch (err) {
      console.error("erreur updated employee", err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        modalContainerRef.current &&
        !modalContainerRef.current.contains(event.target) &&
        event.target.tagName.toLowerCase() !== "input"
      ) {
        stopEdit();
        dispatch(setNavbarSticky(false));
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dispatch]);

  const handleShowSecondModal = () => {
    dispatch(setShowSecondModal(true));
  };

  return (
    <div className="modalContainer">
      <Toaster />
      {showSecondModal ? (
        <SecondModal employeeId={employeeId} jobPosition={jobPosition} />
      ) : (
        <form onSubmit={handleEdit}>
          <div className="modalBox" ref={modalContainerRef}>
            <div className="modalHeader">
              <h2>edit Employee Details</h2>
            </div>
            <div className="modalInner">
              <div className="input-container">
                <div className="input-box">
                  <label htmlFor="firstname">First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    defaultValue={empDetails.firstname}
                    required
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="lastname">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    defaultValue={empDetails.lastname}
                    required
                  />
                </div>
              </div>
              <div className="input-box">
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  disabled
                  defaultValue={empDetails.image}
                />
              </div>
              <div className="input-container">
                <div className="input-box">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    defaultValue={empDetails.email}
                    required
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    defaultValue={empDetails.phone}
                    required
                  />
                </div>
              </div>
              <div className="input-container">
                <div className="input-box ">
                  <label htmlFor="sexe">sexe</label>
                  <select
                    className="form-select mt-2 p-2 bg-light"
                    name="sex"
                    id="sex"
                    defaultValue={empDetails.sex}
                  >
                    <option value="male">male</option>
                    <option value="female">female</option>
                  </select>
                </div>
                <div className="input-box ">
                  <label htmlFor="job">Job Position</label>
                  <select
                    className="form-select mt-2 p-2 bg-light"
                    name="job"
                    id="job"
                  >
                    <option value="nurse">infermiére</option>
                    <option value="doctor">medecin</option>
                    <option value="Technician">technicien</option>
                    <option value="worker">ouvrier</option>
                  </select>
                </div>
              </div>

              <div className="modalFooter">
                <button className="btn btn-primary" type="submit">
                  {loading ? "Saving..." : "edit Details"}
                </button>
                {linkEnabled && <a onClick={handleShowSecondModal}>Next</a>}
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditModelPopup;
