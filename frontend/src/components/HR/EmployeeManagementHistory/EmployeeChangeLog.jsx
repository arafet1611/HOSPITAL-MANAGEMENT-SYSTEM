import React, { useState, useEffect } from "react";
import axios from "axios";

function EmployeeChangeLog({ filters }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showIcon, setShowIcon] = useState(true);
  const [filteredModif, setFilteredModif] = useState([]);
  const [requestes, setRequestes] = useState([]);
  const { employeeName, startDate, endDate } = filters;

  const handleSearchClick = () => {
    setShowIcon(false);
  };

  useEffect(() => {
    const fetchRequestHistory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api");
        setRequestes(response.data);
      } catch (err) {
        console.error("Error fetching requestHistory:", err);
      }
    };
    fetchRequestHistory();
  }, []);

  useEffect(() => {
    const filterBySearch = (data) =>
      data.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.changeType.toLowerCase().includes(searchTerm.toLowerCase());

    const filterByEmployeeName = (data) =>
      !employeeName ||
      data.employeeName.toLowerCase().includes(employeeName.toLowerCase());

    const filterByDateRange = (data) => {
      if (!startDate || !endDate) return true;
      const changeDate = new Date(data.changeDate);
      return changeDate >= startDate && changeDate <= endDate;
    };

    const filteredData = requestes
      .filter((data) => filterBySearch(data) && filterByEmployeeName(data) && filterByDateRange(data))
      .slice(0, 10);

    setFilteredModif(filteredData);
  }, [searchTerm, employeeName, startDate, endDate, requestes]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container my-5 p-3 bg-white shadow" lang="fr">
      <p className="h3 p-3">
        <strong>Historique</strong>
        <hr className="hr" />

        <div className="row">
          <div className="col-sm-8 position-relative">
            <div className="input-group">
              <label
                htmlFor="website"
                className={`input-group-text ${
                  showIcon ? "" : "visually-hidden"
                }`}
              >
                {showIcon ? (
                  <span role="img" aria-label="search-icon">
                    <i className="bi bi-search"></i>
                  </span>
                ) : null}
              </label>
              <input
                type="text"
                className="form-control"
                id="website"
                placeholder="employeeName, changeType ..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={handleSearchClick}
                onBlur={() => setShowIcon(true)}
              />
            </div>
          </div>
        </div>
        <small className="text-muted h5">Dernières 10 Changements</small>
      </p>

      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col" className="bg-light">#</th>
            <th scope="col" className="bg-light">Nom de l'employé</th>
            <th scope="col" className="bg-light">Date</th>
            <th scope="col" className="bg-light">Type de changement</th>
          </tr>
        </thead>
        <tbody>
          {filteredModif.length > 0 ? (
            filteredModif.map((data) => (
              <tr key={data.id}>
                <th scope="row">{data.id}</th>
                <td>{data.employeeName}</td>
                <td>{data.changeDate.toString().substring(0, 10)}</td>
                <td>{data.changeType}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Aucune donnée disponible</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeChangeLog;