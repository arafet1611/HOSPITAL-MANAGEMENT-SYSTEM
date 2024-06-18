import AccessDenied from "./pages/AccessDenied"

const PrivateRoute = ({ children, allowedRoles }) => {
  const userString = localStorage.getItem('userInfo');
  const user = JSON.parse(userString);

  if (!user || !allowedRoles.includes(user.job)) {
    return <AccessDenied /> ;
  }

  return children;
};

export default PrivateRoute;