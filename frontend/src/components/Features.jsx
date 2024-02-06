import SystemInfoBox from "../components/SystemInfoBox";
import { useState, useEffect } from "react";
import SighImg from "../assets/img/sigh.png";
import CollapsibleText from "../components/CollapsibleText";

function Features() {
  const [systemInfos, setSystemInfos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dummyData = [
    {
      _id: 1,
      sysInfo_Img: SighImg,
      sysInfo_Name: "Medical System A",
      sysInfo_outline: "Description of Medical System A",
    },
    {
      _id: 2,
      sysInfo_Img: SighImg,
      sysInfo_Name: "Administrative System B",
      sysInfo_outline: "Description of Administrative System B",
    },
    {
      _id: 3,
      sysInfo_Img: SighImg,
      sysInfo_Name: "Health Information System C",
      sysInfo_outline: "Description of Health Information System C",
    },
    {
      _id: 4,
      sysInfo_Img: SighImg,
      sysInfo_Name: "Financial Management System D",
      sysInfo_outline: "Description of Financial Management System D",
    },
    {
      _id: 5,
      sysInfo_Img: SighImg,
      sysInfo_Name: "Human Resources System E",
      sysInfo_outline: "Description of Human Resources System E",
    },
    {
      _id: 6,
      sysInfo_Img: SighImg,
      sysInfo_Name: "Inventory Control System F",
      sysInfo_outline: "Description of Inventory Control System F",
    },
  ];

  useEffect(() => {
    setSystemInfos(dummyData);
    setLoading(false);
    setError(null);
  }, []);

  return (
    <div>
      <div className="container">
      <div className="row text-left pb-5" >
              <h2 className="col-md-8 my-4 h2 semi-bold-600 text-center">
                Système d’Information Hospitalier
              </h2>
            </div>
        <div className="row ">
          <section className="col-md-8 px-0 mx-auto ">
            
            <div className="row gy-5 g-lg-5 mb-4  justify-content-center">
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                systemInfos.map((systemInfo) => (
                  <SystemInfoBox
                    key={systemInfo._id}
                    sysInfoImg={systemInfo.sysInfo_Img}
                    sysInfoId={systemInfo._id}
                    sysInfoName={systemInfo.sysInfo_Name}
                    sysInfoOutline={systemInfo.sysInfo_outline}
                  />
                ))
              )}
            </div>
          </section>
          
          <section className="col-md-4 mx-0 mb-0 ">
            <CollapsibleText />
          </section>
        </div>
      </div>
    </div>
  );
}

export default Features;
