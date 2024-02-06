import  { useState ,useRef, useEffect} from 'react'
import { useFormik } from 'formik'
import "./EmployeeModelPopup.css";
import { useDispatch } from 'react-redux';
import { setNavbarSticky } from '../../../redux/navbar/NavbarSlice';
const EditEmployeeDetailsModal = ({ empById, setEditModal  }) => {
    const { firstname, lastname, email, phone, job, dateofjoining, image } = empById
    //const date = new Date(dateofjoining)
    const [loading, setLoading] = useState(false)
    const modalContainerRef = useRef(null);
    const dispatch = useDispatch();

    const handleDropdownClose = () => {
        dispatch(setNavbarSticky(true));
      };
    const handleEdit = async (values) => {
        setLoading(true)
        try {
            setLoading(false)
            setEditModal(false)
            console.log(values)

        }
        catch (err) {
            console.log(err)
        }
    }
    const formik = useFormik({
        initialValues: {
            firstname,
            lastname,
            email,
            phone,
            job,
            dateofjoining,
            image,
        },
        onSubmit: values => {
            handleEdit(values)
            handleDropdownClose()

        }
    })
    console.log(formik.initialValues)
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
                        <h2>New Employee Details</h2>
                    </div>
                    <div className="modalInner"

                    >
                        <div className="input-container">
                            <div className="input-box">
                                <label htmlFor="">First Name</label>
                                <input type="text" name="firstname"
                                    required
                                    defaultValue={firstname}
                                    onChange={formik.handleChange}
                                    values={formik.values.firstname}
                                />
                            </div>
                            <div className="input-box">
                                <label htmlFor="">Last Name</label>
                                <input type="text" name="lastname"
                                    required
                                    defaultValue={lastname}
                                    onChange={formik.handleChange}
                                    values={formik.values.lastname}
                                />
                            </div>
                        </div>
                        <div className="input-box">
                                <label htmlFor="">Image</label>
                                <input type="text" name="lastname"
                                    required
                                    defaultValue={image}
                                    onChange={formik.handleChange}
                                    values={formik.values.image}
                                />
                            </div>

                        <div className="input-container">
                            <div className="input-box">
                                <label htmlFor="">Email Address</label>
                                <input type="email" name="email"
                                    required
                                    defaultValue={email}
                                    onChange={formik.handleChange}
                                    values={formik.values.email}
                                />
                            </div>
                            <div className="input-box">
                                <label htmlFor="">Phone</label>
                                <input type="text" name="phone"
                                    required
                                    defaultValue={phone}
                                    onChange={formik.handleChange}
                                    values={formik.values.phone}
                                />
                            </div>
                        </div>
                        <div className="input-box">
                            <label htmlFor="">Job-position</label>
                            <input type="text" name="job"
                                required
                                defaultValue={job}
                                onChange={formik.handleChange}
                                values={formik.values.job}
                            />
                        </div>
                        <div className="input-box">
                            <label htmlFor="">Date of Joining</label>
                            <input type="date" name="dateofjoining"
                                required
                                defaultValue={dateofjoining}
                                onChange={formik.handleChange}
                                values={formik.values.dateofjoining}
                            />
                        </div>
                    </div>
                    <div className="modalFooter">
                        <button className="btn btn-primary" type="submit">{loading ? 'Editing' : 'Edit and Save'}</button>
                    </div>
                </div>
            </form>
            
        </div>
    )
}

export default EditEmployeeDetailsModal