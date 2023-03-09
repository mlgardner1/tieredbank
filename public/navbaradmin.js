function NavBarAdmin() {
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
            <a className="nav-link" href="#/home/"></a>
          </li>
          <li className="nav-item">
            <p className="nav-link" id="logged-in">
              {data.sessionInfo.currentUser != null
                ? data.sessionInfo.currentUser.email
                : null}
            </p>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/deposit/">
              Deposit
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/withdraw/">
              Withdraw
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/balance/">
              Balance
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/logout/">
              Log Out
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/alldata/">
              Admin
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
