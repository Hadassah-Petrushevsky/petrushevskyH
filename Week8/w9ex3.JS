console.log("Hello");

function multiplyNumbers(){
    let number1 = document.querySelector('#n1').value;
    let number2 = document.querySelector('#n2').value;
    let multiply = number1 * number2;
    document.querySelector('#output').textContent="The Multiplication of " +number1+ " and " +number2+ " is " +multiply;
}

document.querySelector('#btn').addEventListener('click',multiplyNumbers);