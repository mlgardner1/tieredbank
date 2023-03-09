function AllData() {
  const [data, setData] = React.useContext(UserContext);
  const [allUsers, setAllUsers] = React.useState([]);

  React.useEffect(() => {
    // fetch all accounts from API
    fetch("/account/all")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setAllUsers(responseJson);
      });
  }, []);

  // function bankCustomer({ allUsers: { _id, name, email, password, balance } }) {
  //   return (
  //     <tr key={id}>
  //       <td>{_id}</td>
  //       <td>{name}</td>
  //       <td>{email}</td>
  //       <td>{password}</td>
  //       <td>{balance}</td>
  //     </tr>
  //   );
  // }

  return (
    <>
      <h5>All Customer Data</h5>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Balance</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              {allUsers.map((user, index) => {
                return <p key={index}>{user._id}</p>;
              })}
            </td>

            <td>
              {allUsers.map((user, index) => {
                return <p key={index}>{user.name}</p>;
              })}
            </td>

            <td>
              {allUsers.map((user, index) => {
                return <p key={index}>{user.email}</p>;
              })}
            </td>

            <td>
              {allUsers.map((user, index) => {
                return <p key={index}>{user.password}</p>;
              })}
            </td>

            <td>
              {allUsers.map((user, index) => {
                return <p key={index}>{user.balance}</p>;
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
