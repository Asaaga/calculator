// import all of html elements
const previousInput = document.querySelector('[previousInput]');
const currentInput = document.querySelector('[currentInput]');
const sqr = document.querySelector('[sqr]');
const equ = document.querySelector('[equ]');
const fac = document.querySelector('[fac]');
const clr = document.querySelector('#clr');
const operators = document.querySelectorAll('[opp]');
const del = document.querySelector('[del]');
let numbers = document.querySelectorAll('[num]');

// declare a calculator class
class Calcultor {
	// declare a constructor
	constructor(previousInput, currentInput) {
		this.previousInput = previousInput;
		this.currentInput = currentInput;
		this.clear();
	}
	// declear a function that calculate the square root
	sqroot(symbol){
		this.previousValue = `${symbol}${this.currentValue}`;
		this.currentValue = Math.sqrt(this.currentValue);
	}
	// declear a function that calculate the factorial
	factorial(symbol) {
 	let current = 1;
 	for(let i = 1; i <= parseInt(this.currentValue); i++){
 		current *= i;
 	}
 	this.previousValue = `${this.currentValue} ${symbol}`
 	this.currentValue = current;
	}
	// this function handles the clear button
	clear() {
		this.currentValue = '';
		this.previousValue = '';
		this.operator = undefined;
	}
	// this function add opperator to the screen
	AppendOperators(operator){
		if(this.currentValue === '') return;
		if(this.previousValue !== '') {
			this.calculate()
		}
		this.operator = operator;
		this.previousValue = `${this.currentValue} ${operator}`
		this.currentValue = '';
	}
	// this function add opperand to screen
	addNum(operand) {
		if(operand === '.' && this.currentValue.includes('.')) return
		this.currentValue = this.currentValue.toString() + operand.toString();	
	}
	// this display anything you click on screen
	display() {
		this.currentInput.textContent = this.currentValue;	
		this.previousInput.textContent = this.previousValue;
	}
	// this function handle the delete button
	delete(){
		this.currentValue = this.currentValue.toString().slice(0,-1);
	}
	// this function handles all the calculations
	calculate(){
		let result;
		const current = parseInt(this.currentValue);
		const previous = parseInt(this.previousValue);
		if(isNaN(current) || isNaN(previous)) return
		switch(this.operator) {
			case '÷':
			 result = previous / current;
			break;
			case 'x':
			 result = previous * current;
			break;
			case '-':
			 result = previous - current;
			break;
			case '+':
			 result = previous + current;
			break;
			case '!':
			 result = this.factorial(this.symbol);
			break;
			case '√':
			 result = this.sqroot(this.symbol);
			break;
			default:
			 return;
		}
		this.currentValue = result;
		this.operator = undefined;
		this.previousValue = '';
	}
}

// instantiate the classs
const obj = new Calcultor(previousInput, currentInput);

// loop through the number buttons
for(let number of numbers) {
	number.addEventListener('click', () => {
		obj.addNum(number.textContent)
		obj.display()
	})
}
// loop through the operator buttons
for(let operator of operators) {
	operator.addEventListener('click', () => {
		obj.AppendOperators(operator.textContent);
		obj.display()
	})
}
// we call all the function down here
fac.addEventListener('click', () => {
	obj.factorial(fac.textContent);
	obj.display();
})

clr.addEventListener('click', () => {
	obj.clear();
	obj.display();
})
equ.addEventListener('click', () => {
	obj.calculate();
	obj.display();
})	
del.addEventListener('click', () => {
	obj.delete();
	obj.display();
})	
sqr.addEventListener('click', () => {
	obj.sqroot(sqr.textContent);
	obj.display();
})