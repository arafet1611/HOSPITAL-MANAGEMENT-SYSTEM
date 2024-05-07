import MaleDoctorImg from "../../../assets/img/maleDoctor.png";
import FemaleDoctorImg from "../../../assets/img/femaleDoctor.png";

const UserInfoCard = ({ userNames }) => {
  console.log(userNames); // ['arafet alaya', 'meryem chabbi']
  
  const dummyData = [
    { name: "arafet alaya", role: "assistant", phone: "50177964", email: "arafet@exemple.com", image: MaleDoctorImg },
    { name: "meryem chabbi", role: "senior", phone: "55545664", email: "meryem@exemple.com", image: FemaleDoctorImg },
    { name: "farouk ben salem", role: "interne", phone: "555555555", email: "farouk@exemple.com", image: MaleDoctorImg },
    { name: "salim dahwaz", role: "interne", phone: "555555555", email: "salim@exemple.com", image: MaleDoctorImg },
    { name: "ghazi belhadj", role: "senior", phone: "55555555", email: "ghazi@exemple.com", image: MaleDoctorImg }
  ];
  
  const filteredData = dummyData.filter(data => userNames.includes(data.name));
  
  const columnsPerRow = Math.min(3, filteredData.length);
  
  return (
    <div className="container p-3 bg-white shadow">
      <div className="row">
        {filteredData.map((data, index) => (
          <div key={index} className={`col ${columnsPerRow === 3? 'col-sm-4' : 'col-sm-6'} ${columnsPerRow === 2? 'col-lg-6' : 'col-md-4'} ${columnsPerRow === 1? 'col-lg-12' : 'col-lg-4'}`}>
            <div className="d-flex text-black">
              <div className="flex-shrink-0">
                <img src={data.image} alt="Profile" className="img-fluid" style={{ width: "110px", borderRadius: "10px" }} />
              </div>
              <div className="flex-grow-1 ms-3">
                <h5 className="mb-1">{data.name}</h5>
                <p className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>{data.role}</p>
                <div className="d-flex justify-content-start rounded-3 p-2 mb-2" style={{ backgroundColor: "#efefef" }}>
                  <div>
                    <p className="small text-muted mb-1">Phone</p>
                    <p className="mb-0">{data.phone}</p>
                  </div>
                  <div className="px-3">
                    <p className="small text-muted mb-1">Email</p>
                    <p className="mb-0">{data.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInfoCard;
