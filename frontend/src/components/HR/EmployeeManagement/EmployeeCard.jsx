import { useState } from "react";

const EmployeeCard = ({
  empData,
  handleEdit,
  handleReRender,
  handlestickyNavbar,
  isActive,
}) => {
  const { firstname, lastname, job, email, image  } = empData;
  const [dropDown, setDropdown] = useState(false);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      handleReRender();
    } catch (err) {
      console.log(err);
    }
  };
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
          <div className="dropdownContainer">
            <i
              className="bi bi-three-dots-vertical"
              size={20}
              onClick={() => setDropdown(!dropDown)}
            ></i>
            {dropDown && (
              <ul className="drop-down" onMouseLeave={() => setDropdown(false)}>
                <li
                  onClick={() => {
                    handleEdit(empData._id);
                    handlestickyNavbar();
                  }}
                >
                  Edit
                </li>
                <li onClick={() => handleDelete(empData._id)}>Delete</li>
              </ul>
            )}
          </div>
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
