import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setNavbarSticky } from "../../../redux/navbar/NavbarSlice";
import AddServicePopupModel from "./addServicePopupModel";
import EditServicePopupModel from "./editServicePopupModel";

function ServiceList({ setImage }) {
  const [services, setServices] = useState([]); // Initialize as an empty array
  const [collapsedItems, setCollapsedItems] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [category, setCategory] = useState("");
  const [serviceId, setServiceId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("http://localhost:5000/api/services")
      .then(response => {
        const initialCollapsedState = {};
        response.data.forEach(item => {
          initialCollapsedState[item._id] = true;
        });

        setServices(response.data);
        setCollapsedItems(initialCollapsedState);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const toggleCollapse = (itemId) => {
    setCollapsedItems(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId]
    }));
  };

  return (
    <>
      {showModal && category && <AddServicePopupModel setShowModal={setShowModal} category={category} updateServiceList={setServices} />}
      {editModal && category && <EditServicePopupModel setEditModal={setEditModal} category={category} serviceId={serviceId} services={services} />}
      <div className="container my-1 p-1" lang="fr">
        <div>
          <p className="h3 p-3">
            <strong>Liste De Service</strong>
            <hr className="hr" />
            <small className="text-muted h5">Services Catégorie A</small>
          </p>
          {Array.isArray(services) && services
            .filter((item) => item.category === "A")
            .map((item, index) => (
              <div className="card shadow m-2" key={item._id}>
                <div className="row">
                  <div className="col-md-12">
                    <div
                      className="card-header"
                      onClick={() => {
                        toggleCollapse(item._id)
                        setImage(item.image)
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <h5 className="mb-2 mt-2">
                        <button
                          className={`btn ${collapsedItems[item._id] ? "" : "collapsed"}`}
                          data-toggle="collapse"
                          data-target={`#collapseA${index}`}
                          aria-expanded={collapsedItems[item._id] ? "true" : "false"}
                          aria-controls={`collapseA${index}`}
                        >
                          <i
                            className={`bi ${collapsedItems[item._id] ? "bi-chevron-down" : "bi-chevron-up"}`}
                          />
                          {item.title}
                        </button>
                      </h5>
                    </div>
                  </div>
                </div>
                <div
                  id={`collapseA${index}`}
                  className={`m-2 collapse ${collapsedItems[item._id] ? "" : "show"}`}
                  aria-labelledby={`headingA${index}`}
                  data-parent="#accordion"
                >
                  <div className="card-body m-2">{item.content}</div>
                  <span
                    className="btn btn-outline-dark rounded-pill mb-3 px-4 light-300"
                    onClick={() => {}}
                  >
                    Voir Détails
                  </span>
                  <span
                    className="btn btn-outline-dark rounded-pill mb-3 px-4 light-300 mx-2"
                    onClick={() => {
                      setEditModal(true);
                      setCategory("A");
                      setServiceId(item._id);
                      dispatch(setNavbarSticky(false));
                    }}
                  >
                    update
                  </span>
                </div>
              </div>
            ))}
          <button type="button" className="btn btn-primary m-2" onClick={() => {
            setShowModal(true);
            setCategory("A");
            dispatch(setNavbarSticky(false));
          }}>
            <AiOutlinePlus className="text-white" />
          </button>
        </div>
        <div>
          <p className="h3 p-3">
            <small className="text-muted h5">Services Catégorie B</small>
          </p>
          {Array.isArray(services) && services
            .filter((item) => item.category === "B")
            .map((item, index) => (
              <div className="card shadow m-2" key={item._id}>
                <div className="row">
                  <div className="col-md-12">
                    <div
                      className="card-header"
                      onClick={() => {
                        toggleCollapse(item._id);
                        setImage(item.image);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <h5 className="mb-2 mt-2">
                        <button
                          className={`btn ${collapsedItems[item._id] ? "" : "collapsed"}`}
                          data-toggle="collapse"
                          data-target={`#collapseB${index}`}
                          aria-expanded={collapsedItems[item._id] ? "true" : "false"}
                          aria-controls={`collapseB${index}`}
                        >
                          <i
                            className={`bi ${collapsedItems[item._id] ? "bi-chevron-down" : "bi-chevron-up"}`}
                          />
                          {item.title}
                        </button>
                      </h5>
                    </div>
                  </div>
                </div>
                <div
                  id={`collapseB${index}`}
                  className={`m-2 collapse ${collapsedItems[item._id] ? "" : "show"}`}
                  aria-labelledby={`headingB${index}`}
                  data-parent="#accordion"
                >
                  <div className="card-body m-2">{item.content}</div>
                  <span
                    className="btn btn-outline-dark rounded-pill mb-3 px-4 light-300"
                    onClick={() => {}}
                  >
                    Voir Détails
                  </span>
                  <span
                    className="btn btn-outline-dark rounded-pill mb-3 px-4 light-300 mx-2"
                    onClick={() => {
                      setEditModal(true);
                      setCategory("B");
                      setServiceId(item._id);
                      dispatch(setNavbarSticky(false));
                    }}
                  >
                    update
                  </span>
                </div>
              </div>
            ))}
          <button type="button" className="btn btn-primary m-2" onClick={() => {
            setShowModal(true);
            setCategory("B");
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
