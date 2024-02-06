import { useEffect, useState } from "react";
import "./EmployeesList.css";
import Pagination from "../../Pagination";
import EmployeeCard from "./EmployeeCard";
import EmployeeModelPopup from "./EmployeeModelPopup";
import EditEmployeeDetailsModal from "./EditEmployeeDetailsModal";
import FemaleDoctorImg from "../../../assets/img/femaleDoctor.png";
import MaleDoctorImg from "../../../assets/img/maleDoctor.png";
import { useDispatch } from "react-redux";
import { setNavbarSticky } from "../../../redux/navbar/NavbarSlice";
const EmployeesList = ({ setEmployeeId }) => {
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [empById, setEmpById] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;
  const dispatch = useDispatch();
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const paginatedEmployees = employees.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  const dummyEmployees = [
    {
      _id: "1",
      image: "",
      firstname: "Amal",
      lastname: "Belhadj",
      sex: "Female",
      email: "amalbelhadj@example.com",
      phone: "123-456-7890",
      job: "Physician",
      dateofjoining: "2022-01-01",
      active: false,
    },
    {
      _id: "2",
      image: "",
      firstname: "John",
      lastname: "Doe",
      sex: "Male",
      email: "johndoe@example.com",
      phone: "987-654-3210",
      job: "Nurse",
      dateofjoining: "2022-02-15",
      active: true,
    },
    {
      _id: "3",
      image: "",
      firstname: "Emily",
      lastname: "Smith",
      sex: "Female",
      email: "emilysmith@example.com",
      phone: "555-123-4567",
      job: "Surgeon",
      dateofjoining: "2022-03-20",
      active: false,
    },
    {
      _id: "4",
      image: "",
      firstname: "Michael",
      lastname: "Johnson",
      sex: "Male",
      email: "michaeljohnson@example.com",
      phone: "333-999-8888",
      job: "Dentist",
      dateofjoining: "2022-04-10",
      active: true,
    },
    {
      _id: "5",
      image: "",
      firstname: "Sophia",
      lastname: "Brown",
      sex: "Female",
      email: "sophiabrown@example.com",
      phone: "777-444-2222",
      job: "Orthopedic",
      dateofjoining: "2022-05-05",
      active: true,
    },
    {
      _id: "6",
      image: "",
      firstname: "Ethan",
      lastname: "Williams",
      sex: "Male",
      email: "ethanwilliams@example.com",
      phone: "111-333-5555",
      job: "Cardiologist",
      dateofjoining: "2022-06-12",
      active: false,
    },
    {
      _id: "7",
      image: "",
      firstname: "Olivia",
      lastname: "Davis",
      sex: "Female",
      email: "oliviadavis@example.com",
      phone: "222-666-7777",
      job: "Pediatrician",
      dateofjoining: "2022-07-30",
      active: true,
    },
    {
      _id: "8",
      image: "",
      firstname: "Aiden",
      lastname: "Miller",
      sex: "Male",
      email: "aidenmiller@example.com",
      phone: "888-222-1111",
      job: "Radiologist",
      dateofjoining: "2022-08-25",
      active: true,
    },
    {
      _id: "9",
      image: "",
      firstname: "Emma",
      lastname: "Taylor",
      sex: "Female",
      email: "emataylor@example.com",
      phone: "999-777-6666",
      job: "Anesthesiologist",
      dateofjoining: "2022-09-05",
      active: true,
    },
    {
      _id: "10",
      image: "",
      firstname: "Liam",
      lastname: "Anderson",
      sex: "Male",
      email: "liamanderson@example.com",
      phone: "456-789-0123",
      job: "Urologist",
      dateofjoining: "2022-10-18",
      active: true,
    },
    {
      _id: "11",
      image: "",
      firstname: "Ava",
      lastname: "Thomas",
      sex: "Female",
      email: "avathomas@example.com",
      phone: "987-321-6540",
      job: "Oncologist",
      dateofjoining: "2022-11-22",
      active: true,
    },
    {
      _id: "12",
      image: "",
      firstname: "Noah",
      lastname: "Moore",
      sex: "Male",
      email: "noahmoore@example.com",
      phone: "111-222-3333",
      job: "Psychiatrist",
      dateofjoining: "2022-12-12",
      active: true,
    },
    {
      _id: "13",
      image: "",
      firstname: "Mia",
      lastname: "Garcia",
      sex: "Female",
      email: "miagarcia@example.com",
      phone: "333-555-7777",
      job: "Dermatologist",
      dateofjoining: "2023-01-03",
      active: true,
    },
    {
      _id: "14",
      image: "",
      firstname: "Lucas",
      lastname: "Wilson",
      sex: "Male",
      email: "lucaswilson@example.com",
      phone: "444-666-8888",
      job: "Neurologist",
      dateofjoining: "2023-02-15",
      active: true,
    },
    {
      _id: "15",
      image: "",
      firstname: "Avery",
      lastname: "Martinez",
      sex: "Female",
      email: "averymartinez@example.com",
      phone: "555-777-9999",
      job: "Gastroenterologist",
      dateofjoining: "2023-03-20",
      active: true,
    },
    {
      _id: "16",
      image: "",
      firstname: "Logan",
      lastname: "Hernandez",
      sex: "Male",
      email: "loganhernandez@example.com",
      phone: "666-888-1111",
      job: "Ophthalmologist",
      dateofjoining: "2023-04-10",
      active: false,
    },
  ];

  const getAllEmployee = async () => {
    try {
      setEmployees(dummyEmployees);
    } catch (err) {
      console.log(err);
    }
  };
  const getEmployeeById = async () => {
    try {
      // setEmpById();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (id) => {
    getEmployeeById(id);
    setEditModal(true);
  };
  const handleReRender = () => {
    setReRender(true);
  };
  const handleFilterByJob = (job) => {
    setSelectedJob(job);
  };
  useEffect(() => {
    getAllEmployee();
  }, [showModal, editModal, reRender]);
  const handlestickyNavbar = () => {
    dispatch(setNavbarSticky(false));
  };
  useEffect(() => {
    if (dummyEmployees && !dummyEmployees.sex) {
      const updatedEmployees = dummyEmployees.map((employee) => ({
        ...employee,
        image: employee.sex === "Female" ? FemaleDoctorImg : MaleDoctorImg,
      }));

      setEmployees(updatedEmployees);
    }
  }, []);
  return (
    <>
      {showModal && <EmployeeModelPopup setShowModal={setShowModal} />}
      {editModal && (
        <EditEmployeeDetailsModal
          setEditModal={setEditModal}
          empById={empById}
        />
      )}

      <main className="container mt-5">
        <div className="container mt-5">
          <h1>
            People <span className="text-muted">{employees.length}</span>
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
                onChange={""}
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
            <div>
              <select
                id="filterByJob"
                className="form-select"
                onChange={(e) => handleFilterByJob(e.target.value)}
                value={selectedJob}
                aria-label="Default select example"
              >
                <option value="">Filter by Job</option>
                <option value="">All Jobs</option>
                <option value="Physician">Physician</option>
                <option value="Dentist">Dentist</option>
              </select>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => {
                setShowModal(true);
                dispatch(setNavbarSticky(false));
              }}
            >
              <i className="bi bi-plus-lg"></i>
              Add Employee
            </button>
          </div>
          <div className="employees ">
            {employees &&
              paginatedEmployees &&
              paginatedEmployees
                .filter((emp) => !selectedJob || emp.job === selectedJob)
                .map((emp) => {
                  return (
                    <div key={emp._id} onClick={() => setEmployeeId(emp)}>
                      <EmployeeCard
                        empData={emp}
                        handleEdit={handleEdit}
                        handleReRender={handleReRender}
                        handlestickyNavbar={handlestickyNavbar}
                        isActive={emp.active}
                      />
                    </div>
                  );
                })}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(employees.length / cardsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
    </>
  );
};

export default EmployeesList;
