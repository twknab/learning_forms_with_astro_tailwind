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

// Run server
app.listen(3001, () => console.log("Server ready on https://localhost:3001"));
