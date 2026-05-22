const billInput = document.getElementById("bill");
const customTip = document.getElementById("customTip");
const peopleInput = document.getElementById("people");
const tipButtons = document.querySelectorAll(".tip-btn");
const tipAmount = document.getElementById("tipAmount");
const grandTotal = document.getElementById("grandTotal");
const perPerson = document.getElementById("perPerson");
const billError = document.getElementById("billError");
const tipError = document.getElementById("tipError");
const peopleError = document.getElementById("peopleError");
const resetBtn = document.getElementById("resetBtn");
let selectedTip = 0;
tipButtons.forEach(button => {
  button.addEventListener("click", () => {
    tipButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    selectedTip = Number(button.textContent);
    customTip.value = "";
    calculate();
  });
});
customTip.addEventListener("input", () => {
  tipButtons.forEach(btn => btn.classList.remove("active"));
  selectedTip = Number(customTip.value);
  calculate();
});
billInput.addEventListener("input", calculate);
peopleInput.addEventListener("input", calculate);
function calculate(){
  let bill = Number(billInput.value);
  let people = Number(peopleInput.value);
  billError.textContent = "";
  tipError.textContent = "";
  peopleError.textContent = "";
  let valid = true;
  // Bill Validation
  if(bill <= 0 || isNaN(bill)){
    billError.textContent = "Bill must be greater than 0";
    valid = false;
  }
  // Tip Validation
  if(selectedTip < 0 || selectedTip > 100){
    tipError.textContent = "Tip must be between 0 and 100";
    valid = false;
  }
  // People Validation
  if(people < 1 || !Number.isInteger(people)){
    peopleError.textContent = "People must be at least 1";
    valid = false;
  }
  if(!valid){
    tipAmount.textContent = "Rs 0.00";
    grandTotal.textContent = "Rs 0.00";
    perPerson.textContent = "Rs 0.00";
    return;
  }
  let tip = (bill * selectedTip) / 100;
  let total = bill + tip;
  let eachPerson = total / people;
  tipAmount.textContent = `Rs ${tip.toFixed(2)}`;
  grandTotal.textContent = `Rs ${total.toFixed(2)}`;
  perPerson.textContent = `Rs ${eachPerson.toFixed(2)}`;
}
resetBtn.addEventListener("click", () => {
  billInput.value = "";
  customTip.value = "";
  peopleInput.value = "";
  selectedTip = 0;
  tipButtons.forEach(btn => btn.classList.remove("active"));
  billError.textContent = "";
  tipError.textContent = "";
  peopleError.textContent = "";
  tipAmount.textContent = "Rs 0.00";
  grandTotal.textContent = "Rs 0.00";
  perPerson.textContent = "Rs 0.00";
});