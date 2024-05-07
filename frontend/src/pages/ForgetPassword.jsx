import { useState } from "react";

import { Link } from "react-router-dom"
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

function ForgetPassword() {
    const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/employee/forgetpassword/", { email });
      toast.success(response.data.message);
      

    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  return (
    <>    <Toaster />
<div className="bg-light py-3 py-md-5">
  <div className="container">
    <div className="row justify-content-md-center">
      <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
        <div className="bg-white p-4 p-md-5 rounded shadow-sm">
          <div className="row">
            <div className="col-12">
              <div className="mb-5">
                <h2 className="h3">Password Reset</h2>
                <h3 className="fs-6 fw-normal text-secondary m-0">Provide the email address associated with your account to recover your password.</h3>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row gy-3 gy-md-4 overflow-hidden">
              <div className="col-12">
                <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                <input type="email" className="form-control" onChange={(event) => setEmail(event.target.value) } name="email" id="email" placeholder="name@example.com" required />
              </div>
              <div className="col-12">
                <div className="d-grid">
                  <button className="btn btn-lg btn-primary" type="submit">Reset Password</button>
                </div>
              </div>
            </div>
          </form>
          <div className="row">
            <div className="col-12">
              <hr className="mt-5 mb-4 border-secondary-subtle" />
              <div className="d-flex gap-4 justify-content-end">
                <Link to="/login" className="btn rounded-pill btn-outline-primary px-5">Login</Link>
              </div>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  </div>
</div>     </>
  )
}

export default ForgetPassword