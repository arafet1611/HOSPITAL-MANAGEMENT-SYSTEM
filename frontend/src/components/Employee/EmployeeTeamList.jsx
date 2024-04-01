import  { useState } from "react";

const EmployeeTeamList = () => {
  const [collapsedItems, setCollapsedItems] = useState(Array(5).fill(true));

  const toggleCollapse = (index) => {
    const newCollapsedItems = [...collapsedItems];
    newCollapsedItems[index] = !newCollapsedItems[index];
    setCollapsedItems(newCollapsedItems);
  };

  const doctorColleagues = [
    {
      name: "Dr. John Smith",
      imageSrc: "doctor1.jpg",
      details: "Specialty: Cardiology, Experience: 10 years",
    },
    {
      name: "Dr. Emily Johnson",
      imageSrc: "doctor2.jpg",
      details: "Specialty: Pediatrics, Experience: 8 years",
    },
    {
      name: "Dr. Michael Brown",
      imageSrc: "doctor3.jpg",
      details: "Specialty: Orthopedics, Experience: 12 years",
    },
    {
      name: "Dr. Sarah Davis",
      imageSrc: "doctor4.jpg",
      details: "Specialty: Neurology, Experience: 7 years",
    },
    {
      name: "Dr. Lisa Wilson",
      imageSrc: "doctor5.jpg",
      details: "Specialty: Dermatology, Experience: 9 years",
    },
  ];

  return (
    <nav className="leftNav">
      <div
        className="employeeDetail container"
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
        {doctorColleagues.map((colleague, index) => (
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
                  {colleague.name}
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
                {colleague.details}
              </div>
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default EmployeeTeamList;
