import { useState, useRef, useEffect } from "react";
import "../../HR/EmployeeManagement/EmployeeModelPopup.css";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setNavbarSticky } from "../../../redux/navbar/NavbarSlice";
import { IoCloudUpload } from "react-icons/io5";
import axios from "axios";
const ModelPopup = ({ setEditModal, category,  serviceId , services}) => {
  const service = services.find(service => service._id === serviceId);
  const [loading, setLoading] = useState(false);
  const modalContainerRef = useRef(null);
  console.log(serviceId)
  const dispatch = useDispatch();

  const handleDropdownClose = () => {
    dispatch(setNavbarSticky(true));
  };
  const editService  = async (values) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/services/${serviceId}`, values)
      setLoading(false);
      setEditModal(false);
    } catch (err) {
      console.log(err);
     
    }
  };

  const formik = useFormik({
    initialValues: {
      category: category,
      title: service.title,
      image: service.image,
      endDate: service.endDate,
      content: service.content,
    },
    onSubmit: (values) => {
      editService(values);
      handleDropdownClose();
    },
  });
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        modalContainerRef.current &&
        !modalContainerRef.current.contains(event.target) &&
        event.target.tagName.toLowerCase() !== "input"
      ) {
        setEditModal(false);
        handleDropdownClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setEditModal]);

  return (
    <div className="modalContainer">
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="modalBox" ref={modalContainerRef}>
          <div className="modalHeader">
            <h2>Ajouter Service</h2>
          </div>
          <div className="modalInner">
            <div className="input-container">
              <div className="input-box">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  onChange={formik.handleChange}
                  value={"Category " + formik.values.category}
                  disabled
                />
              </div>
            </div>
            <div className="input-box">
              <label htmlFor="image">Image</label>
              <div className="form-group">
                <div
                  className="d-flex align-items-center justify-content-center bg-secondary rounded cursor-pointer"
                  style={{ height: "200px", width: "60%"}}
                >
                  {formik.image ? (
                    <img
                      src={formik.image}
                      className="img-fluid"
                      alt="Uploaded Image"
                      style={{ maxHeight: "100%" }}
                    />
                  ) : (
                    <span className="display-1 text-light">
                      <IoCloudUpload />
                    </span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    id="image"
                    onChange={formik}
                    className="position-absolute invisible"
                  />
                </div>
              </div>
            </div>
            <div className="input-box">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                className="form-control"
                style={{ minHeight: "200px" }}
                onChange={formik.handleChange}
                value={formik.values.content}
                required
              />
            </div>
            <div className="modalFooter">
              <button className="btn btn-primary" type="submit">
                {loading ? "Saving..." : "edit"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ModelPopup;
