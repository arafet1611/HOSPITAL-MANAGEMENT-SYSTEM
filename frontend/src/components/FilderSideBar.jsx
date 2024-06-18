import React, { useState, useEffect } from "react";
import axios from "axios";

function FilderSideBar({ onFilter }) {
  const [filters, setFilters] = useState({
    service: "",
    job: "",
    status: ""
  });

  const [services, setServices] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleReset = () => {
    setFilters({ ...filters, status: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
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
    <div className="card border m-0">
      <div className="card-body p-3">
        <form onSubmit={handleSubmit}>
          <div className="row align-items-center">
            {/* Services Dropdown */}
            <div className="col-sm-6 my-1">
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">Services</div>
                </div>
                <select
                  className="form-select"
                  aria-label="Services Dropdown"
                  name="service"
                  value={filters.service}
                  onChange={handleInputChange}
                >
                  <option value="">Toutes le service</option>
                  {services.map((service) => (
                    <option key={service._id} value={service._id}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Job Title Dropdown */}
            <div className="col-sm-6 my-1">
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">Titre</div>
                </div>
                <select
                  className="form-select"
                  aria-label="Titre Dropdown"
                  name="job"
                  value={filters.job}
                  onChange={handleInputChange}
                >
                  <option value="">Toutes les titres</option>
                  <option value="nurse">infermiére</option>
                  <option value="doctor">medecin</option>
                  <option value="Technician">technicien</option>
                  <option value="worker">ouvrier</option>
                </select>
              </div>
            </div>
          </div>

          {/* Employee Status Radio Buttons */}
          <div className="form-group mb-3 mt-3">
            <label>État de l'Employé :</label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="Active"
                name="status"
                value="Active"
                checked={filters.status === "Active"}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="Active">
                Actif
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="Inactive"
                name="status"
                value="Inactive"
                checked={filters.status === "Inactive"}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="Inactive">
                Inactif
              </label>
            </div>
          </div>

          {/* Submit and Reset Buttons */}
          <div className="row justify-content-end">
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                FILTRER
              </button>
            </div>
            <div className="col-auto">
              <button type="button" className="btn btn-outline-secondary" onClick={handleReset}>
                Réinitialiser
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FilderSideBar;
