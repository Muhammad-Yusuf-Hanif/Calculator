class Calculator {
	constructor(prevOperandTextElement, curOperandTextElement) {
		this.prevOperandTextElement = prevOperandTextElement;
		this.curOperandTextElement = curOperandTextElement;
		this.clear();
	}

	clear() {
		this.curOperand = "";
		this.prevOperand = "";
		this.operation = undefined;
	}

	delete() {
		this.curOperand = this.curOperand.toString().slice(0, -1);
	}

	appendNumber(number) {
		if (number === "." && this.curOperand.includes(".")) return;
		if (number === "0" && this.curOperand === "0") return;
		this.curOperand = this.curOperand.toString() + number.toString();
	}

	chooseOperation(operation) {
		if (this.curOperand === "") return;
		if (this.prevOperand !== "") {
			this.compute();
		}
		this.operation = operation;
		this.prevOperand = this.curOperand;
		this.curOperand = "";
	}

	compute() {
		let computation;
		const prev = parseFloat(this.prevOperand);
		const current = parseFloat(this.curOperand);
		if (isNaN(prev) || isNaN(current)) return;
		switch (this.operation) {
			case "+":
				computation = prev + current;
				break;
			case "-":
				computation = prev - current;
				break;
			case "*":
				computation = prev * current;
				break;
			case "÷":
				computation = prev / current;
				break;
			default:
				return;
		}
		this.curOperand = computation;
		this.operation = undefined;
		this.prevOperand = "";
	}

	getDisplayNumber(number) {
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split(".")[0]);
		const decimalDigits = stringNumber.split(".")[1];
		let integerDisplay;
		if (isNaN(integerDigits)) {
			integerDisplay = "";
		} else {
			integerDisplay = integerDigits.toLocaleString("en", {
				maximumFractionDigits: 0,
			});
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	}

	updateDisplay() {
		this.curOperandTextElement.innerText = this.getDisplayNumber(
			this.curOperand
		);
		if (this.operation != null) {
			this.prevOperandTextElement.innerText = `${this.getDisplayNumber(
				this.prevOperand
			)} ${this.operation}`;
		} else {
			this.prevOperandTextElement.innerText = "";
		}
	}
}

const numberBtn = document.querySelectorAll("[data-number]");
const operationBtn = document.querySelectorAll("[data-operation]");
const equalBtn = document.querySelector("[data-equal]");
const deleteBtn = document.querySelector("[data-delete]");
const allClearBtn = document.querySelector("[data-allClear]");
const prevOperandTextElement = document.querySelector("[data-previousOperand]");
const curOperandTextElement = document.querySelector("[data-currentOperand]");

const calculator = new Calculator(
	prevOperandTextElement,
	curOperandTextElement
);

numberBtn.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});

operationBtn.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});

equalBtn.addEventListener("click", (button) => {
	calculator.compute();
	calculator.updateDisplay();
});

allClearBtn.addEventListener("click", (button) => {
	calculator.clear();
	calculator.updateDisplay();
});

deleteBtn.addEventListener("click", (button) => {
	calculator.delete();
	calculator.updateDisplay();
});
