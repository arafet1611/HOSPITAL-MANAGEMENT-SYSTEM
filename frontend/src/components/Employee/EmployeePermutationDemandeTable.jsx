import { useState, useEffect } from "react";

import axios from "axios";
import { AiFillFileUnknown } from "react-icons/ai";
function EmployeePermutationDemandeTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsToShow, setRowsToShow] = useState(5);
  const [fileContent, setFileContent] = useState("");
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);

  useEffect(() => {
    const userString = localStorage.getItem("userInfo");
    if (userString) {
      const user = JSON.parse(userString);
      console.log("user id ", user._id);
      setEmployeeId(user._id);
    }
  }, []);
  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        if (employeeId) {
          const response = await axios.get(
            `http://localhost:5000/api/permutationRequest/employee/${employeeId}`
          );
          console.log("response", response.data);
          setLeaveRequests(response.data);
        }
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    fetchLeaveRequests();
  }, [employeeId]);
  const downloadFile = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "file.txt";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
  const handleButtonClick = async (fileUrl) => {
    try {
      downloadFile(fileUrl);

      setTimeout(async () => {
        const response = await axios.get(fileUrl, { responseType: "blob" });
        const result = await readDocument(response.data);
        setFileContent(result);
      }, 1000);
    } catch (error) {
      console.error("Erreur de lecture du fichier :", error);
    }
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleRowsChange = (event) => {
    setRowsToShow(parseInt(event.target.value, 10));
  };
  return (
    <>
      <style>{styles}</style>
      <div className="text-center pt-5">
        <h2 className="text-center">
          Liste des <strong className="text-primary">demandes de permutation</strong>{" "}
          envoyées
        </h2>
      </div>
      <div className=" container my-5 p-3 bg-white shadow">
        <div className="row">
          <div className="col-xl-12 col-sm-12 col-12">
            <div className="card">
              <div className="d-flex flex-row filter">
                <div className="py-2">
                  <a className="link text-white py-2 px-2" href="#">
                    Leave Applied <span className="sr-only">(current)</span>
                  </a>
                </div>
                <div className="py-2">
                  <a className="link text-white py-2 px-2" href="#">
                    Pending Leave Approval
                  </a>
                </div>
                <div className="py-2">
                  <a className="link text-white py-2 px-2" href="#">
                    Leave Rejected/Cancelled
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
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3" selected>
                        3
                      </option>
                    </select>
                  </div>
                  <div className="col-md-3 mb-2">
                    <p>
                      No of requests <strong>5</strong>
                    </p>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table custom-table no-footer">
                    <thead className="bg-light text-info">
                      <tr>
                        <th>#</th>
                        <th> swtich Employee Name</th>
                        <th>Request Date</th>
                        <th>Reason</th>
                        <th>Included File</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaveRequests.map((request, index) => (
                        <tr key={index}>
                          <td></td>
                          <td>
                            {" "}
                            {request.employeeSwitch.firstname}{" "}
                            {request.employeeSwitch.lastname}
                          </td>
                          <td>{request.date.toString().substring(0, 10)}</td>
                          <td>{request.reason}</td>
                          <td>
                            <span
                              type="button"
                              onClick={() =>
                                handleButtonClick(
                                  `http://localhost:5173/uploads/${request.fileUrl}`
                                )
                              }
                            >
                              {renderFileIcon(
                                `http://localhost:5173/uploads/${request.fileUrl}`
                              )}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                request.demandeStatus === "Accepted" ||
                                request.demandeStatus === "accepted"
                                  ? "bg-success"
                                  : request.demandeStatus === "Rejected" ||
                                    request.demandeStatus === "rejected"
                                  ? "bg-danger"
                                  : "bg-warning"
                              }`}
                            >
                              {request.demandeStatus.charAt(0).toUpperCase() + request.demandeStatus.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeePermutationDemandeTable;
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
