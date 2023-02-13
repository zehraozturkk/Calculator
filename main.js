const numbers = document.querySelectorAll(".number");
const decimal = document.querySelector(".decimal");
const operators = document.querySelectorAll(".operator");
const plusButton = document.querySelector("#plus");
const equalsButton = document.querySelector("#equals");
const clearbutton = document.querySelector("#clear");
const display = document.querySelector(".Input");

let displayValue = '0';
let firstValue = null;
let operator = null;
let isSecondValue = false;

updateDisplay();

function updateDisplay(){
    display.value = displayValue
}
// numbers
for(let num of numbers){
    num.addEventListener('click', (e) => {
        const element = e.target;
        console.log(element)

        inputNumber(element.value);
        updateDisplay();
    })
}

//operations
for(let oper of operators){
    oper.addEventListener('click', (e) => {
        const element = e.target;
        handleOperator(element.value);
        updateDisplay();
    
        
    })
}

decimal.addEventListener('click', () => {
    if(!displayValue.includes('.')){
        displayValue += ".";
    }
    updateDisplay();
    return;

})

const inputNumber = (sayi) => {
    //bir sayısal değer giriliyorsa onu karşılayan function
    if(isSecondValue){
        displayValue = sayi;
        isSecondValue = false;
    }else{
        displayValue = displayValue === '0' ? sayi: displayValue + sayi;

    }

    console.log(displayValue, firstValue , operator, isSecondValue)

}

clearbutton.addEventListener('click', () => {
    displayValue = '0';
    updateDisplay();
});

const handleOperator = (nextOperator) => {
    const value = parseFloat(displayValue); // sayımız ondalıklı olma ihtimaline karşı 

    if(operator && isSecondValue){
        operator = nextOperator;
        return;
    }
    if(firstValue === null){
        firstValue = value;
    }else{
        const result = calculate(firstValue, value, operator)
    
        displayValue = `${parseFloat(result.toFixed(7))}`
        firstValue = result;
    }
    isSecondValue = true; // ikinci bir değeri bekliyoruz dedik
    operator = nextOperator;

    console.log(displayValue, firstValue , operator, isSecondValue)
}

const calculate = (first, second, operator) => {
    if(operator=== '+'){
        return first + second;
    }else if( operator === '-'){
        return first - second;
    }else if (operator === '*'){
        return first * second;
    }else if(operator === '/'){
        return first / second;
    }
    return second;

}

