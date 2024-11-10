const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Route for login page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
  console.log("A user requested the login page");
});

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  fs.readFile(__dirname + "/users.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return res.status(500).send("Server error");
    }

    try {
      const users = JSON.parse(jsonString);
      const user = users.find((u) => u.username === username && u.password === password);

      if (user) {
        res.redirect(307, "/notevote");
      } else {
        res.redirect('/');
      }
    } catch (parseErr) {
      console.log("Error parsing JSON:", parseErr);
      res.status(500).send("Server error");
    }
  });
});

// Route to serve authenticated page
app.post("/notevote", (req, res) => {
  res.sendFile(__dirname + "/public/notevote.html");
  console.log("User authenticated, serving the notevote page");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
