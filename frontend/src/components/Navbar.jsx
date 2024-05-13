import "../Styles/Navbar.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

function Navbar() {
  const isNavbarSticky = useSelector((state) => state.navbar.isNavbarSticky);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");

    try {
      if (storedUserInfo) setUserInfo(JSON.parse(storedUserInfo));
    } catch (error) {
      console.error("Error parsing JSON:", error);
      setUserInfo(null);
    }
  }, []);
  const logout = () => {
    if (localStorage.getItem("userInfo")) {
      localStorage.removeItem("userInfo");
      toast.success("Logout successful" );

      setUserInfo(null);
    }
  };
  console.log(userInfo);
  return (
    <><Toaster />
    <div className={isNavbarSticky ? "sticky-top" : ""}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light  shadow ">
        <div className="container">
          <NavLink
            className="navbar-brand fs-3 fw-bold"
            to="/"
            exact
            title="Home"
          >
            ACCUEIL
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
              <li className="nav-item dropdown show">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  LE CHU
                </a>
                <div
                  className="dropdown-menu border-0 "
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="#">
                    MOT DE BIENVENUE
                  </a>
                  <div className="dropdown-divider bg-info"></div>

                  <a className="dropdown-item" href="#">
                    PRESENTATION DU CHU
                  </a>
                  <div className="dropdown-divider bg-info"></div>
                  <div className="dropend m-0 p-0">
                    <a
                      className="dropdown-item dropdown-toggle"
                      href="#"
                      id="dropdown-layouts"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      ORGANIZATIONS
                    </a>
                    <div className="dropdown-divider bg-info"></div>

                    <div
                      className="dropdown-menu border-0"
                      aria-labelledby="dropdown-layouts"
                    >
                      <a className="dropdown-item" href="#">
                        Fullscreen
                      </a>
                      <div className="dropdown-divider bg-info"></div>

                      <a className="dropdown-item" href="#">
                        Empty
                      </a>
                      <div className="dropdown-divider bg-info"></div>

                      <a className="dropdown-item" href="#">
                        Magic
                      </a>
                      <div
                        className="dropdown-divider bg-info"
                        style={{ height: "5px" }}
                      ></div>
                    </div>
                  </div>
                  <a className="dropdown-item" href="#">
                    NOS SERVICE
                  </a>
                  <div className="dropdown-divider bg-info"></div>

                  <a className="dropdown-item" href="#">
                    INDICATEURS CLES
                  </a>

                  <div
                    className="dropdown-divider bg-info"
                    style={{ height: "5px" }}
                  ></div>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarPatientDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  PATIENT
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarPatientDropdown"
                ></div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  ESPACE PROFESSIONNEL
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarEspaceProfessionnelDropdown"
                ></div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  RECHERCHE
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarEspaceProfessionnelDropdown"
                ></div>
              </li>
            </ul>
            <div className="navbar align-self-center d-flex">
              {!userInfo ? (
                <NavLink
                  className="nav-link text-success p-2"
                  to="/login"
                  exact
                  title="Login"
                >
                  Login
                </NavLink>
              ) : (
                <>
                  {" "}
                  <NavLink
                    className="nav-link text-success"
                    to="/my-profile"
                    exact
                    title="/profile"
                  >
                    Hello, Mr{" "}
                    <strong>
                      {" "}
                      {userInfo.firstname.charAt(0).toUpperCase() +
                        userInfo.firstname.slice(1)}{" "}
                      {userInfo.lastname.charAt(0).toUpperCase() +
                        userInfo.lastname.slice(1)}{" "}
                    </strong>
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    to="/notices"
                    exact
                    title="Notices"
                  >
                    <i
                      className="bi-bell text-primary fs-4 ms-2"
                      role="img"
                    ></i>
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    onClick={logout}
                    title="Logout"
                  >
                    <i
                      className="bi-box-arrow-right text-danger fs-4 ms-2"
                      role="img"
                    ></i>
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
    </>
  );
}

export default Navbar;
