const EmployeeRole = () => {
    return (
      <nav className="leftNav">
        <div
          className="employeeDetail container my-5 p-3 bg-white shadow"
          style={{
            margin: "1rem",
            marginTop: "4rem",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <p className="mb-2 text-secondary">ROLE</p>
         
          <div className="form-floating bg-light">
            <input
              type="text"
              id="form12"
              className="form-control bg-light"
              value="Assistant"
              readOnly
            />
            <label htmlFor="form12">Role</label>
          </div>
          
        </div>
        
      </nav>
    );
  };
  export default EmployeeRole;
  