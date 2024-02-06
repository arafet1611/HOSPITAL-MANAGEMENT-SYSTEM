function EmployeeLeaveRequests() {
  const leaveRequests = [
    {
      employee: {
        name: "Sean Black",
        profileImg: "assets/img/profiles/avatar-13.jpg",
        profileLink: "profile.html",
      },
      leaveType: "Parental Leave",
      from: "05 Dec 2019",
      to: "07 Dec 2019",
      days: 3,
      remainingDays: 9,
      notes: "Parenting Leave",
      status: "Pending",
    },
    {
      employee: {
        name: "Linda Craver",
        profileImg: "assets/img/profiles/avatar-16.jpg",
        profileLink: "profile.html",
      },
      leaveType: "Parental Leave",
      from: "05 Dec 2019",
      to: "07 Dec 2019",
      days: 3,
      remainingDays: 9,
      notes: "Going to Hospital",
      status: "Pending",
    },
    // Add more leave requests as needed
  ];

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
                      onChange={() => {}}
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
                    onChange={() => {}}
                    aria-label="Default select example"
                    style={{
                      width: "5rem",
                      padding: "4px 12px",
                      height: "2rem",
                    }}
                  >
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                    <option value="">4</option>
                    <option value="" selected>
                      5
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
                    {leaveRequests.map((request, index) => (
                      <tr key={index}>
                        <td>
                          <div className="table-img">
                            <a href={request.employee.profileLink}>
                              <img
                                src={request.employee.profileImg}
                                alt="profile"
                                className="img-table"
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
                        <td>File</td>
                        <td>
                          <a className="action_label3">{request.status}</a>
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
  
`;
