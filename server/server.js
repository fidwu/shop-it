
// import packages used
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 4000;

const routes = require('./routes/inventoryRoutes');
const accountroutes = require('./routes/account');

// MongoDB
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

mongoose.connection.on('connected', () => {
  console.log("Mongoose connected");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('tiny'));
app.use("/user", accountroutes);
app.use("/api", routes);


app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
