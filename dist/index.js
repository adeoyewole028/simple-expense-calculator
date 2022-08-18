const deleteBtn = document.querySelector("#delete");
const amount = document.getElementById("amount");
const total = document.querySelector("#total");
const dateEl = document.querySelector("#dateEl");
const display = document.querySelector("#display");
let amountEl = document.querySelector("#amountEl");
const inputVal = document.querySelectorAll("input");
let incomeInput = document.getElementById("incomeInput");
let incomeEl = document.querySelector("#income");
let purpose = document.getElementById("purposeInput");
let purposeEl = document.querySelector("#purposeEl");
let updateBtn = document.getElementById("update");
let balanceEl = document.querySelector("#balance");

const listOfAmount = [];

const dailyExpense = [];
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
  if (hour > 12) {
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

// disable update button if inputfield is empty
// updateBtn.disabled = true;
function disableUpdateBtn() {
  inputVal.forEach((input) => {
    input.addEventListener("keyup", () => {
      if (
        amount.value === "" ||
        purpose.value === "" ||
        incomeInput.value === ""
      ) {
        updateBtn.disabled = true;
        return;
      } else {
        updateBtn.disabled = false;
        return;
      }
    });
  });
}
// disableUpdateBtn();

document.addEventListener("DOMContentLoaded", () => {
  // Update daily expense
  updateBtn.addEventListener("click", function () {
    addExpense(dailyExpense);
    getSum(listOfAmount); // get sum of expenses
    console.log(listOfAmount);
    total.textContent = sumOfExpenses; // display sum of expenses

    let monthlyIncome = +incomeInput.value; // get monthly income
    getBalance(monthlyIncome, sumOfExpenses, balanceEl);

    setLocalStorageData(dailyExpense, (string = "expenses"));
    getLocalStorage((string = "expenses"));
    // localStorage.setItem("expense", JSON.stringify(expenses));

    // let fromLocalStorage = JSON.parse(localStorage.getItem("expense"));

    // console.log(fromLocalStorage);
  });

  deleteBtn.addEventListener("click", function () {
    if (dailyExpense.length === 0) {
      return;
    }

    amountEl.removeChild(amountEl.lastChild);
    purposeEl.removeChild(purposeEl.lastChild);
    dateEl.removeChild(dateEl.lastChild);

    listOfAmount.splice(-1); // remove last element from array
    getSubtract(listOfAmount);
    total.textContent = sumOfExpenses;

    let monthlyIncome = +incomeInput.value;
    getBalance(monthlyIncome, sumOfExpenses, balanceEl);
  });
});

function setLocalStorageData(array, string = "") {
  localStorage.setItem(string, JSON.stringify(array));
  console.log(array);
}

function getLocalStorage(string = "") {
  let fromLocalStorage = JSON.parse(localStorage.getItem(string));
  console.log(fromLocalStorage);
}

function deleteLocalStorage(string = "") {
  localStorage.removeItem(string);
}

function addExpense(array) {
  const expenses = {
    id: array.length + 1,
    amount: +amount.value, // "+" sign converts string to number
    purpose: purpose.value,
    date: getDate(),
  };

  if (amount.value === "" && purpose.value === "") {
    console.log("empty");
    return;
  } else {
    array.push(expenses);
    listOfAmount.push(expenses.amount); // add amount to array
    console.log(array);
  }

  for (key in expenses) {
    if (key === "amount") {
      let amountKey = document.createElement("p");
      amountKey.innerHTML = expenses[key];
      amountEl.appendChild(amountKey);
      console.log(expenses[key]);
      amount.value = "";
    } else if (key === "date") {
      let dateKey = document.createElement("p");
      dateKey.innerHTML = expenses[key];
      dateEl.appendChild(dateKey);
    } else if (key === "purpose") {
      let purposeKey = document.createElement("p");
      purposeKey.innerHTML = expenses[key];
      purposeEl.appendChild(purposeKey);
      purpose.value = "";
    }
  }

  console.log(array);
  console.log(expenses);
}

// Get monthly income
function getUserInputs(inputVal, element) {
  let userInput = +inputVal.value;
  element.textContent = userInput;
}

// Display monthly income
incomeInput.addEventListener("keyup", function (e) {
  getUserInputs(incomeInput, incomeEl);
});

// Sum of expenses
function getSum(array) {
  sumOfExpenses = array.reduce(
    (acc, curr) => acc + curr,

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
    sumOfExpenses *= -1; // make negative number positive
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
