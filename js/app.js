'use strict';

const Calendar = function(userCal) {
  this.userCal = userCal;
};

const Month = function(allDay, year, month) {
  this.allDay = allDay;
  this.year = year;
  this.month = month;
};

const Day = function() {
  this.task = [];
  this.event = [];
};

Calendar.prototype.addMonth = function(monthObj, shift) {
  if(shift){
    this.userCal.push(monthObj);
  }
  else{
    this.userCal.unshift(monthObj);
  }
};

Month.prototype.addDay = function() {
  let adding = new Day();
  this.allDay.push(adding);
};

Month.prototype.saveToLocalStorage = function() {
  localStorage.setItem('thisMonth', JSON.stringify(this.allDay));
};

const TaskCloud = function() {
  this.taskCloud = [];
};

const EventCloud = function() {
  this.eventCloud = [];
};


const Task = function(category, content) {
  this.category = category;
  this.content = content;
};

const Event = function(category, content) {
  this.category = category;
  this.content = content;
};


// Shows Add New Item form when button is clicked
document.getElementById('addItemLink').addEventListener('click', function(event){
  event.preventDefault();
  document.getElementById('add-item-form').classList.remove('hidden');
});

// Hides Add New Item form when submit button is clicked
document.getElementById('submit-item').addEventListener('click', function(event){
  event.preventDefault();
  document.getElementById('add-item-form').classList.add('hidden');
});


// Hides Add New Item form when cancel button is clicked
document.getElementById('cancel-add').addEventListener('click', function(event){
  event.preventDefault();
  document.getElementById('add-item-form').classList.add('hidden');
});

// Find all checkboxes in document
let checkBoxArray = document.querySelectorAll('input[type=checkbox]');

// Find all labels in document
let labelArray = document.querySelectorAll('label');

// Add event listener to each checkbox
//for(let i=0; checkBoxArray.length; i++){
//  checkBoxArray[i].addEventListener('change',strikeThrough);
//}

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

console.log('hi');
