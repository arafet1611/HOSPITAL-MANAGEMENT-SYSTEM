import img from "../assets/img/login.png";
function login() {
  return (
    
    <div className='bg-opacity-25'>
        <section className='d-flex flex-column min-vh-100 justify-content-center align-items-center '>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-10 mx-10 rounded shadow bg-light d-flex'> 
                        <div className='col-md-6'> 
                            <div className='m-5 text-center'>
                                <h1>login</h1>

                            </div>
                            <form className='m-5'>
                                <div className='mb-3 '>
                                    <label className='form-label' htmlFor='username'>username</label>
                                    <input className='form-control' type="text" id='username' />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label' htmlFor='password'>Password</label>
                                    <input className='form-control' id='password' type="password"/>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                        <div className="form-check text-start">
                                            <input
                                                 className="form-check-input"
                                                 type="checkbox"
                                                 id="remember-me"
                                            />
                                            <label className="form-check-label" htmlFor="remember-me">Remember Me</label>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="text-end">
                                         <a href="#">Forgot Password?</a>
                                        </div>
                                    </div>
                                </div>

                                 <div>
                                    <button type="submit" className="form-control btn btn-primary mt-3">Sign In</button>
                                 </div>
                            </form>
                        </div>
                         <div className='col-md-6'> 
                            <div>
                                <img src={img} alt="login" className='img-fluid p-5 '/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  
  );
}

export default login;
