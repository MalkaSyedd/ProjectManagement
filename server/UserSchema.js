const mongoose = require("mongoose"); //users collection

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String
});

const User = mongoose.model("User", UserSchema);

module.exports = User;