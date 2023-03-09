function Balance() {
  const [status, setStatus] = React.useState(true);
  const [data, setData] = React.useContext(UserContext);
  const [balance, setBalance] = React.useState(0);

  const balanceFromDatabase = async () => {
    try {
      const response = await fetch(
        `/account/balance/${data.sessionInfo.currentUser.email}`
      );
      const jsonResponse = await response.json();
      console.log(jsonResponse[0]);
      setBalance(jsonResponse[0].balance);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    const url = `/account/balance/${data.sessionInfo.currentUser.email}`;
    (async () => {
      try {
        var res = await fetch(url);
        var details = await res.json();
        setBalance(details[0].balance);
      } catch (err) {
        console.log(err);
      }
    })().catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <Card
      bgcolor="primary"
      header="Account balance"
      status={status}
      body={
        <>
          Account: {data.sessionInfo.currentUser.email}
          <br />
          Balance: ${balance}
          <br />
        </>
      }
    />
  );
}
