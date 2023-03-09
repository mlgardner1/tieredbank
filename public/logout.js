function Logout(props) {
  const [data, setData] = React.useContext(UserContext);
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  function logoutForm() {
    setData({ data: null, currentUser: null });
    window.location.replace("#/login");
  }

  return (
    <>
      <Card
        bgcolor="dark"
        header="Log out"
        status={status}
        body={
          data.sessionInfo ? (
            <>
              <button
                type="submit"
                className="btn btn-light"
                onClick={logoutForm}
              >
                Log out of{" "}
                {data.sessionInfo.currentUser
                  ? data.sessionInfo.currentUser.email
                  : null}
              </button>
            </>
          ) : (
            <>
              <p>Create an account or login</p>
            </>
          )
        }
      />
    </>
  );
}
