let array = [
  null,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
];
let walletBalance = 500;
let ThisBet = 0;
let betAmount;
let maxMines = 3;

intialize();

function intialize() {
  betAmount = document.getElementById("currentBet").value;
  document.getElementById("CashoutBTN").style.display = "none";
  Start();
}
console.log("starting...");

function Start() {
  array = [
    null,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ];

  console.log(parseInt(document.getElementById("maxMines").value));
  document.getElementById("CashoutBTN").disabled = true;
  document.getElementById("multiplier").innerText = "1.00x";
  let mines = 1;
  ThisBet = 0;
  console.log("While Initiated...");

  while (mines < maxMines + 1) {
    let current = Math.floor(Math.random() * 2);
    if (current == 1) {
      let index = Math.floor(Math.random() * 26) + 1;
      if (array[index] == 0) {
        array[index] = 1;
        mines++;
      }
    }
  }
  console.log("While finished...");
  document.getElementById("reload").style.display = "block";
}

function Reveal(BoxNum) {
  let box = document.getElementById(`box${BoxNum}`);
  if (array[BoxNum] == 1) {
    dead();
    document.getElementById("hiddenContainer").style.display = "flex";
    document.getElementById("CashoutBTN").style.display = "none";
    document.getElementById("reload").style.display = "block";
  } else {
    box.style.backgroundImage = 'url("./diamond.png")';
    box.style.backgroundColor = "var(--BoxesOpen)";
    ThisBet++;
    let multiplier = calculateMultiplier(maxMines, ThisBet);
    document.getElementById("multiplier").innerText =
      " " + multiplier.toFixed(2) + "x";
  }
  document.getElementById("CashoutBTN").disabled = false;
}

function dead() {
  document.getElementById("multiplier").innerText = "0" + "x";
  for (let index = 1; index < array.length; index++) {
    let box = document.getElementById(`box${index}`);
    if (array[index] == 1) {
      box.style.backgroundImage = 'url("./bomb.png")';
      box.style.backgroundColor = "var(--BoxesOpen)";
    } else {
      box.style.backgroundImage = 'url("./diamond.png")';
      box.style.backgroundColor = "var(--BoxesOpen)";
    }
  }
  document.getElementById("totalBalance").innerText =
    " " + walletBalance.toFixed(2);
  document.getElementById("endScreen").style.display = "none";

  // Game Over
  document.getElementById("hiddenContainer").style.display = "flex";
  document.getElementById("endScreen").style.display = "block";
  document.getElementById("endScreen").innerText = "Game Over";

  buttonsDisable(false);
}

function Cashout() {
  for (let index = 1; index < array.length; index++) {
    let box = document.getElementById(`box${index}`);
    if (array[index] == 1) {
      box.style.backgroundImage = 'url("./bomb.png")';
      box.style.backgroundColor = "var(--BoxesOpen)";
    } else {
      box.style.backgroundImage = 'url("./diamond.png")';
      box.style.backgroundColor = "var(--BoxesOpen)";
    }
  }

  document.getElementById("hiddenContainer").style.display = "flex";
  document.getElementById("CashoutBTN").style.display = "none";
  document.getElementById("reload").style.display = "block";

  let multiplier = calculateMultiplier(maxMines, ThisBet);
  walletBalance = walletBalance + betAmount * multiplier;

  document.getElementById("totalBalance").innerText =
    " " + walletBalance.toFixed(2);
  document.getElementById("endScreen").style.display = "block";
  document.getElementById("endScreen").innerText =
    " " + multiplier.toFixed(2) + "x";
  buttonsDisable(false);
}

function Reload() {
  if (betAmount > walletBalance) {
    alert("Ye Gareeb! Ja naa...");
  } else if (
    parseInt(document.getElementById("maxMines").value) >= 25 ||
    parseInt(document.getElementById("maxMines").value) == 0
  ) {
    alert("Abe ye! yede");
  } else {
    maxMines = parseInt(document.getElementById("maxMines").value);
    console.log(parseInt(document.getElementById("maxMines").value));
    betAmount = document.getElementById("currentBet").value;
    walletBalance = walletBalance - betAmount;
    document.getElementById("totalBalance").innerText =
      " " + walletBalance.toFixed(2);

    for (let index = 1; index < 26; index++) {
      let box = document.getElementById(`box${index}`);
      array.pop();
      box.style.backgroundImage = "none";
      box.style.backgroundColor = "var(--Boxes)";
    }
    document.getElementById("hiddenContainer").style.display = "none";
    document.getElementById("endScreen").style.display = "block";
    Start();
    document.getElementById("CashoutBTN").style.display = "block";
    document.getElementById("reload").style.display = "none";
    buttonsDisable(true);
  }
}

// Buttons Double and Half
function betMore() {
  let temp = betAmount * 2;
  if (temp > walletBalance) {
    alert("BKL! Aukat Mein");
  }
  else{
    betAmount = temp;
    document.getElementById("currentBet").value = betAmount;
  }
}

function betLess() {
  if (betAmount > 1) {
    betAmount = betAmount / 2;
    document.getElementById("currentBet").value = betAmount;
  }
}

function mineMore() {
  let temp = maxMines * 2;
  console.log(temp);
  if (temp < 25) {
    maxMines = maxMines * 2;
    document.getElementById("maxMines").value = Math.round(maxMines);
  } else {
    alert("Marna hai tereko, Dar nahi lagta");
  }
}

function mineLess() {
  if (maxMines > 1) {
    maxMines = maxMines / 2;
    document.getElementById("maxMines").value = Math.round(maxMines);
  }
}

// button Disable Enable Code
function buttonsDisable(State) {
  document.getElementById("betMore").disabled = State;
  document.getElementById("betLess").disabled = State;
  document.getElementById("mineLess").disabled = State;
  document.getElementById("mineMore").disabled = State;
  document.getElementById("maxMines").disabled = State;
  document.getElementById("currentBet").disabled = State;
}

// ChatGPT Code
// Function to calculate the factorial of a number
function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

// Function to calculate n choose r (combination)
function nCr(n, r) {
  return factorial(n) / (factorial(r) * factorial(n - r));
}

// Function to calculate the multiplier
function calculateMultiplier(mines, diamonds) {
  // Define the house edge
  const houseEdge = 0.01;

  // Calculate the multiplier using the formula
  const multiplier =
    (1 - houseEdge) * (nCr(25, diamonds) / nCr(25 - mines, diamonds));

  return multiplier;
}
