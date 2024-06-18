import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeGaurdIndicator = () => {
  const navigate = useNavigate();

  const [guardingDates, setGuardingDates] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);
  const [todayDate, setTodayDate] = useState("");

  const getTodayDateString = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const userString = localStorage.getItem("userInfo");
    if (userString) {
      const user = JSON.parse(userString);
      setEmployeeId(user._id);
    }
    setTodayDate(getTodayDateString());
  }, []);

  useEffect(() => {
    if (employeeId && todayDate) {
      const fetchGuardingDates = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/employeeGaurdboard/${employeeId}?todayDate=${todayDate}`
          );

          const formattedDates = response.data.map((dateString) => {
            const [day, month, year] = dateString.split("/");
            return new Date(`${year}-${month}-${day}`);
          });

          formattedDates.sort((a, b) => a - b);

          const sortedDates = formattedDates.map((date) => {
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
          });

          setGuardingDates(sortedDates);
        } catch (error) {
          console.error(error.response?.data?.message || error.message);
        }
      };
      fetchGuardingDates();
    }
  }, [employeeId, todayDate]);

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
        <p className="mb-2 text-secondary"> EN GARDE</p>
        {Array.isArray(guardingDates) &&
          guardingDates.slice(0, 5).map((date, index) => (
            // Display only first 5 dates
            <div key={index} className="form-floating bg-light">
              <input
                type="text"
                id={`form${index}`}
                className="form-control bg-light"
                value={date}
                readOnly
              />
              <label htmlFor={`form${index}`}> Date de garde</label>
            </div>
          ))}
        {guardingDates.length > 5 && (
          <p className="text-muted mt-2">
            Plus de dates disponibles sur{" "}
            <button
              className="btn btn-primary"
              onClick={() => navigate("/employee/table-view")}
            >
              table de charge
            </button>
          </p>
        )}
      </div>
    </nav>
  );
};

export default EmployeeGaurdIndicator;
