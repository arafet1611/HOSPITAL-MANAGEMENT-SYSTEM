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
      sysInfo_Name: "Service churigie générale",
      sysInfo_outline: "Description de Service churigie générale",
    },
    {
      _id: 2,
      sysInfo_Img: SighImg,
      sysInfo_Name: "Service de pédiatrie",
      sysInfo_outline: "Description de Service de pédiatrie",
    },
    {
      _id: 3,
      sysInfo_Img: SighImg,
      sysInfo_Name: "Service ORL",
      sysInfo_outline: "Description de Service ORL",
    },
    {
      _id: 4,
      sysInfo_Img: SighImg,
      sysInfo_Name: "Service d'orthopédie",
      sysInfo_outline: "Description de  Service d'orthopédie",
    },
    {
      _id: 5,
      sysInfo_Img: SighImg,
      sysInfo_Name: "Service de neurologie",
      sysInfo_outline: "Description de Service de neurologie",
    },
    {
      _id: 6,
      sysInfo_Img: SighImg,
      sysInfo_Name: "Service de médecine d'urgence",
      sysInfo_outline: "Description de Service de médecine d'urgence",
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
