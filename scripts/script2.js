function add(operand1, operand2) {
    let result = operand1+operand2;
    return result.toString();
}

function subtract(operand1, operand2) {
    let result = operand1-operand2;
    return result.toString();
}

function multiply(operand1, operand2) {
    let result = operand1*operand2;
    return result.toString();
}

function divide(operand1, operand2) {
    console.log("divide: " + (operand1/operand2));
    let result = operand1/operand2;
    console.log("result = " + result);
    console.log("result.toString() = " + result.toString());
    return result.toString();
}

function operate(operand1, operand2, operator) {
    if (operator == "+") {
        return add(parseFloat(operand1), parseFloat(operand2));
    } else if (operator == "-") {
        return subtract(parseFloat(operand1), parseFloat(operand2));
    } else if (operator == "x") {
        return multiply(parseFloat(operand1), parseFloat(operand2));
    } else if (operator == "/") {
        return divide(parseFloat(operand1), parseFloat(operand2));
    } else {
        console.log("error");
    }
}

/* Returns true if operator is plus or minus */
function isPlusOrMinus(operator) {
    return operator == "+" || operator == "-";
}

/* Returns true if operator is multiply or divide */
function isMultiplyOrDivide(operator) {
    return operator == "x" || operator == "/";
}

/* Takes in an array of the form [<num>, <operator>, <num>, <operator>, ...., <num>] 
and simplifies starting from the end and ending at the first plus or minus*/
function simplifyMultiplyDivide() {
    nextHistory = [];
    for (let i = 0; i < history.length; i++) {
        nextHistory.push(history[i]);
    }

    let i = nextHistory.length-1;
    while (i > 0) {
        if (nextHistory[i] == "+" || nextHistory[i] == "-") {
            break;
        } else if (nextHistory[i] == "x" || nextHistory[i] == "/") {
            newVal = operate(nextHistory[i-1], nextHistory[i+1], nextHistory[i]);
            nextHistory.splice(i-1, 3, newVal);
        } else {
            i -= 1;
        }
    }
}

/* Takes in an array of the form [<num>, <operator>, <num>, <operator>, ...., <num>] 
and simplifies it */
function simplifyAll() {
    nextHistory = [];
    for (let i = 0; i < history.length; i++) {
        nextHistory.push(history[i]);
    }

    let i = 0;
    while (i < nextHistory.length) {
        if (nextHistory[i] == "x" || nextHistory[i] == "/") {
            newVal = operate(nextHistory[i-1], nextHistory[i+1], nextHistory[i]);
            console.log("newVal = " + newVal);
            nextHistory.splice(i-1, 3, newVal);
        } else {
            i += 1;
        } 
    }
    console.log("(87) nextHistory = " + nextHistory);
    i = 0;
    while (i < nextHistory.length) {
        if (nextHistory[i] == "+" || nextHistory[i] == "-") {
            newVal = operate(nextHistory[i-1], nextHistory[i+1], nextHistory[i]);
            nextHistory.splice(i-1, 3, newVal);
        } else {
            i += 1;
        } 
    }
    console.log("(97) nextHistory = " + nextHistory);
}


let numberButtons = document.getElementsByClassName("num-button");
for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener("click", function() {
        if (nextHistory.length > 0 && (nextHistory[nextHistory.length-1] == "+" 
            || nextHistory[nextHistory.length-1] == "-"
            || nextHistory[nextHistory.length-1] == "x" 
            || nextHistory[nextHistory.length-1] == "/")) {
                history = [];
                for (let i = 0; i < nextHistory.length; i++) {
                    history.push(nextHistory[i]);
                }
                history.push(numberButtons[i].textContent);
        } else {
            if (history[history.length-1] != "0") {
                history[history.length-1] = history[history.length-1]+numberButtons[i].textContent;
            } else {
                history[history.length-1] = numberButtons[i].textContent;
            }
        }
        nextHistory = [];
        console.log(history);
        console.log(nextHistory);
        console.log('--------------------------------');
        document.getElementById("display-container").textContent = history[history.length-1];
    });
}

/* Handle 'AC' (clear) button */
let clearButton = document.getElementById("clear");
clearButton.addEventListener("click", function() {
    history = ["0"];
    nextHistory = ["0"];
    document.getElementById("display-container").textContent = "0";
});

/* Handle '/' 'x' '-' '+' */
let operatorButtons = document.getElementsByClassName("operator-button");
for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener("click", function() {
        if (operatorButtons[i].textContent == "x" || operatorButtons[i].textContent == "/") {
            simplifyMultiplyDivide();
        } else if (operatorButtons[i].textContent == "+" || operatorButtons[i].textContent == "-") {
            simplifyAll();
        }
        nextHistory.push(operatorButtons[i].textContent);

        console.log(history);
        console.log(nextHistory);
        console.log('--------------------------------');
        document.getElementById("display-container").textContent = nextHistory[nextHistory.length-2];
    });
}


let history = ["0"];
let nextHistory = ["0"];
document.getElementById("display-container").textContent = "0";