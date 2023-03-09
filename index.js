const auth = require("./firebase.js").auth;
const express = require("express");
const app = express();
const dal = require("./dal.js");
const cors = require("cors");
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} = require("firebase/auth");

//used to serve static files from public directory
app.use(express.static("public"));
app.use(cors());

//create user account
app.get("/account/create/:name/:email/:password", function (req, res) {
  //else create user
  createUserWithEmailAndPassword(auth, req.params.email, req.params.password)
    .then((userCredential) => {
      //signed in
      const user = userCredential.user;
      dal.create(req.params.name, req.params.email, req.params.password);
    })
    .then((user) => {
      console.log(user);
      res.send(user);
    })
    .catch((err) => {
      const errCode = err.code;
      const errMessage = err.message;
    });
});

//login
app.get("/account/login/:email/:password", function (req, res) {
  signInWithEmailAndPassword(auth, req.params.email, req.params.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      res.json({ data: userCredential, currentUser: user });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMesssage = error.message;
    });
});

// log out
app.get("/account/login/:email/:password", function (req, res) {
  signOut(auth)
    .then(() => {
      //sign out successful
    })
    .catch((error) => {
      //an error occurred
    });
});

// make a deposit
app.get("/account/deposit/:email/:balance", function (req, res) {
  dal.deposit(req.params.email, req.params.balance).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// make a withdrawal
app.get("/account/withdraw/:email/:balance", function (req, res) {
  dal.withdraw(req.params.email, req.params.balance).then((user) => {
    console.log(user);
    res.send(user);
  });
});

//user account balance
app.get("/account/balance/:email", function (req, res) {
  dal
    .balance(req.params.email)
    .then((balance) => {
      console.log(balance);
      console.log("You have reached balance.then");
      res.send(balance);
    })
    .catch((err) => console.log("get account balance" + err.message));
});

//all accounts
app.get("/account/all", function (req, res) {
  dal.all().then((docs) => {
    console.log(docs);
    res.send(docs);
  });
});

var port = 3000;
app.listen(port);
console.log("Running on port: " + port);

// function seedDatabase() {
//   if (dal.db === null) {
//     console.log("Db isn't ready. Sleeping for 1 second.");
//     setTimeout(seedDatabase, 1000);
//   } else {
//     console.log("Db is working.");
//     dal
//       .create({
//         name: "Tom Bombadil",
//         email: "tom@bombadil.com",
//         password: "password",
//         balance: 100,
//         isAdmin: true,
//       })
//       .then((results) => {
//         console.log(results);
//       })
//       .catch((err) => {
//         console.err(err);
//       });
//   }
// }

// seedDatabase();
