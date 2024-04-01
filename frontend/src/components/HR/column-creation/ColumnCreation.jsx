import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import SingleColumnCreation from "./SingleColumnCreation";
import { addColumns } from "../../../redux/guardboard/columnSlice";
import "./ColumnCreation.css";

const ColumnCreation = () => {
  const defaultColumnsData = [
    { columnName: "Date", columnType: "Date", NumberOfValues: 1 },
    { columnName: "Senior", columnType: "Text", NumberOfValues: 1 },
    { columnName: "Assistant(e)", columnType: "Text", NumberOfValues: 2 },
    { columnName: "Interne", columnType: "Text", NumberOfValues: 2 },
    // { columnName: "Autre(s)", columnType: "Text", NumberOfValues: 1 },
  ];
  const [columns] = useState(4);
  const [submitted, setSubmitted] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [columnsData, setColumnsData] = useState(defaultColumnsData);

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
  const handleSubmitClick = () => {
    console.log("Validation finale");
    console.log(columnsData);
    setSubmitted(true);
    dispatch(addColumns(columnsData));
  };
  const handleAddColumnData = (columnData) => {
    setColumnsData((prevData) => {
      const updatedData = [...prevData];
      updatedData[columnData.columnNumber - 1] = columnData;
      return updatedData;
    });
  };
  return (
    <div className="container-fluid ">
    <div className=" container jumbotron column-creation-wrapper bg-light">
      <div >
        <h1 className="display-4 text-center">
          Créer un tableau de garde d&apos;un service
        </h1>
        <p className="lead text-center">
          Créez un tableau de garde spécifique pour visualiser quel employé est
          de garde dans chaque service chaque jour du mois à l&apos;hôpital.
        </p>
        <hr className="my-4" />
      </div>
      <div className="  d-flex  justify-content-center align-items-center">
        <div className="w-50">
          <h2>Sélectionnez le nom du service</h2>
          <form onSubmit={""}>
            <div className="form-group row ">
              <label className="col-sm-2 col-form-label">Nom du service</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  name="columnName"
                  value={serviceName}
                  className="form-control "
                  placeholder="Entrez le nom du service"
                  onChange={(event) => setServiceName(event.target.value)}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <hr className="my-4" />
      {renderColumnForms()}
      <p className="font-italic text-muted">
        &quot;Ne pas oublier de vérifier que chaque colonne est enregistrée
        avant la validation des colonnes.&quot;{" "}
        <strong className="text-danger "> * </strong>
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
            navigate("/hr/table-entry", { state: { serviceName: serviceName } }) 

          }
        >
          Aller à l&apos;entrée du tableau
        </button>
      )}
    </div>
    </div>
  );
};


export default ColumnCreation;
