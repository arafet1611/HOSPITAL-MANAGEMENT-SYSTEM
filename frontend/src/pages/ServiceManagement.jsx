import ServiceList from "../components/Admin/serviceManagement/ServiceList";
import ServiceImage from "../assets/img/Services-image.png";
import { FaHospital ,FaUserDoctor , FaUserNurse ,FaHospitalUser } from "react-icons/fa6";
import { useState, useEffect } from "react";

function ServiceManagement() {
  const [image, setImage] = useState(null);
useEffect(() => {
console.log("image" ,image);

},[image])
  return (
    <div className="container-fluid ">
      <div className="container-fluid py-4 px-4  " style={{ backgroundColor: "#0056b3"}}>
        
      <div className="row g-4">
        <div className="col-sm-6 col-xl-3">
          <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
            <FaHospital className="text-primary" style={{ fontSize: '3em' }} />
            <div className="ms-3">
              <p className="mb-2">Nombre total <br/> de services</p> 
              <h6 className="mb-0">1234</h6>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
            <FaUserDoctor className="text-primary" style={{ fontSize: '3em' }} />
            <div className="ms-3">
              <p className="mb-2">Nombre total <br/> de médecins</p>
              <h6 className="mb-0">1234</h6>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
            <FaUserNurse className="text-primary" style={{ fontSize: '3em' }} />
            <div className="ms-3">
              <p className="mb-2">Nombre total <br/>d&apos;infirmières</p> 
              <h6 className="mb-0">1234</h6>

            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
            <FaHospitalUser className="text-primary" style={{ fontSize: '3em' }} />
            <div className="ms-3">
              <p className="mb-2">Nombre total <br/>d&apos;employés</p> 
              <h6 className="mb-0">1234</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className=" container   ">

        <div className="row">
          <div className="col-md-7 ">
            <ServiceList setImage={setImage} />
          </div>
          <div className="col-md-5 ">
            <div className="container my-1 p-1 " lang="fr">
              <div>
                <p className="h3 p-3">
                  <strong>Service En Image</strong>
                  <hr className="hr" />
                  <img
                    src={ ServiceImage}
                    className="rounded"
                    width={500}
                    height={700}
                    alt="Services en Image"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceManagement;
