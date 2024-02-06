function CapacityOverview() {
  return (
    <div>
      <section className="mission_wrapper py-3">
        <div className="container pb-3">
          <div className="row">
            <h2 className="text-center col-12 py-5 semi-bold-600">
              CAPACITÉ HOSPITALIÈRE
            </h2>
          </div>
          <div className="row">
            <p className="col-10  text-centeroffset-2 col-lg-9 offset-lg-3 text-start pb-3 text-muted px-2">
              Conformément à l’arrêté ministériel du 02 Janvier 2020, l’hôpital <br />
              universitaire Charles Nicolle de Tunis possède une capacité de 1047 <br />
              lits et 30 berceaux répartis comme suit :
            </p>
            <ul className="col-10  offset-2 col-lg-9 offset-lg-3 text-start pb-3 text-muted px-2">
              <li>549 lits pour les spécialités chirurgicales dont 15 lits de soins intensifs</li>
              <li>498 lits pour les spécialités médicales</li>
              <li>30 berceaux pour la néonatologie</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CapacityOverview;
