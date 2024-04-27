import { useState , useRef , useEffect } from "react";
import "../../HR/EmployeeManagement/EmployeeModelPopup.css";
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux';
import { setNavbarSticky } from '../../../redux/navbar/NavbarSlice';
const ModelPopup = ({ setShowModal }) => {
  const [loading, setLoading] = useState(false)
  const modalContainerRef = useRef(null);

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
      Vacation: '',
      startDate: '',
      endDate: '',
      nombreOfDays: '',
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
          <h2>Ajouter Jours fériés </h2>
        </div>    
          <div className="modalInner">
            <div className="input-container">
              <div className="input-box">
                <label htmlFor="">Jour(s) férié(s)</label>
                <input type="text" name="Vacation"
                  required
                  onChange={formik.handleChange}
                  values={formik.values.Vacation}
                />
              </div>
              <div className="input-box">
                <label htmlFor="">De </label>
                <input type="date" name="startDate"
                  required
                  onChange={formik.handleChange}
                  values={formik.values.startDate}
                />
              </div>
            </div>
            <div className="input-box">
                <label htmlFor="">À</label>
                <input type="date" name="endDate"
                  required
                  onChange={formik.handleChange}
                  values={formik.values.endDate}
                />
              </div>
            <div className="modalFooter">
              <button className="btn btn-primary" type="submit">{loading ? 'Saving...' : 'Save'}</button>
            </div>

          </div>
        

      </div>
      </form>
    </div>
  );
};

export default ModelPopup;