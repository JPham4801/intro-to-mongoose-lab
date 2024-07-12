const prompt = require('prompt-sync')({sigint: true});
const lineBreak = () => console.log("---------------------------------------");

const init = () =>{
  // console.log("Welcome to the CRM");
  // console.log("Press 'CTRL + C' at anytime to quit");
  // prompt(`Press 'ENTER' to continue `);
  // lineBreak();
  menuOptionsPrompt();
}

const menuOptionsPrompt = () =>{
  console.log(`
  What would you like to do?
      
  1. Create a customer
  2. View all customers
  3. Update a customer
  4. Delete a customer
  5. Quit
  `);
  const menuOptionNum = prompt(`Select a number option: `);
  lineBreak();
  menuOptionsHandler(menuOptionNum)
}

const menuOptionsHandler = (optionNum) =>{
  switch (optionNum){
    case '1':
      console.log(`1. Create a customer`);
      break;
    case '2':
      console.log(`2. View all customers`);
      break;
    case '3':
      console.log(`3. Update a customer`);
      break;
    case '4':
      console.log(`4. Delete a customer`);
      break;
    case '5':
      console.log(`Quitting... `);
      break;
    default:
      prompt("That option was not valid. Press 'ENTER' to return ");
      lineBreak();
      menuOptionsPrompt();
  }
}

init();