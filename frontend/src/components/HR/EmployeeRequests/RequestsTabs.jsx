import { useState } from "react";

function RequestsTabs({ setSelectedTab }) {
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <style>{styles}</style>

      <div className="filter col-md-12 p-2 d-flex justify-content-center">
        <ul className="nav">
          <li className="nav-item mx-lg-4">
            <span
              className="link text-white px-2"
              onClick={() => handleTabClick("leaveRequests")}
            >
              Demande de Congé
            </span>
          </li>
          <li className="nav-item mx-lg-4">
            <span
              className="link text-white px-2"
              onClick={() => handleTabClick("permutationRequests")}
            >
              Demande de Permutation
            </span>
          </li>
          <li className="nav-item mx-lg-4">
            <span
              className="link text-white px-2"
              onClick={() => handleTabClick("trainingRequests")}
            >
              Demande de Formation
            </span>
          </li>
          <li className="nav-item mx-lg-4">
            <span
              className="link text-white px-2"
              onClick={() => handleTabClick("equipmentRequests")}
            >
              Demande D&apos;Équipement
            </span>
          </li>
          
          <li className="nav-item mx-lg-4">
            <span
              className="link text-white px-2"
              onClick={() => handleTabClick("documentRequests")}
            >
              Demande de Document
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default RequestsTabs;

const styles = `
  .filter {
    background-color: #0056b3;
  }
  .link {
    color: white;
    cursor: pointer;
    text-decoration: none !important;
    transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
  }
  
  .link:hover {
    background-color: #002D62;
    color: #ffffff !important;
    transform: scale(1.05); 
  } 
  .nav-item:hover .link {
    background-color: #002D62;
  }
`;
