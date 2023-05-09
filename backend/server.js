const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const connection_string = process.env.ATLAS_URI;
mongoose.connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true

})
.then(() => console.log('MongoDB connection established.'))
.catch((error) => console.error("MongoDB connection failed:", error.message))

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});