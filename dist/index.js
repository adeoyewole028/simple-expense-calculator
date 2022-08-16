const deleteBtn = document.querySelector("#delete");
const expenses = document.getElementById("expenses");
const total = document.querySelector("#total");
const dateEl = document.querySelector("#dateEl");
let amountEl = document.querySelector("#amountEl");
const inputVal = document.querySelectorAll("input");
let incomeInput = document.getElementById("incomeInput");
let incomeEl = document.querySelector("#income");
let purpose = document.getElementById("purposeInput");
let purposeEl = document.querySelector("#purposeEl");
let updateBtn = document.getElementById("update");
let balanceEl = document.querySelector("#balance");

// console.log(inputVal);

const object = {};

const amount = [];

const dailyExpense = [];

console.log(dailyExpense);

function getNewArrayIndex(array) {
  let object = [...Array(array.length)].map((_, i) => {
    return {
      index: i,
      purpose: array[i].purpose,
      amount: array[i].amount,
      date: array[i].date,
    };
  });
  console.log(object);
}

let sumOfExpenses = 0;

//Add date and time
function getDate() {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let time = `${day}/${month}/${year} ${hour}:${minutes}:${seconds} PM`;
  if (minutes <= 9) {
    minutes = "0" + minutes;
  }
  if (seconds <= 9) {
    seconds = "0" + seconds;
  }
  if (hour <= 9) {
    hour = "0" + hour;
  }
  if (hour >= 12) {
    hour = hour - 12;
    hour = "0" + hour;
    time = `${day}/${month}/${year} ${hour}:${minutes}:${seconds} PM`;
    console.log(time);
    return time;
  } else if (hour === 0) {
    hour = 12;
    time = `${day}/${month}/${year} ${hour}:${minutes}:${seconds} AM`;
    console.log(time);
    return time;
  } else {
    time = `${day}/${month}/${year} ${hour}:${minutes}:${seconds} AM`;
    console.log(time);
    return time;
  }
}

// disable button if input is empty
// function disableButton(input, button) {
//   if (input.value === "") {
//     button.disabled = true;
//   } else {
//     button.disabled = false;
//   }
// }

// disableButton(expenses, updateBtn);
// disableButton(incomeInput, updateBtn);
// disableButton(purpose, updateBtn);

// inputVal.forEach((inputs) => {
//   disableButton(inputs, updateBtn);
//   console.log(inputs);
//   inputs.addEventListener("keyup", () => {
//     disableButton(inputs, updateBtn);
//   });
// });

// expenses.addEventListener("input", () => {
//   disableButton(expenses, updateBtn);
// });

// incomeInput.addEventListener("input", () => {
//   disableButton(incomeInput, updateBtn);
// });

// purpose.addEventListener("input", () => {
//   disableButton(purpose, updateBtn);
// });

//get in put value
function getInputValue(inputVal, element) {
  inputVal.forEach((input) => {
    input.addEventListener("input", () => {
      element.innerHTML = input.value;
    });
  }),
    (element.innerHTML = inputVal.value);
}

// Update daily expense
updateBtn.addEventListener("click", function () {
  object.amount = expenses.value; // amountEl.value;
  object.purpose = purpose.value; // purposeEl.value;
  object.date = getDate();

  for (let key in object) {
    // loop through object
    if (key === "amount") {
      // if key is amount
      let amountKey = document.createElement("p");
      addExpense(dailyExpense, expenses, object); // add expense to array
      amount.push(object[key]); // amount.push(amountEl.value);
      amountKey.innerHTML = object[key];
      amountEl.appendChild(amountKey);
      object.amount = expenses.value; // amountEl.value;
      expenses.value = "";

      console.log(object[key]);
    } else if (key === "date") {
      let dateKey = document.createElement("p");
      dateKey.innerHTML = object[key];
      dateEl.appendChild(dateKey);
    } else if (expenses.value === "" && purpose.value === "") {
      console.log("empty");
      // dateKey.innerHTML = "";
      object.date = "";
      // disableButton();
    } else {
      let purposeKey = document.createElement("p");
      purposeKey.innerHTML = object[key]; // purposeEl.value;
      purposeEl.appendChild(purposeKey);
      purpose.value = "";
    }
  }
  getSum(amount); // get sum of expenses
  total.textContent = sumOfExpenses; // display sum of expenses

  let monthlyIncome = +incomeInput.value; // convert string to number
  getBalance(monthlyIncome, sumOfExpenses, balanceEl);
});

function addExpense(array, expense, obj) {
  array.push(obj); // add object to array
  getNewArrayIndex(array);
  console.log(array);
  console.log(obj);
  console.log(amount);
}

deleteBtn.addEventListener("click", function () {
  amountEl.removeChild(amountEl.lastChild);
  purposeEl.removeChild(purposeEl.lastChild);
  dateEl.removeChild(dateEl.lastChild);

  amount.splice(-1);
  getSubtract(amount);
  total.textContent = sumOfExpenses;

  let monthlyIncome = +incomeInput.value; // convert string to number
  getBalance(monthlyIncome, sumOfExpenses, balanceEl);
});

// Get monthly income
function getUserInputs(inputVal, element) {
  let userInput = +inputVal.value; // convert string to number
  element.textContent = userInput;
}

// Display monthly income
incomeInput.addEventListener("keyup", function (e) {
  console.log("keydown");
  getUserInputs(incomeInput, incomeEl);

  // disableButton(incomeInput, updateBtn);
});

// Sum of expenses
function getSum(array) {
  sumOfExpenses = array.reduce(
    (acc, curr) => +acc + +curr, // + sign converts string to number

    0
  );
  console.log(sumOfExpenses);
}

function getSubtract(array) {
  sumOfExpenses = array.reduce(
    (acc, curr) => acc - curr,

    0
  );
  if (sumOfExpenses < 0) {
    sumOfExpenses *= -1;
  }
  console.log(sumOfExpenses);
}

// Get balance
function getBalance(income, expenditure, balance) {
  let result = income - expenditure;
  balance.textContent = result;
  if (result < 0) {
    return (balance.style.color = "red");
  } else {
    return (balance.style.color = "green");
  }
}
