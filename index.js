const calculator = {
    //The display value
    displayedValue: `0`,
    returnedDisplayValue: `0`,
    //Set first operand to nothing
    firstOperand: null,
    //Sentinal to check if a new operand is required(ie: two decimals)
    waitingForSecondOperand: false,
    //Set operator to null
    operator: null,
};

//MAIN PROGRAM
const uxButtons = document.querySelectorAll(`.uxButtons > button`);
console.log(uxButtons)
for (let button of uxButtons) {
    button.addEventListener(`click`, (event) => {
        let buttonClicked = event.target;
        console.log(buttonClicked);

        if (buttonClicked.classList.contains(`operator`)) {
            console.log(`operator: `, buttonClicked.value)
            manageOperators(buttonClicked.value);
            updateDisplay();
            return
        }
        if (buttonClicked.classList.contains(`dot`)) {
            console.log(`Decimal: `, buttonClicked.value)
            inputDecimal(buttonClicked.value);
            updateDisplay();
            return
        }
        if (buttonClicked.classList.contains(`clear`)) {
            console.log(`clear: `, buttonClicked.value)
            inputClear(buttonClicked.value);
            updateDisplay();
            return
        }
        inputNumber(buttonClicked.value)
        updateDisplay();
    });
}
//END MAIN

//refresh display with newly added displayedValues
updateDisplay = () => {
    const display = document.querySelector(`#user-input-values`);
    const returnedDisplay = document.querySelector(`#user-returned-values`);

    display.value = calculator.displayedValue;
    returnedDisplay.value = calculator.returnedDisplayValue;
}

//Display base value to screen (0)
updateDisplay();

//Take the event.target.value captured during the click event and add to the display
inputNumber = (numpadButtonValue) => {

    if (calculator.waitingForSecondOperand === true) {
        calculator.displayedValue = numpadButtonValue;
        calculator.waitingForSecondOperand = false;
    }
    else {
        calculator.displayedValue = calculator.displayedValue === "0" ? numpadButtonValue : calculator.displayedValue + numpadButtonValue;
    }
}
//If the displayedValue already has a dot, don't allow any additional dots
inputDecimal = (dotButtonValue) => {
    const { waitingForSecondOperand } = calculator;
    if (waitingForSecondOperand === true) {
        calculator.displayedValue = dotButtonValue;
        calculator.waitingForSecondOperand = false;
    }
    if (!calculator.displayedValue.includes(dotButtonValue)) {
        calculator.displayedValue += dotButtonValue;
    }
}

//give a param to build on later if required, reset all params to defaults
inputClear = (clearButtonValue) => {
    calculator.displayedValue = `0`;
    calculator.returnedDisplayValue = `0`;
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}

manageOperators = (clickedOperator) => {
    //Destructure for ease of access
    const { operator, firstOperand } = calculator;
    const value = parseFloat(calculator.displayedValue);
    //If user clicks an operator, thus changing the wait status to true, and they choose another operator,
    //simply change the operator and return nothing, exiting the decision structure.
    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = clickedOperator;
        console.log(calculator)
        return;
    }
    if (firstOperand == null) {
        calculator.firstOperand = value;
        console.log(calculator);
    }
    else if (operator) {
        //Perform calculations using calculations obj functions passing in the first operand and value
        //const result = calculations[operator](firstOperand, value);
        switch (operator) {
            case "+":
                result = firstOperand + value;
                calculator.returnedDisplayValue = String(firstOperand) + operator + String(result - firstOperand)
                break;
            case "-":
                result = firstOperand - value;
                calculator.returnedDisplayValue = String(firstOperand) + operator + String(firstOperand - result)
                break;
            case "*":
                result = firstOperand * value;
                calculator.returnedDisplayValue = String(firstOperand) + operator + String(result / firstOperand)
                break;
            case "/":
                result = firstOperand / value;
                calculator.returnedDisplayValue = String(firstOperand) + operator + String(firstOperand / result)
                break;
            case "=":
                result = value;
                break;
        }
        //Change the displayed value to the given result (convert to string)
        //set result as the new firstOperand to enable strung together calculations
        calculator.displayedValue = String(result);

        calculator.firstOperand = result;

        console.log(calculator);
    }
    //Set waiting flag to true after any operand button is pressed
    calculator.waitingForSecondOperand = true;
    calculator.operator = clickedOperator;
    console.log(calculator);
}






