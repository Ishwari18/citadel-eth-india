const mongoose = require('mongoose');

//const mongoURI = "mongodb://localhost:27017/";
const mongoURI = "mongodb://0.0.0.0:27017/";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToMongo = () => {
  mongoose.connect(mongoURI, options, (err) => {
    if (err) {
      console.error("Error connecting to MongoDB:", err.message);
      process.exit(1); // Exit the process if the connection fails
    }
    console.log("Connected to Mongo Successfully");
  });
};

module.exports = connectToMongo;