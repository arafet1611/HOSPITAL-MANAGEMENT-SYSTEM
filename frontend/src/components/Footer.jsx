import img from "../assets/img/logo.jpg";
import "../styles/Footer.css";
function Footer() {
  return (
    <div>
      <footer className="bg-dark pt-4">
        <div className="container">
          <div className="Topbar row py-4">
            <div className="col-lg-3 col-12 align-left">
              <a className="navbar-brand" to="/" >
                <img
                  src={img}
                  style={{ maxWidth: "50%", height: "auto" }}
                  className="img-thumbnail"
                />
              </a>
              <p className="text-light my-lg-4 my-2">
                The Mahdia Hospital site is a modern and well-equipped
                healthcare facility
              </p>
              <ul className="list-inline footer-icons light-300">
                <li className="list-inline-item mx-2 social-media">
                  <a
                    className="text-light"
                    rel="noreferrer"
                    target="_blank"
                    href="http://facebook.com/"
                  >
                    <i className="bi bi-facebook"></i>
                  </a>
                </li>
                <li className="list-inline-item mx-2">
                  <a
                    className="text-light"
                    rel="noreferrer"
                    target="_blank"
                    href="https://www.linkedin.com/"
                  >
                    <i className="bi-linkedin"></i>
                  </a>
                </li>
                <li className="list-inline-item mx-2">
                  <a
                    className="text-light"
                    rel="noreferrer"
                    target="_blank"
                    href="https://www.github.com/"
                  >
                    <i className="bi-github"></i>
                  </a>
                </li>
                <li className="list-inline-item mx-2">
                  <a
                    className="text-light"
                    rel="noreferrer"
                    target="_blank"
                    href="https://www.twitter.com/"
                  >
                    <i className="bi-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item mx-2">
                  <a
                    className="text-light"
                    rel="noreferrer"
                    target="_blank"
                    href="https://www.instagram.com/"
                  >
                    <i className="bi-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-4 my-sm-0 mt-4">
              <h3 className="pb-lg-3 text-light light-300">SERVICES</h3>
              <ul className="list-unstyled text-light light-300">
                <li className="pb-2">
                  <i className="bi-chevron-right"></i>
                  <a
                    className="text-decoration-none text-light"
                    //to="/courses"
                    //  exact
                  >
                    Service1
                  </a>
                </li>
                <li className="pb-2">
                  <i className="bi-chevron-right"></i>
                  <a
                    className="text-decoration-none text-light"
                    //to="/tests"
                    //  exact
                  >
                    Service2
                  </a>
                </li>
                <li className="pb-2">
                  <i className="bi-chevron-right"></i>
                  <a
                    className="text-decoration-none text-light"
                    //to="/teacher_login"
                    //  exact
                  >
                    Service3
                  </a>
                </li>
                <li className="pb-2">
                  <i className="bi-chevron-right"></i>
                  <a
                    className="text-decoration-none text-light"
                    //to="/student_login"
                    //  exact
                  >
                    Service4
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-4 my-sm-0 mt-4">
              <h3 className="pb-lg-3 text-light light-300">Lorem</h3>
              <ul className="list-unstyled text-light light-300">
                <li className="pb-2">
                  <i className="bi-chevron-right"></i>
                  <a
                    className="text-decoration-none text-light"
                    //to="/"
                    // exact
                  >
                    Office Automation
                  </a>
                </li>
                <li className="pb-2">
                  <i className="bi-chevron-right"></i>
                  <a
                    className="text-decoration-none text-light"
                    //to="/"
                    //   exact
                  >
                    Web Development
                  </a>
                </li>
                <li className="pb-2">
                  <i className="bi-chevron-right"></i>
                  <a
                    className="text-decoration-none text-light"
                    //to="/"
                    // exact
                  >
                    Data Analysis
                  </a>
                </li>
                <li className="pb-2">
                  <i className="bi-chevron-right"></i>
                  <a
                    className="text-decoration-none text-light"
                    //to="/"
                    // exact
                  >
                    lorem
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-4 my-sm-0 mt-4">
              <h3 className="pb-lg-3 text-light light-300">
                OUR CONTACT DETAILS
              </h3>
              <ul className="list-unstyled text-light light-300">
                <li className="pb-2">
                  <i className="bi bi-telephone mx-2"></i>
                  <a
                    className="text-decoration-none text-light"
                    //to="/"
                    // exact
                  >
                    00216 73 109 000
                  </a>
                </li>
                <li className="pb-2">
                  <i className="bi bi-envelope mx-2"></i>
                  <a
                    className="text-decoration-none text-light"
                    // to="/"
                    //   exact
                  >
                    taharsfarmahdia@rnu.tn
                  </a>
                </li>
                <li className="pb-2">
                  <i className="bi bi-link-45deg mx-2"></i>
                  <a
                    className="text-decoration-none text-light"
                    //to="/contact"
                    //  exact
                  >
                    http://www.hopital-taharsfarmahdia.tn
                  </a>
                </li>
                <li className="pb-2">
                  <i className="bi bi-geo-alt mx-2 "></i>
                  <a
                    className="text-decoration-none text-light"
                    href="mailto:arafetalaya6@gmail.com"
                  >
                    Jbel Dar Ouaja Hiboun (mahdia)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-100 bg-primary py-3">
          <div className="container">
            <div className="row pt-2">
              <div className="col-lg-6 col-sm-12">
                <p className="text-lg-start text-center text-light light-300">
                  &copy; Copyright {new Date().getFullYear()} Hôpital Tahar
                  Sfar. All Rights Reserved.
                </p>
              </div>
              <div className="col-lg-6 col-sm-12">
                <p className="text-lg-end text-center text-light light-300">
                  Designed by <strong>Farouk & Arafet</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
