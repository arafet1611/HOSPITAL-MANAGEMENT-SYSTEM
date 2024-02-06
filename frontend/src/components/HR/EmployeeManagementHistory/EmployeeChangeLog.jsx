function EmployeeChangeLog() {
  

    const dummyData = [
        { id: 1, employeeName: "John Doe", changedBy: "Admin", date: "2023-01-01", changeType: "Create" },
        { id: 2, employeeName: "Jane Doe", changedBy: "Manager", date: "2023-02-15", changeType: "Update" },
        { id: 3, employeeName: "Alice Smith", changedBy: "Admin", date: "2023-03-05", changeType: "Delete" },
        { id: 4, employeeName: "Bob Johnson", changedBy: "Manager", date: "2023-04-10", changeType: "Create" },
        { id: 5, employeeName: "Eva Brown", changedBy: "Admin", date: "2023-05-20", changeType: "Update" },
        { id: 6, employeeName: "Michael White", changedBy: "Manager", date: "2023-06-08", changeType: "Delete" },
        { id: 7, employeeName: "Sophie Miller", changedBy: "Admin", date: "2023-07-15", changeType: "Create" },
        { id: 8, employeeName: "Daniel Lee", changedBy: "Manager", date: "2023-08-25", changeType: "Update" },
        { id: 9, employeeName: "Olivia Davis", changedBy: "Admin", date: "2023-09-03", changeType: "Delete" },
        { id: 10, employeeName: "Matthew Taylor", changedBy: "Manager", date: "2023-10-12", changeType: "Create" },
      ];
  
    return (

      <div className="container my-5 p-3 bg-white shadow" lang="fr">
        <p className="h3 p-3">
          <strong>Historique</strong>
          <hr className="hr" />
          <small className="text-muted h5">Dernières 10 Changements</small>
        </p>
  
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col" className="bg-light">#</th>
              <th scope="col" className="bg-light">Nom de l'employé</th>
              <th scope="col" className="bg-light">Modifié par</th>
              <th scope="col" className="bg-light">Date</th>
              <th scope="col" className="bg-light">Type de changement</th>
              
            </tr>
          </thead>
          <tbody>
            {dummyData.map((data) => (
              <tr key={data.id}>
                <th scope="row">{data.id}</th>
                <td>{data.employeeName}</td>
                <td>{data.changedBy}</td>
                <td>{data.date}</td>
                <td>{data.changeType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default EmployeeChangeLog;
  