import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function ServerSelector() {
  return (
    <div className="container my-5 p-3 bg-white shadow" lang="fr">
      <p className="h3 p-3">
        <h1 className=" h3 p-3">Recherche</h1>
        <hr className="hr" />
        <small className="text-muted h5">Select a Services</small>
      </p>
      <form className="container">
        <div className="form-group row">
          <label htmlFor=" website" className="col-sm-2 col-form-label">
            Services
          </label>
          <div className="col-sm-8">
            <input
              type="dropdown"
              className="form-control"
              id="website"
            />
          </div>
        </div>
        <div className="form-group row pt-3">
          <label htmlFor="lowRange" className="col-sm-2 col-form-label">
             Month
          </label>
          <div className="col-sm-5">
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

export default ServerSelector;