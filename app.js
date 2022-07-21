const dotenv = require("dotenv");
const express = require("express");
const bcryptjs = require("bcryptjs");

const app = express();

dotenv.config({ path: "./config.env" });
require("./db/coonnection");
const port = process.env.PORT;
const saltRound = process.env.SALT_ROUND;

const Users = require("./models/userSchema");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/register", async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = bcryptjs.hashSync(req.body.password, saltRound);

    const createUser = new Users({
      username: username,
      email: email,
      password: password,
    });
    const created = await createUser.save();
    console.log(created);
    res.status(200).send("Registered");
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is Running at port:${port}`);
});
