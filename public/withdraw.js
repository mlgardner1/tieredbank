function Withdraw(props) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [withdrawAmount, setWithdrawAmount] = React.useState(0);
  const [balance, setBalance] = React.useState(0);
  const [data, setData] = React.useContext(UserContext);

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

  const validate = (amount) => {
    if (!amount) {
      setStatus("Error: Please enter a value");
      return false;
    }
    if (amount <= 0) {
      setStatus("Error: Please enter a positive value");
      return false;
    }
    if (isNaN(amount)) {
      setStatus("Error: Please enter a numerical value");
      return false;
    }
    if (balance - amount < 0) {
      setStatus("Error: insufficient funds");
      return false;
    }
    return true;
  };

  function makeWithdrawal() {
    if (!validate(withdrawAmount, "balance")) return;

    //write new balance into MongoDB
    const url = `/account/withdraw/${data.sessionInfo.currentUser.email}/${withdrawAmount}`;
    (async () => {
      try {
        var res = await fetch(url);
        await balanceFromDatabase();
        console.log(balance);
        setShow(false);
      } catch (err) {
        console.log(err);
      }
    })().catch((err) => {
      console.log(err);
    });
  }

  React.useEffect(() => {
    console.log(data);
  }, [data]);
  React.useEffect(() => {
    console.log(balance);
  }, [balance]);

  const clearForm = () => {
    setShow(true);
  };

  return (
    <Card
      bgcolor="warning"
      header="Make a withdrawal"
      status={status}
      body={
        show ? (
          <>
            Account: {data.sessionInfo.currentUser.email}
            <br />
            Balance: ${balance}
            <br />
            <input
              type="input"
              className="form-control"
              id="balance"
              placeholder="$0.00"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={makeWithdrawal}
            >
              Withdraw
            </button>
          </>
        ) : (
          <>
            <h5>Withdrawal successful. Current Balance: ${balance}</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Make another withdrawal
            </button>
          </>
        )
      }
    />
  );
}
