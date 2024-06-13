import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import "../HR/EmployeeManagement/EmployeeModelPopup.css";
import { setNavbarSticky } from "../../redux/navbar/NavbarSlice";
import { toast, Toaster } from "react-hot-toast";
import { useQuery } from '@apollo/client';
import { GET_DOCTORS_BY_SERVICE } from '../../graphQl/queries/doctorQuery';

const DemandeModelPopup = ({ setShowDemandeModel, selectedDemande }) => {
  const modalContainerRef = useRef(null);
  const dispatch = useDispatch();
  const userString = localStorage.getItem("userInfo");
  const user = JSON.parse(userString);
  const { loading, error, data } = useQuery(GET_DOCTORS_BY_SERVICE, {
    variables: { ServiceId: user.service },
  });
console.log(data);
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
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");

    if (new Date(startDate) > new Date(endDate)) {
      toast.error("La date de début doit être antérieure ou égale à la date de fin");
      return;
    }

    const leaveType = formData.get("leaveType");
    if (!leaveType) {
      toast.error("Veuillez sélectionner un type de congé");
      return;
    }

    let url = "";

    switch (selectedDemande) {
      case "Demande de documents":
        url = "http://localhost:5000/api/documentDemande";
        break;
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
              {selectedDemande === "Demande de documents" && (
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
                      <label htmlFor="notes">Notes</label>
                      <input type="text" name="notes" id="notes" />
                    </div>
                  </div>
                  <div className="input-container">
                    <div className="input-box">
                      <label htmlFor="file">Fichier</label>
                      <input type="file" name="file" id="file" />
                    </div>
                  </div>
                  <div className="input-box">
                    <label htmlFor="raison">Raison</label>
                    <textarea name="raison" id="raison" />
                  </div>
                </>
              )}
              {selectedDemande === "Demande de Permutation de Garde" && (
                <>
                  <div className="input-container">
                    <div className="input-box">
                      <label htmlFor="date">Date</label>
                      <input type="date" name="date" id="date" required />
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
                        {data?.doctorsByService.map((doctor) => (
                          <option key={doctor.employee.id} value={doctor.employee.id}>
                            {doctor.employee.firstname}  {doctor.employee.lastname}
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
                    <label htmlFor="raison">Raison</label>
                    <textarea name="raison" id="raison" />
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
