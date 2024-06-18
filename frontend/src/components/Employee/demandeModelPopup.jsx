import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import "../HR/EmployeeManagement/EmployeeModelPopup.css";
import { setNavbarSticky } from "../../redux/navbar/NavbarSlice";
import { toast, Toaster } from "react-hot-toast";
import { useQuery } from "@apollo/client";
import { GET_DOCTORS_BY_SERVICE } from "../../graphQl/queries/doctorQuery";

const DemandeModelPopup = ({ setShowDemandeModel, selectedDemande }) => {
  const [guardingDates, setGuardingDates] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);
  const [todayDate, setTodayDate] = useState("");

  const modalContainerRef = useRef(null);
  const dispatch = useDispatch();
  const userString = localStorage.getItem("userInfo");
  const user = JSON.parse(userString);
  const { loading, error, data } = useQuery(GET_DOCTORS_BY_SERVICE, {
    variables: { ServiceId: user.service },
  });

  const getTodayDateString = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const userString = localStorage.getItem("userInfo");
    if (userString) {
      const user = JSON.parse(userString);
      setEmployeeId(user._id);
    }
    setTodayDate(getTodayDateString());
  }, []);

  useEffect(() => {
    if (employeeId && todayDate) {
      const fetchGuardingDates = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/employeeGaurdboard/${employeeId}?todayDate=${todayDate}`
          );

          const formattedDates = response.data.map((dateString) => {
            const [day, month, year] = dateString.split("/");
            return new Date(`${year}-${month}-${day}`);
          });

          formattedDates.sort((a, b) => a - b);

          const sortedDates = formattedDates.map((date) => {
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
          });

          setGuardingDates(sortedDates);
        } catch (error) {
          console.error(error.response?.data?.message || error.message);
        }
      };
      fetchGuardingDates();
    }
  }, [employeeId, todayDate]);

  useEffect(() => {
    console.log("User:", user);
    console.log("User " + JSON.stringify(user, null, 2));
  }, [user]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        modalContainerRef.current &&
        !modalContainerRef.current.contains(event.target) &&
        event.target.tagName.toLowerCase() !== "input"
      ) {
        dispatch(setNavbarSticky(false));
        setShowDemandeModel(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dispatch, setShowDemandeModel]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (selectedDemande === "Demande de Congé") {
      const startDate = formData.get("startDate");
      const endDate = formData.get("endDate");

      if (new Date(startDate) > new Date(endDate)) {
        toast.error(
          "La date de début doit être antérieure ou égale à la date de fin"
        );
        return;
      }

      const leaveType = formData.get("leaveType");
      if (!leaveType) {
        toast.error("Veuillez sélectionner un type de congé");
        return;
      }
    }


    let url = "";

    switch (selectedDemande) {
      case "Demande de Permutation de Garde":
        url = "http://localhost:5000/api/permutationRequest";
        break;
      case "Demande de Formation":
        url = "http://localhost:5000/api/trainingDemande";
        break;
      case "Demande de Congé":
        url = "http://localhost:5000/api/demandeLeave";
        break;
      default:
        return;
    }

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${user.token}`,
        },
      });
      toast.success("Demande envoyée avec succès");
      console.log("Success:", response.data);
      setShowDemandeModel(false);
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Erreur lors de l'envoi de la demande");
    }
  };

  return (
    <div className="modalContainer">
      <Toaster />
      <div>
        <form onSubmit={handleSubmit}>
          <div className="modalBox" ref={modalContainerRef}>
            <div className="modalHeader">
              <h2>{selectedDemande}</h2>
            </div>
            <div className="modalInner">
              {loading && <p>Loading...</p>}
              {error && <p>Error: {error.message}</p>}

              {selectedDemande === "Demande de Permutation de Garde" && (
                <>
                  <div className="input-container">
                    <div className="input-box">
                      <label htmlFor="date">Date</label>
                      <select
                        className="form-select mt-2 p-2 bg-light"
                        name="date"
                        id="date"
                        required
                      >
                        <option>Selectionner date de garde</option>
                        {guardingDates.map((date, index) => (
                          <option key={index} value={date}>
                            {date}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="input-container">
                    <div className="input-box">
                      <label htmlFor="employeeSwitch">Employé à permuter</label>
                      <select
                        className="form-select mt-2 p-2 bg-light"
                        name="employeeSwitch"
                        id="employeeSwitch"
                      >
                        <option>Selectionner employé</option>
                        {data?.doctorsByService
                          .filter((doctor) => doctor.employee.id !== user._id)
                          .map((doctor) => (
                            <option
                              key={doctor.employee.id}
                              value={doctor.employee.id}
                            >
                              {doctor.employee.firstname}{" "}
                              {doctor.employee.lastname}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="input-container">
                    <div className="input-box">
                      <label htmlFor="file">Fichier</label>
                      <input type="file" name="file" id="file" />
                    </div>
                  </div>
                  <div className="input-box">
                    <label htmlFor="reason">Raison</label>
                    <textarea
                      className="form-control"
                      name="reason"
                      id="reason"
                    />
                  </div>
                </>
              )}
              {selectedDemande === "Demande de Formation" && (
                <>
                  <div className="input-container">
                    <div className="input-box">
                      <label htmlFor="document">Type de document</label>
                      <input
                        type="text"
                        name="document"
                        id="document"
                        required
                      />
                    </div>
                  </div>
                  <div className="input-container">
                    <div className="input-box">
                      <label htmlFor="note">Note</label>
                      <input type="text" name="note" id="note" />
                    </div>
                  </div>
                  <div className="input-container">
                    <div className="input-box">
                      <label htmlFor="file">Fichier</label>
                      <input type="file" name="file" id="file" />
                    </div>
                  </div>
                  <div className="input-box">
                    <label htmlFor="cause">Cause</label>
                    <textarea name="cause" id="cause" />
                  </div>
                </>
              )}
              {selectedDemande === "Demande de Congé" && (
                <>
                  <div className="input-container">
                    <div className="input-box">
                      <label htmlFor="startDate">
                        Période de congé demandée à partir de
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="startDate"
                        id="startDate"
                        required
                      />
                    </div>
                    <div className="input-box">
                      <label htmlFor="endDate">À</label>
                      <input
                        type="date"
                        className="form-control"
                        name="endDate"
                        id="endDate"
                        required
                      />
                    </div>
                  </div>
                  <div className="input-container">
                    <div className="input-box mt-4">
                      <label htmlFor="leaveType">Type de congé</label>
                      <select
                        className="form-select pt-2 pb-3"
                        name="leaveType"
                        id="leaveType"
                        required
                      >
                        <option value="">
                          <strong>--selectionner type de congé--</strong>
                        </option>
                        <option value="congé annuel">Congé annuel</option>
                        <option value="congé maladie">Congé maladie</option>
                        <option value="congé maternité">Congé maternité</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                  </div>
                  <div className="input-box">
                    <label htmlFor="notes">Notes</label>
                    <input
                      type="text"
                      className="form-control"
                      name="notes"
                      id="notes"
                      required
                    />
                  </div>
                  <div className="input-box">
                    <label htmlFor="file">Fichier</label>
                    <input
                      type="file"
                      className="form-control"
                      name="file"
                      id="file"
                    />
                  </div>
                </>
              )}
              <div className="modalFooter">
                <button className="btn btn-primary" type="submit">
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DemandeModelPopup;
