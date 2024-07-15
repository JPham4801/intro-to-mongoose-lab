const mongoose = require('mongoose');

// Define customer scheme
const customerSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

// Compile the schema into a model
module.exports = mongoose.model('Customer', customerSchema);