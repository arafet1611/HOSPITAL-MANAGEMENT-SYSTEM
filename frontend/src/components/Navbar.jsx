import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import "../Styles/Navbar.css";
import io from "socket.io-client";
import axios from "axios";

function Navbar() {
  const isNavbarSticky = useSelector((state) => state.navbar.isNavbarSticky);
  const [userInfo, setUserInfo] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:5000");
    }

    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      setUserInfo(parsedUserInfo);
      console.log("User", parsedUserInfo);

      socketRef.current.emit("identify", {
        userId: parsedUserInfo._id,
        userRole: parsedUserInfo.role,
      });

      axios
        .get(
          `http://localhost:5000/api/notifications/${parsedUserInfo.service}?job=${parsedUserInfo.job}&userId=${parsedUserInfo._id}`
        )
        .then((response) => {
          console.log(response);
          const notifications = response.data;
          setNotifications(notifications);
          setUnreadCount(notifications.filter((n) => !n.read).length);
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
        });

      socketRef.current.on("guardingDatesUpdated", (data) => {
        if (data.role && data.role === parsedUserInfo.role) {
          toast(
            `Notification for role ${parsedUserInfo.role}: ${data.message}`
          );
          setNotifications((prev) => [data, ...prev]);
          setUnreadCount((prev) => prev + 1);
        } else if (!data.role) {
          toast(`Service-wide notification: ${data.message}`);
          setNotifications((prev) => [data, ...prev]);
          setUnreadCount((prev) => prev + 1);
        }
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      const handleLeaveRequestStatusChange = (data) => {
        if (data.userId === parsedUserInfo._id) {
          toast(`Notification: ${data.message}`);
          setNotifications((prev) => [data, ...prev]);
          setUnreadCount((prev) => prev + 1);
        }
      };

      if (socketRef.current) {
        socketRef.current.on(
          "leaveRequestStatusChange",
          handleLeaveRequestStatusChange
        );
      }

      return () => {
        if (socketRef.current) {
          socketRef.current.off(
            "leaveRequestStatusChange",
            handleLeaveRequestStatusChange
          );
        }
      };
    }
  }, [socketRef.current]);

  const logout = () => {
    if (localStorage.getItem("userInfo")) {
      localStorage.removeItem("userInfo");
      toast.success("Logout successful");
      setUserInfo(null);
    }
  };

  const handleNotificationsClick = () => {
    setUnreadCount(0); // Reset unread count when notifications are viewed
  };

  return (
    <>
      <Toaster />
      <div className={isNavbarSticky ? "sticky-top" : ""}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
          <div className="container">
            <NavLink
              className="navbar-brand fs-3 fw-bold"
              to="/"
              exact
              title="Home"
            >
              ACCUEIL
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              {/* Rendered nav items */}
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                {/* Dropdown items */}
                {/* Your existing dropdown items are removed here */}
              </ul>
  
              {/* User info section */}
              <div className="navbar align-self-center d-flex">
                {!userInfo ? (
                  <NavLink
                    className="nav-link text-success p-2"
                    to="/login"
                    exact
                    title="Login"
                  >
                    Login
                  </NavLink>
                ) : (
                  <>
                    {userInfo.isAdmin ? (
                      <div className="nav-link text-success">
                        {" "}
                        Bonjour, Admin
                      </div>
                    ) : (
                      <NavLink
                        className="nav-link text-success"
                        to="/my-profile"
                        exact
                        title="Profile"
                      >
                        {userInfo.isAdmin}
                        Bonjour, {userInfo.sex === "male" ? "M." : "Mme"}{" "}
                        <strong>
                          {userInfo.firstname.charAt(0).toUpperCase() +
                            userInfo.firstname.slice(1)}{" "}
                          {userInfo.lastname.charAt(0).toUpperCase() +
                            userInfo.lastname.slice(1)}
                        </strong>
                      </NavLink>
                    )}
  
                    {/* Notifications dropdown */}
                    <div className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle notification-icon"
                        href="#"
                        id="navbarNotificationsDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        onClick={handleNotificationsClick}
                      >
                        <i className="bi-bell fs-4 ms-2" role="img"></i>
                        {unreadCount > 0 && (
                          <span
                            className="badge"
                            style={{
                              fontSize: "0.75em",
                              padding: "2px 4px",
                              marginRight: "4.5px",
                            }}
                          >
                            <small>{unreadCount}</small>
                          </span>
                        )}
                      </a>
                      <div
                        className="dropdown-menu dropdown-menu-end p-3"
                        aria-labelledby="navbarNotificationsDropdown"
                      >
                        <div className="notification-ui_dd-header">
                          <h3 className="text-center">Notifications</h3>
                        </div>
                        <div className="notification-ui_dd-content">
                          {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                              <div className="notification-list" key={index}>
                                <div className="notification-list_detail">
                                  <p>
                                    <b>{notification.title}</b>{" "}
                                    {notification.message}
                                  </p>
                                  <p>
                                    <small>{notification.createdAt}</small>
                                  </p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p>No new notifications</p>
                          )}
                        </div>
                        <div className="notification-ui_dd-footer">
                          <a href="#!" className="btn btn-primary btn-block">
                            View All
                          </a>
                        </div>
                      </div>
                    </div>
  
                    {/* Logout link */}
                    <NavLink
                      className="nav-link"
                      onClick={logout}
                      title="Logout"
                    >
                      <i
                        className="bi-box-arrow-right text-danger fs-4 ms-2"
                        role="img"
                      ></i>
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );}
export default Navbar;
