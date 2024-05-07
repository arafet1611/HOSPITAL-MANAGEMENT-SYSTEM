function RequestsTabs() {
  return (
    <>
      <style>{styles}</style>

      <div className="filter col-md-12 p-2 d-flex justify-content-center">
        <ul className="nav">
          <li className="nav-item mx-lg-4">
            <a to="/" className="link text-white px-2">
              Demande de Congé
            </a>
          </li>
          <li className="nav-item mx-lg-4">
            <a to="/" className="link text-white px-2">
              Demande de Formation
            </a>
          </li>
          <li className="nav-item mx-lg-4">
            <a to="/" className="link text-white px-2">
              Demande d&apos;Équipement
            </a>
          </li>
          <li className="nav-item mx-lg-4">
            <a to="/" className="link text-white px-2">
              Question Générale
            </a>
          </li>
          <li className="nav-item mx-lg-4">
            <a to="/" className="link text-white px-2">
              demande document
            </a>
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