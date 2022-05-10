const mongoose = require("mongoose");

const connectMongoose = () => {
  mongoose
    .connect("mongodb://localhost:27017/expresstutorial", {
      useNewUrlParser: true,
    })
    .then(() => console.log("Now connected to MongoDB!"))
    .catch((err) => console.error("Something went wrong", err));
};

module.exports = { connectMongoose };
