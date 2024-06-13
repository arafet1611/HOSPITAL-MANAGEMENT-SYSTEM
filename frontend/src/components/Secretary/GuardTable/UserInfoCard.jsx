// import MaleDoctorImg from "../../../assets/img/maleDoctor.png";
 import FemaleDoctorImg from "../../../assets/img/femaleDoctor.png";
import { useQuery } from '@apollo/client';
import { GET_DOCTORS_BY_SERVICE } from '../../../graphQl/queries/doctorQuery';

const UserInfoCard = ({ userNames, service }) => {
  console.log("username", userNames);

  const { loading, error, data } = useQuery(GET_DOCTORS_BY_SERVICE, {
    variables: { ServiceId: service },
  });

  console.log("data", data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredData = data.doctorsByService.filter(datalist =>
    userNames.includes(datalist.employee.firstname + " " + datalist.employee.lastname)
  );

  const columnsPerRow = Math.min(3, filteredData.length);
  console.log(filteredData);

  return (
    <div className="container p-3 bg-white shadow">
      <div className="row">
        {filteredData.map((data, index) => (
          <div
            key={index}
            className={`col ${columnsPerRow === 3 ? 'col-sm-4' : 'col-sm-6'} ${columnsPerRow === 2 ? 'col-lg-6' : 'col-md-4'} ${columnsPerRow === 1 ? 'col-lg-12' : 'col-lg-4'}`}
          >
            <div className="d-flex text-black">
              <div className="flex-shrink-0">
                <img
                  src={FemaleDoctorImg}
                  alt="Profile"
                  className="img-fluid"
                  style={{ width: "110px", borderRadius: "10px" }}
                />
              </div>
              <div className="flex-grow-1 ms-3">
                <h5 className="mb-1">{data.employee.firstname + " " + data.employee.lastname}</h5>
                <p className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>{data.Type}</p>
                <div
                  className="d-flex justify-content-start rounded-3 p-2 mb-2"
                  style={{ backgroundColor: "#efefef" }}
                >
                  <div>
                    <p className="small text-muted mb-1">Phone</p>
                    <p className="mb-0">50132080</p>
                  </div>
                  <div className="px-3">
                    <p className="small text-muted mb-1">Email</p>
                    <p className="mb-0">exemple@gmail.com</p>
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
