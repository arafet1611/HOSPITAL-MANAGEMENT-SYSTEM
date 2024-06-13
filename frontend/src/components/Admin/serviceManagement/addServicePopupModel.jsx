import  { useState, useRef, useEffect } from "react";
import "../../HR/EmployeeManagement/EmployeeModelPopup.css";
import { useDispatch } from "react-redux";
import { setNavbarSticky } from "../../../redux/navbar/NavbarSlice";
import { toast, Toaster } from "react-hot-toast";

import axios from "axios";

const ModelPopup = ({ setShowModal, category , updateServiceList }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const modalContainerRef = useRef(null);
  const [formData, setFormData] = useState(new FormData());
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSizeMB = 5;

    if (file && allowedTypes.includes(file.type) && file.size <= maxSizeMB * 1024 * 1024) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      toast.error("File must be a JPG or PNG format and should not exceed 5 MB.");
    }
  };

  const dispatch = useDispatch();

  const handleDropdownClose = () => {
    dispatch(setNavbarSticky(true));
  };

  const createService = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
  
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.get("title"));
      formDataToSend.append("content", formData.get("content"));
      formDataToSend.append("category", category);
      formDataToSend.append("image", selectedFile);
  
      const response = await axios.post("http://localhost:5000/api/services", formDataToSend, config);
      toast.success("service" + formData.get("title") + "created successfully");
      setLoading(false);
      setShowModal(false);
      updateServiceList(response.data); 

    } catch (err) {
      console.error(err);
      setError("Failed to save service.");
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
    formData.set(e.target.name, value);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        modalContainerRef.current &&
       !modalContainerRef.current.contains(event.target) &&
        event.target.tagName.toLowerCase()!== "input"
      ) {
        setShowModal(false);
        handleDropdownClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setShowModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createService();
    handleDropdownClose();
  };

  return (
    <div className="modalContainer">
      <Toaster />
      <form action="" onSubmit={handleSubmit}>
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
                  onChange={handleChange}
                  value={category}
                  disabled
                  aria-label="Category"
                />
              </div>
            </div>

            <div className="input-box">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                onChange={handleChange}
                value={formData.get('title')}
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="formFile" className="form-label"></label>
              <input
                className="form-control"
                onChange={handleFileChange}
                accept="image/*"
                type="file"
                id="formFile"
                name="image"
              />
            </div>
            <div className="input-box">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                className="form-control"
                style={{ minHeight: "200px" }}
                onChange={handleChange}
                value={formData.get('content')}
                required
              />
            </div>
            <div className="modalFooter">
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading? "Saving..." : "Save"}
              </button>
              {error && <p className="error">{error}</p>}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ModelPopup;
