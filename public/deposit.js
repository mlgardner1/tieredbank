function Deposit(props) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [balance, setBalance] = React.useState(0);
  const [depositAmount, setDepositAmount] = React.useState(0);
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
        console.log(details);
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
    if (!Number(amount)) {
      setStatus("Error: Please enter a valid number");
      return false;
    }
    if (amount < 0) {
      setStatus("Error: Cannot deposit a negative amount");
      return false;
    }
    return true;
  };

  function balanceDeposit() {
    if (!validate(depositAmount, "balance")) return;

    //write new balance into MongoDB
    const url = `/account/deposit/${data.sessionInfo.currentUser.email}/${depositAmount}`;
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

  function clearForm() {
    setShow(true);
  }

  return (
    <Card
      bgcolor="secondary"
      header="Make a deposit"
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
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={balanceDeposit}
            >
              Deposit
            </button>
          </>
        ) : (
          <>
            <h5>Deposit successful. Current Balance: ${balance}</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Make another deposit
            </button>
          </>
        )
      }
    />
  );
}
