
const EmployeeCard = ({
  empData,
  isActive,
  
}) => {
  const {firstname, lastname, job, email, image } = empData;



  return (
    <div className="card-component">
      <div className="card-inner">
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="status-dot">
            <i
              className={`bi bi-circle-fill ${
                isActive ? "text-success" : "text-danger"
              }`}
              style={{ fontSize: "0.8rem" }}
              aria-label={isActive ? "Active" : "InActive"}
              title={isActive ? "Active" : "InActive"}
            ></i>
          </div>
          {/* <div className="dropdownContainer">
            <i
              className="bi bi-three-dots-vertical"
              size={20}
              onMouseLeave={() => {
                hideEmployeeDetails();
              }}
              onClick={() => {
                setDropdown(!dropDown);
              }}
            ></i>
           {dropDown && (
              <ul
                className="drop-down"
                onMouseLeave={() => {
                  setDropdown(false);
                  hideEmployeeDetails();
                }}
              >
                <li
                  onClick={() => {
                    dispatch(setShowModal(true));
                    dispatch(setShowSecondModal(false));
                    dispatch(setNavbarSticky(false));
                  }}
                >
                  Edit
                </li>
                <li onClick={() => handleDelete()}>Delete</li>
              </ul>
            )}
          </div>*/}
         </div>
        <div className="container">
          <div className="d-flex justify-content-center align-items-center profileImage">
            <img
              className="rounded-circle"
              src={image}
              alt={firstname}
              style={{ width: "7rem", height: "7rem", objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="container mt-3 text-center">
          <h3 className="text-primary">
            {firstname} {lastname}
          </h3>
          <p className="text-secondary">{email}</p>
        </div>
      </div>
      <div
        className="bg-light border-top d-flex align-items-center justify-content-center"
        style={{ height: "3rem", fontSize: "0.8rem" }}
      >
        <p className="m-0 text-dark">{job}</p>
      </div>
    </div>
  );
};

export default EmployeeCard;
