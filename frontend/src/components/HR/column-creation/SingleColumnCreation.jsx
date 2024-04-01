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
    <div className="d-flex justify-content-center align-items-center ">
      <div>
        <h2>Colonne #{columnNumber}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Titre </label>
            <div className="col-sm-10">
              <input
                type="text"
                name="columnName"
                value={state.columnName}
                className="form-control "
                placeholder="Entrez le titre de colonne"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="inputState">
              Type de colonne
            </label>
            <div className="col-sm-10">
              <select
                name="columnType"
                value={state.columnType}
                onChange={onChange}
                id="inputState"
                className="form-control "
              >
                <option>Date</option>
                <option>Text</option>
                <option>Multiselect</option>
              </select>
            </div>
          </div>
          {state.columnType === "Multiselect" && (
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" />
              <div className="col-sm-10">
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
              <label className="col-sm-2 col-form-label">
                N° de valeurs acceptées
              </label>
              <div className="col-sm-10">
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

          <div className="d-flex flex-row-reverse bd-highlight buttons-wrapper">
            <div className="mx-1">
              {added && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleModifyAgain}
                >
                  Modifier à nouveau
                </button>
              )}
            </div>
            <div className="mx-1">
              <button
                type="submit"
                disabled={added}
                className="btn btn-primary"
              >
                {added ? "Enregistré" : "Enregistrer"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingleColumnCreation;
