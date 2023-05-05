const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/node-prac")
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error(`mongodb-error`, err);
});

module.exports = connect;


