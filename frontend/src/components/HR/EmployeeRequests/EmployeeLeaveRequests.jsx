import file1 from "../../../assets/doc.txt";
import  { useState, useEffect } from "react";
import img1 from "../../../assets/img/maleDoctor.png";
import img2 from "../../../assets/img/femaleDoctor.png";
import Pagination from "../../Pagination";
function EmployeeLeaveRequests({ filters }) {
  const leaveRequests = [
    {
      employee: {
        name: "Sean Black",
        profileImg: img1,
        profileLink: "profile.html",
        Specialite: "medecin",
        service: "Chirurgie générale",
      },
      leaveType: "Parental Leave",
      from: "05/12/2019",
      to: "07/12/2019",
      days: 3,
      remainingDays: 9,
      notes: "Parenting Leave",
      status: "Pending",
    },
    {
      employee: {
        name: "Linda Craver",
        profileImg: img2,
        profileLink: "profile.html",
        Specialite: "infermiere",
        service: "Médecine Interne",
      },
      leaveType: "Parental Leave",
      from: "05/12/2019",
      to: "08/12/2019",
      days: 3,
      remainingDays: 9,
      notes: "Going to Hospital",
      status: "rejected",
    },
    {
      employee: {
        name: "Linda Craver",
        profileImg: img2,
        profileLink: "profile.html",
        Specialite: "infermiere",
        service: "Médecine Interne",
      },
      leaveType: "Parental Leave",
      from: "05/12/2019",
      to: "08/12/2019",
      days: 3,
      remainingDays: 9,
      notes: "Going to Hospital",
      status: "rejected",
    },
    {
      employee: {
        name: "Linda Craver",
        profileImg: img2,
        profileLink: "profile.html",
        Specialite: "infermiere",
        service: "Médecine Interne",
      },
      leaveType: "Parental Leave",
      from: "05/12/2019",
      to: "08/12/2019",
      days: 3,
      remainingDays: 9,
      notes: "Going to Hospital",
      status: "rejected",
    },
    {
      employee: {
        name: "Linda Craver",
        profileImg: img2,
        profileLink: "profile.html",
        Specialite: "infermiere",
        service: "Médecine Interne",
      },
      leaveType: "Parental Leave",
      from: "05/12/2019",
      to: "08/12/2019",
      days: 3,
      remainingDays: 9,
      notes: "Going to Hospital",
      status: "rejected",
    },
    {
      employee: {
        name: "Linda Craver",
        profileImg: img2,
        profileLink: "profile.html",
        Specialite: "infermiere",
        service: "Médecine Interne",
      },
      leaveType: "Parental Leave",
      from: "05/12/2019",
      to: "08/12/2019",
      days: 3,
      remainingDays: 9,
      notes: "Going to Hospital",
      status: "rejected",
    },
  ];
  function getStatusClass(status) {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-warning";
      case "rejected":
        return "text-danger";
      case "accepted":
        return "text-sucess";
      default:
        return "";
    }
  }
  const [fileContent, setFileContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLeaveRequests, setFilteredLeaveRequests] = useState([]);
  const [rowsToShow, setRowsToShow] = useState(5);
  const { service, fromDate, toDate } = filters;

  // <filtrage>
  useEffect(() => {
    if (service || fromDate || toDate) {
      const filtered = leaveRequests.filter((request) => {
        const nameMatches = request.employee.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const serviceMatches = !service || request.employee.service === service;

        let fromDateMatches = true;
        let toDateMatches = true;

        if (fromDate) {
          const fromDateFilter = new Date(fromDate);
          const requestFromDate = parseDate(request.from);
          fromDateMatches = requestFromDate >= fromDateFilter;
        }

        if (toDate) {
          const toDateFilter = new Date(toDate);
          const requestToDate = parseDate(request.to);
          toDateMatches = requestToDate <= toDateFilter;
        }

        return (
          nameMatches && serviceMatches && fromDateMatches && toDateMatches
        );
      });

      setFilteredLeaveRequests(filtered.slice(0, rowsToShow));
    } else {
      // Si aucune valeur de filtre n'est définie, appliquer le filtre par nom uniquement
      const filtered = leaveRequests.filter((request) =>
        request.employee.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLeaveRequests(filtered.slice(0, rowsToShow));
    }
  }, [leaveRequests, searchQuery, rowsToShow, service, fromDate, toDate]);

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
  // <filtrage/>
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

  const downloadFile = () => {
    // Create a link element
    const link = document.createElement("a");
    link.href = file1;
    link.download = "file.txt";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleButtonClick = async () => {
    try {
      downloadFile();

      setTimeout(async () => {
        const result = await readDocument(file1);
        setFileContent(result);
      }, 1000); // Adjust the delay if needed
    } catch (error) {
      console.error("Erreur de lecture du fichier :", error);
    }
  };
  //<pagination>
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastRequest = currentPage * itemsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - itemsPerPage;
  const currentRequests = filteredLeaveRequests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  const totalPages = Math.ceil(filteredLeaveRequests.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //<pagination/>
  const renderFileIcon = () => {
    const fileExtension = file1.split(".").pop().toLowerCase();

    switch (fileExtension) {
      case "pdf":
        return <i className="bi bi-filetype-pdf text-danger fs-3"></i>;
      case "doc":
      case "docx":
        return <i className="bi bi-file-word-fill text-primary fs-3"></i>;
      case "txt":
        return <i className="bi bi-file-earmark-font-fill text-dark fs-3"></i>;
      default:
        return null; // No specific icon for other file types
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
                  Leave Applied <span className="sr-only">(current)</span>
                </a>
              </div>
              <div className="py-2">
                <a className="link text-white py-2 px-2" href="#">
                  Pending Leave Approval
                </a>
              </div>
              <div className="py-2 ">
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
              </div>
              <div className="col-md-3 mb-2">
                <p>
                  No of requests <strong>5</strong>
                </p>
              </div>
              <div className="table-responsive">
                <table className="table custom-table no-footer">
                  <thead className="bg-light text-info">
                    <tr>
                      <th>Employee</th>
                      <th>Leave Type</th>
                      <th>Leave Period Requested From</th>
                      <th>To</th>
                      <th>No of Days</th>
                      <th>Remaining Days</th>
                      <th>Notes</th>
                      <th>Included File</th>
                      <th>Leave Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRequests.map((request, index) => (
                      <tr key={index}>
                        <td>
                          <div className="table-img">
                            <a href={request.employee.profileLink}>
                              <img
                                src={request.employee.profileImg}
                                alt="profile"
                                className="img-table img-fluid rounded-circle"
                                style={{ maxWidth: "10%" }}
                              />
                            </a>
                            <label>{request.employee.name}</label>
                          </div>
                        </td>
                        <td>{request.leaveType}</td>
                        <td>{request.from}</td>
                        <td>{request.to}</td>
                        <td>{request.days}</td>
                        <td>{request.remainingDays}</td>
                        <td>{request.notes}</td>
                        <td>
                          <span type="button" onClick={handleButtonClick}>
                            {renderFileIcon()}
                          </span>
                        </td>
                        <td>
                          <a className={getStatusClass(request.status)}>
                            {request.status}
                          </a>
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

export default EmployeeLeaveRequests;

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