import {  useState } from "react";
import "./EmployeesList.css";
import Pagination from "../../Pagination";
import EmployeeCard from "./EmployeeCard";
import EmployeeModelPopup from "./EmployeeModelPopup";
// import EditEmployeeDetailsModal from "./EditEmployeeDetailsModal";
// import FemaleDoctorImg from "../../../assets/img/femaleDoctor.png";
// import MaleDoctorImg from "../../../assets/img/maleDoctor.png";
import { useDispatch, useSelector } from "react-redux";
import { setNavbarSticky } from "../../../redux/navbar/NavbarSlice";
import {
  setShowModal,
  setShowSecondModal,
} from "../../../redux/PopupModel/modalSlice";
import { useQuery } from "@apollo/client";
import { GET_EMPLOYEES } from "../../../graphql/queries/employeeQuery";
const EmployeesList = ({ setEmployeeId, filters, hideEmployeeDetails }) => {
  const showModal = useSelector((state) => state.modal.showModal);
 
  // const [empById, setEmpById] = useState([]);
  
  const { job , service } = filters;
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const { loading, error, data } = useQuery(GET_EMPLOYEES);

  if (loading) return "Loading...";

  if (error) return `Error! ${error.message}`;

  const cardsPerPage = 8;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const paginatedEmployees = data.employees.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  

  const handlestickyNavbar = () => {
    dispatch(setNavbarSticky(false));
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    setCurrentPage(1);
  };
  const handleEmployeeClick = (emp) => {
    setEmployeeId(emp);
  };

  return (
    <>
      {showModal && <EmployeeModelPopup />}
      {/* {editModal && (
        <EditEmployeeDetailsModal
          setEditModal={setEditModal}
          empById={empById}
        />
      )} */}

      <main className="container mt-5">
        <div className="container mt-5">
          <h1>
            People <span className="text-muted">{data.employees.length}</span>
          </h1>
          <div
            className="employeeHeader"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              className="searchBox"
              style={{
                backgroundColor: "#ecedf6",
                height: "2rem",
                width: "20rem",
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
                onChange={handleSearchInputChange}
                value={searchInput}
                style={{
                  backgroundColor: "transparent",
                  font: "inherit",
                  border: "none",
                  width: "100%",
                  fontSize: "0.9rem",
                }}
              />
              <i className="bi bi-search"></i>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => {
                dispatch(setShowModal(true));
                dispatch(setShowSecondModal(false));
                dispatch(setNavbarSticky(false));
              }}
            >
              <i className="bi bi-plus-lg"></i>
              Add Employee
            </button>
          </div>
          <div className="employees ">
            {paginatedEmployees &&
              paginatedEmployees
                .filter((emp) =>
                  emp.firstname
                    .toLowerCase()
                    .includes(searchInput.toLowerCase())
                )
                .filter((emp) =>
                  service !== "" ? emp.service === service : true
                )
                .filter((emp) => (job !== "" ? emp.job === job : true))
                .map((emp) => {
                  return (
                    <div key={emp.id} onClick={() => handleEmployeeClick(emp)}>
                      <EmployeeCard
                        empId={emp.id}
                        empData={emp}
                        handlestickyNavbar={handlestickyNavbar}
                        isActive={emp.active}
                        hideEmployeeDetails={hideEmployeeDetails}
                      />
                    </div>
                  );
                })}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(data.employees.length / cardsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
    </>
  );
};

export default EmployeesList;
