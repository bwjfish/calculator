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
    let result = operand1/operand2;
    return result.toString();
}

function operate(operand1, operand2, operator) {
    if (operator == "+") {
        return add(parseInt(operand1), parseInt(operand2));
    } else if (operator == "-") {
        return subtract(parseInt(operand1), parseInt(operand2));
    } else if (operator == "x") {
        return multiply(parseInt(operand1), parseInt(operand2));
    } else if (operand == "/") {
        return divide(parseInt(operand1), parseInt(operand2));
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


let numberButtons = document.getElementsByClassName("num-button");
for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener("click", function() {
        if (history[history.length-1] == "+" || history[history.length-1] == "-"
            || history[history.length-1] == "x" || history[history.length-1] == "/") {
                if (history.length > 2) {
                    if (currentValue != "") {
                        operator = history.pop();         
                        history.splice(history.length-1-spliceLength, spliceLength);
                        history.push(currentValue);
                        history.push(operator);
                        currentValue = "";
                    }

                }
                history.push(numberButtons[i].textContent);
        } else {
            if (history[history.length-1] == "0") {
                history[history.length-1] = "";
            }
            if (history[history.length-1].length < 9) {
                history[history.length-1] = history[history.length-1] + numberButtons[i].textContent;
            }
        }

        console.log(history);
        document.getElementById("display-container").textContent = history[history.length-1];
    });
}

/* Handle 'AC' (clear) button */
let clearButton = document.getElementById("clear");
clearButton.addEventListener("click", function() {
    history = ["0"];
    document.getElementById("display-container").textContent = "0";
});

/* Handle '/' 'x' '-' '+' */
let operatorButtons = document.getElementsByClassName("operator-button");
for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener("click", function() {
        currentValue = "";
        currentOperator = operatorButtons[i].textContent;
        
        if (history[history.length-1] == "+" || history[history.length-1] == "-" 
            || history[history.length-1] == "x" || history[history.length-1] == "/") {
            history.pop();
            history.push(currentOperator);
            if (history.length == 2) {
                console.log(history);
                return;
            }
        } else {
            history.push(currentOperator);
            if (history.length == 2) {
                console.log(history);
                return;
            }
        }

        if (isPlusOrMinus(history[history.length-3]) && isPlusOrMinus(history[history.length-1])) {
            currentValue = operate(history[history.length-4], history[history.length-2], history[history.length-3]);
            spliceLength = 3
            
        } else if (isPlusOrMinus(history[history.length-3]) && isMultiplyOrDivide(history[history.length-1])) {
            // pass

        } else if (isMultiplyOrDivide(history[history.length-3]) && isPlusOrMinus(history[history.length-1])) {
            currentValue = operate(history[history.length-4], history[history.length-2], history[history.length-3]);
            if (history.length-5 > 0 && isPlusOrMinus(history[history.length-5])) {
                currentValue = operate(history[history.length-6], currentValue, history[history.length-5]);
                spliceLength = 5;
            }

        } else if (isMultiplyOrDivide(history[history.length-3]) && isMultiplyOrDivide(history[history.length-1])) {
            currentValue = operate(history[history.length-4], history[history.length-2], history[history.length-3]);
            spliceLength = 3;

        } else {
            console.log("error: 109");

        }
        
        if (currentValue != "") {
            document.getElementById("display-container").textContent = currentValue;
        } else {
            document.getElementById("display-container").textContent = history[history.length-2];
        }
        console.log(history);
    });
}


let history = ["0"];
let currentOperator = "";
let currentValue = "";
let spliceLength = 0;

