/*-------------------------------- Starter Code --------------------------------*/
const dotenv = require('dotenv');
dotenv.config();
const Customer = require('./models/customer.js');
const mongoose = require('mongoose');

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
};

const disconnect = async () =>{
  mongoose.connection.close();
  console.log('Disconnected from MongoDB');
  process.exit();
}

/*-------------------------------- Query Functions --------------------------------*/
const prompt = require('prompt-sync')({sigint: true});
const lineBreak = () => console.log(`
-----------------------------------------------
  `);
let isAppActive = false;

const init = () =>{
  lineBreak()
  console.log("Welcome to the CRM");
  prompt(`Press 'ENTER' to connect.. `);
  isAppActive = true;
  lineBreak();
  mainMenu();
}

const mainMenu = async () =>{
  await connect();
  while(isAppActive === true){
    lineBreak();
    console.log(`
    What would you like to do?
      
    1. Create a customer
    2. View all customers
    3. Update a customer
    4. Delete a customer
    5. Quit
  `);
  const userSelection = prompt(`Enter a number option: `);
  lineBreak();

  switch (userSelection){
    case '1':
      await createCustomer();
      break;
    case '2':
      await viewAllCustomer();
      break;
    case '3':
      await updateCustomer();
      break;
    case '4':
      await deleteCustomer();
      break;
    case '5':
      await quitApp();
      break;
    default:
      prompt("That option is not valid. Press 'ENTER' to return to try again ");
      lineBreak();
      mainMenu();
  }
  }
}

const createCustomer = async () => {
  console.log(`
    1. Create a customer
    `);
  const customerName = prompt('What is the name of the customer? ')
  const customerAge = prompt("What is the customer's age? ")
  lineBreak();
  const customerData = {
    name: customerName,
    age: customerAge
  }
  
  const customer = await Customer.create(customerData)
  console.log('New customer: ', customer);
}

const viewAllCustomer = async () => {
  console.log(`
    2. View all customers
    `);
  const customers = await Customer.find({});
  console.log('All customers: ', customers);
}

const updateCustomer = async () => {
  console.log(`
    3. Update a customer
    `);
  console.log(`
    Below is a list of customers:
    `);

  const customers = await Customer.find({});
  const formattedCustomers = customers.map((customer) => {
    return {
      id: customer._id.toString(),
      name: customer.name,
      age: customer.age
    };
  });

  formattedCustomers.forEach((customer) => {
    console.log(`id: ${customer.id} -- Name: ${customer.name}, Age: ${customer.age}`);
  });


  lineBreak()
  const customerId = prompt(`Copy and paste the id of the customer you would like to UPDATE here: `);
  const newName = prompt(`What is the customer's new name? `);
  const newAge = prompt(`What is the customer's new age? `);

  const customer = await Customer.findByIdAndUpdate(customerId, {name: newName, age: newAge}, {new: true})
  lineBreak();
  console.log('Updated customer: ', customer);
}

const deleteCustomer = async () => {
  console.log(`
    4. Delete a customer
    `);
  console.log(`
    Below is a list of customers:
    `);
  
  const customers = await Customer.find({});
  const formattedCustomers = customers.map((customer) => {
    return {
      id: customer._id.toString(),
      name: customer.name,
      age: customer.age
    };
  });
  
  formattedCustomers.forEach((customer) => {
    console.log(`id: ${customer.id} -- Name: ${customer.name}, Age: ${customer.age}`);
  });
  
  lineBreak()
  const customerId = prompt(`Copy and paste the id of the customer you would like to DELETE here: `);

  const customer = await Customer.findByIdAndDelete(customerId)
  lineBreak();
  console.log('Deleted customer: ', customer);
}

const quitApp = async () => {
  isAppActive = false;
  await disconnect();
}

init();