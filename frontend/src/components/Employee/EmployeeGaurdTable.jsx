import { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { toast, Toaster } from "react-hot-toast";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "react-datepicker/dist/react-datepicker.css";

const EmployeeGaurdTable = () => {
  const [workingMonth, setWorkingMonth] = useState(new Date());
  const [employeeId, setEmployeeId] = useState(null);
  const [isMonthSubmitted, setIsMonthSubmitted] = useState(false);
  const [guardingDates, setGuardingDates] = useState([]);

  useEffect(() => {
    const userString = localStorage.getItem("userInfo");
    if (userString) {
      const user = JSON.parse(userString);
      setEmployeeId(user._id);
    }
  }, []);

  const onMonthChange = (date) => {
    setWorkingMonth(date);
  };

  const onMonthSubmit = async (event) => {
    event.preventDefault();
    if (employeeId && workingMonth) {
      console.log('onMonthSubmit' , formatMonthYear(workingMonth));

      try {
        const response = await axios.get(
          `http://localhost:5000/api/employeeGaurdboard/getAll/${employeeId}?month=${formatMonthYear(workingMonth)}`
        );
        console.log(response.data);
        setGuardingDates(response.data);
        setIsMonthSubmitted(true);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };
  const columns = useMemo(
    () => [
      {
        headerName: "#",
        valueGetter: "node.rowIndex +  1",
        editable: false,
        flex: 2,
        maxWidth: 60,
      },
    { headerName: "Date de garde", field: "date", flex: 1 , sortable: true,
      filter: true,
      sort: "asc",  },
      { headerName: "Jour de garde", field: "day", flex: 1 },
      { headerName: "Heure de début", field: "startHour", flex: 1 },
      { headerName: "Heure de fin", field: "endHour", flex: 1 },
    ],
    []
  );

  const rowData = useMemo(
    () => guardingDates.map((date) => ({
      date,
      day: new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(new Date(date)),
      startHour : "12:00",
      endHour : "12:00"
    })),
    [guardingDates]
  );

  const formatMonthYear = (date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${year}`;
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-5">
      <Toaster />
      <div className="container my-5 p-3 bg-white shadow" lang="fr">
        <h1 className="h3 p-3">Selection</h1>
        <hr className="hr" />
        <small className="text-muted h5">Select a Month</small>
        <form className="container" onSubmit={onMonthSubmit}>
          <div className="form-group row">
            <label htmlFor="workingYear" className="col-sm-2 col-form-label">
              Month
            </label>
            <div className="col-sm-10">
              <DatePicker
                dateFormat="MM/yyyy"
                selected={workingMonth}
                showMonthYearPicker
                className="form-control"
                onChange={onMonthChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-4">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>

      {isMonthSubmitted && (
        <>     <div className="text-center pt-5">
        <h2 className="text-center">
        Liste des dates où vous êtes de garde en {" "}
<strong className="text-primary">{formatMonthYear(workingMonth)}</strong>.
</h2>
    
   </div>
        <div className="container my-5 p-3 bg-white shadow ag-theme-alpine" style={{ height: 400, width: "100%" }}>
          <AgGridReact
            columnDefs={columns}
            rowData={rowData}
        
          />
        </div>
        </>)}
    </div>
   
  );
};

export default EmployeeGaurdTable;