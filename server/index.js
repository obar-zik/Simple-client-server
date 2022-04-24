const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

const userData = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

/**
 * Get all users
 */
app.get("/api/users", (req, res) => {
  res.send(userData);
});

/**
 * Get user by id
 */
app.get("/api/user", (req, res) => {
  const user = userData.find((user) => user.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).send("The user with the given ID was not found.");
  }

  res.send(user);
});

/**
 *  Add new user to the userData array.
 */
app.post("/api/user", (req, res) => {
  const user = {
    id: userData.length + 1,
    name: req.body.name,
    email: req.body.email,
  };

  userData.push(user);

  res.send(user);
});

/**
 * Update user by id.
 */
app.put("/api/user", (req, res) => {
  const id = req.params.id;
  const user = userData.find((user) => user.id === id);

  user.name = req.body.name;
  user.email = req.body.email;

  res.send(user);
});

/**
 * Delete user by id.
 */
app.delete("/api/user", (req, res) => {
  const id = req.params.id;
  const user = userData.find((user) => user.id === id);

  userData.splice(userData.indexOf(user), 1);

  res.send(user);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
