const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const connectionUri = process.env.ATLAS_URI;

mongoose
  .connect(connectionUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connection established.'))
  .catch((error) => console.error('MongoDB connection failed:', error.message));

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const UserRegistration = mongoose.model('UserRegistration', userSchema);

app.post('/insert', async (req, res) => {
  const { username, email, password } = req.body;

  const user = new UserRegistration({
    username: username,
    email: email,
    password: password,
  });

  try {
    await user.save();
    res.send('Data inserted successfully');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error inserting data');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});