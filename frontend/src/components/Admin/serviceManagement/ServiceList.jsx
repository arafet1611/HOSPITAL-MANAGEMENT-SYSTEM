import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setNavbarSticky } from "../../../redux/navbar/NavbarSlice";
import AddServicePopupModel from "./addServicePopupModel";
import EditServicePopupModel from "./editServicePopupModel";
function ServiceList() {
  const [services, setServices] = useState([]);
  const [collapsedItems, setCollapsedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const[editModal , setEditModal] = useState(false);
  const [category , setCategory] = useState("");
  const [serviceId , setServiceId] = useState("");
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    axios.get("http://localhost:5000/api/services")
      .then(response => {
        const initialCollapsedState = response.data.map(() => true);

        setServices(response.data);
        setCollapsedItems(initialCollapsedState);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const toggleCollapse = (index) => {
    const newCollapsedItems = [...collapsedItems];
    newCollapsedItems[index] = !newCollapsedItems[index];
    setCollapsedItems(newCollapsedItems);
  };
 
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/services/${id}`)
      .then(response => {
        console.log("Service deleted successfully:", response.data.message);
        setServices(prevServices => prevServices.filter(service => service._id !== id));

      })
      .catch(error => {
        console.error("Error deleting service:", error);
      });
  };
 

  return (
    <>
          {showModal && category && <AddServicePopupModel setShowModal={setShowModal}  category={category}/>}
          {editModal && category && <EditServicePopupModel setEditModal ={setEditModal} category={category}  serviceId={serviceId} services={services}  />}
    <div className="container my-1 p-1" lang="fr">
    <div>
      <p className="h3 p-3">
        <strong>Liste De Service</strong>
        <hr className="hr" />
        <small className="text-muted h5">Services Catégorie A</small>
      </p>
      {services
        .filter((item) => item.category === "A")
        .map((item, index) => (
          <div className="card shadow m-2" key={item._id}>
            <div className="row">
              <div className="col-md-11">
                <div
                  className="card-header"
                  onClick={() => toggleCollapse(index)}
                  style={{ cursor: "pointer" }}
                >
                  <h5 className="mb-2 mt-2">
                    <button
                      className={`btn ${
                        collapsedItems[index] ? "" : "collapsed"
                      }`}
                      data-toggle="collapse"
                      data-target={`#collapse${index}`}
                      aria-expanded={collapsedItems[index] ? "true" : "false"}
                      aria-controls={`collapse${index}`}
                    >
                      <i
                        className={`bi ${
                          collapsedItems[index]
                            ? "bi bi-chevron-down"
                            : "bi bi-chevron-up"
                        }`}
                      />
                      {item.title}
                    </button>
                  </h5>
                </div>
              </div>
              <div className="col-md-1 p-0">
                <button
                  className="btn btn-primary mt-3 mr-3"
                  onClick={() => handleDelete(item._id)}
                >
                  <MdDeleteForever />
                </button>
              </div>
            </div>
            <div
              id={`collapse${index}`}
              className={`m-2 collapse ${
                collapsedItems[index] ? "" : "show"
              }`}
              aria-labelledby={`heading${index}`}
              data-parent="#accordion"
            >
              <div className="card-body m-2">{item.content}</div>
              <span
                className="btn btn-outline-dark rounded-pill mb-3 px-4 light-300"
                onClick={() => {}}
              >
                Voir Détails
              </span>
              <span className="btn btn-outline-dark rounded-pill mb-3 px-4 light-300 mx-2" 
               onClick={()=>{
                setEditModal(true);  
                setCategory("A")
                setServiceId(item._id)
                dispatch(setNavbarSticky(false));
              }}>
                update
              </span>
            </div>
            
          </div>
        ))}
 <button type="button" className="btn btn-primary m-2" onClick={() => {
                setShowModal(true);
                setCategory("A")
                dispatch(setNavbarSticky(false));
              }}>        <AiOutlinePlus className="text-white" />
      </button>
    </div>
      <div>
        <p className="h3 p-3">
          <small className="text-muted h5">Services Catégorie B</small>
        </p>
        {services
        .filter((item) => item.category === "B")
        .map((item, index) => (
          <div className="card shadow m-2" key={item._id}>
            <div className="row">
              <div className="col-md-11">
                <div
                  className="card-header"
                  onClick={() => toggleCollapse(index)}
                  style={{ cursor: "pointer" }}
                >
                  <h5 className="mb-2 mt-2">
                    <button
                      className={`btn ${
                        collapsedItems[index] ? "" : "collapsed"
                      }`}
                      data-toggle="collapse"
                      data-target={`#collapse${index}`}
                      aria-expanded={collapsedItems[index] ? "true" : "false"}
                      aria-controls={`collapse${index}`}
                    >
                      <i
                        className={`bi ${
                          collapsedItems[index]
                            ? "bi bi-chevron-down"
                            : "bi bi-chevron-up"
                        }`}
                      />
                      {item.title}
                    </button>
                  </h5>
                </div>
              </div>
              <div className="col-md-1 p-0">
                <button
                  className="btn btn-primary mt-3 mr-3"
                  onClick={() => handleDelete(item._id)}
                >
                  <MdDeleteForever />
                </button>
              </div>
            </div>
            <div
              id={`collapse${index}`}
              className={`m-2 collapse ${
                collapsedItems[index] ? "" : "show"
              }`}
              aria-labelledby={`heading${index}`}
              data-parent="#accordion"
            >
              <div className="card-body m-2">{item.content}</div>
              <span
                className="btn btn-outline-dark rounded-pill mb-3 px-4 light-300"
                onClick={() => {}}
              >
                Voir Détails
              </span>
              <span className="btn btn-outline-dark rounded-pill mb-3 px-4 light-300 mx-2"
              onClick={()=>{
                setEditModal(true);  
                setCategory("B")
                setServiceId(item._id)
            
                dispatch(setNavbarSticky(false));
              }}>
                update
              </span>
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-primary m-2" onClick={() => {
                setShowModal(true);
                setCategory("B")
                dispatch(setNavbarSticky(false));
              }}>
          <AiOutlinePlus className="text-white" />
        </button>
      </div>
    </div>
    </>
  );
}

export default ServiceList;