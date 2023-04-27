const totalBill = document.querySelector(".total");
const tipPercentage = document.querySelectorAll(".percentage");
const customPercentage = document.querySelector(".custom");
const numberOfPeople = document.querySelector(".number-of-people-total");
const tipPerPersonCalculated = document.querySelector(".tip-per");
const billPerPersonCalculated = document.querySelector(".bill-per");
const errorMessage = document.querySelectorAll(".error");
const resetButton = document.querySelector(".reset");

let totalBillValue = 0;
let tipPercentageValue = 0;
let numberOfPeopleValue = 0;
let total = 0;
let tip = 0;

tipPercentage.forEach((button) => {
  button.addEventListener("click", (event) => {
    tipPercentageValue = parseInt(event.target.innerText);
    customPercentage.value = "";
    calculation();
    if (button.classList.contains("selected")) {
      button.classList.remove("selected");
      tipPercentageValue = 0;
      calculation();
    } else {
      button.classList.add("selected");
      tipPercentage.forEach((remove) => {
        if (remove !== button && button.classList.contains("selected")) {
          remove.classList.remove("selected");
        }
      });
    }
    checkInputs();
  });
});

totalBill.addEventListener("input", (event) => {
  totalBillValue = parseInt(event.target.value);
  if (totalBill.value !== "") {
    if (totalBillValue == 0) {
      errorMessage[0].style.display = "block";
      totalBill.style.outline = "2px solid #E17052";
    } else if (totalBillValue > 0) {
      totalBill.style.outline = "2px solid #26C2AE";
      errorMessage[0].style.display = "none";
      calculation();
      checkInputs();
    } else {
      totalBill.style.outline = "none";
      errorMessage[0].style.display = "none";
    }
  } else {
    tipPerPersonCalculated.innerHTML = "$0.00";
    billPerPersonCalculated.innerHTML = "$0.00";
  }
});

customPercentage.addEventListener("input", (event) => {
  tipPercentageValue = parseInt(event.target.value);
  if (customPercentage.value !== "") {
    if (customPercentage.value == "") {
      billPerPersonCalculated = "$0.00";
      tipPerPersonCalculated = "$0.00";
    } else {
      tipPercentage.forEach((button) => {
        button.classList.remove("selected");
      });
      calculation();
      checkInputs();
    }
  } else {
    tipPerPersonCalculated.innerHTML = "$0.00";
    billPerPersonCalculated.innerHTML = "$0.00";
  }
});

numberOfPeople.addEventListener("input", (event) => {
  numberOfPeopleValue = parseInt(event.target.value);
  if (numberOfPeople.value !== "") {
    if (numberOfPeopleValue == 0) {
      errorMessage[1].style.display = "block";
      numberOfPeople.style.outline = "2px solid #E17052";
    } else if (numberOfPeopleValue > 0) {
      numberOfPeople.style.outline = "2px solid #26C2AE";
      errorMessage[1].style.display = "none";
      calculation();
      checkInputs();
    } else {
      numberOfPeople.style.outline = "none";
      errorMessage[1].style.display = "none";
    }
  } else {
    tipPerPersonCalculated.innerHTML = "$0.00";
    billPerPersonCalculated.innerHTML = "$0.00";
  }
});

resetButton.addEventListener("click", resetEverything);

function resetEverything() {
  tipPerPersonCalculated.innerHTML = "$0.00";
  billPerPersonCalculated.innerHTML = "$0.00";
  totalBill.value = "";
  numberOfPeople.value = "";
  customPercentage.value = "";
  totalBill.style.outline = "none";
  numberOfPeople.style.outline = "none";
  errorMessage[0].style.display = "none";
  errorMessage[1].style.display = "none";
  tipPercentage.forEach((button) => {
    button.classList.remove("selected");
  });
  checkInputs();
  resetButton.classList.remove("turnoff");
}

function calculation() {
  if (tipPercentageValue !== 0) {
    total = (
      (totalBillValue + totalBillValue * (tipPercentageValue / 100)) /
      numberOfPeopleValue
    ).toFixed(2);
    tip = (
      (totalBillValue * (tipPercentageValue / 100)) /
      numberOfPeopleValue
    ).toFixed(2);
    if (
      numberOfPeopleValue === 0 ||
      numberOfPeopleValue.length === 0 ||
      numberOfPeople.value === ""
    ) {
      billPerPersonCalculated.innerText = "$0.00";
      tipPerPersonCalculated.innerText = "$0.00";
    } else {
      billPerPersonCalculated.innerText = `$${total}`;
      tipPerPersonCalculated.innerText = `$${tip}`;
    }
  }
}

function checkInputs() {
  if (
    totalBill.value === "" &&
    numberOfPeople.value === "" &&
    customPercentage.value === "" &&
    tipPercentage.forEach((button) => {
      button.classList.contains("selected");
    })
  ) {
    resetButton.classList.remove("turnoff");
  } else { 
    resetButton.classList.add("turnoff");
  }
}
