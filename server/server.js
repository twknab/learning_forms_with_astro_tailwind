const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.urlencoded({ extended: true })).use(morgan("dev"));

// Routes
app.get("/", (req, res) => res.send("Ahoy"));
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);

  // NOTE: Never do this below (we'd always query a db and check credentials)
  // This is just for learning
  if (email === "test@test.com" && password === "test") {
    console.log("We have a member! 😀");
    res.redirect("http://localhost:3000/members");
    return;
  }

  console.log("Not a member");
  res.redirect('http://localhost:3000/login');
});
app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirmation = req.body.passwordConfirmation
  console.log(email, password, passwordConfirmation);

  // NOTE: Never do this below (we'd always query a db and check credentials)
  // This is just for learning
	if (!email || !password || !passwordConfirmation) {
    res.status(400).send("Missing data");
    return;
  }

  if (accountExists(email)) {
    res.status(403).send("Account already exists");
    return;
  }

  if (password !== passwordConfirmation) {
    res.status(400).send("Passwords do not match");
    return;
  }

  if (password.length < 8) {
    res.status(400).send("Password is too short.");
    return;
  }

  createAccount(email, password, () => res.status(200).send("Account created."));
});

const accountExists = (email) => {
  // Here we should check if the account exists.
  return false;
};

const createAccount = (email, password, callback) => {
  // Here we should register the account.
  callback();
};

// Run server
app.listen(3001, () => console.log("Server ready on https://localhost:3001"));
