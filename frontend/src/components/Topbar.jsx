import img from "../assets/topleft1.png";
import "../styles/Topbar.css";
import {
  FaPhoneAlt,
  FaFax,
  FaTwitter,
  FaFacebookF,
  FaGooglePlusG,
  FaLinkedinIn,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function Topbar() {

  return (
    <header className="container-fluid bg-light">
        <div className="container" >
      <div className="row ">
        <div className="col-md-6">
          <img className="m-2" src={img} alt="logo" />
        </div>
        <div className="col-md-6 ">
          <nav className="d-flex justify-content-end">
            <div className="d-flex align-items-start flex-row m-2">
              <ul className="phone-contact mr-3 list-unstyled d-flex flex-row align-items-center m-0 ">
                <li className="mx-1">
                  <FaPhoneAlt size="13px" color="#555555" />
                </li>
                <li className="mr-2">L&apos;urgence</li>{" "}
                <li className="mr-3">
                  <strong>(+216)73-109-000 </strong>
                </li>
              </ul>
              <span className="px-2">
                <ul className="phone-contact mr-3 list-unstyled d-flex flex-row  ">
                  <li className="mx-1">
                    <FaFax size="13px" color="#555555" />
                  </li>
                  <li>
                    <strong> 73-671-744</strong>
                  </li>
                </ul>
              </span>
            </div>

            <ul className="social-media list-unstyled d-flex  ">
              <li className="m-1">
                <a href="https://www.twitter.com">
                  <FaTwitter size="13px" color="#555555" />
                </a>
              </li>
              <li className="m-1">
                <a href="https://www.facebook.com">
                  <FaFacebookF size="13px" color="#555555" />
                </a>
              </li>
              <li className="m-1">
                <a href="https://www.gmail.com">
                  <FaGooglePlusG size="17px" color="#555555" />
                </a>
              </li>
              <li className="m-1">
                <a href="https://www.instagram.com">
                  <FaLinkedinIn size="13px" color="#555555" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      
      </div>
      <hr className="hr " style={{marginTop: 0 , marginBottom: 0 }} />
      
    </header>
  );
}

export default Topbar;
