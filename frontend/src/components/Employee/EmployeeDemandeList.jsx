import  { useState } from 'react';

const EmployeeDemandeList = () => {
  const demandesList = [
    "Demande de Congé",
    "Demande de Formation",
    "Demande de Permutation de Garde",
    "Demande de documents",
    "Autres"
  ];

  const [selectedDemande, setSelectedDemande] = useState(""); 

  const handleDemandeChange = (event) => {
    setSelectedDemande(event.target.value);
  };

  const handleSendDemande = () => {
    console.log("Sending demande:", selectedDemande);
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
        <p className="mb-2 text-secondary">demande personnelle</p>
        <select  className="form-select" value={selectedDemande} onChange={handleDemandeChange}>
          <option value="">Sélectionnez une demande</option>
          {demandesList.map((demande, index) => (
            <option key={index} value={demande}>{demande}</option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={handleSendDemande} disabled={!selectedDemande}>Envoyer la demande</button>
      </div>
    </nav>
  );
};

export default EmployeeDemandeList;
