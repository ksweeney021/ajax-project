let calculatorTotal = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector(".screen");

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
        //this else allows you to append any new numbers that are clicked to the end of the calculatorInput
    }
    rerender();
}

function handleMath(value) {
    if (buffer === "0") {
        return;
    }

    const intBuffer = parseInt(buffer);
    if (calculatorTotal === 0) {
        calculatorTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = value;

    buffer = "0";
}

function flushOperation(intBuffer) {
    if (previousOperator === "fas fa-plus") {
        calculatorTotal += intBuffer;
    } else if (previousOperator === "fas fa-minus") {
        calculatorTotal -= intBuffer;
    } else if (previousOperator === "fas fa-times") {
        calculatorTotal *= intBuffer;
    } else {
        calculatorTotal /= intBuffer;
    }
}

function handleSymbol(value) {
    switch (value) {
        case "C":
            buffer = "0";
            calculatorTotal = 0;
            break;
        case "fas fa-equals":
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = +calculatorTotal;
            calculatorTotal = 0;
            break;
        case "arrow_back":
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case "fas fa-plus":
        case "fas fa-minus":
        case "fas fa-times":
        case "fas fa-divide":
            handleMath(value);
            break;
    }
}

//rerender function for anytime you have a number that needs to be written out and you then need to rerender the calculatorInput variable
function rerender() {
    screen.innerText = buffer;
}


function init() {
    document.querySelector(".calculator-buttons").addEventListener("click", function(event) {
        buttonClick(event.target.innerText);
});
}


init ();