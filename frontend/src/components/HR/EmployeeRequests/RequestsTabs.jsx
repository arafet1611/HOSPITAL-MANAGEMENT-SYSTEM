function RequestsTabs() {
    return (
      <div className="py-2 bg-light shadow">
        <div className="col-md-12">
          <ul className="nav d-flex justify-content-center">
            <li className="nav-item mx-lg-4">
              <a to="/" className="btn nav-link btn-info rounded-pill text-dark px-4 light-300">
                Demande de Congé
              </a>
            </li>
            <li className="nav-item mx-lg-4">
              <a to="/" className="btn nav-link btn-info rounded-pill text-dark px-4 light-300">
                Demande de Formation
              </a>
            </li>
            <li className="nav-item mx-lg-4">
              <a to="/" className="btn nav-link btn-info rounded-pill text-dark px-4 light-300">
                Demande d&apos;Équipement
              </a>
            </li>
            <li className="nav-item mx-lg-4">
              <a to="/" className="btn nav-link btn-info rounded-pill text-dark px-4 light-300">
                Question Générale
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  
  export default RequestsTabs;
  