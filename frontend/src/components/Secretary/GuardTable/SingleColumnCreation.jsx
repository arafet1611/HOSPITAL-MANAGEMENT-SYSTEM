import { useState, useEffect } from "react";

const SingleColumnCreation = ({
  columnNumber,
  onAddColumnData,
  defaultData,
}) => {
  const [state, setState] = useState({
    columnName: defaultData.columnName,
    columnType: defaultData.columnType,
    multiSelectValues: defaultData.multiSelectValues,
    NumberOfValues: defaultData.NumberOfValues,
  });
  const [added, setAdded] = useState(false);
  useEffect(() => {
    setState(defaultData);
  }, [defaultData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { ...stateWithoutAdded } = state;
    onAddColumnData({ ...stateWithoutAdded, columnNumber });
    setState({ ...state });
    setAdded(true);
  };

  const handleModifyAgain = () => {
    setState(defaultData);
    setAdded(false);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-5 p-3 bg-white shadow"   style={{ height: 220, width: "100%" }} >
              <h2 className="text-primary">Colonne #{columnNumber}</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group row ">
            <label className="col-sm-3 col-form-label" style={{fontSize: "smaller"}}><strong>Titre</strong> </label>
            <div className="col-sm-9 py-2">
              <input
                type="text"
                name="columnName"
                value={state.columnName}
                className="form-control  "
                placeholder="Entrez le titre de colonne"
                onChange={onChange}
                disabled
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label" style={{fontSize: "smaller"}} htmlFor="inputState">
              Type de colonne
            </label>
            <div className="col-sm-9 py-2">
              <select
                name="columnType"
                value={state.columnType}
                onChange={onChange}
                id="inputState"
                className="form-control "
                disabled
              >
                <option>Date</option>
                <option>Text</option>
                <option>Multiselect</option>
              </select>
            </div>
          </div>
          {state.columnType === "Multiselect" && (
            <div className="form-group row">
              <label className="col-sm-3 col-form-label" />
              <div className="col-sm-9 py-2">
                <input
                  type="text"
                  name="multiSelectValues"
                  value={state.multiSelectValues}
                  className="form-control "
                  placeholder="Entrez la liste des valeurs séparées par des virgules"
                  onChange={onChange}
                />
              </div>
            </div>
          )}
          {state.columnType !== "Date" ? (
            <div className="form-group row">
              <label className="col-sm-3 col-form-label" style={{fontSize: "smaller"}} >
                N° de valeurs acceptées
              </label>
              <div className="col-sm-9 py-2">
                <select
                  name="NumberOfValues"
                  value={state.NumberOfValues}
                  onChange={onChange}
                  className="form-control "
                >
                  {[...Array(11).keys()].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : null}

          {added && (
            <div className=" d-flex   bd-highlight buttons-wrapper">
              <div className="mx-1">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleModifyAgain}
                >
                  Modifier à nouveau
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SingleColumnCreation;
