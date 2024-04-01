import { useState, useEffect } from "react";
import Pagination from "../../Pagination";

function VacationList() {
 const vacationData = [
    
    {
      vacation: "Jour de l'An",
      from: "2024-01-01",
      to: "2024-01-01",
      days: 1,
    },
    {
      vacation: "Fête de l'Indépendance",
      from: "2024-03-20",
      to: "2024-03-20",
      days: 1,
    },
    {
      vacation: "Fête des Martyrs",
      from: "2024-04-09",
      to: "2024-04-09",
      days: 1,
    },
    {
      vacation: "Fête Aïd al-Fitr",
      from: "2024-04-10",
      to: "2024-04-12",
      days: 3,
    },
    {
      vacation: "Fête du Aïd al-Adha",
      from: "2024-06-16",
      to: "2024-06-17",
      days: 2,
    },
    {
      vacation: "Ras El Am El Hijri",
      from: "2024-07-07",
      to: "2024-07-07",
      days: 1,
    },
    {
      vacation: "Journée de la République",
      from: "2024-07-25",
      to: "2024-07-25",
      days: 1,
    },
    {
      vacation: "Fête de la Femme",
      from: "2024-08-13",
      to: "2024-08-13",
      days: 1,
    },
    {
      vacation: "Mouled",
      from: "2024-09-15",
      to: "2024-09-15",
      days: 1,
    },
    {
      vacation: "Fête de l'Évacuation",
      from: "2024-10-15",
      to: "2024-10-15",
      days: 1,
    },
    {
      vacation: "Fête de la Révolution",
      from: "2024-12-17",
      to: "2024-12-17",
      days: 1,
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVacations, setFilteredVacations] = useState([]);
  const [rowsToShow, setRowsToShow] = useState(5);
  const [sortBy, setSortBy] = useState(null);
 
  useEffect(() => {
     let filtered = vacationData;
 
     if (searchQuery) {
       filtered = filtered.filter(request =>
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
 
  const handleSortClick = (sortType , event) => {
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
  }, [searchQuery, sortBy, ]);
 
  return (
     <>
       <style>{styles}</style>
       <div className="row">
        <div className="col-xl-12 col-sm-12 col-12">
          <div className="card">
            <div className="d-flex flex-row filter">
              <div className="py-2">
                <a
                  className="link text-white py-2 px-2"
                  href="#"
                  onClick={(event) => handleSortClick("start" , event)}
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
                  onClick={(event) => handleSortClick("end" , event)}
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
                  No de jours fériés <strong>{vacationData.length }</strong>
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
                    {currentRequests.map((request, index) => (
                      <tr key={index}>
                        <td>{request.vacation}</td>
                        <td>{request.from}</td>
                        <td>{request.to}</td>
                        <td>{request.days} Jour(s)</td>
                      </tr>
                    ))}
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