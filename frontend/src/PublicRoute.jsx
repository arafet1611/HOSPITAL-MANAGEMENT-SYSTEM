import AccessDenied from "./pages/AccessDenied"


const PublicRoute = ({ children }) => {
  const userString = localStorage.getItem('userInfo');
  const user = JSON.parse(userString);

  if (user) {
    return <AccessDenied /> ;
  }

  return children;
};

export default PublicRoute;
