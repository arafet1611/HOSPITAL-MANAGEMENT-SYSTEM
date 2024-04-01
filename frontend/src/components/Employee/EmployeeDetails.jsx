const EmployeeDetails = ({ empDetails }) => {
  return (
    <nav className="leftNav">
      <div
        className="employeeDetail container"
        style={{
          margin: "1rem",
          marginTop: "4rem",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <p className="mb-2 text-secondary">PROFILE IMAGE</p>
        <img
          src={empDetails.image}
          alt="Employee"
          className="rounded-circle mb-3"
        />
        <p className="mb-2 text-secondary">DETAILS</p>

        <div className="form-floating bg-light">
          <input
            type="text"
            id="form12"
            className="form-control bg-light"
            value={empDetails.firstname}
            readOnly
          />
          <label htmlFor="form12">First Name</label>
        </div>
        <div className="form-floating bg-light">
          <input
            type="text"
            id="form12"
            className="form-control bg-light"
            value={empDetails.lastname}
            readOnly
          />
          <label htmlFor="form12">Last Name</label>
        </div>
        <div className="form-floating bg-light">
          <input
            type="text"
            id="form12"
            className="form-control bg-light"
            value={empDetails.email}
            readOnly
          />
          <label htmlFor="form12">Email</label>
        </div>
        <div className="form-floating bg-light">
          <input
            type="text"
            id="form12"
            className="form-control bg-light"
            value={empDetails.phone}
            readOnly
          />
          <label htmlFor="form12">Phone Number</label>
        </div>
        <div className="form-floating bg-light">
          <input
            type="text"
            id="form12"
            className="form-control bg-light"
            value={empDetails.service}
            readOnly
          />
          <label htmlFor="form12">Service</label>
        </div>
      </div>
    </nav>
  );
};
export default EmployeeDetails;
