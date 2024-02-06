import { useState } from "react";
import EmployeeModification from "./EmployeeModification";

function EmployeeUpdateLog() {
  const [showModal, setShowModal] = useState(false);
  const dummyData = [
    {
      id: 1,
      modificationType: "Modification de Salaire",
      date: "15/10/2023",
      employeeName: "John Doe",
      changedBy: "Admin",
      oldValue: "2000dt",
      newValue: "2200dt",
    },
    {
      id: 2,
      modificationType: "Changement de Lieu",
      date: "16/10/2023",
      employeeName: "Jane Doe",
      changedBy: "Manager",
      oldValue: "Departement A",
      newValue: "Departement B",
    },
    {
      id: 3,
      modificationType: "Mise à Jour de Spécialité",
      date: "17/10/2023",
      employeeName: "Alice Smith",
      changedBy: "Admin",
      oldValue: "Médecine Générale",
      newValue: "Cardiologie",
    },
    {
      id: 4,
      modificationType: "Modification de Salaire",
      date: "18/10/2023",
      employeeName: "Bob Johnson",
      changedBy: "Manager",
      oldValue: "1800dt",
      newValue: "2000dt",
    },
  ];

  return (
    <>
      {" "}
      {showModal && <EmployeeModification setShowModal={setShowModal} />}
      <div className="container my-5 p-3 bg-white shadow" lang="fr">
        <p className="h3 p-3">
          <strong>Historique des Modifications</strong>
          <hr className="hr" />
          <small className="text-muted h5">Dernières 4 modifications</small>
        </p>
        <div className="list-group">
          {dummyData.map((data) => (
            <a
              className="list-group-item list-group-item-action flex-column align-items-start"
              key={data.id}
              onClick={() => {
                setShowModal(true);
              }}
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{data.modificationType}</h5>
                <small>{data.date}</small>
              </div>
              <p className="mb-1">
                L'employé <strong>{data.employeeName}</strong> a été modifié par{" "}
                <strong>{data.changedBy}</strong> - {data.modificationType}{" "}
                modifié de <strong>{data.oldValue}</strong> à{" "}
                <strong>{data.newValue}</strong>
              </p>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export default EmployeeUpdateLog;
