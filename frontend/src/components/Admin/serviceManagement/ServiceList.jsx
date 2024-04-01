import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";

function ServiceList() {
  const fakeData = [
    {
      _id: 1,
      title: "SPÉCIALITÉS CHIRURGICALES",
      content: "En Cours...",
      category: "A",
    },
    {
      _id: 2,
      title: "SERVICE DES URGENCES",
      content: "En Cours...",
      category: "A",
    },
    {
      _id: 3,
      title: "SERVICE DE CARDIOLOGIE",
      content: "En Cours...",
      category: "A",
    },
    {
      _id: 4,
      title: "SERVICE D'IMAGERIE MÉDICALE",
      content: "En Cours...",
      category: "A",
    },
    {
      _id: 5,
      title: "TELECONSULTATION MÉDICALE",
      content: "En Cours...",
      category: "B",
    },
    {
      _id: 6,
      title: "SERVICE DE PÉDIATRIE À DOMICILE",
      content: "En Cours...",
      category: "B",
    },
    {
      _id: 7,
      title: "SERVICE DE NUTRITION À DISTANCE",
      content: "En Cours...",
      category: "B",
    },
  ];

  const [collapsedItems, setCollapsedItems] = useState(
    Array(fakeData.length).fill(true)
  );

  const toggleCollapse = (index) => {
    const newCollapsedItems = [...collapsedItems];
    newCollapsedItems[index] = !newCollapsedItems[index];
    setCollapsedItems(newCollapsedItems);
  };

  return (
    <div className="container my-1 p-1 " lang="fr">
      <div>
        <p className="h3 p-3">
          <strong>Liste De Service</strong>
          <hr className="hr" />
          <small className="text-muted h5">Services Catégorie A</small>
        </p>
        {fakeData
          .filter((item) => item.category === "A")
          .map((item) => (
            <div className="card shadow m-2" key={item._id}>
              <div className="row">
                <div className="col-md-11">
                  <div
                    className="card-header"
                    onClick={() => toggleCollapse(item._id)}
                    style={{ cursor: "pointer" }}
                  >
                    <h5 className="mb-2 mt-2">
                      <button
                        className={`btn ${
                          collapsedItems[item._id] ? "" : "collapsed"
                        }`}
                        data-toggle="collapse"
                        data-target={`#collapse${item._id}`}
                        aria-expanded={
                          collapsedItems[item._id] ? "true" : "false"
                        }
                        aria-controls={`collapse${item._id}`}
                      >
                        <i
                          className={`bi ${
                            collapsedItems[item._id]
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
                  <button className="btn btn-primary mt-3 mr-3 " >
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
              <div
                id={`collapse${item._id}`}
                className={`m-2 collapse ${
                  collapsedItems[item._id] ? "" : "show"
                }`}
                aria-labelledby={`heading${item._id}`}
                data-parent="#accordion"
              >
                <div className="card-body m-2">{item.content}</div>
                <span
                  className="btn btn-outline-dark rounded-pill mb-3 px-4 light-300"
                  onClick={() => {}}
                >
                  Voir Détails
                </span>
              </div>
            </div>
          ))}
        <button type="button" className="btn btn-primary m-2" onClick={""}>
          <AiOutlinePlus className="text-white" />
        </button>
      </div>
      <div>
        <p className="h3 p-3">
          <small className="text-muted h5">Services Catégorie B</small>
        </p>
        {fakeData
          .filter((item) => item.category === "B")
          .map((item) => (
            <div className="card shadow m-2" key={item._id}>
              <div
                className="card-header"
                onClick={() => toggleCollapse(item._id)}
                style={{ cursor: "pointer" }}
              >
                <h5 className="mb-2 mt-2">
                  <button
                    className={`btn ${
                      collapsedItems[item._id] ? "" : "collapsed"
                    }`}
                    data-toggle="collapse"
                    data-target={`#collapse${item._id}`}
                    aria-expanded={collapsedItems[item._id] ? "true" : "false"}
                    aria-controls={`collapse${item._id}`}
                  >
                    <i
                      className={`bi ${
                        collapsedItems[item._id]
                          ? "bi bi-chevron-down"
                          : "bi bi-chevron-up"
                      }`}
                    />{" "}
                    {item.title}
                  </button>
                </h5>
              </div>
              <div
                id={`collapse${item._id}`}
                className={`m-2 collapse ${
                  collapsedItems[item._id] ? "" : "show"
                }`}
                aria-labelledby={`heading${item._id}`}
                data-parent="#accordion"
              >
                <div className="card-body m-2">{item.content}</div>
                <span
                  className="btn btn-outline-dark rounded-pill mb-3 px-4 light-300"
                  onClick={() => {}}
                >
                  Voir Détails
                </span>
              </div>
            </div>
          ))}
        <button type="button" className="btn btn-primary m-2" onClick={""}>
          <AiOutlinePlus className="text-white" />
        </button>
      </div>
    </div>
  );
}

export default ServiceList;
