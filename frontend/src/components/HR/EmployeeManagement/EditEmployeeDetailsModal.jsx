import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

import { UPDATE_EMPLOYEE } from "../../../graphql/mutations/employeeMutation";
import { setShowSecondModal } from "../../../redux/PopupModel/modalSlice";
import { setNavbarSticky } from "../../../redux/navbar/NavbarSlice";
import SecondModal from "./SecondModal";
import "./EmployeeModelPopup.css";

const EditModelPopup = ({ employee, stopEdit, empDetails }) => {
  // const { loading, data } = useQuery(GET_EMPLOYEE, {
  //   variables: { ID: employee },
  // });

  // console.log("employee", data);

  const [editEmployee, { loading, error }] = useMutation(UPDATE_EMPLOYEE);
  const modalContainerRef = useRef(null);
  const [linkEnabled, setLinkEnabled] = useState(false);
  const dispatch = useDispatch();
  const showSecondModal = useSelector((state) => state.modal.showSecondModal);
  const [employeeId, setEmployeeId] = useState(null);
  const [jobPosition, setJobPostion] = useState("");
  const [serviceTitle, setServiceTitle] = useState("");
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(empDetails.service);

  const createRequestHistory = async (employeeName, changeType, changeDate) => {
    try {
      const requestHistory = await axios.post("http://localhost:5000/api", {
        employeeName,
        changeType,
        changeDate,
      });
      console.log(requestHistory);
    } catch (error) {
      console.error("Error creating request history:", error);
    }
  };

  const createModificationHistory = async (
    employeeName,
    employeeId,
    service,
    changeDate
  ) => {
    try {
      const modificationHistory = await axios.post(
        "http://localhost:5000/api/modifications",
        {
          employeeName,
          employeeId,
          service,
          changeDate,
        }
      );
      console.log(modificationHistory);
    } catch (err) {
      console.error("Error creating modification history:", err);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedService = selectedService;
    const employeeData = {
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      sex: formData.get("sex"),
      job: formData.get("job"),
      service: formData.get("service"),
    };

    try {
      await editEmployee({
        variables: {
          ID: empDetails.id,
          employeeInput: employeeData,
        },
      });
      await createModificationHistory(
       ` ${employeeData.firstname} ${employeeData.lastname}`,
       ` ${empDetails.id}`,
        `${empDetails.service}`,
        new Date().toISOString()
      );
      await createRequestHistory(
        `${employeeData.firstname} ${employeeData.lastname}`,
        "update",
        new Date().toISOString()
      );

      e.target.reset();
      console.log(empDetails.service, updatedService);
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
  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/services/title/${empDetails.service}`,)
        
        console.log(response.data);

        if (response.data.length > 0) {
          setServiceTitle(response.data);
        }
      } catch (err) {
        console.error("Error fetching title service:", err);
      }
    };
    fetchTitle();
  }, [empDetails.service]);

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
                    defaultValue={empDetails.job}
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
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  defaultValue={serviceTitle}
                >
                  <option disabled>{serviceTitle}</option>
                  {services.map((service) => (
                    <option key={service._id} value={service._id}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modalFooter">
                <button className="btn btn-primary" type="submit">
                  {loading ? "Saving..." : "edit Details"}
                </button>
                {/* {linkEnabled && <a onClick={handleShowSecondModal}>Next</a>} */}
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditModelPopup;