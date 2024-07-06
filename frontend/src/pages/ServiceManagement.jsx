import ServiceList from "../components/Admin/serviceManagement/ServiceList";
import ServiceImage from "../assets/img/Services-image.png";
import { useState, useEffect } from "react";

function ServiceManagement() {
  const [image, setImage] = useState(null);
useEffect(() => {
console.log("image" ,image);

},[image])
  return (
    <div className="container-fluid ">
      
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
                    src={`http://localhost:5000/uploads/${image}`}
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
