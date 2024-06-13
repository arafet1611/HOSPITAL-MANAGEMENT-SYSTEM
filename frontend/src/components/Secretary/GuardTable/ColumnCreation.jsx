import { useState, useEffect } from "react";
import EmptyBox from "../../../assets/img/emptybox.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SingleColumnCreation from "./SingleColumnCreation";
import { addColumns } from "../../../redux/guardboard/columnSlice";
import "./ColumnCreation.css";
import { toast, Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ColumnCreation = () => {
  const defaultColumnsData = [
    { columnName: "Date", columnType: "Date", NumberOfValues: 1 },
    { columnName: "Senior", columnType: "Text", NumberOfValues: 1 },
    { columnName: "Assistant", columnType: "Text", NumberOfValues: 2 },
    { columnName: "Interne", columnType: "Text", NumberOfValues: 2 },
  ];

  const [columns] = useState(4);
  const [submitted, setSubmitted] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [services, setServices] = useState([]);
  const [month, setMonth] = useState(new Date());
  const [columnsData, setColumnsData] = useState(defaultColumnsData);
  const [selectedServiceId, setSelectedServiceId] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setMonth(date);
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
        toast.error("Error fetching services");
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const findServiceID = (title, services) => {
      const selectedService = services.find(
        (service) => service.title === title
      );
      return selectedService ? selectedService._id : "";
    };
    setSelectedServiceId(findServiceID(selectedService, services));
  }, [selectedService, services]);

  const renderColumnForms = () => {
    let columnForm = [];
    for (let j = 1; j <= columns; j += 2) {
      columnForm.push(
        <div className="row" key={j}>
          <div className="col-md-6">
            <SingleColumnCreation
              onAddColumnData={handleAddColumnData}
              defaultData={columnsData[j - 1]}
              columnNumber={j}
              key={j}
            />
          </div>
          {j + 1 <= columns && (
            <div className="col-md-6">
              <SingleColumnCreation
                onAddColumnData={handleAddColumnData}
                defaultData={columnsData[j]}
                columnNumber={j + 1}
                key={j + 1}
              />
            </div>
          )}
        </div>
      );
    }
    return columnForm;
  };

  const formatMonthYear = (date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${year}`;
  };

  const handleSubmitClick = async () => {
    console.log("Validation finale");
    console.log(columnsData);
    const encodedText = encodeURIComponent(selectedService);
    console.log(encodedText);
    let response;
    try {
      response = await axios.get(
        `http://localhost:5000/api/guardboard/${encodedText}?month=${formatMonthYear(month)}`
      );
    } catch (error) {
      console.error("Error:", error);
      response = null;
    }

    if (!response) {
      try {
        console.log(selectedServiceId);
        const response = await axios.post("http://localhost:5000/api/guardboard", {
          schemaName: selectedService,
          service: selectedServiceId,
          columns: columnsData,
          month: formatMonthYear(month),
          NumberOfValueslist: columnsData.map((column) => column.NumberOfValues),
        });
        toast.success("Guard board model created successfully:", response.data);
        console.log("Guard board model successfully:", response.data);
        setSubmitted(true);
        dispatch(addColumns(columnsData));
      } catch (error) {
        toast.error("Error creating guard board model:", error);
        console.error("Error creating schema:", error);
      }
    } else {
      toast.error(`${selectedService} guard board model exists`);
    }
  };

  const handleAddColumnData = (columnData) => {
    setColumnsData((prevData) => {
      const updatedData = [...prevData];
      updatedData[columnData.columnNumber - 1] = columnData;
      console.log("Updated Columns Data:", updatedData);
      return updatedData;
    });
  };

  return (
    <div className="container-fluid">
      <Toaster />
      <div className="container">
        <div className="container my-5 p-3 bg-white shadow rounded" lang="fr">
          <p className="h3 p-3">
            <h1 className="h3 p-3">Selection</h1>
            <hr className="hr" />
            <small className="text-muted h5">Select a service</small>
          </p>
          <form
            className="container"
            onSubmit={(e) => {
              setFormSubmitted(true);
              e.preventDefault();
            }}
          >
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
                        `Service '${event.target.value}' has been selected`
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
                  selected={month}
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
        {formSubmitted && selectedService ? (
          <div>
            <div className="text-center pt-5">
              <h3 className="text-center">
                Créer un schema de tableau de garde de service <strong>{selectedService}</strong> de mois <strong>{formatMonthYear(month)}</strong>
              </h3>
            </div>
            {renderColumnForms()}
            <p className="font-italic text-muted py-3">
              &quot;Ne pas oublier de vérifier que chaque colonne est enregistrée avant la validation des colonnes.&quot;{" "}
              <strong className="text-danger"> *</strong>
            </p>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSubmitClick}
            >
              Valider les colonnes
            </button>
            {submitted && (
              <button
                type="button"
                className="btn btn-info ml-2"
                onClick={() =>
                  navigate("/hr/table-entry", {
                    state: { serviceName: selectedService },
                  })
                }
              >
                Aller à l'entrée du tableau
              </button>
            )}
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div>
              <h2 className="text-center">Veuillez sélectionner un service</h2>
              <img src={EmptyBox} alt="Empty Box" className="d-block mx-auto" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColumnCreation;
