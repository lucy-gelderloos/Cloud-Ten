


document.getElementById('addItemLink').addEventListener('click', function(){
  document.getElementById('add-item-form').classList.remove('hidden');
});

document.getElementById('submit-item').addEventListener('click', function(event){
  event.preventDefault();document.getElementById('add-item-form').classList.add('hidden');
});
let checkBoxArray = document.querySelectorAll('input[type=checkbox]');

let labelArray = document.querySelectorAll('label');




function findLabel(input) {
  for(let i=0; i < labelArray.length; i++){
    if(labelArray[i].htmlFor === input.name){
      return labelArray[i];
    }
  };




