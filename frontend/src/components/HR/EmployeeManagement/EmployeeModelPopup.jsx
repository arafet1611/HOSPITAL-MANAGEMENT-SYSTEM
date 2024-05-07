import  { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { CREATE_EMPLOYEE } from "../../../graphql/mutations/employeeMutation";
import {
  setShowSecondModal,
  setShowModal,
} from "../../../redux/PopupModel/modalSlice";
import { setNavbarSticky } from "../../../redux/navbar/NavbarSlice";
import SecondModal from "./SecondModal";
import "./EmployeeModelPopup.css";

const ModelPopup = () => {
  const [createEmployee, { loading }] = useMutation(CREATE_EMPLOYEE);

  const modalContainerRef = useRef(null);
  const [linkEnabled, setLinkEnabled] = useState(false);
  const dispatch = useDispatch();
  const showSecondModal = useSelector((state) => state.modal.showSecondModal);
  const [employeeId, setEmployeeId] = useState(null);
  const [jobPosition, setJobPosition] = useState("");
  const [image, setImage] = useState(null);
  const [services, setServices] = useState([]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    console.log("File", file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const employeeData = {
        firstname: formData.get("firstname"),
        lastname: formData.get("lastname"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        sex: formData.get("sex"),
        job: formData.get("job"),
        service: formData.get("service"),
      };
      console.log(employeeData);

      const employeeCreated = await createEmployee({
        variables: { employeeInput: employeeData },
      });
      setJobPosition(employeeData.job);
      setEmployeeId(employeeCreated.data.createEmployee.id);

      e.target.reset();

      toast.success("Employee created successfully");
      setLinkEnabled(true);
    } catch (error) {
      console.log(employeeId);
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        modalContainerRef.current &&
        !modalContainerRef.current.contains(event.target) &&
        event.target.tagName.toLowerCase() !== "input"
      ) {
        dispatch(setShowModal(false));
        dispatch(setNavbarSticky(true));
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dispatch]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/services");
        const services = response.data;

        if (services.length > 0) {
          setServices(services);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);
  // useEffect(() => {
  //   const createRosters = async () => {
  //     try {
  //       const response = await axios.post("http://localhost:4000/api/rosters", {
  //         service: formData.get("service"),
  //       });
  //       console.log("Roster created successfully", response.data);
  //     } catch (err) {
  //       console.error("Error creating roster", err);
  //     }
  //   };
  //   if (linkEnabled) {
  //     createRosters();
  //   }
  // }, [services]);

  const handleShowSecondModal = () => {
    dispatch(setShowSecondModal(true));
  };

  return (
    <>
      <div className="modalContainer">
        <Toaster />
        {showSecondModal ? (
          <SecondModal employeeId={employeeId} jobPosition={jobPosition} />
        ) : (
          <div>
            {services.length > 0 ? (
              <form onSubmit={handleSubmit}>
                <div className="modalBox" ref={modalContainerRef}>
                  <div className="modalHeader">
                    <h2>New Employee Details</h2>
                  </div>
                  <div className="modalInner">
                    <div className="input-container">
                      <div className="input-box">
                        <label htmlFor="firstname">First Name</label>
                        <input
                          type="text"
                          name="firstname"
                          id="firstname"
                          required
                        />
                      </div>
                      <div className="input-box">
                        <label htmlFor="lastname">Last Name</label>
                        <input
                          type="text"
                          name="lastname"
                          id="lastname"
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
                      />
                    </div>
                    <div className="input-container">
                      <div className="input-box">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" name="email" id="email" required />
                      </div>
                      <div className="input-box">
                        <label htmlFor="phone">Phone</label>
                        <input type="text" name="phone" id="phone" required />
                      </div>
                    </div>
                    <div className="input-container">
                      <div className="input-box ">
                        <label htmlFor="sexe">Sex</label>
                        <select
                          className="form-select mt-2 p-2 bg-light"
                          name="sex"
                          id="sex"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
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
                    <div className="input-box ">
                      <label htmlFor="service">Service</label>
                      <select
                        className="form-select mt-2 p-2 bg-light"
                        name="service"
                        id="service"
                      >
                        <option disabled>Select a service</option>
                        {services.map((service) => (
                          <option key={service._id} value={service._id}>
                            {service.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="modalFooter">
                      <button className="btn btn-primary" type="submit">
                        {loading ? "Saving..." : "Save Details"}
                      </button>
                      {linkEnabled && (
                        <a onClick={handleShowSecondModal}>Next</a>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ModelPopup;
