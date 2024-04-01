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
      <div className="container-fluid py-4 px-4  " style={{ backgroundColor: "#0056b3"}}>
        
      <div className="row g-4">
        <div className="col-sm-6 col-xl-3">
          <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
            <FaCalendarDay className="text-primary" style={{ fontSize: '3em' }} />
            <div className="ms-3">
              <p className="mb-2">Nombre de jours 
<br/> travaillés</p> 
              <h6 className="mb-0">260</h6>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
            <FaCalendarAlt className="text-primary" style={{ fontSize: '3em' }} />
            <div className="ms-3">
              <p className="mb-2">Nombre de jours <br/> fériés</p>
              <h6 className="mb-0">53</h6>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
            <FaBed className="text-primary" style={{ fontSize: '3em' }} />
            <div className="ms-3">
              <p className="mb-2">Nombre de 
 <br/>week-ends</p> 
              <h6 className="mb-0">52</h6>

            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
            <FaCalendarWeek className="text-primary" style={{ fontSize: '3em' }} />
            <div className="ms-3">
              <p className="mb-2">Total jours de <br/>Repos</p> 
              <h6 className="mb-0">105</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
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
