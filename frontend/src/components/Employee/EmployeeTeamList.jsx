import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useQuery } from '@apollo/client';
import { GET_DOCTORS_BY_SERVICE } from '../../graphQl/queries/doctorQuery';

const EmployeeTeamList = () => {
  const [collapsedItems, setCollapsedItems] = useState([]);
  const userString = localStorage.getItem("userInfo");
  const user = JSON.parse(userString);
  const { loading, error, data } = useQuery(GET_DOCTORS_BY_SERVICE, {
    variables: { ServiceId: user.service },
  });
console.log(data);
  useEffect(() => {
    console.log("User:", user);
    console.log("User " + JSON.stringify(user, null, 2));
  }, [user]);

  useEffect(() => {
    if (data) {
      setCollapsedItems(new Array(data.doctorsByService.length).fill(true));
    }
  }, [data]);

  const toggleCollapse = (index) => {
    const newCollapsedItems = [...collapsedItems];
    newCollapsedItems[index] = !newCollapsedItems[index];
    setCollapsedItems(newCollapsedItems);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <nav className="leftNav">
      <Toaster />
      <div
        className="employeeDetail container my-5 p-3 bg-white shadow"
        style={{
          margin: "1rem",
          marginTop: "4rem",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <p className="mb-2 text-secondary">TEAM</p>
        {data && data.doctorsByService
          .filter(colleague => colleague.employee.id !== user._id)
          .map((colleague, index) => (
            <div className="card  m-2" key={index}>
              <div className="card-header" onClick={() => toggleCollapse(index)} style={{ cursor: 'pointer' }}>
                <h5 className="mb-2 mt-2">
                  <button
                    className={`btn ${collapsedItems[index] ? '' : 'collapsed'}`}
                    data-toggle="collapse"
                    data-target={`#collapse${index}`}
                    aria-expanded={collapsedItems[index] ? 'true' : 'false'}
                    aria-controls={`collapse${index}`}
                  >
                    {colleague.employee.firstname} {colleague.employee.lastname}
                    <i className={`bi ${collapsedItems[index] ? 'bi bi-chevron-down' : 'bi bi-chevron-up'}`}></i>
                  </button>
                </h5>
              </div>
              <div
                id={`collapse${index}`}
                className={`m-2 collapse ${collapsedItems[index] ? '' : 'show'}`}
                aria-labelledby={`heading${index}`}
                data-parent="#accordion"
              >
                <div className="card-body m-2">
                  <strong className="text-primary">Role: </strong> {colleague.Type} <br />
                  <strong className="text-primary">Responsabilité:</strong> {colleague.responsabilite}
                </div>
              </div>
            </div>
          ))}
      </div>
    </nav>
  );
};

export default EmployeeTeamList;
