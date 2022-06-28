let affirm = []; 
function generateNumberBetween(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

let random = generateNumberBetween(0, affirm.length)
console.log(affirm[random]);
