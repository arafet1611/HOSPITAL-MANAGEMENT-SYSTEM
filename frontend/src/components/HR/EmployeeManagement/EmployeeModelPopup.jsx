import { useState , useRef , useEffect } from "react";
import "./EmployeeModelPopup.css";
import { useFormik } from 'formik'
// import ImageUpload from "./ImageUpload";
import { useDispatch } from 'react-redux';
import { setNavbarSticky } from '../../../redux/navbar/NavbarSlice';
const ModelPopup = ({ setShowModal }) => {
  const [loading, setLoading] = useState(false)
  const modalContainerRef = useRef(null);
  //const [imageURL, setImageURL] = useState('')
  //console.log(empById)
  const dispatch = useDispatch();


  const handleDropdownClose = () => {
    dispatch(setNavbarSticky(true));
  };
  const createEmployee = async (values) => {
    setLoading(true)
    try{
      console.log(values)
      setLoading(false)
      setShowModal(false)
    }
    catch(err){
      console.log(err)
    }
  }

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      job: '',
      dateofjoining: '',
      image: ''
    },
    onSubmit: values => {
      createEmployee(values)
      handleDropdownClose()
    },
  })
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        modalContainerRef.current &&
        !modalContainerRef.current.contains(event.target) &&
        event.target.tagName.toLowerCase() !== "input"
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

  return (
    <div className="modalContainer" >
<form action="" onSubmit={formik.handleSubmit}>
      <div className="modalBox" ref={modalContainerRef}>
        <div className="modalHeader">
          <h2>New Employee Details</h2>
        </div>
        {/* <ImageUpload setImageURL={setImageURL}/> */}
        
          <div className="modalInner"

          >
            <div className="input-container">
              <div className="input-box">
                <label htmlFor="">First Name</label>
                <input type="text" name="firstname"
                  required
                  onChange={formik.handleChange}
                  values={formik.values.firstname}
                />
              </div>
              <div className="input-box">
                <label htmlFor="">Last Name</label>
                <input type="text" name="lastname"
                  required
                  onChange={formik.handleChange}
                  values={formik.values.lastname}
                />
              </div>
            </div>
            <div className="input-box">
                <label htmlFor="">image</label>
                <input type="text" name="image"
                  required
                  onChange={formik.handleChange}
                  values={formik.values.image}
                />
              </div>

            <div className="input-container">
              <div className="input-box">
                <label htmlFor="">Email Address</label>
                <input type="email" name="email"
                  required
                  onChange={formik.handleChange}
                  values={formik.values.email}
                />
              </div>
              <div className="input-box">
                <label htmlFor="">Phone</label>
                <input type="text" name="phone"
                  required
                  onChange={formik.handleChange}
                  values={formik.values.phone}
                />
              </div>
              
            </div>
            <div className="input-box">
              <label htmlFor="">Job-position</label>
              <input type="text" name="job"
                required
                onChange={formik.handleChange}
                values={formik.values.job}
              />
            </div>
            <div className="input-box">
              <label htmlFor="">Date of Joining</label>
              <input type="date" name="dateofjoining"
                required
                onChange={formik.handleChange}
                values={formik.values.dateofjoining}
              />
            </div>
            <div className="modalFooter">
              <button className="btn btn-primary" type="submit">{loading ? 'Saving...' : 'Save Details'}</button>
            </div>

          </div>
        

      </div>
      </form>
    </div>
  );
};

export default ModelPopup;