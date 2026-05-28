let balance = 0

const savedBalance =
  localStorage.getItem("balance")

if (savedBalance !== null) {
  balance = Number(savedBalance)
}

updateDisplay()

function setBalance() {

  balance =
    Number(
      document.getElementById("inputBalance").value
    )

  saveBalance()

  updateDisplay()
}

function eatMeal() {

  balance -= 350

  if (balance < 0) {
    balance = 0
  }

  saveBalance()

  updateDisplay()
}

function charge(amount) {

  balance += amount

  saveBalance()

  updateDisplay()
}

function updateDisplay() {

  document.getElementById("balance").innerText =
    `残高: ${balance}円`

  document.getElementById("meal").innerText =
    `あと${Math.floor(balance / 350)}食`
}

function saveBalance() {

  localStorage.setItem(
    "balance",
    balance
  )
}

