
function EmployeeModificationRequest() {
  // Dummy data array
  const requestList = [
    {
      id: 1,
      status: "Pending",
      type: "Update request",
      from: "Mahdia",
      to: "Sousse",
      date: "31/05/2024",
      requester: "Jane Doe",
    },
    {
      id: 2,
      status: "Rejected",
      type: "Address Change Request",
      from: "Tunis",
      to: "Sfax",
      date: "01/06/2024",
      requester: "John Doe",
    },
    {
      id: 3,
      status: "Accepted",
      type: "Specialty Change Request",
      from: "Médecine Générale",
      to: "Cardiologie",
      date: "01/06/2024",
      requester: "John Doe",
    },
  ];

  const getBadgeColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-warning";
      case "Rejected":
        return "bg-danger";
      case "Accepted":
        return "bg-info";
      default:
        return "";
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">
            <strong>Request list</strong>
          </h5>
          <div className="btn-group float-end">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Filter history <i className="fas fa-filter"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="#">
                    Approved orders
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Pending orders
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Rejected orders
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
          {requestList.map((request) => (
            <div className="card-body" key={request.id}>
            <div className="row" >
              <div className="col-md-1">
                <img
                  src="https://bootdey.com/img/Content/user_3.jpg"
                  className="rounded-circle img-thumbnail"
                  alt="User Avatar"
                />
              </div>
              <div className="col-md-11">
                <div className="row">
                  <div className="col-md-12">
                    <div className="float-end">
                      <span className={`badge p-2 ${getBadgeColor(request.status)}`}>
                        <strong>{request.status}</strong>
                      </span>
                    </div>
                    <h5>
                      <strong>{request.type}</strong>{" "}
                      <span className={`badge ${getBadgeColor(request.status)}`}>
                        {request.type}
                      </span>
                    </h5>
                    from <strong>{request.from}</strong> to <strong>{request.to}</strong> <br />
                    <a className="btn btn-success btn-sm ms-1" href="#" title="View">
                      <i className="bi bi-eye"></i>
                    </a>
                    <a className="btn btn-danger btn-sm ms-1" href="#" title="Reject">
                      <i className="bi bi-x-circle"></i>
                    </a>
                    <a className="btn btn-info btn-sm ms-1" href="#" title="Accept">
                      <i className="bi bi-check-circle"></i>
                    </a>
                  </div>
                  <div className="col-md-12 bg-light">
                    request made on: {request.date} by <a href="#">{request.requester}</a>
                  </div>
                 
                </div>
                
              </div>
            </div>
            <hr />
            </div>
            
          ))}
        
        <div className="card-footer">
          Put here some note, for example: bootdey is a gallery of free bootstrap
          snippets bootdeys
        </div>
      </div>
      
    </div>
  );
}

export default EmployeeModificationRequest;
