console.log("Hello");

// How to define a user define function
// function declaration
function greeting1(){
    console.log("Hello");
}

greeting1();

function greeting2(name){
    console.log("Hello " + name);
}

greeting2("Sam");

// function greeting3(name){
//     return "Hello " + {name};
// }

// int message = greeting3("Tom");
// console.log(message)

// greeting3("Samer");

// Second way
 function sum(num1=0, num2=0){
     return num1+num2;
 }

 console.log(sum(1, 5));

let f1 = sum;

console.log(f1(9, 8));

const f2 = function (){
    return "Good Afternoon"
};

console.log(f2());

// Third way: arrow function
const f3 = ()=> "Good Afternoon";

const f4 = (n1, n2)=> n1+n2;
console.log(f4(2, 8));