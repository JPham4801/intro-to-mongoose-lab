const mongoose = require('mongoose');

// Define customer scheme
const customerSchema = new mongoose.Schema({
  name: String,
  age: Number,
})

// Compile the schema into a model
const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer;