import VacationCalendor from "../components/Admin/vacationManagement/VacationCalendar";
import VacationList from "../components/Admin/vacationManagement/VacationList";
import { FaCalendarAlt, FaCalendarDay, FaCalendarWeek, FaBed } from 'react-icons/fa';


function VacationManagement() {

  const vacations = {
    "January 2024": [1, 2, 3],
    "February 2024": [10, 11, 12],
    "March 2024": [20, 21, 22],
    // Add more months as needed
  };
  return (
    <div className="container-fluid ">
  
    <div className="container">
    
      <h1>Display Calendar</h1>
      <VacationCalendor vacations={vacations} />
      <h1>Yearly Vacation Table</h1>
       <VacationList vacations={vacations} /> 
    </div>
    </div>
  );
}

export default VacationManagement;
