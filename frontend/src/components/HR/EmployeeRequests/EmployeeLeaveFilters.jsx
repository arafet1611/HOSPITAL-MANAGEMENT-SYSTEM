import  { useState } from "react";

function EmployeeLeaveFilters({ onFilter }) {
  const [service, setService] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleSubmit = () => {
    onFilter({ service, fromDate, toDate });
  };

  return (
    <div className="card border m-0">
      <div className="card-body p-3">
        <div className="row align-items-center">
          {/* All Request Dropdown */}
          <div className="col-sm-4 my-1">
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">All Requests</div>
              </div>
              <select className="form-select" aria-label="All Request Dropdown">
                <option selected>...</option>
              </select>
            </div>
          </div>

          {/* From Date Input */}
          <div className="col-sm-4 my-1">
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">From Date</div>
              </div>
              <input
                type="date"
                className="form-control"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
          </div>

          {/* To Date Input */}
          <div className="col-sm-4 my-1">
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">To Date</div>
              </div>
              <input
                type="date"
                className="form-control"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Service and Specialiter Dropdowns */}
        <div className="row align-items-center">
          {/* Service Dropdown */}
          <div className="col-sm-4 my-1">
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">Service</div>
              </div>
              <select
                className="form-select"
                aria-label="Service Dropdown"
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <option selected>All</option>

                <option>Chirurgie générale</option>
                <option>Médecine Interne</option>
              </select>
            </div>
          </div>

          {/* Specialiter Dropdown */}
          <div className="col-sm-4 my-1">
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">Specialiter</div>
              </div>
              <select className="form-select" aria-label="Specialiter Dropdown">
                <option selected>...</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-sm-4 d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeLeaveFilters;