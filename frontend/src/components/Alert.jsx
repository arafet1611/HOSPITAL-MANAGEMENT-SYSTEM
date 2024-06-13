
function Alert() {
  return (
    <>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <a className="nav-link dropdown-toggle notification-ui_icon" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i className="fa fa-bell"></i>
          <span className="unread-notification"></span>
        </a>
        <div className="dropdown-menu notification-ui_dd show" aria-labelledby="navbarDropdown">
          <div className="notification-ui_dd-header">
            <h3 className="text-center">Notification</h3>
          </div>
          <div className="notification-ui_dd-content">
            <div className="notification-list notification-list--unread">
              <div className="notification-list_img">
                <img src="https://i.imgur.com/zYxDCQT.jpg" alt="user" />
              </div>
              <div className="notification-list_detail">
                <p><b>John Doe</b> reacted to your post</p>
                <p><small>10 mins ago</small></p>
              </div>
              <div className="notification-list_feature-img">
                <img src="https://i.imgur.com/AbZqFnR.jpg" alt="Feature image" />
              </div>
            </div>
            <div className="notification-list notification-list--unread">
              <div className="notification-list_img">
                <img src="https://i.imgur.com/w4Mp4ny.jpg" alt="user" />
              </div>
              <div className="notification-list_detail">
                <p><b>Richard Miles</b> reacted to your post</p>
                <p><small>1 day ago</small></p>
              </div>
              <div className="notification-list_feature-img">
                <img src="https://i.imgur.com/AbZqFnR.jpg" alt="Feature image" />
              </div>
            </div>
            <div className="notification-list">
              <div className="notification-list_img">
                <img src="https://i.imgur.com/ltXdE4K.jpg" alt="user" />
              </div>
              <div className="notification-list_detail">
                <p><b>Brian Cumin</b> reacted to your post</p>
                <p><small>1 day ago</small></p>
              </div>
              <div className="notification-list_feature-img">
                <img src="https://i.imgur.com/bpBpAlH.jpg" alt="Feature image" />
              </div>
            </div>
            <div className="notification-list">
              <div className="notification-list_img">
                <img src="https://i.imgur.com/CtAQDCP.jpg" alt="user" />
              </div>
              <div className="notification-list_detail">
                <p><b>Lance Bogrol</b> reacted to your post</p>
                <p><small>1 day ago</small></p>
              </div>
              <div className="notification-list_feature-img">
                <img src="https://i.imgur.com/iIhftMJ.jpg" alt="Feature image" />
              </div>
            </div>
          </div>
          <div className="notification-ui_dd-footer">
            <a href="#!" className="btn btn-success btn-block">View All</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Alert;
