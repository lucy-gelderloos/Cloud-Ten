'use strict';

//enter affirmations into array
let affirm = ['Placeholder Text1', 'Placeholder Text2'];
function generateNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let random = generateNumberBetween(0, affirm.length);
let newEl = document.createElement('p');
let affirmText = document.createTextNode(affirm[random]);
newEl.appendChild(affirmText);
let position = document.getElementById('affirmation');
position.appendChild(newEl);
