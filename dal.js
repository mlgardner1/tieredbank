const { resolve } = require("path");
//const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ServerApiVersion } = require("mongodb");
const url = process.env.MONGO_URI;
let db = null;

//connect to mongo
MongoClient.connect(url, { useUnifiedTopology: true }).then(function (
  client,
  err
) {
  console.log("Connected successfully to db server");

  //connect to Mongo Atlas
  // const client = new MongoClient(uri, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   serverApi: ServerApiVersion.v1,
  // });
  // client.connect((err) => {
  //   const collection = client.db("test").collection("devices");
  //   // perform actions on the collection object
  //   client.close();
  // });

  //connect to myproject database
  db = client.db("myproject");
});

//create user account
function create(name, email, password, balance = 100, isAdmin = false) {
  return new Promise((resolve, reject) => {
    const collection = db.collection("users");
    balance = parseInt(balance);
    const doc = { name, email, password, balance, isAdmin };
    collection.insertOne(doc, { w: 1 }).then(function (result, err) {
      console.log("Insert attempted.");
      err ? reject(err) : resolve(doc);
    });
  });
}

//user account balance
function balance(email, balance) {
  return new Promise((resolve, reject) => {
    const collection = db
      .collection("users")
      .find({ email: email }, { balance: balance })
      .toArray()
      .then(function (docs, err) {
        console.log("User retrieved");
        err ? reject(err) : resolve(docs);
      });
  });
}

//make a deposit
function deposit(email, balance) {
  return new Promise((resolve, reject) => {
    const collection = db.collection("users");
    balance = parseInt(balance);
    collection
      .updateOne({ email: email }, { $inc: { balance: balance } })
      .then(function (result, err) {
        console.log("deposit attempted.");
        err ? reject(err) : resolve(result);
      });
  });
}

//make a withdrawl
function withdraw(email, balance) {
  return new Promise((resolve, reject) => {
    const collection = db.collection("users");
    balance = -parseInt(balance);
    collection
      .updateOne({ email: email }, { $inc: { balance: balance } })
      .then(function (result, err) {
        result.newBalance = balance;
        console.log("took out some money.");
        err ? reject(err) : resolve(result);
      });
  });
}

//login
function login(email, password) {
  return new Promise((resolve, reject) => {
    const collection = db.collection("users");
    collection
      .find({
        $and: [{ email: { $eq: email } }, { password: { $eq: password } }],
      })
      .toArray(function (err, docs) {
        err ? reject(err) : resolve(docs);
      });
  });
}

//all users
function all() {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .find({})
      .toArray()
      .then(function (docs, err) {
        console.log("All attempted.");
        err ? reject(err) : resolve(docs);
      });
  });
}

module.exports = { create, deposit, withdraw, login, all, balance, db };
