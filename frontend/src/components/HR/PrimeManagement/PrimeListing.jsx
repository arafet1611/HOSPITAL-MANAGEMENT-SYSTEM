import { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import EmptyBox from "../../../assets/img/emptybox.png";
import DatePicker from "react-datepicker";
import { toast, Toaster } from "react-hot-toast";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "react-datepicker/dist/react-datepicker.css";

const PrimeListing = () => {
  const [workingYear, setWorkingYear] = useState(null);
  const [editable, setEditable] = useState(false);
  const [rowsData, setRowsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [services, setServices] = useState([]);
  const [isYearSubmitted, setIsYearSubmitted] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/services");
        const services = response.data;
        console.log(services);
        if (services.length > 0) {
          setServices(services);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Service Title (Category)",
        field: "serviceTitleWithCategory",
        width: 300,
        editable: false,
      },
      {
        headerName: "Bonuses",
        children: [
          {
            headerName: "Resident",
            children: [
              {
                headerName: "Regular Days",
                field: "residentWorkingOnRegularDaysBonus",
                flex: 1,
                editable: editable,
              },
              {
                headerName: "Weekends",
                field: "residentWorkingOnWeekendBonus",
                flex: 1,
                editable: editable,
              },
              {
                headerName: "Holidays",
                field: "residentWorkingOnHolidaysBonus",
                flex: 1,
                editable: editable,
              },
            ],
          },
          {
            headerName: "Assistant",
            children: [
              {
                headerName: "Regular Days",
                field: "assistantWorkingOnRegularDaysBonus",
                flex: 1,
                editable: editable,
              },
              {
                headerName: "Weekends",
                field: "assistantWorkingOnWeekendBonus",
                flex: 1,
                editable: editable,
              },
              {
                headerName: "Holidays",
                field: "assistantWorkingOnHolidaysBonus",
                flex: 1,
                editable: editable,
              },
            ],
          },
          {
            headerName: "Senior",
            children: [
              {
                headerName: "Regular Days",
                field: "seniorWorkingOnRegularDaysBonus",
                flex: 1,
                editable: editable,
              },
              {
                headerName: "Weekends",
                field: "seniorWorkingOnWeekendBonus",
                flex: 1,
                editable: editable,
              },
              {
                headerName: "Holidays",
                field: "seniorWorkingOnHolidaysBonus",
                flex: 1,
                editable: editable,
              },
            ],
          },
        ],
      },
    ],
    [editable]
  );

  const fetchPrimeByServiceAndYear = async (year) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/prime/${year}`
      );
      const primes = response.data;

      const processedData = primes.map((prime) => ({
        ...prime,
        serviceTitleWithCategory: `${prime.service.title} (${prime.service.category})`,
      }));

      setRowsData(processedData);
    } catch (error) {
      console.error("Error fetching primes:", error);
    }
  };

  const onYearSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("workingYear", workingYear.getFullYear());
      const response = await axios.get(
        `http://localhost:5000/api/prime/${workingYear.getFullYear()}`
      );
      const primes = response.data;
      console.log(primes);
      if (!primes || primes.length === 0) {
        await axios.post("http://localhost:5000/api/prime", {
          services,
          workingYear: workingYear.getFullYear(),
        });
        toast.success("Primes created successfully");
      }
      setIsYearSubmitted(true);
      fetchPrimeByServiceAndYear(workingYear.getFullYear());
    } catch (error) {
      console.error("Error fetching or creating primes:", error);
      toast.error("Error fetching or creating primes");
    }
  };

  const onCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const onEditToggle = () => {
    setEditable(!editable);
  };

  const onYearChange = (date) => {
    setWorkingYear(date);
  };

  const onSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/prime/${workingYear.getFullYear()}`,
        {
          rowsData,
        }
      );
      toast.success("Data saved successfully");
    } catch (error) {
      toast.error("Error saving data:", error);
      console.error("Error saving data:", error);
    }
  };

  const filteredRowsData = selectedCategory
    ? rowsData.filter((data) => data.service.category === selectedCategory)
    : rowsData;

  return (
    <div className={`flex flex-col items-center min-h-screen p-5 `}>
      <style>{styles}</style>

      <Toaster />
      <div
        className={`container my-5 p-3 bg-white shadow ${
          editable ? "blur-background" : ""
        }`}
        lang="fr"
      >
        <h1 className="h3 p-3">Selection</h1>
        <hr className="hr" />
        <small className="text-muted h5">Select a Year</small>
        <form className="container" onSubmit={onYearSubmit}>
          <div className="form-group row">
            <label htmlFor="workingYear" className="col-sm-2 col-form-label">
              Year
            </label>
            <div className="col-sm-10">
              <DatePicker
                dateFormat="yyyy"
                selected={workingYear}
                showYearPicker
                className="form-control"
                onChange={onYearChange}
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

      {isYearSubmitted ? (
        <>
          <div className="text-center pt-5">
            <h2 className="text-center">
              Tableau des valeurs des primes de tous les services de l'année{" "}
              <strong>{workingYear.getFullYear()}</strong>
            </h2>
          </div>
          <div className="container my-5 p-3 bg-white shadow">
            <div className="row">
              <div className="col-xl-12 col-sm-12 col-12">
                <div className="card">
                  <div
                    className="d-flex flex-row filter "
                    style={{ marginTop: "-8px" }}
                  >
                    <div className="py-2">
                      <a
                        onClick={() => onCategoryChange("")}
                        className="link text-white py-2 px-3"
                      >
                        All <span className="sr-only">(current)</span>
                      </a>
                    </div>
                    <div className="py-2">
                      <a
                        onClick={() => onCategoryChange("A")}
                        className="link text-white py-2 px-3"
                      >
                        Category A
                      </a>
                    </div>
                    <div className="py-2">
                      <a
                        onClick={() => onCategoryChange("B")}
                        className="link text-white py-2 px-3"
                      >
                        Category B
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="ag-theme-alpine "
              style={{ height: 400, width: "100%" }}
            >
              <AgGridReact
                rowData={filteredRowsData}
                columnDefs={columnDefs}
                pagination={false}
                onCellValueChanged={(params) => {
                  const updatedData = [...rowsData];
                  const index = updatedData.findIndex(
                    (row) => row._id === params.data._id
                  );
                  updatedData[index] = params.data;
                  setRowsData(updatedData);
                }}
              />
            </div>
            {editable ? (
              <p>
                {" "}
                &quot;the table can be ediable and edit it carfully{" "}
                <strong className="text-danger"> *</strong>&quot;
              </p>
            ) : (
              <p></p>
            )}
            <div className=" table-entry-button-wrapper">
              <button
                type="button"
                className="btn btn-primary ml-2 mx-2"
                onClick={onEditToggle}
              >
                {editable ? "Disable Edit" : "Enable Edit"}
              </button>
              <button
                type="button"
                className="btn btn-success ml-2 mx-2"
                onClick={onSave}
                disabled={!editable}
              >
                Save le tableau
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="container my-5 p-3 bg-white shadow d-flex justify-content-center align-items-center vh-100">
          <div>
            <h2 className="text-center">Veuillez sélectionner une année</h2>
            <img src={EmptyBox} alt="Empty Box" className="d-block mx-auto" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PrimeListing;
const styles = `
  .filter {
    background-color: #0056b3;
  }
  .link {
    background-color: #0056b3;
    color: white;
    text-decoration: none !important;
    transition: background-color 0.2s ease-in-out;
  }
  
  .link:hover {
    background-color: #002D62;
    color: #ffffff !important;
    transform: scale(1.05); 
  }    
 
`;
