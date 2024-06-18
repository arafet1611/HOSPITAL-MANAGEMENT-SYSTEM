import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import EmptyBox from "../../../assets/img/emptybox.png";
import StatusDropdown from "./StatusDropdown";

import "semantic-ui-css/semantic.min.css";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./TableEntry.css";
import CustomCellEditor from "./CustomCellEditor";
import { useSelector } from "react-redux";

const TableModify = (props) => {
  const [rows, setRows] = useState([]);
  const [columnsData, setColumnsData] = useState([]);
  const [acceptedLeaveRequests, setAcceptedLeaveRequests] = useState([]);
const [acceptedPermutationRequests ,setAcceptedPermutationRequests] = useState([]);
  const { serviceName } = useParams();
  const location = useLocation();
  const encodedText = encodeURIComponent(serviceName);
  const daysInMonth = useSelector((state) => state.dates);
  const navigate = useNavigate();

  // Extraire le paramètre 'month' de l'URL
  const queryParams = new URLSearchParams(location.search);
  const month = queryParams.get("month");
  const selectedServiceId = queryParams.get("selectedServiceId");
  const onChange = async (requestId, isApplied) => {
    try {
     
      const updatedRequests = acceptedLeaveRequests.map(request => {
        if (request._id === requestId) {
          return { ...request, isApplied: isApplied };
        }
        return request;
      });
      setAcceptedLeaveRequests(updatedRequests);
      
      toast.success("Statut mis à jour avec succès");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du statut:", error.message);
      console.error("Erreur lors de la mise à jour du statut:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (serviceName) {
          const response = await axios.get(
            `http://localhost:5000/api/guardboard/board/${serviceName}?Dates=${daysInMonth}`
          );
          const sortedData = response.data.sort(
            (a, b) => new Date(a.Date) - new Date(b.Date)
          );
          setRows(sortedData);
        }
      } catch (error) {
        toast.error("Erreur lors de la récupération des données:", error.message);
        console.error("Erreur lors de la récupération des données:", error);
      }
    };
    fetchData();
  }, [serviceName, daysInMonth]);

  useEffect(() => {
    const fetchColumnsData = async () => {
      try {
        if (!columnsData.length) {
          const response = await axios.get(
            `http://localhost:5000/api/guardboard/${serviceName}?month=${month}`
          );
          const data = response.data.serviceSchemaobj;
          if (data.schemaObject) {
            const defaultColumnsData = [
              {
                headerName: "Date",
                field: "Date",
                sortable: true,
                filter: true,
                NumberOfValues: data.schemaObject.Date_NumberOfvalue.default,
                sort: "asc", // Tri par défaut en ordre croissant
              },
              {
                headerName: "Senior",
                field: "Senior",
                sortable: false,
                filter: true,
                NumberOfValues: data.schemaObject.Senior_NumberOfvalue.default,
              },
              {
                headerName: "Assistant",
                field: "Assistant",
                sortable: false,
                filter: true,
                NumberOfValues: data.schemaObject.Assistant_NumberOfvalue.default,
              },
              {
                headerName: "resident",
                field: "Interne",
                sortable: false,
                filter: true,
                NumberOfValues: data.schemaObject.Interne_NumberOfvalue.default,
              },
            ];
            setColumnsData(defaultColumnsData);
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données de colonnes:", error);
      }
    };
    fetchColumnsData();
  }, [columnsData.length, serviceName, month]);

  const handleSubmitClick = async () => {
    try {
      // Préparer les données de la requête
      const requestData = {
        Dates: rows.map((row) => row.Date),
        SeniorList: rows.map((row) => row.Senior || " "),
        AssistantList: rows.map((row) => row.Assistant || " "),
        InterneList: rows.map((row) => row.Interne || " "),
      };
      // Envoyer la requête PUT
      const response = await axios.put(
        `http://localhost:5000/api/guardboard/updateboard/${encodedText}`,
        requestData
      );
      toast.success("Tableau mis à jour avec succès:", response);
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du tableau:", error);
      console.error("Erreur lors de la mise à jour du tableau:", error);
    }
  };

  const handleCellValueChanged = (params) => {
    const { rowIndex, colDef, newValue } = params;
    const updatedRows = rows.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, [colDef.field]: newValue };
      }
      return row;
    });
    setRows(updatedRows);
    props.addRows(updatedRows);
  };

  const columnDefs = columnsData.map((columnData) => ({
    field: columnData.field,
    headerName: `${columnData.headerName} (${columnData.NumberOfValues}*)`,
    editable: true,
    cellEditorPopup: true,
    cellEditorPopupPosition: "under",
    cellEditor: CustomCellEditor,
    cellEditorParams: (params) => ({
      value: params.value,
      NumberOfValues: columnData.NumberOfValues,
      service: selectedServiceId,
      role: columnData.field,
      onChange: (newValue) => {
        const rowIndex = params.rowIndex;
        const updatedRows = [...rows];
        updatedRows[rowIndex][columnData.field] = newValue;
        setRows(updatedRows);
      },
    }),
  }));

  useEffect(() => {
    const fetchAcceptedLeaveRequests = async () => {
      try {
        const [rawMonth, onlyYear] = month.split("/");
        const onlyMonth = parseInt(rawMonth, 10).toString();

        const response = await axios.get(
          `http://localhost:5000/api/demandeLeave/${selectedServiceId}?month=${onlyMonth}&year=${onlyYear}`
        );
        setAcceptedLeaveRequests(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des demandes de congé acceptées:", error);
      }
    };

    fetchAcceptedLeaveRequests();
  }, [month, selectedServiceId]);
  useEffect(() => {
    const fetchAcceptedLeaveRequests = async () => {
      try {
        const [rawMonth, onlyYear] = month.split("/");
        const onlyMonth = parseInt(rawMonth, 10).toString();

        const response = await axios.get(
          `http://localhost:5000/api/permutationRequest/${selectedServiceId}?month=${onlyMonth}&year=${onlyYear}`
        );
        setAcceptedPermutationRequests(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des demandes de congé acceptées:", error);
      }
    };

    fetchAcceptedLeaveRequests();
  }, [month, selectedServiceId]);
  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="container">
      <Toaster />
      {columnsData ? (
        <>
            <div className="text-center pt-5">
            <h2 className="text-center">
  Liste des demandes à appliquer pour le mois de {" "}
  <strong>{month}</strong>.
</h2>
        
       </div>
          <div className="container my-5 p-3 bg-white shadow card text-center">
            <div className="card-header text-bg-primary fw-bold">
              Demandes de Congé à appliquer
            </div>
            <div className="card-body">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Nom de la Employee</th>
                    <th>Date de Début</th>
                    <th>Date de Fin</th>
                    <th>Nombre de Jours</th>

                    <th>Appliqué</th>
                  </tr>
                </thead>
                <tbody>
                  {acceptedLeaveRequests.length > 0 ? (
                    acceptedLeaveRequests.map((request, index) => (
                      <tr key={index}>
                        <td>
                          {request.employee.firstname}{" "}
                          {request.employee.lastname}
                        </td>
                        <td>{formatDateString(request.startDate)}</td>
                        <td>{formatDateString(request.endDate)}</td>
                        <td>{request.numberOfDays}</td>
                        <td>
                          <StatusDropdown
                            request={request}
                            onChange={onChange}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">
                        
                        <p>Aucune demande de congé acceptée trouvée</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
             
            </div>
          </div>
          <div className="container my-5 p-3 bg-white shadow card text-center">
            <div className="card-header text-bg-primary fw-bold">
              Demandes de permutation à appliquer
            </div>
            <div className="card-body">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Nom de la Employee</th>
                    <th>Date de Début</th>
                    <th>Date de Fin</th>
                    <th>Nombre de Jours</th>

                    <th>Appliqué</th>
                  </tr>
                </thead>
                <tbody>
                  {acceptedPermutationRequests.length > 0 ? (
                    acceptedPermutationRequests.map((request, index) => (
                      <tr key={index}>
                        <td>
                          {request.employee.firstname}{" "}
                          {request.employee.lastname}
                        </td>
                        <td>
                          {request.employeeSwitch.firstname}{" "}
                          {request.employeeSwitch.lastname}
                        </td>  
                          <td>{new Date(request.date).toLocaleDateString()}</td>
                        <td>{request.reason}</td>
                        <td>
                          <StatusDropdown
                            request={request}
                            onChange={onChange}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">
                       
                        <p>Aucune demande de congé acceptée trouvée</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
             
            </div>
          </div>
          <div className="text-center ">
         <h2 className="text-center">
           Modification de tableau de garde de service {" "}
           <strong className="text-primary">{serviceName}</strong> de (
           <strong className="text-primary" >{month}</strong>).
         </h2>
        
       </div>
          <div
            className=" container my-5 p-3 bg-white shadow ag-theme-alpine"
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
                sortable: false,
                flex: 1,
              }}
            />
          </div>
          <p>&quot; N'oubliez pas de changer le statut appliqué avant de soumettre les modifications <small className="text-danger">*</small>&quot;</p>
              <p>&quot;N'oubliez pas de vérifier une deuxième fois avant de soumettre les modifications <small className="text-danger">*</small>&quot;</p>
          <div className="table-entry-button-wrapper">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmitClick}
            >
              Soumettre les modifications
            </button>
            <button
              type="button"
              className="btn btn-success ml-3"
              onClick={() => navigate("/secretary/table-view")}
            >
              Voir le tableau
            </button>
          </div>
        </>
      ) : (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div>
            <h2 className="text-center">Veuillez sélectionner un service</h2>
            <img src={EmptyBox} alt="Boîte Vide" className="d-block mx-auto" />
          </div>
        </div>
      )}
    </div>
  );
};
export default TableModify;
