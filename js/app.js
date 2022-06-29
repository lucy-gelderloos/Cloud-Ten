'use strict';


// Cart constructor.
const Month = function(allDay) {
  this.allDay = allDay;
};


Month.prototype.addDay = function(product, quantity) {
  let adding = new Day(product, quantity);
  this.allDay.push(adding);
};

Month.prototype.saveToLocalStorage = function() {
  localStorage.setItem('month', JSON.stringify(this.allDay));
};

const Day = function(product, quantity) {
  this.product = product;
  this.quantity = quantity;
};

// Month.prototype.removeItem = function(item) {
//   // TODO DONE: Fill in this instance method to remove one item from the cart.
//   for(let i = 0; i < month.allDay.length; i++){
//     if(month.allDay[i].product == item){
//       month.allDay.splice(i, 1);
//     }
//   }
//   // Note: You will have to decide what kind of parameter to pass in here!
// };


// Shows Add New Item form when button is clicked
document.getElementById('add-item-button').addEventListener('click', function(){
  document.getElementById('add-item-form').classList.remove('hidden');
});

// Hides Add New Item form when submit button is clicked
document.getElementById('submit-item').addEventListener('click', function(event){
  event.preventDefault();
  document.getElementById('add-item-form').classList.add('hidden');
});

// Hides Add New Item form when cancel button is clicked
document.getElementById('cancel-add').addEventListener('click', function(){
  document.getElementById('add-item-form').classList.add('hidden');
});

// Find all checkboxes in document
let checkBoxArray = document.querySelectorAll('input[type=checkbox]');

// Find all labels in document
let labelArray = document.querySelectorAll('label');

// Add event listener to each checkbox
for(let i=0; checkBoxArray.length; i++){
  checkBoxArray[i].addEventListener('change',strikeThrough);
}

// Add or remove strikethrough class when box is checked or unchecked
function strikeThrough() {
  for(let i=0; i < checkBoxArray.length; i++){
    let checkBox = checkBoxArray[i];
    let label = findLabel(checkBox);
    if(checkBox.checked === true){
      label.classList.add('strikethrough');
    } else {
      label.classList.remove('strikethrough');
    }
  }
}

// Find the label associated with an input
function findLabel(input) {
  for(let i=0; i < labelArray.length; i++){
    if(labelArray[i].htmlFor === input.name){
      return labelArray[i];
    }
  }
}
