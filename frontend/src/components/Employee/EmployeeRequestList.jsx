import  { useState } from 'react';

const EmployeeRequestList = () => {
  const RequestsList = [
    "Request de fournitures médicales",
    "Request d'Equipement",
    "Autres",
  ];

  const [selectedRequest, setSelectedRequest] = useState(""); 

  const handleRequestChange = (event) => {
    setSelectedRequest(event.target.value);
  };

  const handleSendRequest = () => {
    console.log("Sending Request:", selectedRequest);
  };
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
        <p className="mb-2 text-secondary">Demandes de Fournitures et d&apos;Équipement </p>
        <select className="form-select" value={selectedRequest} onChange={handleRequestChange}>
          <option value="">Sélectionnez une demande</option>
          {RequestsList.map((Request, index) => (
            <option key={index} value={Request}>{Request}</option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={handleSendRequest} disabled={!selectedRequest}>Envoyer la demande</button>
      </div>
    </nav>
  );
};

export default EmployeeRequestList;
