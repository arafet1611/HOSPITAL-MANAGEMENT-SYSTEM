import React from 'react';
import { Table } from 'react-bootstrap';

const ServiceRoster = () => {
  const doctors = [
    { 
      name: "ali said", 
      speciality: "senior"
    },
    {
      name :"ahmed alaya",
      speciality : "senior"
    }
  ];

  const seniorChiefTechnicians = [
    { 
      name: "ali hobbi", 
      speciality: "interne"
    },
    {
      name :"amel alaya",
      speciality : "interne"
    }
  ];
    
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan="2" className='bg-primary text-white' >Doctors</th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Speciality</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={index}>
                <td>{doctor.name}</td>
                <td>{doctor.speciality}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div style={{ flex: 1 }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan="2" className='bg-primary text-white' >Doctors</th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Speciality</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={index}>
                <td>{doctor.name}</td>
                <td>{doctor.speciality}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div style={{ flex: 1 }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan="2" className='bg-primary text-white' >Doctors</th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Speciality</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={index}>
                <td>{doctor.name}</td>
                <td>{doctor.speciality}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div style={{ flex: 1 }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan="2" className='bg-primary text-white' >Doctors</th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Speciality</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={index}>
                <td>{doctor.name}</td>
                <td>{doctor.speciality}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div style={{ flex: 1 }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan="2" className='bg-primary text-white' >Doctors</th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Speciality</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={index}>
                <td>{doctor.name}</td>
                <td>{doctor.speciality}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div style={{ flex: 1 }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan="2" className='bg-primary text-white' >Doctors</th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Speciality</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={index}>
                <td>{doctor.name}</td>
                <td>{doctor.speciality}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div style={{ flex: 1 }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan="2" className='bg-primary text-white' >Doctors</th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Speciality</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={index}>
                <td>{doctor.name}</td>
                <td>{doctor.speciality}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div style={{ flex: 1 }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan="2" className='bg-primary text-white'>Senior Chief Technicians</th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Speciality</th>
            </tr>
          </thead>
          <tbody>
            {seniorChiefTechnicians.map((technician, index) => (
              <tr key={index + doctors.length}>
                <td>{technician.name}</td>
                <td>{technician.speciality}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ServiceRoster;