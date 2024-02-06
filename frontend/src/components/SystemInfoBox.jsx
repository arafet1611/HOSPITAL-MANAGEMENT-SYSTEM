import { NavLink } from "react-router-dom";

function SystemInfoBox({ sysInfoImg, sysInfoId, sysInfoName, sysInfoOutline }) {
  return (
    <div className="col-xl-3 col-md-4 col-sm-6 filter frontend shadow m-2 p-0">
      <NavLink
        to={`/medical-administrative-information-system/${sysInfoId}`}
        exact
        className="card border-0 text-white shadow-sm overflow-hidden d-flex flex-column justify-content-between mx-5 m-sm-0"
        style={{
          textDecoration: "none",
          transition: "transform 0.3s ease-in-out", 
        }}
        onMouseOver={(event) =>
          (event.currentTarget.style.transform = "scale(1.05)")
        } 
        onMouseOut={(event) =>
          (event.currentTarget.style.transform = "scale(1)")
        } 
      >
        <div className="card-img-container">
          <img className="card-img" src={sysInfoImg} alt="sysInfoImage" />
        </div>
        <div className="text-center text-dark" style={{ margin: "20px " }}>
          <p
            className="card-text"
            style={{
              height: "3em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginBottom: "0",
            }}
          >
            <strong>{sysInfoName}</strong>
          </p>
          <p
            className="card-text"
            style={{ maxHeight: "50px", overflowY: "auto", margin: "10px 0" }}
          >
            {sysInfoOutline}
          </p>
          <span
            className="btn btn-outline-dark rounded-pill mb-3 px-4 light-300"
            onClick={() => {}}
            style={{ margin: "10px 0" }}
          >
            Voir plus
          </span>
        </div>
      </NavLink>
    </div>
  );
}

export default SystemInfoBox;
