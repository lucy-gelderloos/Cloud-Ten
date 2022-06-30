


document.getElementById('addInfoLink').addEventListener('click', function(){
  document.getElementById('add-info-form').classList.remove('hidden');
});

document.getElementById('submit-item').addEventListener('click', function(event){
  event.preventDefault();document.getElementById('add-info-form').classList.add('hidden');
});
let checkBoxArray = document.querySelectorAll('input[type=checkbox]');

let labelArray = document.querySelectorAll('label');




function findLabel(input) {
  for(let i=0; i < labelArray.length; i++){
    if(labelArray[i].htmlFor === input.name){
      return labelArray[i];
    }





// function logSubmit(event) {
//   log.textContent = `Enter Your name here! ${event.name}`;
//   event.preventDefault();
// }

// const form = document.getElementById('form');
// const log = document.getElementById('log');
// form.addEventListener('submit', logSubmit);

// const form = document.getElementById('signup');

// form.elements[0]; // by index
// form.elements['name']; // by name
// form.elements['name']; // by id (name & id are the same in t

// form.elements[1]; // by index
// form.elements['email']; //  by name
// form.elements['email']; // by id