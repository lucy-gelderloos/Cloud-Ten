'use strict';

document.getElementById('add-item-button').addEventListener('click', function(){
  document.getElementById('add-item-form').classList.remove('hidden');
});

document.getElementById('submit-item').addEventListener('click', function(event){
  event.preventDefault();
  document.getElementById('add-item-form').classList.add('hidden');
});
