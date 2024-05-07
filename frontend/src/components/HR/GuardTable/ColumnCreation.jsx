import { useState, useEffect } from "react";
import EmptyBox from "../../../assets/img/emptybox.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SingleColumnCreation from "./SingleColumnCreation";
import { addColumns } from "../../../redux/guardboard/columnSlice";
import "./ColumnCreation.css";
import { toast, Toaster } from "react-hot-toast";

const ColumnCreation = () => {
  const defaultColumnsData = [
    { columnName: "Date", columnType: "Date", NumberOfValues: 1 },
    { columnName: "Senior", columnType: "Text", NumberOfValues: 1 },
    { columnName: "Assistant", columnType: "Text", NumberOfValues: 2 },
    { columnName: "Interne", columnType: "Text", NumberOfValues: 2 },
    // { columnName: "Autre(s)", columnType: "Text", NumberOfValues: 1 },
  ];
  const [columns] = useState(4);
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [services, setServices] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
const [selectedServiceId , setSelectedServiceId] = useState();
  const [columnsData, setColumnsData] = useState(defaultColumnsData);
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
        toast.error("Error fetching services:", error);
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);
  useEffect(() => {
    const findServiceID = (Title, services) => {
      const selectedService = services.find(
        (service) => service.title === Title
      );
      return selectedService ? selectedService._id : "";
    };

    setSelectedServiceId(findServiceID(selectedService, services));
  }, [selectedService, services]);
  const renderColumnForms = () => {
    let columnForm = [];
    for (let j = 1; j <= columns; j++) {
      columnForm.push(
        <SingleColumnCreation
          onAddColumnData={handleAddColumnData}
          defaultData={columnsData[j - 1]}
          columnNumber={j}
          key={j}
        />
      );
    }
    return columnForm;
  };
  const handleSubmitClick = async () => {
    console.log("Validation finale");
    console.log(columnsData);
    const encodedText = encodeURIComponent(selectedService);
    console.log(encodedText);
    let response;
    try {
        response = await axios.get(`http://localhost:5000/api/guardboard/${encodedText}`);
    } catch (error) {
        console.error("Error:", error);
        response = null;
    }

    if (!response ) {
        try {
          console.log(selectedServiceId);
            const response = await axios.post("http://localhost:5000/api/guardboard", {
                schemaName: selectedService,
                service: selectedServiceId,
                columns: columnsData,
                NumberOfValueslist: columnsData.map((column) => column.NumberOfValues),
            });
            toast.success("guard board model created successfully:", response.data);
            console.log("guard board model successfully:", response.data);
            setSubmitted(true);
            dispatch(addColumns(columnsData));
        } catch (error) {
            toast.error("Error creating guard board model:", error);
            console.error("Error creating schema:", error);
        }
    } else {
        toast.error(selectedService + " guard board model exists");
    }
};
  const handleAddColumnData = (columnData) => {
    setColumnsData((prevData) => {
      const updatedData = [...prevData];
      updatedData[columnData.columnNumber - 1] = columnData;
      return updatedData;
    });
  };
  return (
    <div className="container-fluid">
      <Toaster />
      <div className="container">
        <div className="container mb-4 mt-5 p-5 bg-white shadow">
          <h1 className="display-4 text-center">
            Créer un tableau de garde d'un service
          </h1>
          <p className="lead text-center">
            Créez un tableau de garde spécifique pour visualiser quel employé
            est de garde dans chaque service chaque jour du mois à l'hôpital.
          </p>
        </div>
        <hr className="my-1" />
        <div className=" container my-4 p-3 bg-white shadow d-flex justify-content-center align-items-center">
          <div className="w-50">
            <h2>Sélectionnez le nom du service</h2>
            <form onSubmit={""}>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Nom du service
                </label>
                <div className="col-sm-10">
                  <select
                    value={selectedService}
                    className="form-control"
                    onChange={(event) => {
                      setSelectedService(event.target.value);
                      if(event.target.value)
                      toast.success("Service '" + event.target.value + "' has been selected");
                    else
                    toast("Please select a service");  
                    }}
                  >
                    <option value= "">-- SELECT SERVICE --</option>
                    {services.map((service) => (
                      <option key={service._id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
        <hr className="my-4" />
        {selectedService ? (
          <div  className="container my-4 p-3 bg-white shadow">
            {renderColumnForms()}
            <p className="font-italic text-muted">
              &quot;Ne pas oublier de vérifier que chaque colonne est
              enregistrée avant la validation des colonnes.&quot;{" "}
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
          <div className=" container my-4 p-3 bg-white shadow d-flex justify-content-center align-items-center vh-100">
          <div>
            <h2 className="text-center">Veuillez sélectionner un service</h2>
            <img src={EmptyBox} alt="Empty Box" className="d-block mx-auto" />
          </div>
        </div>
        )}
      </div>
    </div>
  );
}  

export default ColumnCreation;
