const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config({ path: './.env'});

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
  },
  email: {
    type: String,
    required: [true, "please enter email"],
    unique: true,
    validate: [validator.isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    minLength: [3, "password should be greater than 3 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Method to generate a JWT token for the user
userSchema.methods.getjwtToken = function () {
  return jwt.sign({ id: this._id }, '4d7fbd970ef45512b4bea503120ee30b97e109c10cc80c83227c153aa5eac336', {
    
  });
};

// Method to compare the user's password with a provided password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create the User model
const UserModel = mongoose.model("user", userSchema);

//export the user Model
module.exports = UserModel;
