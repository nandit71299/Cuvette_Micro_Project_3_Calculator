const result = document.getElementById("result");

result.innerHTML = "0";

let cVal = ""; // Current Value
let pVal = ""; // Previous Value
let operator = ""; // Operator Value

function handleClick(event) {
  const action = event.target.dataset.action;
  const value = event.target.value;

  if (!action) {
    if (value === "0" && cVal === "0") {
      return;
    } else if (value === "." && cVal.includes(".")) {
      return;
    } else {
      cVal += value;
      result.innerHTML = cVal;
    }
  } else {
    switch (action) {
      case "reset":
        cVal = "0";
        pVal = "";
        operator = "";
        result.innerHTML = cVal;
        break;
      case "del":
        cVal = cVal.slice(0, -1) || "0";
        result.innerHTML = cVal;
        break;
      case "plus":
      case "minus":
      case "multiply":
      case "divide":
        if (cVal) {
          pVal = cVal;
          operator = action;
          cVal = "";
        }
        break;
      case "equals":
        if (pVal && cVal && operator) {
          cVal = formatResult(calculate(pVal, cVal, operator));
          result.innerHTML = cVal;
          pVal = "";
          operator = "";
        }
        break;
    }
  }
}

function calculate(a, b, operator) {
  a = parseFloat(a);
  b = parseFloat(b);

  switch (operator) {
    case "plus":
      return a + b;
    case "minus":
      return a - b;
    case "multiply":
      return a * b;
    case "divide":
      if (b === 0) return "Error";
      return a / b;
    default:
      return b;
  }
}

function formatResult(value) {
  value = parseFloat(value);
  if (isNaN(value)) return "Error";

  if (Number.isInteger(value)) {
    return value.toString();
  }

  const roundedValue = Math.round(value * 100) / 100;
  return roundedValue.toFixed(2).replace(/\.00$/, "");
}
