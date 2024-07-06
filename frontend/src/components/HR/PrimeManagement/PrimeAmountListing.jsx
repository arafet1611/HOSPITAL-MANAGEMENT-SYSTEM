import  { useState, useEffect,  } from "react";
import { useQuery } from "@apollo/client";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GET_DOCTORS_BY_SERVICE } from "../../../graphQl/queries/doctorQuery";
import EmptyBox from "../../../assets/img/emptybox.png";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const PrimeAmountListing = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [serviceId, setServiceId] = useState(null);
  const [workingYear, setWorkingYear] = useState(new Date().getFullYear());
  const [vacationDates, setVacationDates] = useState([]);
  const [sunDays, setSunDays] = useState([]);
  const [primeValues, setPrimeValues] = useState({});
  const [employeePrimes, setEmployeePrimes] = useState([]);
  const [showTables, setShowTables] = useState(false);
console.log("employeePrimes", employeePrimes)

  useEffect(() => {
    const fetchPrimeValues = async () => {
      try {
        console.log("workingYear", workingYear);
        const response = await axios.get(
          `http://localhost:5000/api/prime/${workingYear}`
        );
        const primes = response.data;
        setPrimeValues(primes);
      } catch (error) {
        console.error("Error fetching primes:", error);
      }
    };
    fetchPrimeValues();
  }, [workingYear]);

  useEffect(() => {
    const fetchEmployeePrimes = async () => {
      if (!serviceId) return;
      try {
        console.log("workingYear", workingYear);
        const response = await axios.get(
          `http://localhost:5000/api/prime/employeeprime/${serviceId}?year=${workingYear}`
        );
        const employeePrime = response.data;
        console.log("employeePrime", employeePrime);
        setEmployeePrimes(employeePrime);
      } catch (error) {
        console.error("Error fetching employee primes:", error);
      }
    };
    fetchEmployeePrimes();
  }, [serviceId, workingYear]);

  useEffect(() => {
    const fetchVacations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/vacations");
        console.log("vacations list", response.data);

        const generateDates = (startDate, endDate) => {
          const dates = [];
          let currentDate = new Date(startDate);
          const end = new Date(endDate);
          while (currentDate <= end) {
            dates.push(currentDate.toISOString().split("T")[0]);
            currentDate.setDate(currentDate.getDate() + 1);
          }
          return dates;
        };

        const vacationDays = response.data.flatMap((vacation) =>
          generateDates(vacation.startDate, vacation.endDate)
        );
        setVacationDates(vacationDays);
      } catch (error) {
        console.error("Error fetching vacations:", error);
      }
    };
    fetchVacations();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/services");
        const services = response.data;
        console.log(services);
        if (services.length > 0) {
          setServices(services);
        }
      } catch (error) {
        toast.error("Error fetching services");
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const { loading, error, data } = useQuery(GET_DOCTORS_BY_SERVICE, {
    variables: { ServiceId: serviceId },
    skip: !serviceId,
  });

  useEffect(() => {
    if (selectedService) {
      const selected = services.find(
        (service) => service.title === selectedService
      );
      setServiceId(selected ? selected._id : null);
    } else {
      setServiceId(null);
    }
  }, [selectedService, services]);
  useEffect(() => {
    console.log("employee primes", employeePrimes);
    console.log("prime values", primeValues);
  }, [employeePrimes, primeValues]);
  useEffect(() => {
    if (workingYear) {
      setSunDays(getAllSundays(workingYear));
    }
  }, [workingYear]);

  const onYearChange = (date) => {
    setWorkingYear(date.getFullYear());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const results = [];
      for (const doctor of data.doctorsByService) {
        console.log("doctorid", doctor.employee, "year", workingYear);

        const response = await axios.get(
          `http://localhost:5000/api/employeeGaurdboard/getAllByYear/${doctor.employee.id}?year=${workingYear}`
        );
        const employeeGuard = response.data;
console.log(employeeGuard);
        const { nbOfDaysWeekend, nbOfDaysHolidays, nbOfDaysRegular } =
          calculateGuardingDays(employeeGuard);

        const primeResponse = await axios.post(
          `http://localhost:5000/api/prime/calculate`,
          {
            service: serviceId,
            employee: doctor,
            workingYear: workingYear,
            nbOfDaysSeniorWorkingOnWeekend:
              doctor.Type === "senior" ? nbOfDaysWeekend : 0,
            nbOfDaysSeniorWorkingOnHolidays:
              doctor.Type === "senior" ? nbOfDaysHolidays : 0,
            nbOfDaysSeniorWorkingOnRegularDays:
              doctor.Type === "senior" ? nbOfDaysRegular : 0,
            nbOfDaysAssistantWorkingOnWeekend:
              doctor.Type === "assistant" ? nbOfDaysWeekend : 0,
            nbOfDaysAssistantWorkingOnHolidays:
              doctor.Type === "assistant" ? nbOfDaysHolidays : 0,
            nbOfDaysAssistantWorkingOnRegularDays:
              doctor.Type === "assistant" ? nbOfDaysRegular : 0,
            nbOfDaysResidentWorkingOnWeekend:
              doctor.Type === "interne" ? nbOfDaysWeekend : 0,
            nbOfDaysResidentWorkingOnHolidays:
              doctor.Type === "interne" ? nbOfDaysHolidays : 0,
            nbOfDaysResidentWorkingOnRegularDays:
              doctor.Type === "interne" ? nbOfDaysRegular : 0,
          }
        );

        results.push({
          doctor: doctor,
          employeeGuard: employeeGuard,
          bonusTotal: primeResponse.data.bonusTotal,
        });
      }
      setShowTables(true);
      console.log("Guarding Dates by Employee", results);
      setEmployeePrimes(results);
    } catch (error) {
      toast.error("Error fetching guarding dates");
      console.error("Error fetching guarding dates:", error);
    }
  };

  const calculateGuardingDays = (employeeGuard) => {
    let nbOfDaysWeekend = 0;
    let nbOfDaysHolidays = 0;
    let nbOfDaysRegular = 0;

    employeeGuard.forEach((guardDate) => {
      const formattedDate = guardDate.split("T")[0];
      if (sunDays.includes(formattedDate)) {
        nbOfDaysWeekend++;
      } else if (vacationDates.includes(formattedDate)) {
        nbOfDaysHolidays++;
      } else {
        nbOfDaysRegular++;
      }
    });

    return {
      nbOfDaysWeekend,
      nbOfDaysHolidays,
      nbOfDaysRegular,
    };
  };

  const getAllSundays = (year) => {
    const sundays = [];
    let date = new Date(year, 0, 1);

    while (date.getDay() !== 0) {
      date.setDate(date.getDate() + 1);
    }

    while (date.getFullYear() === year) {
      sundays.push(date.toISOString().split("T")[0]);
      date.setDate(date.getDate() + 7);
    }

    return sundays;
  };

  const calculateBonus = (employee, primeType, days) => {
    const primeValue = primeValues.find(
      (prime) => prime.service._id === employee.service
    );
    if (!primeValue) return 0;
    return primeValue[primeType] * days;
  };

  const renderAgGrid = (role) => {
    const filteredEmployees = employeePrimes.filter(
      (prime) => prime.doctor.Type === role
    );
    console.log("filteredEmployees" ,filteredEmployees)
    console.log("1" ,employeePrimes)
    console.log("f" ,  filteredEmployees)
console.log("1" , primeValues);
    const columnDefs = [
      {
        headerName: "Employee Name",
        valueGetter: (params) =>
          params.data.prime.doctor.employee.firstname +
          " " +
          params.data.prime.doctor.employee.lastname,
        width: 200,
        editable: false,
      },
      {
        headerName: "Prime",
        children: [
          {
            headerName: "Regular Days",
            children: [
              {
                headerName: "Number of Days",
                field: `prime.nbOfDays${role
                  .charAt(0)
                  .toUpperCase()}${role.slice(1)}WorkingOnRegularDays`,
                flex: 1,
                editable: false,
              },
              {
                headerName: "Unit",
                field: `primeValue.${role}WorkingOnRegularDaysBonus`,
                flex: 1,
                editable: false,
              },
              {
                headerName: "Total",
                field: `regularBonus`,
                flex: 1,
                editable: false,
              },
            ],
          },
          {
            headerName: "Weekends",
            children: [
              {
                headerName: "Number of Days",
                field: `prime.nbOfDays${role
                  .charAt(0)
                  .toUpperCase()}${role.slice(1)}WorkingOnWeekend`,
                flex: 1,
                editable: false,
              },
              {
                headerName: "Unit",
                field: `primeValue.${role}WorkingOnWeekendBonus`,
                flex: 1,
                editable: false,
              },
              {
                headerName: "Total",
                field: `weekendBonus`,
                flex: 1,
                editable: false,
              },
            ],
          },
          {
            headerName: "Holidays",
            children: [
              {
                headerName: "Number of Days",
                field: `prime.nbOfDays${role
                  .charAt(0)
                  .toUpperCase()}${role.slice(1)}WorkingOnHolidays`,
                flex: 1,
                editable: false,
              },
              {
                headerName: "Unit",
                field: `primeValue.${role}WorkingOnHolidaysBonus`,
                flex: 1,
                editable: false,
              },
              {
                headerName: "Total",
                field: `holidayBonus`,
                flex: 1,
                editable: false,
              },
            ],
          },
          {
            headerName: "Total",
            field: `bonusTotal`,
            width: 100,
            editable: false,
          },
        ],
      },
    ];

    const rowData = filteredEmployees.map((prime) => ({
      prime,
      holidayBonus: calculateBonus(
        prime.doctor,
        `${role}WorkingOnHolidaysBonus`,
        prime[`nbOfDays${role.charAt(0).toUpperCase()}${role.slice(1)}WorkingOnHolidays`]
      ),
      weekendBonus: calculateBonus(
        prime.doctor,
        `${role}WorkingOnWeekendBonus`,
        prime[`nbOfDays${role.charAt(0).toUpperCase()}${role.slice(1)}WorkingOnWeekend`]
      ),
      regularBonus: calculateBonus(
        prime.doctor,
        `${role}WorkingOnRegularDaysBonus`,
        prime[`nbOfDays${role.charAt(0).toUpperCase()}${role.slice(1)}WorkingOnRegularDays`]
      ),
      primeValue: primeValues.find(
        (primeValue) => primeValue.service._id === prime.doctor.employee.service
      ),
      bonusTotal: prime.bonusTotal,
    }));

    return (
      <div
        className="ag-theme-alpine container my-5 p-3 bg-white shadow"
        style={{ height: 400, width: "100%" }}
      >
        <AgGridReact columnDefs={columnDefs} rowData={rowData} />
      </div>
    );
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container-fluid">
      <Toaster />
      <div className="container my-5 p-3 bg-white shadow" lang="fr">
        <h1 className="h3 p-3">Selection</h1>
        <hr className="hr" />
        <small className="text-muted h5">Select a service</small>
        <form className="container" onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="website" className="col-sm-2 col-form-label">
              Nom de Service
            </label>
            <div className="col-sm-10">
              <select
                value={selectedService}
                className="form-control"
                onChange={(event) => {
                  setSelectedService(event.target.value);
                }}
              >
                <option value="">-- SELECT SERVICE --</option>
                {services.map((service) => (
                  <option key={service._id} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="lowRange" className="col-sm-2 col-form-label">
              Year
            </label>
            <div className="col-sm-10">
              <DatePicker
                dateFormat="yyyy"
                selected={new Date(workingYear, 0, 1)}
                showYearPicker
                className="form-control"
                onChange={onYearChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-4">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      {showTables ? (
        <>
          <div className="container my-5 py-5 px-3  bg-white shadow">
          <h3 className="text-center " style={{ fontSize: '1.5rem' }}>Primes mensuelles des médecins <strong className="text-primary">senior</strong> en <strong className="text-primary">{workingYear}</strong> </h3>
            {renderAgGrid("senior")}
            <h3 className="text-center " style={{ fontSize: '1.5rem' }}>Primes mensuelles des médecins  <strong className="text-primary">assistant</strong> en <strong className="text-primary">{workingYear}</strong> </h3>
            {renderAgGrid("assistant")}
            <h3 className="text-center " style={{ fontSize: '1.5rem' }}>Primes mensuelles des médecins  <strong className="text-primary">résidents</strong> en <strong className="text-primary">{workingYear}</strong> </h3>
            {renderAgGrid("interne")}
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

export default PrimeAmountListing;
