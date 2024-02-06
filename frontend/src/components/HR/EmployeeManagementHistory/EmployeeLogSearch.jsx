import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function EmployeeLogSearch() {
  return (
    <div className="container my-5 p-3 bg-white shadow" lang="fr">
      <p className="h3 p-3">
        <h1 className=" h3 p-3">Recherche</h1>
        <hr className="hr" />
        <small className="text-muted h5">ce que vous recherchez</small>
      </p>
      <form className="container">
        <div className="form-group row">
          <label htmlFor=" website" className="col-sm-2 col-form-label">
            Rechercher
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="website"
              placeholder="département, spécialité..."
            />
          </div>
        </div>
        <div className="form-group row pt-3">
          <label htmlFor="lowRange" className="col-sm-2 col-form-label">
            De
          </label>
          <div className="col-sm-4">
            <DatePicker
              selected={new Date()}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              className="form-control "
            />
          </div>
          <label htmlFor="highRange" className="col-sm-2 col-form-label">
            À
          </label>
          <div className="col-sm-4">
            <DatePicker
              selected={new Date()}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              className="form-control "
            />
          </div>
        </div>
        <div className="text-center pt-3">
          <button type="submit" className="btn btn-primary  px-5 shadow ">
            <strong>FILTRER</strong>
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeLogSearch;
