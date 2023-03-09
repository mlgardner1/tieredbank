function NavBarHome() {
  const [data, setData] = React.useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <img
        src="/images/treeicon.jpg"
        width="25"
        height="25"
        className="d-inline-block align-top"
        alt="Tree from Vecteezy.com"
      ></img>
      <a className="navbar-brand" href="#">
        GreenBank
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#/login/">
              Login
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/CreateAccount/">
              Create Account
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
