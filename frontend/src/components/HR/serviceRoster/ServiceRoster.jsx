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
    const seniorChiefNurses = [
      {
        name: "ahmed kassem",
        speciality: "",
      },
      {
        name: "farouk ben salem",
        speciality: "",
      },
    ]
    const chiefNurses = [
      {
        name: "atef abdallah",
        speciality: "",
      },
      {
        name: "meryem ben salem",
        speciality: "",
      }
    ]
    const seniorNurses = [
      {
        name: "ali Said",
        speciality: "",
      },
      {
        name: "abir Said",
        speciality: "",
      }
    ]
    const workers =[
      {
        title: 'worker',
        name: "meryem chabbi",
        speciality: "cleaner",
      },
    ]
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th colSpan="2" className='bg-primary text-white'>Doctors</th>
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
    <thead>
        <tr>
          <th colSpan="2" className='bg-primary text-white'>senior Chief Technicians</th>
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
      <thead>
        <tr>
          <th colSpan="2" className='bg-primary text-white'>senior Chief Nurses</th>
        </tr>
        <tr>
          <th>Name</th>
          <th>Speciality</th>
        </tr>
      </thead>
      <tbody>
        {seniorChiefNurses.map((seniorChiefNurse, index) => (
          <tr key={index}>
            <td>{seniorChiefNurse.name}</td>
            <td>{seniorChiefNurse.speciality}</td>
          </tr>
        ))}
        </tbody>
        <thead>
        <tr>
          <th colSpan="2" className='bg-primary text-white'>chief Nurses</th>
        </tr>
        <tr>
          <th>Name</th>
          <th>Speciality</th>
        </tr>
      </thead>
      <tbody>
        {chiefNurses.map((chiefNurse, index) => (
          <tr key={index}>
            <td>{chiefNurse.name}</td>
            <td>{chiefNurse.speciality}</td>
          </tr>
        ))}
        </tbody>
        <thead>
        <tr>
          <th colSpan="2" className='bg-primary text-white'>senior Nurses</th>
        </tr>
        <tr>
          <th>Name</th>
          <th>Speciality</th>
        </tr>
      </thead>
      <tbody>
        {seniorNurses.map((seniorNurse, index) => (
          <tr key={index}>
            <td>{seniorNurse.name}</td>
            <td>{seniorNurse.speciality}</td>
          </tr>
        ))}
        </tbody>
        <thead>
        <tr>
          <th colSpan="2" className='bg-primary text-white'>workers</th>
        </tr>
        <tr>
          <th>Name</th>
          <th>Speciality</th>
        </tr>
      </thead>
      <tbody>
        {workers.map((worker, index) => (
          <tr key={index}>
            <td>{worker.name}</td>
            <td>{worker.speciality}</td>
          </tr>
        ))}
        </tbody>
    </Table>
  );
};

export default ServiceRoster;