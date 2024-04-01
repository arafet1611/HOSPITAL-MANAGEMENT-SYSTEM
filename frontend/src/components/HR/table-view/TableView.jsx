import { useState, useEffect } from "react";
import ReactDataGrid from "react-data-grid";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useSelector } from "react-redux"; 

import "../table-entry/TableEntry.css";

const TableView = () => {
  const [tableRows, setTableRows] = useState([]);
  const navigate = useNavigate();

  const columnsData = useSelector(state => state.columns.columnsData);
  const rowsData = useSelector(state => state.rows.rowsData);

  useEffect(() => {
    setTableRows(rowsData);
  }, [rowsData]);

  const restructureTable = () => {
    window.location.assign("/");
  };

  const gridColumns = columnsData.map((columnData) => ({
    key: columnData.columnName.replace(" ", ""),
    name: (
      <span>
        {`${columnData.columnName} (${columnData.NumberOfValues}`}
        <strong className="text-danger"> * </strong>
        {` )`}
      </span>
    ),
    editable: false,
  }));

  const rowGetter = (i) => {
    return tableRows[i];
  };

  return (
    <div className="container">
      {tableRows.length > 0 ? (
        <ReactDataGrid
          columns={gridColumns}
          rowGetter={rowGetter}
          rowsCount={tableRows.length}
          enableCellSelect={true}
          minHeight={800}
        />
      ) : (
        <div> loading</div>
      )}
      <div className=" table-entry-button-wrapper">
        <button
          type="button"
          className="btn btn-warning ml-2"
          onClick={() => navigate("/table-entry")}
        >
          Go back to Table entry
        </button>
        <button
          type="button"
          className="btn btn-danger ml-3"
          onClick={restructureTable}
        >
          Restructure table
        </button>
      </div>
      <br />
      <p className="font-italic text-muted text-right">
        All your data will be erased if you restructure table
      </p>
    </div>
  );
};

export default TableView;
