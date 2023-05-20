const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = 'mongodb+srv://jasonpatigayon25:password12345@cluster0.qgadfaa.mongodb.net/ecomercadodb';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const registrationSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const Registration = mongoose.model('Registration', registrationSchema);

app.use(cors());
app.use(express.json());

app.post('/registration', (req, res) => {
  const { username, email, password, repassword } = req.body;

  if (password !== repassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  const registration = new Registration({ username, email, password });

  registration.save()
    .then(() => {
      res.status(201).json({ message: 'Registration successful' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Registration failed' });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});