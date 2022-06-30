//enter affirmations into array
let affirm = ['I am Worthy of Success', 'I am Strong', 'I can accomplish anything I put my Heart and Mind into', 'I can do Hard Things', 'I have Overcome hard things', 'I am Safe', 'I am Enough', 'I Deserve Success'];
function generateNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


let random = generateNumberBetween(0, affirm.length);
let newEl = document.createElement('p');
let affirmText = document.createTextNode(affirm[random]);
newEl.appendChild(affirmText);
let position = document.getElementById('affirmation');
position.appendChild(newEl);
