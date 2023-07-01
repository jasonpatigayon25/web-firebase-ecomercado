const express = require("express");
const collection = require("./mongo");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await collection.findOne({ username: username });

    if (user) {
      if (user.password === password) {
        res.json("exist");
      } else {
        res.json("passwordIncorrect");
      }
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});

async function getData() {
  try {
    await mongoose.connect("mongodb+srv://your-mongodb-connection-string");
    const data = await collection.find();
    return data;
  } catch (error) {
    console.error("Error retrieving data from MongoDB:", error);
    return [];
  } finally {
    mongoose.connection.close();
  }
}

app.get("/", async (req, res) => {
  const data = await getData();
  res.render("index", { data });
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const data = {
    username: username,
    password: password,
  };

  try {
    const check = await collection.findOne({ username: username });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await collection.insertMany([data]);
    }
  } catch (e) {
    res.json("fail");
  }
});

app.get("/", cors(), async (req, res) => {
  try {
    const data = await collection.find();
    res.json(data);
  } catch (error) {
    console.error("Error retrieving data from MongoDB:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(8000, () => {
  console.log("Server connected on port 8000");
});