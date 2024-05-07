import { useState, useEffect } from "react";
import axios from "axios";

const EmployeeGaurdIndicator = () => {
  const [guardingDates, setGuardingDates] = useState([]);
  const [employeeId, setEmployeeId] = useState();
  const [todayDate, setTodayDate] = useState();

  const getTodayDateString = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    setTodayDate(getTodayDateString());
    setEmployeeId("663903afe32c5abefc4b2ef3");
  }, []);

  useEffect(() => {
    const fetchGuardingDates = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employeeGaurdboard/${employeeId}?todayDate=${todayDate}`
        );
        console.log(response.data);
        // Assuming the response contains date strings in the format "mm/dd/yyyy"
        // Convert the date strings to "dd/mm/yyyy" format
        const formattedDates = response.data.map((dateString) => {
          const [month, day, year] = dateString.split("/");
          return `${day}/${month}/${year}`;
        });
        setGuardingDates(formattedDates);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
      }
    };
    fetchGuardingDates();
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
          guardingDates.map((date, index) => (
            <div key={index} className="form-floating bg-light">
              <input
                type="String"
                id={`form${index}`}
                className="form-control bg-light"
                value={date} // Date format should be "yyyy-mm-dd" for input type="date"
                readOnly
              />
              <label htmlFor={`form${index}`}> Date de garde</label>
            </div>
          ))}
      </div>
    </nav>
  );
};

export default EmployeeGaurdIndicator;
