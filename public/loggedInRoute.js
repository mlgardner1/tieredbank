function LoggedInRoute({ children }) {
  const [data, setData] = React.useContext(UserContext);
  if (data === undefined || !data.sessionInfo) {
    window.location.replace("#/login");
    return null;
  }
  return children;
}

//function AdminRoute({ children }) {
//   const [data, setData] = React.useContext(UserContext);
//   if (data.currentUser[0].isAdmin) {
//     return children;
//   }
//   window.location.replace("#/login");
// }
