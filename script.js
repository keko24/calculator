function add(x, y)
{
	return x + y;
}

function subtract(x, y)
{
	return x - y;
}

function multiply(x, y)
{
	return x * y;
}

function divide(x, y)
{
	return x / y;
}

function operate(x, op, y)
{
	if (op === '+')
		return add(x, y);
	else if (op === '-')
		return subtract(x, y);
	else if (op === '*')
		return multiply(x, y);
	else if (op === '/')
		return divide(x, y);
}

function equationSolver(eq)
{
	let i = 1;
	while (true)
	{
		if (i >= eq.length)
		{
			break;
		}
		if (eq[i] === '*' || eq[i] === '/')
		{
			eq[i - 1] = operate(+eq[i - 1], eq[i], +eq[i + 1]);
			eq.splice(i, 2);
			continue;
		}
		i++;
	}
	if (eq.length === 1)
		return eq[0];
	let sum = 0;
	sum += operate(+eq[0], eq[1], +eq[2]);
	for (i = 4; i < eq.length; i += 2)
	{
		if (eq[i - 1] === '-')
		{
			sum -= +eq[i];
			continue;
		}	
		sum += +eq[i]; 
	}
	return sum;
}

function addDigit(e)
{
	display.textContent += e.target.textContent;
}

function addDigitKey(e)
{
	display.textContent += e.textContent;
}

function addOperator(e)
{
	if (e.target.textContent === '=')
	{
		equation = display.textContent.split(' ');
		display.textContent += ` = ${equationSolver(equation)}`;
		return;
	}
	display.textContent += ` ${e.target.textContent} `;
}

function addOperatorKey(e)
{
	if (e.textContent === '=')
	{
		equation = display.textContent.split(' ');
		display.textContent += ` = ${equationSolver(equation)}`;
		return;
	}
	display.textContent += ` ${e.textContent} `;
}

function clearDisplay()
{
	display.textContent = '';
}

const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const clear = document.querySelector('#clear');
const display = document.querySelector('#display');
clear.addEventListener('click', clearDisplay);

digits.forEach(digit => digit.addEventListener('click', addDigit));

operators.forEach(operator => operator.addEventListener('click', addOperator)); 

window.addEventListener('keydown', function(e) {
	if(!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '=', '/', 'Escape'].includes(e.key))
		return;
	const key = document.querySelector(`.key[data-key="${e.key}"]`);
	if (['+', '-', '*', '/', '='].includes(key.textContent))
		addOperatorKey(key);
	else if(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(key.textContent))
		addDigitKey(key);
	else if(key.textContent === 'AC')
		clearDisplay();
});
