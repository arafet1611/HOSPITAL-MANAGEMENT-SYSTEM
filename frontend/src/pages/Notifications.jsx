import banner from "../assets/img/lists.svg";

function Notification() {
  return (
    <div>
      <section className="bg-light w-100">
        <div className="container">
          <div className="row d-flex align-items-center py-5">
            <div className="col-lg-6">
              <figure className="td_figure">
                <img src={banner} alt="banner"/>
              </figure>
            </div>
            <div className="col-lg-6 text-start">
              <h1 className="py-5 text-primary typo-space-line">Events and Notices</h1>
              <p className="light-300">
                Keep youself updated. Check out and try to join our various events, seminars, webinars and workshops regularly.
              </p>
             
            </div>
          </div>
        </div>
      </section>
     
    </div>
  )
}

export default Notification
