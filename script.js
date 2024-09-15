// Get the display and buttons
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let operatorSet = false;

// Add event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;

        if (button.id === 'clear') {
            clearDisplay();
        } else if (button.id === 'equal') {
            calculateResult();
        } else {
            appendToDisplay(value);
        }
    });
});

// Append button value to display
function appendToDisplay(value) {
    if (display.value === 'Error') {
        clearDisplay();
    }

    if (value === '.' && currentInput.includes('.')) return;
    if (operatorSet) {
        currentInput = '';
        operatorSet = false;
    }

    currentInput += value;
    display.value = currentInput;
}

// Clear display and reset variables
function clearDisplay() {
    currentInput = '';
    display.value = '';
}

// Perform calculation based on operator
function calculateResult() {
    try {
        display.value = eval(currentInput.replace('×', '*').replace('÷', '/'));
        currentInput = display.value;
        operatorSet = true;
    } catch (error) {
        display.value = 'Error';
        currentInput = '';
    }
}

// Keyboard support
window.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9 || e.key === '.' || e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        appendToDisplay(e.key);
    } else if (e.key === 'Enter') {
        calculateResult();
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
});