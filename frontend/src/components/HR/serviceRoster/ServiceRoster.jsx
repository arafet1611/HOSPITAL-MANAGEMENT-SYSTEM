import { Table } from "react-bootstrap";
import { useQuery } from "@apollo/client";
// import { GET_EMPLOYEES } from "../../../graphql/queries/employeeQuery";
import { GET_DOCTORS } from "../../../graphql/queries/doctorQuery";
import { GET_NURSES } from "../../../graphql/queries/nurseQuery";
import { GET_TECHNICIANS } from "../../../graphql/queries/technicianQuery";
import { GET_WORKERS } from "../../../graphql/queries/workerQuery";
import { useEffect, useState } from "react";
import axios from "axios";
const ServiceRoster = ({ selectedService, selectedDate, filters }) => {
  const [rosters, setRosters] = useState([]);
  const [servicesMap, setServicesMap] = useState({});
  const { service, date } = filters;

  // const {
  //   loading: loadingEmployees,
  //   error: errorEmployees,
  //   data: dataEmployees,
  // } = useQuery(GET_EMPLOYEES);
  const {
    loading: loadingDoctors,
    error: errorDoctors,
    data: dataDoctors,
  } = useQuery(GET_DOCTORS);
  const {
    loading: loadingNurses,
    error: errorNurses,
    data: dataNurses,
  } = useQuery(GET_NURSES);
  const {
    loading: loadingTechnicians,
    error: errorTechnicians,
    data: dataTechnicians,
  } = useQuery(GET_TECHNICIANS);
  const {
    loading: loadingWorkers,
    error: errorWorkers,
    data: dataWorkers,
  } = useQuery(GET_WORKERS);

  useEffect(() => {
    const createRoster = async () => {
      try {
        const employeeData = {
          doctors: dataDoctors.doctors.map((doctor) => ({
            firstname: doctor.employee.firstname,
            lastname: doctor.employee.lastname,
            title: doctor.Type,
          })),
          nurses: dataNurses.nurses.map((nurse) => ({
            firstname: nurse.employee.firstname,
            lastname: nurse.employee.lastname,
            title: nurse.Type,
          })),
          technicians: dataTechnicians.technicians.map((technician) => ({
            firstname: technician.employee.firstname,
            lastname: technician.employee.lastname,
            title: technician.Type,
          })),
          workers: dataWorkers.workers.map((worker) => ({
            firstname: worker.employee.firstname,
            lastname: worker.employee.lastname,
            title: worker.Type,
          })),
        };

        await axios.post("http://localhost:5000/api/rosters", {
          service: selectedService,
          ...employeeData,
        });
      } catch (err) {
        console.log(err);
      }
    };

    if (selectedService) {
      createRoster();
    }
  }, [selectedService, dataDoctors, dataNurses, dataTechnicians, dataWorkers]);

  useEffect(() => {
    const fetchRosters = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/rosters");
        const rosters = response.data;

        if (rosters.length > 0) {
          setRosters(rosters);
          const serviceIds = rosters.map((roster) => roster.service);
          fetchServicesDetails(serviceIds);
        }
      } catch (error) {
        console.error("Error fetching rosters:", error);
      }
    };

    const fetchServicesDetails = async (servicesIds) => {
      const servicesDetails = {};
      for (const id of servicesIds) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/services/${id}`
          );
          servicesDetails[id] = response.data.title;
        } catch (error) {
          console.error(`Error fetching service with ID ${id}:`, error);
        }
      }
      setServicesMap(servicesDetails);
    };

    if (selectedService || selectedDate) {
      fetchRosters();
    }
  }, [selectedService, selectedDate]);

  if (loadingDoctors || loadingNurses || loadingTechnicians || loadingWorkers)
    return "Loading...";
  if (errorDoctors || errorNurses || errorTechnicians || errorWorkers)
    return "Error!";

  return (
    <>
      {rosters
  .filter((roster) => roster.service === service)
  .map((roster, index) => (
    <Table key={index} striped bordered hover>
      <thead>
        <tr>
          <th>Service</th>
          <th>Date</th>
        </tr>
        <tr>
          <td>{servicesMap[roster.service]}</td>
          <td>{roster.date}</td>
        </tr>
        <tr>
          <th colSpan="2" className="bg-primary text-white">
            Doctors
          </th>
        </tr>
        <tr>
          <th>Name</th>
          <th>Speciality</th>
        </tr>
      </thead>
      <tbody>
        {roster.employees.doctors.map((doctor, index) => (
          <tr key={index}>
            <td>
              {doctor.firstname} {doctor.lastname}
            </td>
            <td>{doctor.title}</td>
          </tr>
        ))}
      </tbody>
      <thead>
        <tr>
          <th colSpan="2" className="bg-primary text-white">
            Technicians
          </th>
        </tr>
        <tr>
          <th>Name</th>
          <th>Speciality</th>
        </tr>
      </thead>
      <tbody>
        {roster.employees.technicians.map((technician, index) => (
          <tr key={index}>
            <td>
              {technician.firstname} {technician.lastname}
            </td>
            <td>{technician.title}</td>
          </tr>
        ))}
      </tbody>
      <thead>
        <tr>
          <th colSpan="2" className="bg-primary text-white">
            Nurses
          </th>
        </tr>
        <tr>
          <th>Name</th>
          <th>Speciality</th>
        </tr>
      </thead>
      <tbody>
        {roster.employees.nurses.map((nurse, index) => (
          <tr key={index}>
            <td>
              {nurse.firstname} {nurse.lastname}
            </td>
            <td>{nurse.title}</td>
          </tr>
        ))}
      </tbody>

      <thead>
        <tr>
          <th colSpan="2" className="bg-primary text-white">
            workers
          </th>
        </tr>
        <tr>
          <th>Name</th>
          <th>Speciality</th>
        </tr>
      </thead>
      <tbody>
        {roster.employees.workers.map((worker, index) => (
          <tr key={index}>
            <td>
              {worker.firstname} {worker.lastname}
            </td>
            <td>{worker.title}</td>
          </tr>
        ))}
      </tbody>
    </Table>
        ))}
    </>
  );
};

export default ServiceRoster;