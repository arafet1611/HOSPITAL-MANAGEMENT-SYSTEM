import { useState, useEffect } from "react";
import EmptyBox from "../../../assets/img/emptybox.png";

import "semantic-ui-css/semantic.min.css";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./TableEntry.css";
import CustomCellEditor from "./CustomCellEditor";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const TableModify = (props) => {
  const [rows, setRows] = useState([]);
  const [columnsData, setColumnsData] = useState([]);
  const { serviceName } = useParams();
  const encodedText = encodeURIComponent(serviceName);
  const daysInMonth = useSelector((state) => state.dates);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (serviceName) {
          const response = await axios.get(
            `http://localhost:5000/api/guardboard/board/${serviceName}?Dates=${daysInMonth}`
          );
          const sortedData = response.data.sort((a, b) => new Date(a.Date) - new Date(b.Date));
          setRows(sortedData);
        }
      } catch (error) {
        toast.error("Error fetching data:", error.message);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [serviceName, daysInMonth]);

  useEffect(() => {
    const fetchColumnsData = async () => {
      try {
        if (!columnsData.length) {
          const response = await axios.get(
            `http://localhost:5000/api/guardboard/${serviceName}`
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

                sort: "asc", // Set default sorting to ascending
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
                headerName: "Interne",
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
        console.error("Error fetching columns data:", error);
      }
    };
    fetchColumnsData();
  }, [columnsData.length, serviceName]);

  const handleSubmitClick = async () => {
    try {
      // Prepare request data
      const requestData = {
        Dates: rows.map((row) => row.Date),
        SeniorList: rows.map((row) => row.Senior || " "),
        AssistantList: rows.map((row) => row.Assistant || " "),
        InterneList: rows.map((row) => row.Interne || " "),
      };
      // Send PUT request
      const response = await axios.put(
        `http://localhost:5000/api/guardboard/updateboard/${encodedText}`,
        requestData
      );
      toast.success("Table updated successfully:", response);
    } catch (error) {
      toast.error("Error updating table:", error);
      console.error("Error updating table:", error);
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
      onChange: (newValue) => {
        const rowIndex = params.rowIndex;
        const updatedRows = [...rows];
        updatedRows[rowIndex][columnData.field] = newValue;
        setRows(updatedRows);
      },
    }),
  }));

  return (
    <div className="container">
      <Toaster />
      {columnsData ? (
        <>
          <div className="ag-theme-alpine" style={{ height: 800, width: "100%" }}>
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
          <div className="table-entry-button-wrapper">
            <button type="button" className="btn btn-primary" onClick={handleSubmitClick}>
              Submit data
            </button>
            <button type="button" className="btn btn-success ml-3" onClick={() => navigate("/hr/table-view")}>
              View Table
            </button>
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

export default TableModify;

