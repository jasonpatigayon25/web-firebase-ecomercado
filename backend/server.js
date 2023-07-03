const express = require("express");
const collection = require("./mongo");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//login
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

//signup
app.post("/signup", async (req, res) => {
  const { username, firstname, lastname, password } = req.body;

  const data = {
    username: username,
    firstname: firstname,
    lastname: lastname,
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

//update-account
app.put("/update/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const { newPassword } = req.body;

    const updatedRecord = await collection.findOneAndUpdate(
      { username: username },
      { $set: { password: newPassword } },
      { returnOriginal: false }
    );

    res.send(updatedRecord);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating the record.");
  }
});

//delete-record
app.delete("/delete/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const deletedRecord = await collection.findOneAndDelete({ username: username });

    if (!deletedRecord) {
      return res.status(404).send("Record not found");
    }

    res.send(deletedRecord);
  } catch (error) {
    res.status(500).send(error);
  }
});

//account-read
app.get("/user-info", async (req, res) => {
  try {
    // Assuming you have implemented authentication and have access to the signed-in user's information
    const username = "signed-in-username"; // Replace with the actual implementation to retrieve the signed-in user's username
    const user = await collection.findOne({ username: username });

    if (user) {
      // Return the user's information
      res.json(user);
    } else {
      // User not found
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving user information:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//seller-registration
app.post("/register-seller", async (req, res) => {
  const { shopName, pickupAddress, phoneNumber, email, username } = req.body;

  const data = {
    shopName: shopName,
    pickupAddress: pickupAddress,
    phoneNumber: phoneNumber,
    email: email,
    username: username
  };

  try {
    const check = await collection.findOne({ username: username });

    if (check) {
      res.json("userExists");
    } else {
      await collection.insertMany([data]);
      res.json("success");
    }
  } catch (error) {
    console.error("Error registering seller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.listen(8000, () => {
  console.log("Server connected on port 8000");
});