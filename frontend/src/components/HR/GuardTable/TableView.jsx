import { useState, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { toast, Toaster } from "react-hot-toast";
import EmptyBox from "../../../assets/img/emptybox.png";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./TableEntry.css";
import { useDispatch } from "react-redux";
import { setDates } from "../../../redux/guardboard/datesSlice";
import { MdOutlineNewReleases } from "react-icons/md";

import UserInfoCard from "./UserInfoCard";

const TableView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [lastConfirmDate, setLastConfirmDate] = useState("");
  const [month, setMonth] = useState("");
  const [columnsData, setColumnsData] = useState([]);
  const [rowsData, setRowsData] = useState([]);
  const [DataHistory, setDataHistory] = useState([]);
  const [selectedField, setSelectedField] = useState([]);
  console.log(DataHistory);
  console.log(lastConfirmDate);
  useEffect(() => {
    if (daysInMonth && daysInMonth.length > 0 && daysInMonth[0]) {
      const monthYearString = daysInMonth[0].toString();
      const extractedString = monthYearString.substring(3);
      console.log(extractedString);
      setMonth(extractedString);
    }
  }, [daysInMonth]);
console.log(lastConfirmDate);
  useEffect(() => {
    console.log("rowsData", JSON.stringify(rowsData));
    console.log("selected", selectedField);
    console.log("length", selectedField.length);
  }, [selectedField, rowsData]);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const days = getDaysInMonth(date);
    setDaysInMonth(days);
  };
  useEffect(() => {
    console.log(daysInMonth);
  }, [daysInMonth]);
  useEffect(() => {
    const findServiceID = (Title, services) => {
      const selectedService = services.find(
        (service) => service.title === Title
      );
      return selectedService ? selectedService._id : "";
    };

    setSelectedServiceId(findServiceID(selectedService, services));
  }, [selectedService, services]);
  const fetchColumnsData = async () => {
    try {
      if (!columnsData.length) {
        const encodedText = encodeURIComponent(selectedService);
        const response = await axios.get(
          `http://localhost:5000/api/guardboard/${encodedText}`
        );

        const data = response.data.serviceSchemaobj;
        if (data.schemaObject) {
          const defaultColumnsData = [
            {
              headerName: "Date",
              field: "Date",
              sortable: true,
              filter: true,
              sort: "asc", // Set default sorting to ascending
            },
            {
              headerName: "Senior",
              field: "Senior",
              sortable: false,
              filter: true,
            },
            {
              headerName: "Assistant",
              field: "Assistant",
              sortable: false,
              filter: true,
            },
            {
              headerName: "Interne",
              field: "Interne",
              sortable: false,
              filter: true,
            },
          ];
          setColumnsData(defaultColumnsData);
        }
      }
    } catch (error) {
      console.error("Error fetching columns data:", error);
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedMonth = month + 1 < 10 ? `0${month + 1}` : month + 1;
      return `${formattedDay}/${formattedMonth}/${year}`;
    });
    return daysArray;
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/services");
        const services = response.data;
        if (services.length > 0) {
          setServices(services);
        }
      } catch (error) {
        toast.error("Error fetching services:", error);
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);
  const handleconfirm = async () => {
    let newRowsData = [];

    rowsData.forEach((data) => {
      let newData = { ...data };
      newData.Assistant = data.Assistant.split(",").map((name) => name.trim());
      newData.Senior = data.Senior.split(",").map((name) => name.trim());
      newData.Interne = data.Interne.split(",").map((name) => name.trim());
      newRowsData.push(newData);
    });

    let filteredAssistant = {};
    let filteredSenior = {};
    let filteredInterne = {};

    newRowsData.forEach((data) => {
      data.Assistant.forEach((assistant) => {
        if (filteredAssistant[assistant]) {
          filteredAssistant[assistant].guardingDates.push(data.Date);
        } else {
          filteredAssistant[assistant] = {
            name: assistant,
            guardingDates: [data.Date],
          };
        }
      });

      data.Senior.forEach((senior) => {
        if (filteredSenior[senior]) {
          filteredSenior[senior].guardingDates.push(data.Date);
        } else {
          filteredSenior[senior] = {
            name: senior,
            guardingDates: [data.Date],
          };
        }
      });
      data.Interne.forEach((interne) => {
        if (filteredInterne[interne]) {
          filteredInterne[interne].guardingDates.push(data.Date);
        } else {
          filteredInterne[interne] = {
            name: interne,
            guardingDates: [data.Date],
          };
        }
      });
    });

    let resultAssistant = Object.values(filteredAssistant);
    let resultSenior = Object.values(filteredSenior);
    let resultInterne = Object.values(filteredInterne);

    console.log("Filtered Data for Assistant:", resultAssistant);
    console.log("Filtered Data for Senior:", resultSenior);
    console.log("Filtered Data for Interne:", resultInterne);
    const method = "POST";

    const postData = {
      AssistantList: resultAssistant,
      SeniorList: resultSenior,
      InterneList: resultInterne,
      serviceId: selectedServiceId,
      month: month,
      method: method,
    };

    async function sendData(data) {
      try {
        const response = await axios({
          method,
          url: "http://localhost:5000/api/employeeGaurdboard",
          data,
        });

        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    sendData(postData);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const encodedText = encodeURIComponent(selectedService);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/guardboard/boardhistory/${encodedText}?Dates=${JSON.stringify(
          daysInMonth
        )}`
      );
      fetchColumnsData();
      setDataHistory(response.data);
    } catch (error) {
      toast.error("Error fetching data:", error.message);
      console.error("Error fetching data:", error);
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/guardboard/board/${encodedText}?Dates=${JSON.stringify(
          daysInMonth
        )}`
      );
      fetchColumnsData();
      setRowsData(response.data);
    } catch (error) {
      toast.error("Error fetching data:", error.message);
      console.error("Error fetching data:", error);
    }
    axios
      .get(
        `http://localhost:5000/api/employeeGaurdboard/check/${selectedServiceId}?month=${month}`
      )
      .then((response) => {
        console.log("Response:", response.data);
        const date = new Date(parseInt(response.data, 10));
console.log("Date:", date);
        setLastConfirmDate(date.toLocaleString().toString());
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
      });
  };

  return (
    <div className="container">
      <Toaster />
      <div className="container my-5 p-3 bg-white shadow" lang="fr">
        <p className="h3 p-3">
          <h1 className=" h3 p-3">Selection</h1>
          <hr className="hr" />
          <small className="text-muted h5">Select a service</small>
        </p>
        <form className="container" onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="website" className="col-sm-2 col-form-label">
              Nom de Service
            </label>
            <div className="col-sm-10">
              <select
                value={selectedService}
                className="form-control"
                onChange={(event) => {
                  setSelectedService(event.target.value);
                  if (event.target.value)
                    toast.success(
                      "Service '" + event.target.value + "' has been selected"
                    );
                  else toast("Please select a service");
                }}
              >
                <option value="">-- SELECT SERVICE --</option>
                {services.map((service) => (
                  <option key={service._id} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>
            <label htmlFor="lowRange" className="col-sm-2 col-form-label">
              Month
            </label>
            <div className="col-sm-5">
              <DatePicker
                dateFormat="MM/yyyy"
                selected={selectedDate}
                showMonthYearPicker
                className="form-control"
                onChange={handleDateChange}
              />
            </div>
            <div className="form-group row">
              <div className="col-sm-4">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {rowsData.length > 0 ? (
        <>
          {selectedField.length > 0 ? (
            <UserInfoCard userNames={selectedField} />
          ) : (
            <> </>
          )}
          <div className="container my-5 p-3 bg-white shadow" lang="fr">
            <div
              className="ag-theme-alpine"
              style={{ height: 600, width: "100%" }}
            >
              <AgGridReact
                columnDefs={columnsData}
                rowData={rowsData}
                defaultColDef={{
                  resizable: true,
                  sortable: true,
                  flex: 1,
                  sort: "asc", // Set default sorting to ascending by Date
                }}
                onCellClicked={(event) => {
                  if (event.colDef.field !== "Date") {
                    const fieldValue = event.value;
                    const namesArray = fieldValue
                      .split(",")
                      .map((name) => name.trim());
                    setSelectedField(namesArray);
                  }
                }}
              />
            </div>
            {lastConfirmDate ? (
                <div className="alert alert-info m-2 w-50" role="alert"><MdOutlineNewReleases />

<small > Ce tableau a été confirmé pour la dernière fois le <strong>{lastConfirmDate }</strong> ,  Depuis lors , <strong > 2 </strong> changements ont eu lieu."     </small>           </div>
              ) : (
                <div> </div>
              )}
            <div className=" table-entry-button-wrapper">
             
            {lastConfirmDate ? (
              <button
                type="button"
                className="btn btn-primary ml-2 mx-2"
                onClick={handleconfirm}
              >
               Re-confirmer le tableau{" "}
              </button>) : (
                  <button
                  type="button"
                  className="btn btn-primary ml-2 mx-2"
                  onClick={handleconfirm}
                >
                  Confirmer le tableau{" "}
                </button>
              )}
              <button
                type="button"
                className="btn btn-warning ml-2 mx-2"
                onClick={() => {
                  dispatch(setDates(JSON.stringify(daysInMonth)));
                  console.log(encodeURIComponent(selectedService));
                  navigate(
                    `/hr/table-modify/${encodeURIComponent(selectedService)}`
                  );
                }}
              >
                Mise a jour le tableau
              </button>
            </div>
          </div>
          <div className="container my-5 p-3 bg-white shadow" lang="fr">
            <p className="h3 p-3">
              <strong>Historique des Modifications</strong>
              <hr className="hr" />
              <small className="text-muted h5">Dernières 4 modifications</small>
            </p>
            <div className="list-group">
              {DataHistory.map((data) => (
                <a
                  className="list-group-item list-group-item-action flex-column align-items-start"
                  key={data.id}
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Role : {data.fieldName}</h5>
                    <small>{data.dateOfChange}</small>
                  </div>
                  <p className="mb-1">
                    L'employée <strong>{data.oldValue}</strong> a été remplacée
                    par <strong>{data.newValue} </strong>
                    le jour <strong>{data.date}</strong> <br />
                    <strong>Pour Reason :</strong>
                  </p>
                </a>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div>
            <h2 className="text-center">Veuillez sélectionner un service</h2>
            <img src={EmptyBox} alt="Empty Box" className="d-block mx-auto" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TableView;
