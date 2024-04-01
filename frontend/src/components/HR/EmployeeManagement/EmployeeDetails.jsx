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
          alignItems: "center",
          gap: "20px",
        }}
      >
        <h5 className="mb-4">Full Detail</h5>
        <img
          src={empDetails.image}
          alt="Employee"
          className="rounded-circle mb-3"
        />
        <h3 className="mb-2">
          {empDetails.firstname} {empDetails.lastname}
        </h3>
        <p className="mb-2">{empDetails.email}</p>
        <p className="mb-2">{empDetails.phone}</p>
        <p className="mb-2">{empDetails.job}</p>
        <p className="mb-0 font-weight-bold">{empDetails.dateofjoining}</p>
      </div>
      
    </nav>
  );
};
export default EmployeeDetails;
