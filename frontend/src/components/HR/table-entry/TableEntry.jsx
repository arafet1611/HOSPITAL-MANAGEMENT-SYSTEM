import { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux"; // Importing hooks from react-redux
import { useNavigate , useLocation  } from "react-router-dom"; // Import useNavigate

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./TableEntry.css";
import { addRows } from "../../../redux/guardboard/rowSlice"; // Importing action from Redux slice
import CustomCellEditor from "../column-creation/CustomCellEditor";

const TableEntry = (props) => {
  const location = useLocation();

  const serviceName = location.state?.serviceName;
  const [nextMonth, setNextMonth] = useState("");
  const [nextMonthYear, setNextMonthYear] = useState("");
  const [daysInNextMonth, setDaysInNextMonth] = useState("");
  const [rows, setRows] = useState([]);
  const [dataOfEachDayOfNextMonth, setDataOfEachDayOfNextMonth] = useState([]);
  const [dateValues, setDateValues] = useState([]);
  const dispatch = useDispatch(); // Creating dispatch function
  const columnsData = useSelector(state => state.columns.columnsData);
  console.log("collumns data " ,columnsData) // Accessing columnsData from Redux store
const navigate =useNavigate()
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

  const handleSubmitClick = () => {
    const rowsWithDateValues = rows.map((row, index) => {
      return { ...row, Date: dateValues[index] };
    });
    dispatch(addRows(rowsWithDateValues));
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
      <div>
        <h1>Service Name: {serviceName}</h1>
      </div>

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
          onClick={() => navigate("/hr/table-view")} // Use navigate to navigate to "hr/table-view"
        >
          View Table
        </button>
      </div>
    </div>
  );
};



export default TableEntry;
