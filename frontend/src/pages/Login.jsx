import { useState } from "react";
import axios from "axios";
import img from "../assets/img/login.png";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/employee/login", { email, userPassword : password });
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      toast.success("Login successful:" , response.data);
      window.location.replace("/");

    } catch (error) {
        toast.error(error.message );
      setError(error.message);
    }
  };

  return (
    <>
    <Toaster />
    <div className="bg-opacity-25">
      <section className="d-flex flex-column min-vh-100 justify-content-center align-items-center ">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 mx-10 rounded shadow bg-light d-flex">
              <div className="col-md-6">
                <div className="m-5 text-center">
                  <h1>Login</h1>
                </div>
                <form className="m-5" onSubmit={handleSubmit}>
                  <div className="mb-3 ">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="form-control"
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && <p className="text-danger">{error}</p>}
                  <div className="row mb-3">
                    <div className="col-6">
                      <div className="form-check text-start">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="remember-me"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="remember-me"
                        >
                          Remember Me
                        </label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="text-end">
                        <Link to={"/forget-password"}>Forgot Password?</Link>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="form-control btn btn-primary mt-3"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-md-6">
                <div>
                  <img src={img} alt="login" className="img-fluid p-5 " />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

export default Login;
