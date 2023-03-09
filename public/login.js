//const signInWithPopup = require("firebase/auth");

function Login(props) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [data, setData] = React.useContext(UserContext);

  return (
    <Card
      bgcolor="success"
      header="Log in"
      status={status}
      body={data.sessionInfo ? <LoginMessage /> : <LoginForm />}
    />
  );
}

function LoginMessage(props) {
  const [data, setData] = React.useContext(UserContext);
  return (
    <>
      <h5>Success</h5>
      <h6>You are logged in as {data.sessionInfo.currentUser.email}</h6>
    </>
  );
}

function LoginForm(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [data, setData] = React.useContext(UserContext);

  function handle(data) {
    console.log(email, password);
    const url = `/account/login/${email}/${password}`;
    (async () => {
      var firebaseAttempt = await fetch(url);
      var firebaseDetails = await firebaseAttempt.json();
      console.log("Firebase login successful.");
      var userAttempt = await fetch(`/account/balance/${email}`);
      var userDetails = await userAttempt.json();
      console.log("User details retrieve successful.");
      data.sessionInfo = firebaseDetails;
      data.currentUser = userDetails;
      setData(data);

      console.log(data);
    })().catch((err) => {
      console.log(err);
    });
  }

  function handleGoogleLogin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("google user: ", user);
        setData({ data: user, currentUser: user.email });
      })
      .catch((error) => {
        // Handle Errors here.
        console.error(error);
      });
  }
  React.useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <h6>Welcome to GreenBank. Your money is secure with us.</h6>
      <br />
      Email
      <input
        type="input"
        className="form-control"
        placeholder="sample@email.com"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      Password
      <br />
      <input
        type="password"
        className="form-control"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />
      <button type="submit" className="btn btn-light" onClick={handle}>
        Log in with email
      </button>
      <br />
      OR
      <br />
      <button
        type="submit"
        className="btn btn-light"
        onClick={handleGoogleLogin}
      >
        Log in with Google
      </button>
    </>
  );
}
