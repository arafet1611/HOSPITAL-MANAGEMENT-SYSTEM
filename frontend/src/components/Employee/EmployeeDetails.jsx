import { useState } from "react";
import { IoMdPhotos } from "react-icons/io";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { MdOutlineFileUpload } from "react-icons/md";
import maleDoctor from "../../assets/img/maleDoctor.png";
import femaleDoctor from "../../assets/img/femaleDoctor.png";
const EmployeeDetails = ({ empDetails }) => {
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
console.log(empDetails.employee);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSizeMB = 5;

    if (file && allowedTypes.includes(file.type) && file.size <= maxSizeMB * 1024 * 1024) {
      setSelectedFile(file);
      setFileName(file.name);
    } else {
      setSelectedFile(null);
      setFileName("");
      toast.error("File must be a JPG or PNG format and should not exceed 5 MB.");
    }
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await axios.put(`http://localhost:5000/api/employee/uploadimage/${empDetails.employee._id}`, formData);

      if (response.status === 200) {
        toast.success("Image uploaded successfully");
        window.location.replace("/my-profile");

      } else {
        toast.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image");
    }
  };

  return (
    <nav className="leftNav">
      <Toaster />
      <div className="employeeDetail container my-5 p-3 bg-white shadow" style={{ margin: "1rem", marginTop: "4rem", height: "auto", display: "flex", flexDirection: "column", gap: "20px" }}>
        <p className="mb-2 text-secondary">PROFILE IMAGE</p>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {empDetails.employee.image ? (
    <img
      src={`http://localhost:5000/uploads/${empDetails.employee.image}`}
      alt="Employee"
      style={{ width: "235px", borderRadius: "50%" }}
      className="rounded-circle"
    />
  ) : (
    <img
      src={empDetails.employee.sex === "male" ? maleDoctor : femaleDoctor}
      alt="Default Doctor"
      style={{ width: "235px", borderRadius: "50%" }}
      className="rounded-circle"
    />
  )}
        </div>
        <div className="small font-italic text-muted " style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>JPG or PNG no larger than 5 MB</div>
        <div className="d-flex justify-content-center align-items-center">
          <label htmlFor="uploadInput" className="btn btn-primary w-50">
            <IoMdPhotos className="me-2" />
            <span className="d-lg-inline"> Choose Image</span>
            <input
              id="uploadInput"
              type="file"
              className="d-none"
              onChange={handleFileChange}
              accept="image/*"
            />
          </label>
        </div>
        {fileName && (<>
          <div className="d-flex justify-content-center align-items-center">
<div className="text-center text-muted px-3" style={{ overflowX: "auto" }}>

  <input
    type="text"
    className="form-control bg-light border-0"
    value={fileName}
    readOnly
    style={{ border: "none", width: "100%", outline: "none", background: "transparent" }}
  />
</div>
          <button className="btn btn-primary w-40 me-5" onClick={uploadImage}>
          <MdOutlineFileUpload style={{ fontSize: "1.5rem" }} /> <span className="d-lg-inline"> Upload </span>         </button>
        </div>
        </>
        )}
        
        <p className="mb-2 text-secondary">DETAILS</p>

        <div className="form-floating bg-light">
          <input
            type="text"
            id="firstNameInput"
            className="form-control bg-light"
            value={empDetails.employee.firstname}
            readOnly
          />
          <label htmlFor="firstNameInput">First Name</label>
        </div>
        <div className="form-floating bg-light">
          <input
            type="text"
            id="lastNameInput"
            className="form-control bg-light"
            value={empDetails.employee.lastname}
            readOnly
          />
          <label htmlFor="lastNameInput">Last Name</label>
        </div>
        <div className="form-floating bg-light">
          <input
            type="text"
            id="emailInput"
            className="form-control bg-light"
            value={empDetails.employee.email}
            readOnly
          />
          <label htmlFor="emailInput">Email</label>
        </div>
        <div className="form-floating bg-light">
          <input
            type="text"
            id="phoneInput"
            className="form-control bg-light"
            value={empDetails.employee.phone}
            readOnly
          />
          <label htmlFor="phoneInput">Phone Number</label>
        </div>
        <div className="form-floating bg-light">
          <input
            type="text"
            id="serviceInput"
            className="form-control bg-light"
            value={empDetails.employee.service.title}
            readOnly
          />
          <label htmlFor="serviceInput">Service</label>
        </div>
      </div>
    </nav>
  );
};

export default EmployeeDetails;
