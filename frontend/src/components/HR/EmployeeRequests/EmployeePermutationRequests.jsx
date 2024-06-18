import { useState, useEffect } from "react";
import maleDoctor from "../../../assets/img/maleDoctor.png";
import femaleDoctor from "../../../assets/img/femaleDoctor.png";
import Pagination from "../../Pagination";
import axios from "axios";
import { AiFillFileUnknown } from "react-icons/ai";

function EmployeePermutationRequests({ filters }) {
  const [requests, setRequests] = useState([]);
  const [fileContent, setFileContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [rowsToShow, setRowsToShow] = useState(5);
  const { service, fromDate, toDate, status } = filters;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/permutationRequest"
        );
        console.log("res data" ,response.data);
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    if (service || fromDate || toDate || status) {
      const filtered = requests.filter((request) => {
        const nameMatches = request.employee.firstname
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const serviceMatches =
          !service || request.employee.service.title === service;

        let fromDateMatches = true;
        let toDateMatches = true;
        const statusMatches =
          !status ||
          request.demandeStatus.toLowerCase() === status.toLowerCase();

        if (fromDate) {
          const fromDateFilter = new Date(fromDate);
          const requestFromDate = parseDate(request.date);
          fromDateMatches = requestFromDate >= fromDateFilter;
        }

        if (toDate) {
          const toDateFilter = new Date(toDate);
          const requestToDate = parseDate(request.date);
          toDateMatches = requestToDate <= toDateFilter;
        }

        return (
          nameMatches &&
          serviceMatches &&
          fromDateMatches &&
          toDateMatches &&
          statusMatches
        );
      });

      setFilteredRequests(filtered.slice(0, rowsToShow));
    } else {
      const filtered = requests.filter((request) =>
        request.employee.firstname
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setFilteredRequests(filtered.slice(0, rowsToShow));
    }
  }, [requests, searchQuery, rowsToShow, service, fromDate, toDate, status]);

  const parseDate = (dateString) => {
    const parts = dateString.split("/");
    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
  };

  const handleRowsChange = (event) => {
    setRowsToShow(parseInt(event.target.value, 10));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const readDocument = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const content = event.target.result;
          resolve(content);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => reject(error);

      if (file instanceof Blob || file instanceof File) {
        reader.readAsText(file);
      } else {
        reject(new Error("Invalid file type"));
      }
    });
  };

  const downloadFile = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "file.txt";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleButtonClick = async (fileUrl) => {
    try {
      downloadFile(fileUrl);

      setTimeout(async () => {
        const response = await axios.get(fileUrl, { responseType: "blob" });
        const result = await readDocument(response.data);
        setFileContent(result);
      }, 1000);
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastRequest = currentPage * itemsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - itemsPerPage;
  const currentRequests = filteredRequests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-warning";
      case "rejected":
        return "text-danger";
      case "accepted":
        return "text-success";
      default:
        return "";
    }
  };

  const renderFileIcon = (fileUrl) => {
    const fileExtension = fileUrl.split(".").pop().toLowerCase();

    switch (fileExtension) {
      case "pdf":
        return <i className="bi bi-filetype-pdf text-danger fs-3"></i>;
      case "doc":
      case "docx":
        return <i className="bi bi-file-word-fill text-primary fs-3"></i>;
      case "txt":
        return <i className="bi bi-file-earmark-font-fill text-dark fs-3"></i>;
      default:
        return <AiFillFileUnknown className="text-dark fs-3" />;
    }
  };

  const handleStatusChange = (
    requestId,
    newStatus,
    userId,
    date,
    serviceId
  ) => {
    if (
      window.confirm(
        `Are you sure you want to change the status to ${newStatus}?`
      )
    ) {
      axios
        .put(`http://localhost:5000/api/permutationRequest/${requestId}`, {
          userId,
          date,
          demandeStatus: newStatus,
          serviceId,
        })
        .then((response) => {
          console.log(response);
          const updatedRequests = requests.map((request) => {
            if (request._id === requestId) {
              return { ...request, demandeStatus: newStatus };
            } else {
              return request;
            }
          });
          setRequests(updatedRequests);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="row">
        <div className="col-xl-12 col-sm-12 col-12">
          <div className="card">
            <div className="d-flex flex-row filter">
              <div className="py-2">
                <a className="link text-white py-2 px-2" href="#">
                  Permutation Requests <span className="sr-only">(current)</span>
                </a>
              </div>
              <div className="py-2">
                <a className="link text-white py-2 px-2" href="#">
                  Pending Permutation Approval
                </a>
              </div>
              <div className="py-2">
                <a className="link text-white py-2 px-2" href="#">
                  Permutation Rejected/Cancelled
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
                    className="form-select"
                    onChange={handleRowsChange}
                    aria-label="Default select example"
                    style={{
                      width: "5rem",
                      padding: "4px 12px",
                      height: "2rem",
                    }}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3" selected>
                      3
                    </option>
                  </select>
                </div>
              </div>
              <div className="col-md-3 mb-2">
                <p>
                  No of requests <strong>{requests.length}</strong>
                </p>
              </div>
              <div className="table-responsive">
                <table className="table custom-table no-footer">
                  <thead className="bg-light text-info">
                    <tr>
                      <th>#</th>
                      <th>Employee Name</th>
                      <th> swtich Employee Name</th>
                      <th>Request Date</th>
                      <th>Reason</th>
                      <th>Included File</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRequests.map((request, index) => (
                      <tr key={index}>
                        <td>
                          {request.employee.image ? (
                            <img
                              src={`http://localhost:5000/uploads/${request.employee.image}`}
                              alt="profile"
                              className=" img-fluid rounded-circle"
                              style={{ maxWidth: "40px" }}
                            />
                          ) : (
                            <img
                              src={
                                request.employee.sex === "male"
                                  ? maleDoctor
                                  : femaleDoctor
                              }
                              alt="profile"
                              className=" img-fluid rounded-circle"
                              style={{ maxWidth: "40px" }}
                            />
                          )}
                        </td>
                        <td>
                          {request.employee.firstname}{" "}
                          {request.employee.lastname}
                        </td>
                        <td>
                          {request.employeeSwitch.firstname}{" "}
                          {request.employeeSwitch.lastname}
                        </td>
                        <td>{new Date(request.date).toLocaleDateString()}</td>
                        <td>{request.reason}</td>
                        <td>
                          <span
                            type="button"
                            onClick={() =>
                              handleButtonClick(
                                `http://localhost:5173/uploads/${request.includedFile}`
                              )
                            }
                          >
                            {renderFileIcon(
                              `http://localhost:5173/uploads/${request.includedFile}`
                            )}
                          </span>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className={
                                request.demandeStatus === "accepted" ||
                                request.demandeStatus === "rejected"
                                  ? `btn ${getStatusClass(
                                      request.demandeStatus
                                    )}`
                                  : `btn dropdown-toggle ${getStatusClass(
                                      request.demandeStatus
                                    )}`
                              }
                              type="button"
                              id="dropdownMenuButton"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              disabled={
                                request.demandeStatus === "accepted" ||
                                request.demandeStatus === "rejected"
                              }
                            >
                              {request.demandeStatus}
                            </button>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButton"
                            >
                              <li>
                                <button
                                  className="dropdown-item"
                                  onClick={() =>
                                    handleStatusChange(
                                      request._id,
                                      "accepted",
                                      request.employee._id,
                                      request.date,
                                      request.employee.service
                                    )
                                  }
                                  disabled={
                                    request.demandeStatus === "accepted" ||
                                    request.demandeStatus === "rejected"
                                  }
                                >
                                  Accept
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item"
                                  onClick={() =>
                                    handleStatusChange(
                                      request._id,
                                      "rejected",
                                      request.employee._id,
                                      request.date,
                                      request.employee.service
                                    )
                                  }
                                  disabled={
                                    request.demandeStatus === "accepted" ||
                                    request.demandeStatus === "rejected"
                                  }
                                >
                                  Reject
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
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

export default EmployeePermutationRequests;

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
