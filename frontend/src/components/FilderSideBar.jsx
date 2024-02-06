function FilderSideBar() {
    return (
      <div className="bg-light border-right p-4 ">
        <h5 className="font-weight-bold p-3 mb-4 border-bottom">Filtres Avancés</h5>
        <form>
          <div className="form-group mb-3">
            <label htmlFor="search">Rechercher </label>
            <input type="text" className="form-control" id="search" placeholder="Entrez un mot clé" />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="salary">Salaire (DT)</label>
            <div className="d-flex align-items-center">
              <input type="number" className="form-control" id="Minimum" placeholder="Min" />
              <span className="mx-2">-</span>
              <input type="number" className="form-control" id="Maximum" placeholder="Max" />
            </div>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="department">Département</label>
            <select className="form-select" id="Department" style={{ fontSize: "0.80rem" }}>
              <option value="">Toutes les départements</option>
              <option value="Cardiologie">Cardiologie</option>
              <option value="Chirurgie">Chirurgie</option>
              <option value="Pédiatrie">Pédiatrie</option>
            </select>
          </div>
          <div className="form-group mb-3">
          <label htmlFor="doctorSpecialty">Spécialité du Médecin</label>
          <select className="form-select" id="doctorSpecialty" style={{ fontSize: "0.80rem" }}>
            <option value="">Toutes les spécialités</option>
            <option value="Cardiologue">Cardiologue</option>
            <option value="Orthopédiste">Orthopédiste</option>
            <option value="Gynécologue">Gynécologue</option>
            <option value="Pédiatre">Pédiatre</option>
          </select>
        </div>
          <div className="form-group mb-3">
            <label htmlFor="title">Titre</label>
            <select className="form-select" id="titre" style={{ fontSize: "0.80rem"  }}>
              <option value="" >Toutes les titres</option>
              <option value="Médecin">Médecin</option>
              <option value="Infirmière">Infirmière</option>
              <option value="Technicien">Technicien</option>
            </select>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="employeeStatus">État de l'Employée :</label>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" value="Active" id="Active" />
              <label className="form-check-label" htmlFor="Active">Actif</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" value="Inactive" id="Inactive" />
              <label className="form-check-label" htmlFor="Inactive">Inactif</label>
            </div>
          </div>
          <div className="d-flex justify-content-between p-0 m-0 ">
            <button type="submit" className="btn btn-primary ">FILTRER</button>
            <button type="button" className="btn btn-outline-secondary">Réinitialiser</button>
          </div>
        </form>
      </div>
    );
  }
  
  export default FilderSideBar;
  