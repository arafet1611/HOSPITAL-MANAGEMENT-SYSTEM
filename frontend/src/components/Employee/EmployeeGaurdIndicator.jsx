
const EmployeeGaurdIndicator = () => {
  const doctorsOnGuard = [
    {  onGuardDate: "2024-02-15" },
    {  onGuardDate: "2024-02-16" },
    {  onGuardDate: "2024-02-17" },
  ];

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
          <p className="mb-2 text-secondary"> ON GUARD</p>
      {doctorsOnGuard.map((doctor, index) => (
      

          <div  key={index} className="form-floating bg-light">
            <input

              type="date"
              id={`form${index}`}
              className="form-control bg-light"
              value={doctor.onGuardDate}
              readOnly
            />
            <label htmlFor={`form${index}`}> on Guard date</label>
          </div>
      ))}
      </div>
    </nav>
  );
};

export default EmployeeGaurdIndicator;
