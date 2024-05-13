import { useState, useEffect } from "react";
import axios from "axios";
function FilderSideBar({ onFilter }) {
  const [employeeStatus, setEmployeeStatus] = useState("");
  const [employeeJob, setEmployeeJob] = useState("");
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const handleStatusChange = (event) => {
    setEmployeeStatus(event.target.value);
  };

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };
  console.log(selectedService)

  const handleReset = () => {
    setEmployeeStatus("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
   // const isActive = employeeStatus === "Active";
    onFilter({ job: employeeJob, service: selectedService });
  };
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

  return (
    <div className="bg-light border-right p-4" style={{ height: "100vh" }}>
      <h5 className="font-weight-bold p-3 mb-4 border-bottom">
        Filtres Avancés
      </h5>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3 mt-5">
          <label htmlFor="department">Services</label>
          <select
            className="form-select"
            id="Service"
            onChange={handleServiceChange}
            style={{ fontSize: "0.80rem" }}
          >
            <option value="">Toutes le service</option>
            {services.map((service) => (
              <option key={service._id} value={service._id}>
                {service.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-3 mt-5">
          <label htmlFor="doctorSpecialty">Spécialité du Médecin</label>
          <select
            className="form-select"
            id="doctorSpecialty"
            style={{ fontSize: "0.80rem" }}
          >
            <option value="">Toutes les spécialités</option>
            <option value="Cardiologue">Cardiologue</option>
            <option value="Orthopédiste">Orthopédiste</option>
            <option value="Gynécologue">Gynécologue</option>
            <option value="Pédiatre">Pédiatre</option>
          </select>
        </div>
        <div className="form-group mb-3 mt-5">
          <label htmlFor="title">Titre</label>
          <select
            className="form-select"
            id="titre"
            value={employeeJob}
            onChange={(e) => setEmployeeJob(e.target.value)}
            style={{ fontSize: "0.80rem" }}
          >
            <option value="">Toutes les titres</option>
            <option value="nurse">infermiére</option>
            <option value="doctor">medecin</option>
            <option value="Technician">technicien</option>
            <option value="worker">ouvrier</option>
          </select>
        </div>

        <div className="form-group mb-3 mt-5">
          <label htmlFor="employeeStatus">État de l Employée :</label>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              value="Active"
              id="Active"
              name="employeeStatus"
              checked={employeeStatus === "Active"}
              onChange={handleStatusChange}
            />
            <label className="form-check-label" htmlFor="Active">
              Actif
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              value="Inactive"
              id="Inactive"
              name="employeeStatus"
              checked={employeeStatus === "Inactive"}
              onChange={handleStatusChange}
            />
            <label className="form-check-label" htmlFor="Inactive">
              Inactif
            </label>
          </div>
        </div>
        <div className="d-flex justify-content-between p-0 m-0 ">
          <button type="submit" className="btn btn-primary ">
            FILTRER
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleReset}
          >
            Réinitialiser
          </button>
        </div>
      </form>
    </div>
  );
}

export default FilderSideBar;