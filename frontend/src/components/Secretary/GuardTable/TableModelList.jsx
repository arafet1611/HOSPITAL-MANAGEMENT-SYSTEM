import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { toast, Toaster } from "react-hot-toast";
import EmptyBox from "../../../assets/img/emptybox.png"; // Make sure this path is correct
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const TableModelList = () => {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schemaObjects, setSchemaObjects] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const findServiceID = (Title, services) => {
      const selectedService = services.find(
        (service) => service.title === Title
      );
      return selectedService ? selectedService._id : "";
    };

    setSelectedServiceId(findServiceID(selectedService, services));
  }, [selectedService, services]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const encodedText = encodeURIComponent(selectedService);
    const year = selectedDate.getFullYear();

    try {
      const response = await axios.get(
        `http://localhost:5000/api/schemaObject/${encodedText}?year=${year}`
      );
      console.log("data", response.data);
      setSchemaObjects(response.data);
      setSubmitted(true);
      toast.success("Schema objects fetched successfully!");
    } catch (error) {
      toast.error("Error fetching schema objects");
      console.error("Error fetching schema objects:", error);
    }
  };

  const columnDefs = [
    {
      headerName: "#",
      valueGetter: "node.rowIndex +  1",
      editable: false,
      flex: 2,
      maxWidth: 60,
    },
    { headerName: "Mois", field: "month" },
    {
      headerName: "Le Nombre Exact D'employés",
      children: [
        {
          headerName: "Resident",
          field: "schemaObject.Interne_NumberOfvalue.default",
          flex: 1,
        },
        {
          headerName: "Assistant",
          field: "schemaObject.Assistant_NumberOfvalue.default",
          flex: 1,
        },

        {
          headerName: "Senior",
          field: "schemaObject.Senior_NumberOfvalue.default",
          flex: 1,
        },
      ],
    },
  ];

  return (
    <div>
      <Toaster />
      <div className="container my-5 p-3 bg-white shadow rounded" lang="fr">
        <h1 className="h3 p-3">Selection</h1>
        <hr className="hr" />
        <small className="text-muted h5">Select a service</small>
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
                  if (event.target.value) {
                    toast.success(
                      `Service '${event.target.value}' has been selected`
                    );
                  } else {
                    toast.error("Please select a service");
                  }
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
              Year
            </label>
            <div className="col-sm-5">
              <DatePicker
                dateFormat="yyyy"
                selected={selectedDate}
                showYearPicker
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
      {submitted && selectedService ? (
        <>
          {" "}
          <div className="text-center pt-5">
            <h2 className="text-center">
              Liste des Schémas créés pour le service{" "}
              <strong className="text-primary ">{selectedService}</strong>{" "}
              depuis l'année{" "}
              <strong className="text-primary ">
                {selectedDate.getFullYear()}
              </strong>
            </h2>
          </div>{" "}
          <div
            className="ag-theme-alpine container my-5 p-3 bg-white shadow"
            style={{ height: 450, width: "100%" }}
          >
            <AgGridReact
              rowData={schemaObjects}
              columnDefs={columnDefs}
              defaultColDef={{ flex: 1, minWidth: 150 }}
            />
            <div className="table-entry-button-wrapper">
              <button
                type="button"
                className="btn btn-success ml-2 mx-2"
                onClick={() => {
                  navigate(`/secretary/model-creation/`);
                }}
              >
                Créer schéma
              </button>
              <button
                type="button"
                className="btn btn-primary ml-2 mx-2"
                onClick={() => {
                  navigate(`/secretary/table-view/:`);
                }}
              >
                Vue tableau de garde
              </button>
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

export default TableModelList;
