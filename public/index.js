function Index() {
  const [data, setData] = React.useState([]);

  // async function getData() {
  //   try {
  //     const response = await fetch("http://localhost:3000/account/all");
  //     let data = await response.json();
  //     console.log(data);
  //     setData({ data: data, currentUser: "" });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  function checkIfSignedIn() {
    if (!data.sessionInfo) {
      window.location.replace("#/login");
    }
  }
  function renderNavbar() {
    if (data.sessionInfo) {
      if (data.currentUser[0].isAdmin != null && data.currentUser[0].isAdmin) {
        console.log("admin logged in");
        return <NavBarAdmin />;
      }
      console.log("user logged in");
      return <NavBarUser />;
    } else {
      return <NavBarHome />;
    }
  }

  return (
    <HashRouter>
      <UserContext.Provider value={[data, setData]}>
        {renderNavbar()}
        <div className="container" style={{ padding: "20px" }}>
          <Route path="/" exact component={Login} />
          <Route path="/CreateAccount/" component={CreateAccount} />
          <Route
            path="/login/"
            render={(props) => <Login {...props} setData={setData} />}
          />
          <Route
            path="/logout/"
            render={(props) => <Logout {...props} setData={setData} />}
          />
          <LoggedInRoute>
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            <Route path="/balance/" component={Balance} />
            <Route path="/alldata/" component={AllData} />
          </LoggedInRoute>
        </div>
      </UserContext.Provider>
    </HashRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index />);
