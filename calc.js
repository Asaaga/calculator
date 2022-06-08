const previousInput = document.querySelector('[previousInput]');
const currentInput = document.querySelector('[currentInput]');
const sqr = document.querySelector('[sqr]');
const equ = document.querySelector('[equ]');
const fac = document.querySelector('[fac]');
const clr = document.querySelector('#clr');
const operators = document.querySelectorAll('[opp]');
const del = document.querySelector('[del]');
let numbers = document.querySelectorAll('[num]');

class Calcultor {
	constructor(previousInput, currentInput) {
		this.previousInput = previousInput;
		this.currentInput = currentInput;
		this.clear();
	}
	sqroot(symbol){
		this.previousValue = `${symbol}${this.currentValue}`;
		this.currentValue = Math.sqrt(this.currentValue);
	}
	factorial(symbol) {
 	let current = 1;
 	for(let i = 1; i <= parseInt(this.currentValue); i++){
 		current *= i;
 	}
 	this.previousValue = `${this.currentValue} ${symbol}`
 	this.currentValue = current;
	}
	clear() {
		this.currentValue = '';
		this.previousValue = '';
		this.operator = undefined;
	}
	AppendOperators(operator){
		if(this.currentValue === '') return;
		if(this.previousValue !== '') {
			this.calculate()
		}
		this.operator = operator;
		this.previousValue = `${this.currentValue} ${operator}`
		this.currentValue = '';
	}
	addNum(operand) {
		if(operand === '.' && this.currentValue.includes('.')) return
		this.currentValue = this.currentValue.toString() + operand.toString();	
	}
	display() {
		this.currentInput.textContent = this.currentValue;	
		this.previousInput.textContent = this.previousValue;
	}
	delete(){
		this.currentValue = this.currentValue.toString().slice(0,-1);
	}
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
const obj = new Calcultor(previousInput, currentInput);

for(let number of numbers) {
	number.addEventListener('click', () => {
		obj.addNum(number.textContent)
		obj.display()
	})
}
for(let operator of operators) {
	operator.addEventListener('click', () => {
		obj.AppendOperators(operator.textContent);
		obj.display()
	})
}
fac.addEventListener('click', () => {
	obj.factorial(fac.textContent);
	obj.display();
	console.log('this is living')
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