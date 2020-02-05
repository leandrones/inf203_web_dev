"use strict";
function factorialIt(n){
    var n_factorial = 1;
    for(var i = 1; i <= n; i++){
        n_factorial *= i;
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
    for(var x in a){
        b.push(factorialIt(a[x]));
    }
    return b;
}

function factorialMap(a){
    return a.map(factorialIt);
}



exports.factorialIt = factorialIt;
exports.factorialRec = factorialRec;
exports.factorialArray = factorialTable;
exports.factorialMap = factorialMap;