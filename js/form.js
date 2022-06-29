


document.getElementById('submit-item').addEventListener('click', function(){
  document.getElementById('add-item-form').classList.remove('hidden');
});

document.getElementById('submit-item').addEventListener('click', function(event){
  event.preventDefault();document.getElementById('add-item-form').classList.add('hidden');
});


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