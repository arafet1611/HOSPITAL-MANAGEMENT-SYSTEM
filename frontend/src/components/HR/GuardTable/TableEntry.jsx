import { useState, useEffect } from "react";
import EmptyBox from "../../../assets/img/emptybox.png";

import "semantic-ui-css/semantic.min.css";
import { AgGridReact } from "ag-grid-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./TableEntry.css";
import CustomCellEditor from "./CustomCellEditor";

const TableEntry = (props) => {
  const location = useLocation();

  const serviceName = location.state?.serviceName;

  const [nextMonth, setNextMonth] = useState("");
  const [nextMonthYear, setNextMonthYear] = useState("");
  const [daysInNextMonth, setDaysInNextMonth] = useState("");
  const [rows, setRows] = useState([]);
  const [dataOfEachDayOfNextMonth, setDataOfEachDayOfNextMonth] = useState([]);
  const [selectedService, setSelectedService] = useState(serviceName);
  const [services, setServices] = useState([]);
  const [selectedServiceName, setSelectedServiceName] = useState("");
  const [dateValues, setDateValues] = useState([]);
 // const [isEmpty , setIsEmpty] = useState(true); 
const [ columnsData , setColumnsData] = useState([]);
  console.log("collumns data ", columnsData);
  const navigate = useNavigate();
  useEffect(() => {
    const findServiceTitle = (selectedId, services) => {
      const selectedService = services.find(
        (service) => service._id === selectedId
      );
      return selectedService ? selectedService.title : "";
    };

    setSelectedServiceName(findServiceTitle(selectedService, services));
  }, [selectedService, services]);
  useEffect(() => {
    setSelectedService(serviceName);
  }, [serviceName]);
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
  useEffect(() => {
    if(selectedServiceName  )
    fetchColumnsData();
  } , [selectedServiceName]);
    const fetchColumnsData = async () => {
      try {
        if (!columnsData.length) {
          const encodedText = encodeURIComponent(selectedServiceName);
          console.log(encodedText);
          const response = await axios.get(
            `http://localhost:5000/api/guardboard/${encodedText}`
          );

          const data = response.data.serviceSchemaobj;
          if (data.schemaObject) {
            //setIsEmpty(false);
          
          console.log("service guardboard is" , data.schemaObject);
            const defaultColumnsData = [
              {
                columnName: "Date",
                columnType: "Date",
                NumberOfValues: data.schemaObject.Date_NumberOfvalue.default,
              },
              {
                columnName: "Senior",
                columnType: "Text",
                NumberOfValues: data.schemaObject.Senior_NumberOfvalue.default,
              },
              {
                columnName: "Assistant",
                columnType: "Text",
                NumberOfValues: data.schemaObject.Assistant_NumberOfvalue.default,
              },
              {
                columnName: "Interne",
                columnType: "Text",
                NumberOfValues: data.schemaObject.Interne_NumberOfvalue.default,
              },
              // { columnName: "Autre(s)", columnType: "Text", NumberOfValues: 1 },
            ];
            setColumnsData(defaultColumnsData);
          }
        }
      } catch (error) {
        console.error("Error fetching columns data:", error);
      }
    };



 useEffect(() => {
    const today = new Date();
    const nextMonth = (today.getMonth() + 1) % 12;
    const nextMonthYear =
      today.getFullYear() + Math.floor((today.getMonth() + 1) / 12);

    const getNextMonthDates = (month, year) => {
      const dates = [];
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        dates.push(new Date(year, month, day));
      }
      return dates;
    };

    const nextMonthDates = getNextMonthDates(nextMonth, nextMonthYear);
    setDataOfEachDayOfNextMonth(nextMonthDates);
  }, []);
  useEffect(() => {
    const today = new Date();
    setNextMonth((today.getMonth() + 1) % 12);
    setNextMonthYear(
      today.getFullYear() + Math.floor((today.getMonth() + 1) / 12)
    );
  }, []);

  useEffect(() => {
    setDaysInNextMonth(getDaysInMonth(nextMonth, nextMonthYear));
  }, [nextMonth, nextMonthYear]);

  useEffect(() => {
    setRows(
      Array.from({ length: daysInNextMonth }, (_, i) => returnSingleObject(i))
    );
  }, [daysInNextMonth]);

  useEffect(() => {
    console.log(dataOfEachDayOfNextMonth);
    const updatedDateValues = dataOfEachDayOfNextMonth.map((value) => {
      if (value) {
        const day = String(value.getDate()).padStart(2, "0");
        const month = String(value.getMonth() + 1).padStart(2, "0");
        const year = value.getFullYear();
        return `${day}/${month}/${year}`;
      }
      return "";
    });
    setDateValues(updatedDateValues);
  }, [dataOfEachDayOfNextMonth]);

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const returnSingleObject = (j) => {
    let obj = {};
    if (props.rows && props.rows.rowsData) {
      props.columns.columnsData.forEach((columnData) => {
        if (props.rows.rowsData.length === 0) obj[columnData.columnName] = "";
        else if (props.rows.rowsData[j]) {
          if (
            columnData.columnType === "Date" &&
            props.rows.rowsData[j][columnData.columnName] instanceof Date
          ) {
            const date = props.rows.rowsData[j][columnData.columnName];
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();
            obj[columnData.columnName] = `${day}/${month}/${year}`;
          } else {
            obj[columnData.columnName] =
              props.rows.rowsData[j][columnData.columnName];
          }
        }
      });
    }
    return obj;
  };

  const handleSubmitClick = async () => {
    try {
      const rowsWithDateValues = rows.map((row, index) => {
        return { ...row, Date: dateValues[index] };
      });
  console.log(rowsWithDateValues[0].date);

      // Extracting data for the request body
      const Dates = rowsWithDateValues.map(row => row.Date);
      console.log(Dates);
      const SeniorList = rowsWithDateValues.map(row => row.Senior || " ");
      const AssistantList = rowsWithDateValues.map(row => row.Assistant || " ");
      const InterneList = rowsWithDateValues.map(row => row.Interne || " ");
  console.log(selectedServiceName);
      // Prepare data object for the POST request
      const requestData = {
        schemaName: selectedServiceName,
        Dates,
        SeniorList,
        AssistantList,
        InterneList
      };
  console.log(requestData);
      // Make POST request
      const response = await axios.post(
        "http://localhost:5000/api/guardboard/board/",
        requestData
      );
  
      // Handle success
      console.log("Data posted successfully:", response.data);
      // You can also dispatch an action here if needed
    } catch (error) {
      // Handle error
      console.error("Error posting data:", error);
    }
  };

  const handleCellValueChanged = (params) => {
    const { rowIndex, data } = params;
    const updatedRows = rows.map((row, index) => {
      if (index === rowIndex) {
        return data;
      }
      return row;
    });
    setRows(updatedRows);
    props.addRows(updatedRows);
  };

  const columnDefs = [
    {
      headerName: "#",
      valueGetter: "node.rowIndex +  1",
      editable: false,
      flex: 2,
      maxWidth: 60,
    },
    ...columnsData.map((columnData) => {
      if (columnData.columnType === "Multiselect") {
        const options = columnData.multiSelectValues
          .split(",")
          .map((option) => option.trim());
        return {
          field: columnData.columnName,
          headerName: `${columnData.columnName}`,
          editable: true,
          cellEditor: "agSelectCellEditor",
          cellEditorParams: { values: options },
        };
      }
      if (columnData.columnType === "Text") {
        return {
          field: columnData.columnName,
          headerName: `${columnData.columnName} (${columnData.NumberOfValues}*)`,
          editable: true,
          cellEditorPopup: true,
          cellEditorPopupPosition: "under",
          cellEditor: CustomCellEditor,
          cellEditorParams: (params) => ({
            value: params.value,
            NumberOfValues: columnData.NumberOfValues,
            onChange: (newValue) => {
              const rowIndex = params.rowIndex;

              const updatedRows = [...rows];

              updatedRows[rowIndex][columnData.columnName] = newValue;

              setRows(updatedRows);
            },
          }),
        };
      }
      if (columnData.columnType === "Date") {
        return {
          field: columnData.columnName,

          headerName: `${columnData.columnName}`,
          editable: false,
          cellEditor: "agDateCellEditor",
          flex: 2,
          maxWidth: 120,
          valueGetter: (params) => dateValues[params.node.rowIndex],
          valueSetter: (params) => {
            if (params.newValue instanceof Date) {
              const day = String(params.newValue.getDate()).padStart(2, "0");
              const month = String(params.newValue.getMonth() + 1).padStart(
                2,
                "0"
              );
              const year = params.newValue.getFullYear();
              const formattedDate = `${day}/${month}/${year}`;
              const updatedDateValues = [...dateValues];
              updatedDateValues[params.node.rowIndex] = formattedDate;
              setDateValues(updatedDateValues);
            } else {
              params.data[columnData.columnName] =
                dateValues[params.node.rowIndex];
            }
            return true;
          },
        };
      }
      return null;
    }),
  ];

  return (
    <div className="container">
       <div className="container my-5 p-3 bg-white shadow" lang="fr">
        <p className="h3 p-3">
          <h1 className=" h3 p-3">Selection</h1>
          <hr className="hr" />
          <small className="text-muted h5">Select a service</small>
        </p>
        <form className="container" onSubmit={""}>
          <div className="form-group row pb-5">
            <label htmlFor="website" className="col-sm-2 col-form-label">
              Nom de Service
            </label>
            <div className="col-sm-10">
            <select
              value={selectedService}
              className="form-control "
              onChange={(event) => {
                //setIsEmpty(true);
                setColumnsData([])
                setSelectedService(event.target.value);
              }}
            >
              <option value="">-- SELECT SERVICE --</option>
              {services.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>
           
            
          
          </div>
        </form>
      </div>
      
      {columnsData && selectedServiceName ? (
       <div className="container my-5 p-3 bg-white shadow" lang="fr">
       <div>
            <h1>Service Name: {selectedServiceName}</h1>
          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: 800, width: "100%" }}
          >
            <AgGridReact
              rowData={rows}
              columnDefs={columnDefs}
              enableCellTextSelection={true}
              onGridReady={(params) => {
                params.api.sizeColumnsToFit();
              }}
              onCellValueChanged={handleCellValueChanged}
              defaultColDef={{
                resizable: true,
                editable: true,
                sortable: true,
                flex: 1,
              }}
            />
          </div>
          <div className="table-entry-button-wrapper">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmitClick}
            >
              Submit data
            </button>
            <button
              type="button"
              className="btn btn-success ml-3"
              onClick={() => navigate("/hr/table-view")}
            >
              View Table
            </button>
          </div>
        </div>
      ) : (
        <div className=" container my-5 p-3 bg-white shadow d-flex justify-content-center align-items-center vh-100">
          <div>
            <h2 className="text-center">Veuillez sélectionner un service</h2>
            <img src={EmptyBox} alt="Empty Box" className="d-block mx-auto" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TableEntry;