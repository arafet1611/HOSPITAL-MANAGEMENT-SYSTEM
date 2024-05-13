import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import { parseISO } from "date-fns"; // Importez parseISO depuis date-fns
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function ServerSelector({
  selectedService,
  setSelectedService,
  selectedDate,
  setSelectedDate,
  onFilter,
}) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/services");
        const services = response.data;

        if (services.length > 0) {
          setServices(services);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const handleDateChange = (date) => {
    const yearMonthDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const isoDate = parseISO(yearMonthDate.toISOString()); // Utilisez parseISO pour analyser la chaîne en objet de date
    setSelectedDate(isoDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ service: selectedService, date: selectedDate });
  };

  return (
    <div className="container my-5 p-3 bg-white shadow" lang="fr">
      <p className="h3 p-3">
        <h1 className=" h3 p-3">Recherche</h1>
        <hr className="hr" />
        <small className="text-muted h5">Select a Services</small>
      </p>
      <form className="container" onSubmit={handleSubmit}>
        <div className="form-group row">
          <label htmlFor=" website" className="col-sm-2 col-form-label">
            Services
          </label>
          <div className="col-sm-8">
            <select
              className="form-select mt-2 p-2 bg-light"
              name="service"
              id="service"
              onChange={handleServiceChange}
            >
              <option>Select a service</option>
              {services.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group row pt-3">
          <label htmlFor="lowRange" className="col-sm-2 col-form-label">
            Month
          </label>
          <div className="col-sm-5">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              className="form-control "
            />
          </div>
        </div>
        <div className="text-center pt-3">
          <button type="submit" className="btn btn-primary  px-5 shadow ">
            <strong>generate rosters</strong>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ServerSelector;
