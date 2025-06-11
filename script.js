let historyList = [];

function generatePassword() {
  const length = document.getElementById("length").value;
  const includeUpper = document.getElementById("uppercase").checked;
  const includeLower = document.getElementById("lowercase").checked;
  const includeNumbers = document.getElementById("numbers").checked;
  const includeSymbols = document.getElementById("symbols").checked;

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

  let chars = "";
  if (includeUpper) chars += upper;
  if (includeLower) chars += lower;
  if (includeNumbers) chars += numbers;
  if (includeSymbols) chars += symbols;

  if (chars === "") {
    document.getElementById("output").innerText = "Please select at least one option.";
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  document.getElementById("output").innerText = password;
  historyList.push(password);
  updateHistory();
}

function copyPassword() {
  const password = document.getElementById("output").innerText;
  if (password) {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  }
}

function resetOptions() {
  document.getElementById("length").value = 12;
  document.getElementById("uppercase").checked = false;
  document.getElementById("lowercase").checked = true;
  document.getElementById("numbers").checked = true;
  document.getElementById("symbols").checked = false;
  document.getElementById("output").innerText = "";
  document.getElementById("history").style.display = "none";
}

function downloadPassword() {
  const password = document.getElementById("output").innerText;
  if (password) {
    const blob = new Blob([password], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "password.txt";
    link.click();
  }
}

function toggleHistory() {
  const historyDiv = document.getElementById("history");
  historyDiv.style.display = historyDiv.style.display === "none" ? "block" : "none";
}

function updateHistory() {
  const historyDiv = document.getElementById("history");
  historyDiv.innerHTML = "<strong>Password History:</strong><br>" + historyList.map((p, i) => `${i + 1}. ${p}`).join("<br>");
}
