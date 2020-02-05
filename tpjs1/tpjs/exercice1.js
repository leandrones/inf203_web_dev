"use strict";
function factorialIt(n){
    var n_factorial = 1;
    for(var i = 1; i <= n; i++){
        n_factorial *= i;
        // console.log(n_factorial+" i = "+i);
    }
    return n_factorial;
}

function factorialRec(n){
    if (n <= 1){
        return 1;
    }
    return n*factorialRec(n-1);
}

function factorialTable(a){
    var b = [];
    // console.log('a = '+a);
    for(var x in a){
        // console.log('x = '+x);
        b.push(factorialIt(a[x]));
    }
    // console.log(b);
    return b;
}

function factorialMap(a){
    return a.map(factorialIt);
}

// let a = [5,3];
// factorialTable(a);
// console.log(factorialRecs(10));


exports.factorialIt = factorialIt;
exports.factorialRec = factorialRec;
exports.factorialArray = factorialTable;
exports.factorialMap = factorialMap;