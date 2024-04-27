import { useState, useEffect } from "react";
import Pagination from "../../Pagination";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setNavbarSticky } from "../../../redux/navbar/NavbarSlice";
import AddVacationPopupModel from "./addVacationPopupModel";
function VacationList() {
  const [vacationData, setVacationData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVacations, setFilteredVacations] = useState([]);
  const [rowsToShow, setRowsToShow] = useState(5);
  const [sortBy, setSortBy] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVacations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/vacations");
        console.log("vacations list", response.data);
        setVacationData(response.data);
      } catch (error) {
        console.error("Error fetching vacations:", error);
      }
    };
    fetchVacations();
  }, []);

  useEffect(() => {
    let filtered = vacationData || [];

    if (searchQuery) {
      filtered = filtered.filter((request) =>
        request.vacation.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy) {
      sortVacations(filtered, sortBy);
    } else {
      setFilteredVacations(filtered);
    }
  }, [vacationData, searchQuery, sortBy]);

  const sortVacations = (vacations, sortType) => {
    let sortedVacations = [...vacations];
    if (sortType === "start") {
      sortedVacations.sort((a, b) => new Date(a.from) - new Date(b.from));
    } else if (sortType === "end") {
      sortedVacations.sort((a, b) => new Date(b.to) - new Date(a.to));
    } else if (sortType === "duration") {
      sortedVacations.sort((a, b) => b.days - a.days);
    }
    setFilteredVacations(sortedVacations);
  };

  const handleSortClick = (sortType, event) => {
    event.preventDefault();
    setSortBy(sortType);
    sortVacations(filteredVacations, sortType);
  };

  const handleRowsChange = (event) => {
    setRowsToShow(parseInt(event.target.value, 10));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const itemsPerPage = rowsToShow;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastRequest = currentPage * itemsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - itemsPerPage;
  const currentRequests = filteredVacations.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  const totalPages = Math.ceil(filteredVacations.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy]);

  return (
    <>
      <style>{styles}</style>
      {showModal && <AddVacationPopupModel setShowModal={setShowModal} />}
      <button
        className="btn btn-primary"
        onClick={() => {
          setShowModal(true);
          dispatch(setNavbarSticky(false));
        }}
      >
        <i className="bi bi-plus-lg"></i>
        Ajouter Jours Fériés
      </button>

      <div className="row">
        <div className="col-xl-12 col-sm-12 col-12">
          <div className="card">
            <div className="d-flex flex-row filter">
              <div className="py-2">
                <a
                  className="link text-white py-2 px-2"
                  href="#"
                  onClick={(event) => handleSortClick("start", event)}
                >
                  Trier par date de début{" "}
                  {sortBy === "start" && (
                    <span className="sr-only">(croissante)</span>
                  )}
                </a>
              </div>
              <div className="py-2">
                <a
                  className="link text-white py-2 px-2"
                  href="#"
                  onClick={(event) => handleSortClick("end", event)}
                >
                  Trier par date de fin{" "}
                  {sortBy === "end" && (
                    <span className="sr-only">(décroissante)</span>
                  )}
                </a>
              </div>
              <div className="py-2">
                <a
                  className="link text-white py-2 px-2"
                  href="#"
                  onClick={(event) => handleSortClick("duration", event)}
                >
                  Trier par durée{" "}
                  {sortBy === "duration" && (
                    <span className="sr-only">(décroissante)</span>
                  )}
                </a>
              </div>
            </div>

            <div className="card-body p-3">
              <div className="row align-items-center">
                <div className="col-md-6 col-lg-4 mb-2">
                  <div
                    className="searchBox"
                    style={{
                      backgroundColor: "#ecedf6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "4px 12px",
                      borderRadius: "8px",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Search by name, email, designation etc"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      style={{
                        backgroundColor: "transparent",
                        font: "inherit",
                        border: "none",
                        width: "70%",
                        fontSize: "0.9rem",
                      }}
                    />
                    <i className="bi bi-search"></i>
                  </div>
                </div>
                <div className="col-md-3 mb-2 d-flex align-items-center">
                  <span className="me-2">Rows</span>
                  <select
                    id=""
                    className="form-select"
                    onChange={handleRowsChange}
                    aria-label="Default select example"
                    style={{
                      width: "5rem",
                      padding: "4px 12px",
                      height: "2rem",
                    }}
                    value={rowsToShow}
                  >
                    <option value="3">3</option>
                    <option value="6">6</option>
                    <option value="9">9</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3 mb-2">
                <p>
                  No de jours fériés <strong>{vacationData.length}</strong>
                </p>
              </div>
              <div className="table-responsive">
                <table className="table custom-table no-footer">
                  <thead className="bg-light text-info">
                    <tr>
                      <th>Jours fériés</th>
                      <th>De</th>
                      <th>À</th>
                      <th>Numéro de jours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(currentRequests) &&
                    currentRequests.length > 0 ? (
                      currentRequests.map((request, index) => (
                        <tr key={index}>
                          <td>{request.vacation}</td>
                          <td>{request.startDate}</td>
                          <td>{request.endDate}</td>
                          <td>{request.numberOfDays} Jour(s)</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No vacations found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default VacationList;

const styles = `
  .filter {
    background-color: #0056b3;
  }
  .link {
    background-color: #0056b3;
    color: white;
    text-decoration: none !important;
    transition: background-color 0.2s ease-in-out;
  }
  
  .link:hover {
    background-color: #002D62;
    color: #ffffff !important;
    transform: scale(1.05); 
  }    
`;
