let balance = 0

const savedBalance =
  localStorage.getItem("balance")

if (savedBalance !== null) {
  balance = Number(savedBalance)
}

updateDisplay()


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

  const balanceText =
    document.getElementById("balance")

  balanceText.innerText =
    `残高: ${balance}円`

  document.getElementById("meal").innerText =
    `あと${Math.floor(balance / 350)}食`

  // 残高不足なら赤
  if (balance < 350) {

    balanceText.style.color = "red"

  } else {

    balanceText.style.color = "#222"
  }
}


function saveBalance() {

  localStorage.setItem(
    "balance",
    balance
  )
}



  const now = new Date()

  const day = now.getDay()

  const hour = now.getHours()

  const minute = now.getMinutes()

  // 平日判定
  const isWeekday =
    day >= 1 && day <= 5

  // 残高不足
  const isLowBalance =
    balance < 350

  if (
    isWeekday &&
    hour === 12 &&
    minute === 0 &&
    isLowBalance &&
    notified === false
  ) {

    alert("⚠ チャージが必要です！")

    notified = true
  }

  // 12:00以外になったらリセット
  if (
    hour !== 12 ||
    minute !== 0
  ) {

    notified = false
  }

async function requestNotificationPermission() {
  if (!("Notification" in window)) return;

  if (Notification.permission === "default") {
    await Notification.requestPermission();
  }
}

function sendLowBalanceNotification() {
  if (Notification.permission !== "granted") return;

  new Notification("学食残高不足", {
    body: "残高が350円未満です",
    icon: "icon.png"
  });
}

let notified = false;

setInterval(() => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();

  const isWeekday = day >= 1 && day <= 5;
  const isLunchTime = hour === 12 && minute === 0;
  const isLowBalance = balance < 350;

  if (
    isWeekday &&
    isLunchTime &&
    isLowBalance &&
    !notified
  ) {
    sendLowBalanceNotification();
    notified = true;
  }

  if (minute !== 0) {
    notified = false;
  }
}, 1000);

requestNotificationPermission();